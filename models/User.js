const { Schema, model } = require('mongoose');
const userSchema = require('./Reaction');

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
    thought: [{
      type: Schema.Types.ObjectId,
      reference: "thoughts"
  }],
  friend: [{
    type: Schema.Types.ObjectId,
    reference: "friends"
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
