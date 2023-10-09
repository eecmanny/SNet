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
      unique: true,    },
     // * Must match a valid email address (look into Mongoose's matching validation)
    },

  {
    // equivelent to making an include or join "parent = users" and "child = thought"; need to add thoughtSchema array
    // thought: [thoughtSchema],
    type: Schema.Types.ObjectId,
    ref: 'thought',

  },
  {
        // equivelent to making an include or selfjoin "parent = users" and "child = friends; need to add userSchema array
    // friends: [userSchema],
    type: Schema.Types.ObjectId,
    ref: 'user',
  },

  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('user', userSchema);

module.exports = User;
