const { Router } = require('express');
const { getUsuarios, crearUsuarios, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();

// Ruta: /api/usuarios

router.get('/', validarJWT, getUsuarios);

router.post(
    '/', 
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
        check('password', 'El password es obligatorio.').not().isEmpty(),
        check('email', 'El email es obligatorio.').isEmail(),
        validarCampos,
    ], 
    crearUsuarios
);


router.put(
    '/:id',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
        check('email', 'El email es obligatorio.').isEmail(),
        check('role', 'El rol es obligatorio.').not().isEmpty(),
        validarCampos,
    ],
    actualizarUsuario
);

router.delete(
    '/:id',
    validarJWT,
    borrarUsuario
);

module.exports = router;