/*
    Ruta: /api/uploads/
*/

const { Router} = require('express');

const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/validate-jwt');

const expressFileUpload = require('express-fileupload');

const { fileUpload, returnImage } = require('../controllers/uploads.controller')

const router = Router();

router.use(expressFileUpload());

router.put('/:type/:id',validateJWT, fileUpload );
router.get('/:type/:image',validateJWT, returnImage );

module.exports = router

