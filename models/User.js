const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// const validateEmail = function {
//     const regex =
// };

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      require: true,
      trim: true
    },
    email: {
      type: String,
      required: 'Email Is Required',
      unique: true,
      validate: [validateEmial],
      match:
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }
],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
},
    {
    toJSON: {
      virtuals: true,
      getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
UserSchema.virtual('friendCount').get(function() {
  return this.thoughts.reduce(
    (total, comment) => total + comment.replies.length + 1,
    0
  );
});

const User = model('User', UserSchema);

module.exports = User;