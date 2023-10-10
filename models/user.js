const { Schema, model } = require('mongoose');
const userSchema = require('./user');
const thoughtSchema = require('./thought');

// Schema to create user model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    },



    // equivelent to making an include or join "parent = users" and "child = thought"; need to add thoughtSchema array

    thought: [{
      type: Schema.Types.ObjectId,
      ref: 'thought',
    },
    ],


    // equivelent to making an include or selfjoin "parent = users" and "child = friends; need to add userSchema array
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },

    ],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('user', userSchema);

userSchema.virtual('frie')

module.exports = User;

//Create a virtual called friendCount that retrieves the length of the user's friends array field on query.