const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");
const path = require('path');
const fs = require('fs');


const fileUpload = ( req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = [ 'hospitales', 'usuarios', 'medicos' ];
    if ( !tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'El tipo debe ser hospitales/usuarios/medicos'
        })
    } 
    
    // Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No files were uploaded.'
        });
    }

    // Procesar la imagen
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length -1];

    // Validar extensión
    const extensionesValidas = [ 'png','jpg','jpeg','gif'];
    if ( !extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'Extensión de archivo no válida.'
        })
    } 

    // Generar nombre único
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

    // Path para guardar la imagen
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;

    // Use the mv() method to place the file somewhere on your server
    file.mv(path, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        // Actualizar la BD
        actualizarImagen(tipo, id, nombreArchivo);

        res.json({
            ok: true,
            msg: 'File upload',
            nombreArchivo,
        })
    });
}

const retornaImagen = ( req, res = response) => {
    
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    let pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

     // Imagen por defecto
    if ( !fs.existsSync(pathImg)){
        pathImg = path.join(__dirname, `../uploads/Image_not_available.png`);
    }
    
    res.sendFile(pathImg);
}

module.exports = {
    fileUpload,
    retornaImagen,
}