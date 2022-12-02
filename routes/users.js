const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const mongoose = require('mongoose');

const {
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
  getUserInfo,
  login,
  createUser,
} = require('../controllers/users');

const validateId = (value, helpers) => {
  if (mongoose.isValidObjectId(value)) { return value; }
  return helpers.error('any.invalid');
};

router.get('/users', getUsers);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().custom(validateId, 'ObjectId validation'),
  }),
}), getUserById);

router.get('/users/me', getUserInfo);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/),
  }),
}), updateUserAvatar);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: false } }),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/),
  }),
}), createUser);

module.exports = router;
