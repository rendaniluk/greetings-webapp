const express = require('express');

const exphbs = require('express3-handlebars');

const app = express();

const bodyParser = require('body-parser');

const port = 3400;

const GreetingsRoutes = require('./greetings');

const greetingRoutes = GreetingsRoutes();

//configuring handlebars
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//using static
app.use(express.static('public'));

//using bodyParser
app.use(bodyParser.urlencoded({
    extended: false
  }))
  // parse application/json
app.use(bodyParser.json())

//creating a route
app.get('/greetings', greetingRoutes.index);
app.post('/greetings', greetingRoutes.index);

app.get('/greeted', greetingRoutes.greeted);
app.get('/counter/:name', greetingRoutes.counter);
app.post('/counter/:name', greetingRoutes.counter);


//starting a sever
var localhost = app.listen(port, function() {
  var host = localhost.address().address;
  console.log('The greetings aplication running at http://%s:%s', host,
    port);
});
