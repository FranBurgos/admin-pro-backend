const { Router } = require('express');
const { validarJWT } = require('../middleware/validar-jwt');
const { fileUpload, retornaImagen } = require('../controllers/uploads');
const expressFileUpload = require('express-fileupload');

const router = Router();

// Ruta: api/uploads

router.use( expressFileUpload());

router.put('/:tipo/:id', validarJWT, fileUpload);
router.get('/:tipo/:foto', retornaImagen);

module.exports = router;