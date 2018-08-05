const router    = require('express').Router(),
      mongoose  = require('mongoose');

const Board     = require('../models/Board'),
      Thread    = require('../models/Thread'),
      Reply     = require('../models/Reply');


//========== API Routes ==========
router.get('/board/seed', (req, res) => {
  Board.create({name: 'general'}, (err, general) => {
    Board.create({name: 'design'}, (err, design) => {
      res.redirect('/');
    })
  })
})

router.post('/admin/board/new', (req, res) => {
  Board.create(req.body, (err, board) => {
    if (err) {
      console.log(err);
      res.json({ err })
    } else {
      res.redirect('/')
    }
  })
})

router.get('/b/:board_name', (req, res) => {
  Board.findOne({ name: req.params.board_name })
        .populate('threads')
        .exec((err, board) => {
          if (err) {
            console.log(err);
            res.json({ err })
          } else {
            res.render('board/index', { board })
          }
        })
  // res.json({message: 'you are viewing board:', route: req.params.board_name})
})
//========== / API Routes ==========



//========== Front End Routes ==========
// router.get('/b/:id', (req, res) => {
//   res.json({message: 'you are viewing board:', route: req.params.id})
// })
//========== / Front End Routes ==========


module.exports = router;
