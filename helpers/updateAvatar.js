const fs = require('fs')

const User = require('../models/user.model')
const Doctors = require('../models/doctor.model')
const Hospitals = require('../models/hospital.model')

const deleteImg = (path) => {
    if(fs.existsSync(path)){
        fs.unlinkSync(path)
    }
}


const updateAvatar = async (type, id, fileName) => {
    let oldAvatarPath = '';
    switch(type){
        case 'doctors':
            const doctor = await Doctors.findById(id);
            if(!doctor){
                console.log('Cant find Doctor by id')
                return false
            }
            oldAvatarPath = `./uploads/doctors/${doctor.img}`
            deleteImg(oldAvatarPath)

            doctor.img = fileName
            await doctor.save();
            return true;
        break

        case 'hospitals':
            hospital = await Hospitals.findById(id);
            if(!hospital){
                console.log('Cant find Hospital by id')
                return false
            }
            oldAvatarPath = `./uploads/hospitals/${hospital.img}`
            deleteImg(oldAvatarPath)

            hospital.img = fileName
            await hospital.save();
            return true;
        break
        case 'users':
            user = await User.findById(id);
            if(!user){
                console.log('Cant find User by id')
                return false
            }
            oldAvatarPath = `./uploads/users/${user.img}`
            deleteImg(oldAvatarPath)

            user.img = fileName
            await user.save();
            return true;
        break
    }
}



module.exports = { 
    updateAvatar
}