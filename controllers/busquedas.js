const {response} = require('express');
const Hospital = require('../models/hospital');
const Usuario = require('../models/usuario');
const Medico = require('../models/Medico');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getTodo = async (req, res = response) => {
    
    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i');

    const [ hospitales, usuarios, medicos ] = await Promise.all([
        Hospital.find({nombre: regex}),
        Usuario.find({nombre: regex}),
        Medico.find({nombre: regex}),
    ])
    
    res.json({
        ok: true,
        busqueda,
        hospitales,
        usuarios,
        medicos
    });
}

const getDocumentosColeccion = async (req, res = response) => {
    
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i');

    let data = [];

    switch ( tabla ) {
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                .populate('usuario', 'nombre img')
                .populate('hospital', 'nombre img');
            break;
        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
                .populate('usuario', 'nombre img');
            break;
        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
            })
    }

    res.json({
        ok:true,
        resultados: data
    })
}

module.exports = {
    getTodo,
    getDocumentosColeccion
}