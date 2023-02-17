const { Router } = require('express');
const {
  findAllRepairs,
  findOneRepair,
  createRepair,
  updateRepair,
  deleteRepair,
} = require('../controllers/repair.controller');

const router = Router();

router.get('/', findAllRepairs);

router.get('/:id', findOneRepair);

router.post('/', createRepair);

router.patch('/:id', updateRepair);

router.delete('/:id', deleteRepair);

module.exports = {
  repairRouter: router,
};
