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
    
    const id = req.params.id;
    const uid = req.params.uid;

    try{

        const medico = await Medico.findById(id);

        if (!medico){
            res.status(404).json({
                ok: false,
                msg: 'El médico no existe.'
            })
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }
        
        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true});
        
        res.json({
            ok: true,
            medicoActualizado
        });

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs.'
        })
    }
}

const borrarMedico = async (req, res = response) => {
    const id = req.params.id;

    try{
        const medico = await Medico.findById(id);

        if (!medico){
            res.status(404).json({
                ok: false,
                msg: 'El médico no existe.'
            })
        }

        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Médico eliminado'
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