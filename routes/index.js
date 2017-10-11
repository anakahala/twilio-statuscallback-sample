var express = require('express');
var router = express.Router();

require('dotenv').load();
var twilioSid = process.env.TWILIO_SID;
var twilioToken = process.env.TWILIO_TOKEN;
var twilioTellTo = process.env.TWILIO_TEL_TO;
var twilioTellFrom = process.env.TWILIO_TEL_FROM;
var herokuAppName = process.env.HEROKU_APP_NAME;

var client = require('twilio')(twilioSid, twilioToken);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Twilio Call */
router.post('/', function(req, res, next) {
  client.calls.create({
    url: 'https://demo.twilio.com/docs/voice.xml',
    to: twilioTellTo,
    from: twilioTellFrom,
    timeout: 60,
    statusCallback: 'https://' + herokuAppName + '.herokuapp.com/statusCallBack/' + req.body.socketId,
    statusCallbackMethod: "GET",
    statusCallbackEvent: ["ringing", "answered", "completed"]
  }, function(err, call) {
    if (err) {
    }
  });
});

module.exports = router;
