const User = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/jwt');
const AppError = require('../utils/appError');

/* A function that creates a user. */
exports.createUser = catchAsync(async (req, res, next) => {
  const { username, email, password, role = 'user' } = req.body;

  const user = new User({ username, email, password, role });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  await user.save();

  const token = await generateJWT(user.id);

  res.status(201).json({
    status: 'success',
    message: 'User created successfully',
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
});

/* A function that is used to login a user. */
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email: email.toLowerCase(),
      status: true,
    },
  });

  if (!user) {
    return next(new AppError('The user could not be found', 404));
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

/* A function that is used to renew a token. */
exports.renewToken = catchAsync(async (req, res, next) => {
  const { id } = req.sessionUser;

  const token = await generateJWT(id);

  const user = await User.findOne({
    where: {
      status: true,
      id,
    },
  });

  return res.status(200).json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});
