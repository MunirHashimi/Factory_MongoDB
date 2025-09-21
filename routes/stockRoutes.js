const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');


// Route to get all stocks
router.get('/index', stockController.index);
router.get('/create', stockController.createForm);
router.post('/create', stockController.create);
router.get('/:id/show', stockController.show);
router.get('/:id/edit', stockController.editForm);
router.post('/:id/edit', stockController.edit);
router.delete('/:id/delete', stockController.destroy);





module.exports = router;