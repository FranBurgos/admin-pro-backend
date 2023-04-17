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
    
    // TODO validar token

    //const uid = req.params.id;

    try{

        // const usuarioDB = await Usuario.findById(uid);

        // if(!usuarioDB){
        //     return res.status(404).json({
        //         ok: false,
        //         msg: 'No existe un usuario con ese id.'
        //     })
        // }

        // // Actualización
        // const { password, google, email, ...campos } = req.body;

        // if ( usuarioDB.email != email ){
        //     const existeEmail = await Usuario.findOne({email});
        //     if (existeEmail) {
        //         return res.status(404).json({
        //             ok: false,
        //             msg: 'Ya existe un usuario con ese email.'
        //         })
        //     }
        // }

        // campos.email = email;
        // const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});

        res.json({
            ok: true,
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs.'
        })
    }
}

const borrarHospital = async (req, res = response) => {
    //const uid = req.params.id;

    try{
        // const usuarioDB = await Usuario.findById(uid);

        // if(!usuarioDB){
        //     return res.status(404).json({
        //         ok: false,
        //         msg: 'No existe un usuario con ese id.'
        //     })
        // }

        // await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Hospital eliminado'
        })

    } catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado borrando usuario... revisar logs.'
        })
    }
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital,
}