const mongoose = require('mongoose');

const ReplySchema = new mongoose.Schema({
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
  deleted: {
    type: Boolean,
    default: false
  },
  thread: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'fcc-backend-message-board-thread'
  }
  // replies: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'fcc-backend-message-board-reply'
  //   }
  // ]
})


module.exports = mongoose.model('fcc-backend-message-board-reply', ReplySchema)
