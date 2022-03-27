const router = require('express').Router();
const {
  addUser,
  removeUser,
  addFriend,
  removeFriend
} = require('../../controllers/user-controller');

// /api/users/:userId
router.route('/:userId').post(addUser);
router.route('/:userId').delete(removeUser);

// /api/users/:userId/friends/:friendId
router
  .route('/:userId/:friendId')
  .put(addFriend)
  .delete(removeFriend);

// /api/comments/<pizzaId>/<commentId>/<replyId>
// router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);

module.exports = router;