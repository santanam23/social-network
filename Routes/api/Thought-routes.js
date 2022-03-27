const router = require('express').Router();
const {
  addThought,
  removeThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts/<userId>
router
    .route('/:userId')
    .post(addThought);


// /api/:userId/:thoughtId/
router
  .route('/:userId/:thoughtId')
  .put(addReaction)
  .delete(removeThought);
// /api/:userId/:thoughtId/reaction
router
    .route('/:userid/:thoughtId/:reaction')
    .delete(removeReaction)

module.exports = router;