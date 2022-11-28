const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
  getUserMe,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/users', getUsers);
router.get('/users/:userId', getUserById);
router.get('/me', auth, getUserMe);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
