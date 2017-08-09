const express = require('express');

const exphbs = require('express3-handlebars');

const app = express();

const bodyParser = require('body-parser');

const flash = require('express-flash');

const session = require('express-session');

app.set('port', (process.env.PORT || 5000));

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
app.use(bodyParser.json());

//configuring session
app.use(session({
  secret: 'keyboard cat',
  cookie: {
    maxAge: 60000 * 30
  },
  resave: true,
  saveUninitialized: true
}));
app.use(flash());

//creating a route
app.get('/', greetingRoutes.index);
app.post('/greetings', greetingRoutes.index);

app.get('/greeted', greetingRoutes.greeted);
app.get('/counter/:name', greetingRoutes.counter);
app.post('/counter/:name', greetingRoutes.counter);

// app.get('/greetings', greetingRoutes.greetedNamesLength);
// app.post('/greetings', greetingRoutes.greetedNamesLength);
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


//starting a sever
// var localhost = app.listen(port, function() {
//   var host = localhost.address().address;
//   console.log('The greetings aplication running at http://%s:%s', host,
//     port);
// });
