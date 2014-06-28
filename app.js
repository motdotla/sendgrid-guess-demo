var dotenv = require('dotenv');
dotenv.load();

var Hapi   = require('hapi');
var port   = parseInt(process.env.PORT) || 3000;

// Create a server with a host and port
var server = Hapi.createServer('localhost', port);

// Add the html routes
server.route({
  method: 'GET',
  path: '/{path*}',
  handler: {
    directory: { path: './public', listing: false, index: true }
  }
});

// Add the inbound route
server.route({
  method: 'POST',
  path:   '/inbound',
  handler: function (request, reply) {
    console.log(request.payload);

    reply({success: true});
  }
});

// Start the server
server.start(function() {
  console.log('sendgrid-guess-demo server started at: ' + server.info.uri);
});
