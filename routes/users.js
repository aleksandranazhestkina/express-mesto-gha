const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
  getUserInfo,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/users', getUsers);
router.get('/users/:userId', getUserById);
router.get('/users/me', auth, getUserInfo);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
