const router = require('express').Router();
const {
  getAllThoughts,
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
    .get(getAllThoughts);

    router
    .route('/:id')
    .get(getThoughtById);
  // /api/:thoughtId/
  router
    .route(':thoughtId/reactions')
    .put(addReaction)
    .delete(deleteThought);
// /api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction)

module.exports = router;