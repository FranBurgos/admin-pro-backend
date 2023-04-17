const { Router } = require('express');
const { getHospitales, crearHospital, borrarHospital, actualizarHospital } = require('../controllers/hospitales');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();

// Ruta: /api/hospitales

router.get('/', getHospitales);

router.post(
    '/', 
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario.').not().isEmpty(),
        validarCampos
    ], 
    crearHospital
);


router.put(
    '/:id',
    [
    ],
    actualizarHospital
);

router.delete(
    '/:id',
    borrarHospital
);

module.exports = router;