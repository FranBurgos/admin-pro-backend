const { Router } = require('express');
const { login, googleSignIn } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');

const router = Router();

// Path: /api/login
router.post(
    '/',
    [
        check('email', 'El email es obligatorio.').isEmail(),
        check('password', 'El password es obligatorio.').not().isEmpty(),
        validarCampos
    ],
    login
)

router.post(
    '/google',
    [
        check('token', 'El token de Google es obligatorio.').not().isEmpty(),
        validarCampos
    ],
    googleSignIn
)


module.exports = router;