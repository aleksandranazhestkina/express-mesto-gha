const router = require('express').Router();

const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { validateCardId, validateCreateCard } = require('../middlewares/validation');
const auth = require('../middlewares/auth');

router.use(auth);

router.get('/cards', getCards);
router.post('/cards', validateCreateCard, createCard);
router.delete('/cards/:cardId', validateCardId, deleteCard);
router.put('/cards/:cardId/likes', validateCreateCard, likeCard);
router.delete('/cards/:cardId/likes', validateCreateCard, dislikeCard);

module.exports = router;
