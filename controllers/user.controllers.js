const User = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');
const Repair = require('../models/repairs.models');

exports.findAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt', 'status'] },
    where: {
      status: true,
    },
    include: [
      {
        model: Repair,
        attributes: ['id', 'date', 'userId'],
        where: {
          status: true,
        },
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    message: 'Users was found successfully',
    users,
  });
});

exports.findOneUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  res.status(200).json({
    status: 'success',
    message: 'User was found successfully',
    user,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { username, email } = req.body;
  const { user } = req;

  await user.update({ username, email });

  res.status(200).json({
    status: 'success',
    message: 'User updated successfully',
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: false });

  res.status(200).json({
    status: 'success',
    message: 'User deleted successfully',
  });
});
