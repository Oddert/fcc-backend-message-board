const router    = require('express').Router(),
      mongoose  = require('mongoose');

const Board     = require('../models/Board'),
      Thread    = require('../models/Thread'),
      Reply     = require('../models/Reply');

//========== API routes ==========
router.post('/api/replies/:board_id/', (req, res) => {
  console.log('###')
  Thread.findById(req.body.thread_id, (err, foundThread) => {
    if (err) {
      console.log('##');
      console.log(err);
      res.json({ err })
    } else {
      foundThread.bumped_on = Date.now();
      foundThread.save();
      console.log('#')
      console.log(foundThread);
      Board.findById(foundThread.board, (err, foundBoard) => {
        if (err) {
          console.log(err);
          res.json({ err })
        } else {
          console.log(foundBoard)
          Reply.create(req.body, (err, reply) => {
            if (err) {
              console.log(err);
              res.json({ err })
            } else {
              reply.thread = req.params.thread_id;
              reply.save();
              foundThread.replies.push(reply._id);
              foundThread.save(err => res.redirect(`/b/${foundBoard.name}/${foundThread._id}`));
            }
          })
        }
      })
    }
  })
})

router.put('/api/replies/:board_id', (req, res) => {
  Reply.findById(req.body.reply_id, (err, foundReply) => {
    if (err) {
      console.log(err);
      res.json({ err })
    } else {
      foundReply.reported = true;
      foundReply.save(err => res.send('success'))
    }
  })
})

router.delete('/:thread_name/:reply_id', (req, res) => {
  Thread.findOne({ text: req.params.thread_name }, (err, foundThread) => {
    if (err) {
      console.log(err);
      res.json({ err })
    } else {
      Reply.findById(req.params.reply_id, (err, foundReply) => {
        if (err) {
          console.log(err);
          res.json({ err })
        } else {
          foundReply.deleted = true;
          foundReply.save(err => res.redirect('back'))
        }
      })
    }
  })
})
//========== / API routes ==========


//========== Front End Routes ==========
//========== / Front End Routes ==========

module.exports = router;
