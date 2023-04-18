const {response} = require('express');
const Hospital = require('../models/hospital');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getHospitales = async (req, res) => {
    
    const hospitales = await Hospital.find()
    .populate('usuario', 'nombre')
    
    res.json({
        ok: true,
        hospitales
    });
}

const crearHospital = async (req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {
        
        const hospitalDB = await hospital.save()
    
        res.json({
            ok: true,
            hospitalDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs.'
        })
    }
}

const actualizarHospital = async(req, res = response) => {
    
    const id = req.params.id;

    try{

        const hospital = await Hospital.findById(id);

        if (!hospital){
            res.status(404).json({
                ok: false,
                msg: 'El hospital no existe.'
            })
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }
        
        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true});
        
        res.json({
            ok: true,
            hospitalActualizado
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs.'
        })
    }
}

const eliminarHospital = async (req, res = response) => {

    try{
        const id = req.params.id;

        const hospital = await Hospital.findById(id);

        if (!hospital){
            res.status(404).json({
                ok: false,
                msg: 'El hospital no existe.'
            })
        }

        await Hospital.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Hospital eliminado'
        })

    } catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado borrando hospital... revisar logs.'
        })
    }
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital,
}