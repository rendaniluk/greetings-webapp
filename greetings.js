//module exports
module.exports = function() {
    //empty arrays for unique greeted names and repeating names
    const greetedNames = [];
    const greetingsCounts = [];
    //empty to store counts of all greeted names object
    const greetedNamesCounts = {};
    //index function for greetings route
    const index = function(req, res) {
        //parameter
        const name = req.params.name;
        // finding if the name already exists
        var foundGreeting = greetedNames.find(function(currentGreeting) {
            return currentGreeting === name;
        })
        //marking sure that the added names does'nt repeat
        if (name && !foundGreeting) {
            //pushing the name that does'nt exists in greetedNames
            greetedNames.push(name)
        }
        //pushing all names that exists and non existing ones
        greetingsCounts.push(name)
        //mapping the names with the number it was greeted
        if (greetedNamesCounts[name] === undefined) {
            greetedNamesCounts[name] = 0;
        }

        greetedNamesCounts[name]++;
        const currentGreetingCounter = greetedNamesCounts[name];

        res.send('hello, ' + name)
    }
//function for greeted route
    const greeted = function(req, res) {
        res.render('greetings/greeted', {
            Greeted: greetedNames
        })
    }
//function for couter route
    const counter = function(req, res) {
        const name = req.params.name;
        if (greetedNamesCounts[name] === undefined) {
            greetedNamesCounts[name] = 0;
        }
        // greetedNamesCounts[name]++;

        const currentGreetingCounter = greetedNamesCounts[name];
        res.send('Hello, ' + name + ' has been greeted ' + currentGreetingCounter + ' times')
    }

    return {
        index,
        greeted,
        counter
    }

}
