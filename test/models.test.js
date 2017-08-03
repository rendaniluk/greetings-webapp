const assert = require('assert');
const Models = require('../models');
describe('models should be able to', function() {

  it('store all greeted names to greeted', function(done) {

    var models = Models("mongodb://localhost/greeted");

    models.greeted
      .create({
        name: 'greetedList'
      }, function(err) {
        done(err);
      });


  });


})
