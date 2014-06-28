var dotenv = require('dotenv');
dotenv.load();

var SENDGRID_USERNAME = process.env.SENDGRID_USERNAME;
var SENDGRID_PASSWORD = process.env.SENDGRID_PASSWORD;
var SECRET_NUMBER = process.env.SECRET_NUMBER;
var PRIZE = "<img src='http://www.maxistentialism.com/bees/oprahbees.gif'/>";
var Hapi = require('hapi');
var sendgrid = require('sendgrid')(SENDGRID_USERNAME, SENDGRID_PASSWORD);
var port = parseInt(process.env.PORT) || 3000;
var redis = require("redis");
var client = redis.createClient();
client.on("error", function (err) {
  console.log("Error " + err);
});

function saveGuess(from, subject, callback) {
  var parts = from.split(/[<>]/);
  var name = parts[0], email = parts[1];
  client.set(email, subject);
  callback(email, subject);
};

// Create a server with a host and port
var server = Hapi.createServer('localhost', port);

// Add the inbound route
server.route({
  method: 'POST',
  path:   '/inbound',
  handler: function (request, reply) {
    // Email guess to: hi@mot.webhook.email
    var payload = request.payload;
    var subject = payload.subject;
    var email = payload.from;

    saveGuess(email, subject, function(email, subject) {
      console.log(subject);

      // step 2
      var html = "Wrong number. Try again";
      if (subject == SECRET_NUMBER) {
        html = "CORRECT! You win a prize.<br/>";
        html += PRIZE;
      }

      sendgrid.send({
        to: email,
        from: 'hi@mot.webhook.email',
        subject: 'Thanks for coming to PayPal BattleHack Chicago!',
        html: html
      }, function(err, resp) {
        console.log(err);
        console.log(resp);
      });

      reply({success: true});
    });
  }
});

// Start the server
server.start(function() {
  console.log('sendgrid-guess-demo server started at: ' + server.info.uri);
});
