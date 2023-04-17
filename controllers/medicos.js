const {response} = require('express');
const Medico = require('../models/Medico');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getMedicos = async (req, res) => {
    
    const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre');
    
    res.json({
        ok: true,
        medicos
    });
}

const crearMedico = async (req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {
        
        const medicoDB = await medico.save()
    
        res.json({
            ok: true,
            medicoDB
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs.'
        })
    }
}

const actualizarMedico = async(req, res = response) => {
    
    // TODO validar token

    const uid = req.params.id;

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
            usuario: usuarioActualizado
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs.'
        })
    }
}

const borrarMedico = async (req, res = response) => {
    const uid = req.params.id;

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
            msg: 'Usuario eliminado'
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
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
}