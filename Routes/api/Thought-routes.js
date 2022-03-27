const router = require('express').Router();
const {
  addThought,
  removeThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts/<userId>
router.route('/:userId').post(addThought);
router.route('/:userId').delete(removeThought);

// /api/thoughts/:thoughtId/reactions
router
  .route('/:thoughtId/:reactionId')
  .put(addReaction)
  .delete(removeReaction);

// // /api/comments/<pizzaId>/<commentId>/<replyId>
// router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);

module.exports = router;