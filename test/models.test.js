// const assert = require('assert');
// const Models = require('../models');
// describe('models should be able to', function() {
//
//   var models = Models("mongodb://localhost/greeted-test");
//
//   beforeEach(function(done) {
//     models.greeted.remove({}, function(err) {
//       done(err);
//     })
//   })
//
//   it('store all greeted names to greeted', function(done) {
//
//     var greetedNamesData = {
//       name: 'greetedList'
//     };
//     models.greeted
//       .create(greetedNamesData, function(err) {
//         done(err);
//         models.greeted.find({
//           name: 'greetedList'
//         }, function(err, greeteds) {
//           assert.equal(1, greeted.length);
//           done(err)
//         })
//       });
//
//
//   });
//
//
// })
const assert = require('assert');
const Models = require('../models');
describe('models should be able to', function() {

<<<<<<< HEAD
  var models = Models("'mongodb://localhost/greet-app-mlabDB'");
=======
  var models = Models("mongodb://localhost/greet-app-mlabDB");
>>>>>>> 841d9e2f124a8164b6f100f98a74528e8dc39477

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
        done(err);


        models.greeted.find({
          name: 'greetedList'
        }, function(err, greeteds) {
          assert.equal(1, greeted.length);
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

})
