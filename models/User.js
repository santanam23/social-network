const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
      );
  };

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
      trim:true,
      validate: [validateEmail],
      match: [ /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/]
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }
],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
    }
},
{
  toJSON: {
    getters: true
  }
}
);

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });

const User = model('User', UserSchema);

module.exports = User;