const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
  name: String,
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'fcc-backend-message-board-thread'
    }
  ],
  created_on: {
    type: Date,
    default: Date.now
  },
  deleted: {
    type: Boolean,
    default: false
  },
  deleted_on: Date
})

module.exports = mongoose.model('fcc-backend-message-board-board', BoardSchema);
