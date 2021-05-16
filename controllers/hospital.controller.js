const { response } = require("express");
const Hospital = require('../models/hospital.model')

const getHospital =  async(req, res = response) => {

    const hospitals = await Hospital.find()
                                        .populate('user','name', 'img');

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

const updateHospital = (req,res) => {
    res.json({
        ok: true, 
        msg: 'Update Hospitals',
    })
}

const deleteHospital = (req,res) => {
    res.json({
        ok: true, 
        msg: 'Delete Hospitals',
    })
}

module.exports = {
    getHospital,
    createHospital,
    updateHospital,
    deleteHospital
}