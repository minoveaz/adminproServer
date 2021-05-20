const { response } = require("express");
const Hospital = require('../models/hospital.model')

const getHospital =  async(req, res = response) => {

    const hospitals = await Hospital.find()
                                        .populate('user','name')
                                        .populate('hospital','name','img');

    res.json({
        ok: true, 
        hospitals
    })
}


const createHospital = async (req,res) => {

    const uid = req.uid;
    const hospital = new Hospital({
        user: uid,
        ...req.body});
    try {
        const hospitalDb = await hospital.save()
        res.json({
            ok: true, 
            hospital: hospitalDb
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg:'Contact with the Administrator'
        })
    }
}

const updateHospital = async (req,res) => {
    const id = req.params.id;
    const uid = req.uid

    try {
        
        const hospitalDB = await Hospital.findById(id);

        if(!hospitalDB){
            return res.status(404).json({
                ok: false,
                msg: 'Hospital does not exist'
            }) 
        }

        const changeHospitalData = {
            ...req.body,
            user: uid
        }

        const updatedHospital = await Hospital.findByIdAndUpdate(id,changeHospitalData, {new: true})

        res.json({
            ok: true, 
            msg: 'Update Hospitals',
            hospital: updatedHospital
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Cant update this Hospital'
        })
    }

}

const deleteHospital = async (req,res) => {
    const id = req.params.id;
    const uid = req.uid

    try {

        const hospitalDB = await Hospital.findById(id);

        if(!hospitalDB){
            return res.status(404).json({
                ok: false,
                msg: 'Hospital does not exist'
            }) 
        }

        await Hospital.findByIdAndDelete(id);
        
        res.json({
            ok: true, 
            msg: 'Delete Hospitals',
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Cant delete this Hospital'
        })
    }

    
}

module.exports = {
    getHospital,
    createHospital,
    updateHospital,
    deleteHospital
}