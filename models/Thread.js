const mongoose = require('mongoose');

const ThreadSchema = new mongoose.Schema({
  name: {type: String, default: 'Placeholder'},
  delete_password: String,
  text: String,
  created_on: {
    type: Date,
    default: Date.now
  },
  bumped_on: {
    type: Date,
    default: Date.now
  },
  reported: {
    type: Boolean,
    default: false
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'fcc-backend-message-board-board'
  },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'fcc-backend-message-board-reply'
    }
  ]
})


module.exports = mongoose.model('fcc-backend-message-board-thread', ThreadSchema)
