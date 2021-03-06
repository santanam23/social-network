const { Thought, User } = require('../models');

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
    // .populate({
    //   path: 'thoughts',
    //   select: '-__v'
    // })
    .select('-__v')
    .sort({ _id: -1 })
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
  },
// get thought by ID 
getThoughtById({ params }, res) {
  Thought.findOne({ _id: params.id})
    // .populate({
    // path: 'thoughts',
    // select: '-__v'
    // })
    .select('-__v')
    .sort({ _id: -1 })
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch( err => {
      console.log(err);
      res.status(500).json(err)
    })
},  
  // add thought to user
  createThought({ body }, res) {
    console.log(body);
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.user_id },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // add reaction
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, { $push: { reactions: body } }, { new: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  // delete thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(deletedThought);
      })
      .catch(err => res.json(err));
  },
  // remove reaction
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err));
  }
};

module.exports = thoughtController;