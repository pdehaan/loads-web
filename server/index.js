'use strict';

var Hapi = require('hapi');

var PORT = process.env.PORT || 5000;

var server = new Hapi.Server('0.0.0.0', PORT, {});
server.route([
  require('./routes/GET-static'),
  require('./routes/GET-bower-components'),
  require('./routes/GET-index'),
  require('./routes/GET-api'),
  require('./routes/GET-comments'),
  require('./routes/POST-comments'),
  require('./routes/404')
]);

server.ext('onPreResponse', function (request, reply) {
  console.log('[%s] %d %s', request.method.toUpperCase(), request.response.statusCode, request.url.path);
  var response = request.response;
  if (!response.isBoom) {
    return reply();
  }
});

server.start(function () {
  console.log('Hapi %s server started at %s', Hapi.version, server.info.uri);
});
