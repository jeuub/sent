const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: {
      unique: true
    },
  },

  vkid: {
    type: String,
    required: true,
    index: {
      unique: true
    },
  },

  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note',
  }],

  notes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note',
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', UserSchema);
module.exports = User;