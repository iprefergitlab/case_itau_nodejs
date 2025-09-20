const express = require('express');
const controller = require('../controllers/customer.controller');
const { validateCreate, validateUpdate, validateValue } = require('../middlewares/validate.middleware');
const router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', validateCreate, controller.create);
router.put('/:id', validateUpdate, controller.update);
router.delete('/:id', controller.remove);
router.post('/:id/deposit', validateValue, controller.deposit);
router.post('/:id/withdraw', validateValue, controller.withdraw);

module.exports = router;
