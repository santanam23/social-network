const { User, Thought } = require('../models');

const userController = {
  // the functions will go in here as methods
  getAllUsers(req, res) {
      User.find({})
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
          console.log(err);
          res.status(400).json(err);
      });
  },
  // get one user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .then(dbUserData => {
        // If no user is found, send 404
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // create user
    createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
  },
  // update user by id
    updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },
  
    // delete user
    deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

    // add friend by user id
    addFriend({ params}, res) {
        User.findOneAndUpdate(
            { _id: params.userId }, 
            { $push: { friends: params.friendId } }, 
            { new: true, runValidators: true 
            })
            .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No pizza found with this id!' });
                return;
            }
            res.json(dbUserData);
            })
            .catch(err => res.json(err));
     },
     // delete friend
    deleteFriend({ params }, res) {
    User.findOneAndDelete({ _id: params.friendId })
      .then(deletedFriend => {
        if (!deletedFriend) {
          return res.status(404).json({ message: 'No friend with this id!' });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { friends: params.friendId } },
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
  }
};

module.exports = userController;