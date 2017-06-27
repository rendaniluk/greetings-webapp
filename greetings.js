module.exports = function() { //module exports function
  const greetedNames = []; //empty array for unique greeted names

  const greetedNamesCounts = {}; //empty to store counts of all greeted names object
  const index = function(req, res) { //index function for greetings route

    var name = req.body.name;

    if (!name) { //condition to make sure the substr is difined
      var name = req.body.name;
    } else {
      var name = (req.body.name).substr(0, 1).toUpperCase() + '' + (req.body
        .name).substr(1).toLowerCase(); //parameter
    }

    var foundGreeting = greetedNames.find(function(currentGreeting) { //finding if the name already exists
      return currentGreeting === name;
    })
    if (name && !foundGreeting) { //marking sure that the added names does'nt repeat
      greetedNames.push(name) //pushing the name that does'nt exists in greetedNames
    }

    if (greetedNamesCounts[name] === undefined) { //mapping the names with the number it was greeted
      greetedNamesCounts[name] = 0;
    }

    greetedNamesCounts[name]++;
    const currentGreetingCounter = greetedNamesCounts[name];
    if (!name) {
      res.render('pages/index', {
        GreetMe: name
      })
    } else {
      res.render('pages/index', {
        GreetMe: "Hello, " + name
      })
    }
  }

  const greeted = function(req, res) { //function for greeted route
    res.render('pages/greeted', {
      Greeted: greetedNames
    })
  }
  const counter = function(req, res) { //function for couter route
    const name = req.params.name;
    const currentGreetingCounter = greetedNamesCounts[name];
    const greetingCounterMsg = 'Hello, ' + name + ' has been greeted ' +
      currentGreetingCounter + ' times'
    res.render('pages/counter', {
      counterMsg: greetingCounterMsg
    })
  }

  return { //returning object literal
    index,
    greeted,
    counter
  }

}
