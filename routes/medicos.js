const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');
const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos');

const router = Router();

// Ruta: /api/medicos

router.get('/', getMedicos);

router.post(
    '/', 
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
        check('hospital', 'El hospital ID debe ser válid.').isMongoId(),
        validarCampos
    ], 
    crearMedico
);


router.put(
    '/:id',
    [
    ],
    actualizarMedico
);

router.delete(
    '/:id',
    borrarMedico
);

module.exports = router;