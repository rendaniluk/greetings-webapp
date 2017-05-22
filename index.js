const express = require('express');

const exphbs = require('express3-handlebars');

const app = express();

const port = 3000;

const GreetingsRoutes = require('./greetings');

const greetingRoutes = GreetingsRoutes();

//configuring handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
//creating a route
app.get('/greetings/:name',greetingRoutes.index);
app.get('/greeted',greetingRoutes.greeted);
app.get('/counter/:name', greetingRoutes.counter);

//starting a sever
var localhost = app.listen(port, function() {
  var host = localhost.address().address;
  console.log('The greetings aplication running at http://%s:%s', host,
    port);
});
