const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique:true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique:true,
      match: [/.+@.+\..+/, 'Must be an email!'],
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      reference: "Thought"
  }],
  friends: [{
    type: Schema.Types.ObjectId,
    reference: "User"
}],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id:false,
  }
);

userSchema.virtual('friendCount').get(function(){
return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;
