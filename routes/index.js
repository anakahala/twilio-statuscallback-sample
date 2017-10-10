var express = require('express');
var router = express.Router();

require('dotenv').load();
var client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/', function(req, res, next) {
  client.calls.create({
    url: 'https://demo.twilio.com/docs/voice.xml',
    to: process.env.TWILIO_TEL_TO,
    from: process.env.TWILIO_TEL_FROM,
    timeout: 60,
    statusCallback: 'https://' + process.env.HEROKU_APP_NAME + '.herokuapp.com/statusCallBack/' + req.body.socketId,
    statusCallbackMethod: "GET",
    statusCallbackEvent: ["ringing", "answered", "completed"]
  }, function(err, call) {
    if (err) {
    }
  });
});

module.exports = router;
