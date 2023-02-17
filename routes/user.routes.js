const { Router } = require('express');
const { createUser } = require('../controllers/auth.controller');
const {
  findAllUsers,
  findOneUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controllers');

const router = Router();

router.get('/', findAllUsers);

router.get('/:id', findOneUser);

router.post('/', createUser);

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = {
  userRouter: router,
};
