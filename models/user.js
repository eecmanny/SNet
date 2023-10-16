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
    // This is the array of _id values referencing the Thought model that already made

    // //The first snippet expects an array of objects conforming to the "thoughtSchema."
    thought: [thoughtSchema],


    // The second snippet expects an array of ObjectIds, where each ObjectId is expected to refer to a document in the 'thought' collection. This implies that you are creating a reference or relationship between the current document and documents in the 'thought' collection.
    // thought: [{
    //   type: Schema.Types.ObjectId,
    //   ref: 'thought',
    // },
    // ],


    // equivalent to making an include or self-join "parent = users" and "child = friends; need to add userSchema array

    friends: [userSchema],

    // friends: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'user',
    //   },
    // ],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

//Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;

//Create a virtual called friendCount that retrieves the length of the user's friends array field on query.