const Usuario = require('../models/usuario');
const Medico = require('../models/Medico');
const Hospital = require('../models/hospital');
const fs = require('fs');

const borrarImagen = (path) => {
    if ( fs.existsSync(path)) {
        // Borrar la imagen anterior
        fs.unlinkSync(path);
    }
}

const actualizarImagen = async (tipo, id, nombreArchivo) => {
    
    switch ( tipo ){
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('No es un médico a través del ID.')
                return false;
            }

            let pathViejoM = `./uploads/medicos/${ medico.img }`;
            borrarImagen(pathViejoM);

            medico.img = nombreArchivo;
            await medico.save();
            return true;

            break;
        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('No es un hospital a través del ID.')
                return false;
            }

            let pathViejoH = `./uploads/hospitales/${ hospital.img }`;
            borrarImagen(pathViejoH);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
            break;
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('No es un usuario a través del ID.')
                return false;
            }

            let pathViejoU = `./uploads/usuarios/${ usuario.img }`;
            borrarImagen(pathViejoU);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            break;
        default:
    }
}

module.exports = {
    actualizarImagen
}