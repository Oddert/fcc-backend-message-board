const express         = require('express'),
      app             = express(),
      bodyParser      = require('body-parser'),
      methodOverride  = require('method-override'),
      path            = require('path')
      mongoose        = require('mongoose'),
      helmet          = require('helmet');

const Board           = require('./models/Board'),
      Thread          = require('./models/Thread'),
      Reply           = require('./models/Reply');

const BoardRoutes     = require('./routes/board'),
      ThreadRoutes    = require('./routes/thread'),
      ReplyRoutes     = require('./routes/reply');

require('dotenv').config();

app.use(helmet({
  frameguard: {
    action: 'deny'
  },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'"]
    }
  },
  hidePoweredBy: {
    setTo: 'PHP 4.2.0'
  },
  dnsPrefetchControl: true
}));

mongoose.connect(process.env.DATABASE);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname + '/public')))

app.get('/', (req, res) => {
  Board.find({}, (err, boards) => {
    if (err) {
      console.log(err);
      res.json({ err });
    } else {
      res.render('home', { boards })
    }
  })
})

app.use(BoardRoutes);
app.use(ThreadRoutes);
app.use(ReplyRoutes);

const PORT = process.env.PORT || 3000;
const server = app.listen(
  PORT,
  () => console.log(`${new Date().toLocaleTimeString()}: Server initializing on port: ${PORT}`)
);
