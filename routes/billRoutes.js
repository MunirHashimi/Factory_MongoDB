const express = require('express');
const router = express.Router();
const billController = require('../controllers/billController');


// Route to get allbills
router.get('/index',billController.index);
router.get('/create',billController.createForm);
router.post('/create',billController.create);
router.get('/show/:id', billController.show);
router.get('/:id/edit',billController.editForm);
router.post('/:id/edit',billController.edit);
router.delete('/:id/delete',billController.destroy);





module.exports = router;