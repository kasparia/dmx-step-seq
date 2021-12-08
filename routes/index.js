var express = require('express');
var router = express.Router();

const MainLightHandler = require('../handler/MainLightHandler');
const dmxHandler = new MainLightHandler();

/* GET home page. */
router.get('/api', function(req, res, next) {
  console.log(req);
  res.render('index', { title: 'Express', handlerContent: 'Tööt' });
});

router.post('/api', function(req, res, next) {
  console.log(req.body);

  dmxHandler.setBPM(req.body.currentBPM);
  dmxHandler.setSteps(req.body.steps);
  dmxHandler.flashLight();

  res.send({status: 'ok'});
});

module.exports = router;
