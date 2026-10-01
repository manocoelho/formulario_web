const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

router.get('/nucleos', formController.getNucleos);
router.post('/', formController.submitForm);
router.get('/', formController.getFormularios);

module.exports = router;