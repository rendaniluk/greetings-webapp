const assert = require('assert');
const Models = require('../models');
describe('models should be able to', function() {

  var models = Models("mongodb://localhost/greeted-test");

  beforeEach(function(done) {
    models.greeted.remove({}, function(err){
      done(err);
    })
  })

  it('store all greeted names to greeted', function(done) {

    var greetedNamesData = {
      name: 'greetedList'
    };
    models.greeted
      .create(greetedNamesData, function(err) {
        done(err);


        models.greeted.find({name: 'greetedList'}, function(err, greeteds){
          assert.equal(1, greeted.length);
          done(err)
        })
      });


  });


})
