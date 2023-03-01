const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')

// Schema to create a course model
const thoughtSchema = new Schema(
  {
    thoughttext: {
      type: String,
      required: 'you must leave a thought',
      minlength:1,
      maxlength:200,
    },
    createdAt:{
      type: Date,
      default: Date.now(),
      get: timestamp => dateformat(timestamp),
    },
   username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
