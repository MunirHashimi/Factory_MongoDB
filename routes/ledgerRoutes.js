const express = require('express');
const router = express.Router();
const ledgerController = require('../controllers/ledgerController');


// Route to get all ledgers
router.get('/index', ledgerController.index);
router.get('/create', ledgerController.createForm);
router.post('/create', ledgerController.create);
router.get('/:id/show', ledgerController.show);
router.get('/:id/edit', ledgerController.editForm);
router.post('/:id/edit', ledgerController.edit);
router.delete('/:id/delete', ledgerController.destroy);





module.exports = router;