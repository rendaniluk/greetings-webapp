module.exports = function() { //module exports function
    const greetedNames = []; //empty array for unique greeted names

    const greetedNamesCounts = {}; //empty to store counts of all greeted names object

    const index = function(req, res) { //index function for greetings route
        const name = req.params.name; //parameter


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

        res.render('greetings/index')
    }
    const greeted = function(req, res) { //function for greeted route
        res.render('greetings/greeted', {
            Greeted: greetedNames
        })
    }
    const counter = function(req, res) { //function for couter route
        const name = req.params.name;
        const currentGreetingCounter = greetedNamesCounts[name];
        res.send('Hello, ' + name + ' has been greeted ' + currentGreetingCounter + ' times')
    }

    return { //returning object literal
        index,
        greeted,
        counter
    }

}
