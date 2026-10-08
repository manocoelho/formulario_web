const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController'); 

router.get('/', userController.getUsuarios);
router.post('/', userController.createUsuario);
router.put('/:id', userController.updateUsuario);
router.delete('/:id', userController.deleteUsuario);

module.exports = router;