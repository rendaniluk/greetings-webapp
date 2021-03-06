
// const bootstrap = require('bootstrap');

const express = require('express');


const exphbs = require('express3-handlebars');

const app = express();

const bodyParser = require('body-parser');

const flash = require('express-flash');

const session = require('express-session');

const GreetingsRoutes = require('./greetings');

const mongoURL = process.env.MONGO_DB_URL || 'mongodb://localhost/greet-app-mlabDB';


const Models = require('./models');

const models = Models(mongoURL);

const greetingRoutes = GreetingsRoutes(models);

// const port = 3400;




// models

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
app.post('/', greetingRoutes.generateGreetings);

app.get('/greeted', greetingRoutes.greeted);
app.get('/counter/:name', greetingRoutes.counter);

app.get('/reset', greetingRoutes.resetCounter);


app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



// // const bootstrap = require('bootstrap');
//
// const express = require('express');
//
//
// const exphbs = require('express3-handlebars');
//
// const app = express();
//
// const bodyParser = require('body-parser');
//
// const flash = require('express-flash');
//
// const session = require('express-session');
//
// // const Models = require('./models');
// //
// // const models = Models('mongodb://localhost/greetedList');
//
//
//
// // const port = 3400;
//
// app.set('port', (process.env.PORT || 5000));
//
// const GreetingsRoutes = require('./greetings');
//
// const greetingRoutes = GreetingsRoutes();
//
// // models
//
// //configuring handlebars
// app.engine('handlebars', exphbs({
//   defaultLayout: 'main'
// }));
// app.set('view engine', 'handlebars');
//
// //using static
// app.use(express.static('public'));
//
// //using bodyParser
// app.use(bodyParser.urlencoded({
//     extended: false
//   }))
//   // parse application/json
// app.use(bodyParser.json());
//
// //configuring session
// app.use(session({
//   secret: 'keyboard cat',
//   cookie: {
//     maxAge: 60000 * 30
//   },
//   resave: true,
//   saveUninitialized: true
// }));
// app.use(flash());
//
// //creating a route
// app.get('/', greetingRoutes.index);
// app.post('/', greetingRoutes.generateGreetings);
//
// app.get('/greeted', greetingRoutes.greeted);
// app.get('/counter/:name', greetingRoutes.counter);
//
//
// app.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'));
// });
