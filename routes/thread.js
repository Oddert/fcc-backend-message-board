const router    = require('express').Router(),
      mongoose  = require('mongoose');

const Board     = require('../models/Board'),
      Thread    = require('../models/Thread'),
      Reply     = require('../models/Reply');

//========== API routes ==========
router.get('/api/threads/:board_name', (req, res) => {
  console.log('### line 10');
  Board.findOne({ name: req.params.board_name })
  // .populate('threads')
  .populate({path:'threads',
            populate: {path: 'replies'}})
  .exec((err, foundBoard) => {
    if (err) {
      console.log(err);
      res.json({ err })
    } else {
      const output = Object.assign({}, foundBoard._doc);
      output.threads.sort((a, b) => a.bumped_on > b.bumped_on ? -1 : 1)
      output.threads = output.threads.slice(0, 10);
      output.threads.forEach(thread => {
        thread.replies.sort((a, b) => a.bumped_on > b.bumped_on ? -1 : 1)
        thread.replies.forEach(reply => {
          reply.reported = undefined;
          reply.delete_password = undefined;
        })
        thread.reported = undefined,
        thread.delete_password = undefined
      });
      res.json(output.threads)
    }
  })
})

router.get('/api/replies/:board_id', (req, res) => {
  console.log('### line 37');
  Thread.findById(req.query.thread_id)
  .populate('replies')
  .exec((err, foundThread) => {
    if (err) {
      console.log(err);
      res.json({ err })
    } else {
      const reply = {
        _id: foundThread._id,
        replies: foundThread.replies.map(each => ({
          text: each.text,
          deleted: each.deleted,
          _id: each._id,
          created_on: each.created_on
        })),
        text: foundThread.text,
        created_on: foundThread.created_on,
        bumped_on: foundThread.bumped_on
      }
      res.json(reply);
    }
  })
})
//thread_id query

router.post('/api/threads/:board_id', (req, res) => {
  Board.findById(req.params.board_id, (err, foundBoard) => {
    if (err) {
      console.log(err);
      res.json({ err })
    } else {
      Thread.create(req.body, (err, createdThread) => {
        if (err) {
          console.log(err);
          res.json({ err })
        } else {
          createdThread.board = foundBoard._id;
          createdThread.save(err => {
            foundBoard.threads.push(createdThread._id);
            foundBoard.save(err => res.redirect(`/b/${foundBoard.name}`));
          })
        }
      })
    }
  })
})

router.put('/api/threads/:board_id', (req, res) => {
  Thread.findById(req.body.thread_id, (err, foundThread) => {
    if (err) {
      console.log(err);
      res.json({ err })
    } else {
      foundThread.reported = true;
      foundThread.save(err => res.send('success'))
    }
  })
})

router.delete('/api/threads/:board_id', (req, res) => {
  Board.findById(req.params.board_id, (err, foundBoard) => {
    if (err) {
      console.log(err);
      res.json({ err })
    } else {
      Thread.findById(req.body.thread_id, (err, foundThread) => {
        if (err) {
          console.log(err);
          res.json({ err })
        } else {
          if (foundThread.delete_password === req.body.delete_password) {
            foundBoard.threads.remove(req.body.thread_id);
            foundBoard.save();
            foundThread.remove();
            res.send('success');
          } else {
            res.send('incorrect password');
          }
        }
      })
    }
  })
})
//========== / API routes ==========


//========== Front End Routes ==========
router.get('/b/:board_name/:thread_id', (req, res) => {
  Thread.findById(req.params.thread_id)
  .populate('replies')
  .exec((err, thread) => {
    if (err) {
      console.log(err);
      res.json({ err })
    } else {
      res.render('thread', { thread, board: req.params.board_name })
    }
  })
})
//========== / Front End Routes ==========

module.exports = router;
