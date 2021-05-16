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

const updateDoctor = (req,res) => {
    res.json({
        ok: true, 
        msg: 'Update Doctor',
    })
}

const deleteDoctor = (req,res) => {
    res.json({
        ok: true, 
        msg: 'Delete Doctor',
    })
}

module.exports = {
    getDoctor,
    createDoctor,
    updateDoctor,
    deleteDoctor
}