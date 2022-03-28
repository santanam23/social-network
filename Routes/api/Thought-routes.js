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
  .get(getThoughtById);
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