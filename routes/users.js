const router = require('express').Router();

const {
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
  getUserInfo,
} = require('../controllers/users');
const { validateUpdateUser, validateUpdateUserAvatar, validateGetUserById } = require('../middlewares/validation');
// const auth = require('../middlewares/auth');

// router.use(auth);
router.get('/users', getUsers);
router.get('/users/me', getUserInfo);
router.patch('/users/me', validateUpdateUser, updateUser);
router.patch('/users/me/avatar', validateUpdateUserAvatar, updateUserAvatar);
router.get('/users/:userId', validateGetUserById, getUserById);

module.exports = router;
