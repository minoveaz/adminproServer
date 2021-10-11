const { response } = require("express")
const Doctor = require('../models/doctor.model')


const getDoctor = async (req, res = response) => {

    const doctors = await Doctor.find()
                            .populate('user','name')
                            .populate('hospital','name');

    res.json({
        ok: true, 
        msg: 'Get Doctors',
        doctors,
    })
}


const createDoctor = async (req,res) => {
    const uid = req.uid
    const doctor = new Doctor({
        user: uid,
        ...req.body})

    try {
        const doctorDB = await doctor.save()
        res.json({
            ok: true, 
            doctor: doctorDB
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg:'Contact with the Administrator'
        })
    }
}

const updateDoctor = async (req,res) => {
    const id = req.params.id;
    const uid = req.uid;

    
    try {
        
        const doctorDB = await Doctor.findById(id);

        if(!doctorDB){
            return res.status(404).json({
                ok: false,
                msg: 'Doctor does not exist'
            }) 
        }

        const changeDoctorData = {
            ...req.body,
            user: uid
        }

        const updatedDoctor = await Doctor.findByIdAndUpdate(id,changeDoctorData, {new: true})

        res.json({
            ok: true, 
            msg: 'Update Doctor',
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Cant update this Doctor'
        })
    }
}

const deleteDoctor = async (req,res) => {
    const id = req.params.id;
    
    try {
        
        const doctorDB = await Doctor.findById(id);

        if(!doctorDB){
            return res.status(404).json({
                ok: false,
                msg: 'Doctor does not exist'
            }) 
        }

        await Doctor.findByIdAndDelete(id);

        res.json({
            ok: true, 
            msg: 'Deleted Doctor',
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Cant Delete this Doctor'
        })
    }
}

module.exports = {  
    getDoctor,
    createDoctor,
    updateDoctor,
    deleteDoctor
}

