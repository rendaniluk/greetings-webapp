/////////////////module exports function/////////////////////////////
module.exports = function() {

  //empty array for unique greeted names
  const greetedNames = [];
console.log(greetedNames);
  //empty to store counts of all greeted names object
  const greetedNamesCounts = {};

  /////////////////////////////////index function to render form///////////
  const index = function(req, res) {
    var numberOfgreetings = greetedNames.length;
    res.render('pages/index', {
      numberOfgreetings: numberOfgreetings
    })
  }
  //////////////////////////////////////oOo////////////////////////////////


  //////generateGreetings function to generate greetings and render it/////
  const generateGreetings = function(req, res) {

    var name = req.body.name;
    var radioBtn = req.body.radioBtn;

    //condition to make sure the substr is difined
    if (!name) {
      name = req.body.name;
    } else {
      name = (req.body.name).substr(0, 1).toUpperCase() + '' + (req.body.name)
        .substr(1).toLowerCase();
    }


    //finding if the name already exists
    var foundGreeting = greetedNames.find(function(currentGreeting) {
      return currentGreeting === name;
    })

    //marking sure that the added names does'nt repeat
    if (name && !foundGreeting) {
      //pushing the name that does'nt exists in greetedNames
      greetedNames.push(name)
    }

    //mapping the names with the number it was greeted
    if (greetedNamesCounts[name] === undefined) {
      greetedNamesCounts[name] = 0;
    }
    //counting
    greetedNamesCounts[name]++;

    //getting the length of an array
    var numberOfgreetings = greetedNames.length;

    //checking if the text field has a name and radio button is selected
    if (!name || !radioBtn) {
      req.flash('error', 'Please enter name and select radio button!')
      res.redirect('/')
    } else {
      //render greetings massage and count
      res.render('pages/index', {
        GreetMe: radioBtn + name,
        numberOfgreetings: numberOfgreetings
      })
    }
  }
  ////////////////////////////////////////oOo/////////////////////////

  //////greeted function to render the list of greeted people//////
  const greeted = function(req, res) {
    if(greetedNames.length==0){
      req.flash('error','No greeted people yet, put name, choose language and click greet')
      res.redirect('/')
    }else {
      res.render('pages/greeted', {
        Greeted: greetedNames
      })
    }
  }
  //////////////////////////////////oOo////////////////////////////

  ////counter function to render how many times the person was greeted///////
  const counter = function(req, res) {
    const name = req.params.name;
    const currentGreetingCounter = greetedNamesCounts[name];
    const greetingCounterMsg = 'Hello, ' + name + ' has been greeted ' +
      currentGreetingCounter + ' times'
    res.render('pages/counter', {
      counterMsg: greetingCounterMsg
    })
  }
  ///////////////////////////////oOo///////////////////////////////////////

  ///////////////return all function as object lateral////////////////////////
  return {
    index,
    generateGreetings,
    greeted,
    counter
  }
/////////////////////////////////////oOo/////////////////////////////////////

}
///////////////////////////////////////oOo////////////////////////////////////
