var express = require('express');
var router = express.Router();

const MainLightHandler = require('../handler/MainLightHandler');
const dmxHandler = new MainLightHandler();
dmxHandler.startFlash();
console.log(dmxHandler);

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(dmxHandler);
  res.render('index', { title: 'Express', handlerContent: 'Tööt' });
});

module.exports = router;
