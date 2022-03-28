const router = require('express').Router();
const {
  getThoughts,
  getThoughtById,
  createThought,
  deleteThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts/<userId>
router
    .route('/')
    .post(createThought)
    .get(getThoughts);
// api/:id
router
  .route(getThoughtById);
// /api/:thoughtId/
router
  .route(':thoughtId/reactions')
  .put(addReaction)
  .delete(deleteThought);
// /api/:userId/:thoughtId/reaction
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction)

module.exports = router;