const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  }
});

const groupSchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    members: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    maxMembers: {
      type: Number,
      required: true
    }
  });
  
  const User = mongoose.model('User', userSchema);
  const Group = mongoose.model('Group', groupSchema);

  module.exports = {User,Group}