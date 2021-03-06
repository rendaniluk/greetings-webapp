const assert = require('assert');
const Models = require('../models');
describe('models should be able to', function() {

  var models = Models("mongodb://localhost/greet-app-mlabDB");

  beforeEach(function(done) {
    models.greeted.remove({}, function(err) {
      done(err);
    })
  })

  it('store all greeted names to greeted', function(done) {

    var greetedNamesData = {
      name: 'greetedList'
    };
    models.greeted
      .create(greetedNamesData, function(err) {
        models.greeted.find({
          name: 'greetedList'
        }, function(err, greeteds) {
          assert.equal(1, greeteds.length);
          done(err)
        })
      });
  });

  it('should prevent duplicate Names', function(done) {
    var greetedNamesData = {
      name: 'greetedList'
    };
    models.greeted
      .create(greetedNamesData, function(err) {
        var greetedNamesData = {
          name: 'greetedList'
        };
        models.greeted
          .create(greetedNamesData, function(err) {
            assert.ok(err, 'Should give error for duplicates')
            done();
          });
      });
  });

});
