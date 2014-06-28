var dotenv = require('dotenv');
dotenv.load();

var SENDGRID_USERNAME = process.env.SENDGRID_USERNAME;
var SENDGRID_PASSWORD = process.env.SENDGRID_PASSWORD;
var SECRET_NUMBER = process.env.SECRET_NUMBER;
var secret_number = SECRET_NUMBER;
var PRIZE = "<img src='http://www.maxistentialism.com/bees/oprahbees.gif'/>";
var prize = PRIZE;
var bees = PRIZE;
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

    // +++++++++++++++++++++++++++++++++
    // Email number between 1 and 10 to: 
    // >>> hi@mot.webhook.email <<<
    // +++++++++++++++++++++++++++++++++
    var payload = request.payload;
    var email = payload.from;
    var subject = payload.subject;


    saveGuess(email, subject, function(email, subject) {
      console.log(subject);


      var html = "Wrong answer. try again!";
      if (subject == SECRET_NUMBER) {
        html = "You win a prize."+ bees;
      }
      sendgrid.send({
        to: email,
        from: 'scott.motte@sendgrid.com',
        subject: 'Awesome to be at Paypal Battlehack!',
        html: html
      }, function(err, res) {
        console.log(res);
      });



      reply({success: true});
    });
  }
});

// Start the server
server.start(function() {
  console.log('sendgrid-guess-demo server started at: ' + server.info.uri);
});
