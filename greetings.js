/////////////////module exports function/////////////////////////////
module.exports = function(models) {

  ////////////////count people greeted function//////////
    countUpdates = function(cb) {
      models.greeted.count({})
        .exec(function(err, greeteds) {
          if (err) {
            return next(err);
          }
          cb(null, greeteds);
        });
    }
  //////////////////////oOo////////////////////////////

  ///////////reset counter and remove names from dbs/////////////
    const resetCounter = function(req, res, next) {
      models.greeted.remove({}, function(err, greeteds) {
        if (err) {
          return next(err)
        } else {
          // res.render('pages/index')
          res.redirect('/')
        }
      });
    }
  /////////////////////////oOo/////////////////////////////////////

    /////////////////////////////////index function to render form///////////
    const index = function(req, res, next) {
      countUpdates(function(err, greeteds) {
        if (err) {
          return next(err);
        } else {
          res.render('pages/index', {
            numberOfgreetings: greeteds
          })
        }

      })
    }
    //////////////////////////////////////oOo////////////////////////////////


    //////generateGreetings function to generate greetings and render it/////
    const generateGreetings = function(req, res, next) {

      // var name = req.body.name;
      var radioBtn = req.body.radioBtn;

      var name = {
        name: req.body.name
      };

      //condition to make sure the substr is difined
      if (!name.name) {
        name.name = req.body.name;
      } else {
        name.name = (req.body.name).substr(0, 1).toUpperCase() + '' + (req.body
            .name)
          .substr(1).toLowerCase();
      }

      if ((!name || !name.name) || !radioBtn) {
        req.flash('error', 'Please enter name and select radio button!')
        res.redirect('/')
      } else {
        models.greeted.create(name, function(err, results) {
          if (err) {
            if (err.code === 11000) {
              if (radioBtn === 'Hello, ') {
                req.flash('Welcome', 'Welcome back again!')
              } else if (radioBtn === 'Ndaa/Aa, ') {
                req.flash('Welcome', 'No tanganedzwa hafhu!')
              } else if (radioBtn === 'Zvirisei, ') {
                req.flash('Welcome', 'Titambire madzoka!')
              }
            } else {
              return next(err)
            }
          }
          countUpdates(function(err, greeteds) {
            if (err) {
              return next(err);
            } else {
              res.render('pages/index', {
                GreetMe: radioBtn + name.name,
                numberOfgreetings: greeteds
              })
            }

          })
        });
      }

    }
    ////////////////////////////////////////oOo/////////////////////////

    //////greeted function to render the list of greeted people//////
    const greeted = function(req, res, next) {

      models.greeted.find({}, function(err, greeteds) {
        if (err) {
          return next(err);
        }
        if (greeteds.length === 0) {
          req.flash('error', 'No names found in database')
          res.redirect('/')
        } else {
          res.render('pages/greeted', {
            greeteds
          })
        }
      })
    }

//////////////////////////////////oOo////////////////////////////


////counter function to render how many times the person was greeted///////
  const counter = function(req, res) {

    // const name = req.params.name;
    var name = {
      name: req.params.name
    };
     const greetingCounterMsg = "Site Under Maintanance come later"
    // const currentGreetingCounter = greetedNamesCounts[name];

    // const greetingCounterMsg = 'Hello, ' + name.name + ' has been greeted ' +
    //   currentGreetingCounter + ' times'
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
    counter,
    resetCounter
  }
  /////////////////////////////////////oOo/////////////////////////////////////

}
///////////////////////////////////////oOo////////////////////////////////////






//
// /////////////////module exports function/////////////////////////////
// module.exports = function(models) {
//
//     //empty array for unique greeted names
//     const greetedNames = [];
//     //empty to store counts of all greeted names object
//     const greetedNamesCounts = {};
//
//     /////////////////////////////////index function to render form///////////
//     const index = function(req, res) {
//         var numberOfgreetings = greetedNames.length;
//         res.render('pages/index', {
//           numberOfgreetings: numberOfgreetings
//         })
//       }
//       //////////////////////////////////////oOo////////////////////////////////
//
//
//     //////generateGreetings function to generate greetings and render it/////
//     const generateGreetings = function(req, res, next) {
//
//         // var name = req.body.name;
//         var radioBtn = req.body.radioBtn;
//
//         var name = {
//           name: req.body.name
//         };
//
//         //condition to make sure the substr is difined
//         if (!name.name) {
//           name.name = req.body.name;
//         } else {
//           name.name = (req.body.name).substr(0, 1).toUpperCase() + '' + (req.body
//               .name)
//             .substr(1).toLowerCase();
//         }
//
//
//         //finding if the name already exists\\
//         // var foundGreeting = greetedNames.find(function(currentGreeting) {
//         //   return currentGreeting === name;
//         // })
//
//         //marking sure that the added names does'nt repeat
//         // if (name && !foundGreeting) {
//         //   //pushing the name that does'nt exists in greetedNames
//         //   greetedNames.push(name)
//         // }
//         if (!name || !name.name) {
//           req.flash('error', 'Please enter name and select radio button!')
//           res.redirect('/')
//         } else {
//           models.greeted.create(name, function(err, results) {
//             if (err) {
//               if (err.code === 11000) {
//                 req.flash('error', 'Welcome back again!')
//               } else {
//                 return next(err)
//               }
//             }
//             greetedNames.push(name.name);
//             res.render('pages/index', {
//               GreetMe: radioBtn + name.name,
//               numberOfgreetings: numberOfgreetings
//             })
//           })
//         }
//         //mapping the names with the number it was greeted
//         if (greetedNamesCounts[name.name] === undefined) {
//           greetedNamesCounts[name.name] = 0;
//         }
//         //counting
//         greetedNamesCounts[name.name]++;
//
//         //getting the length of an array
//         var numberOfgreetings = greetedNames.length;
//
//         //checking if the text field has a name and radio button is selected
//         // if (!name || !radioBtn) {
//         //   req.flash('error', 'Please enter name and select radio button!')
//         //   res.redirect('/')
//         // } else {
//         //   //render greetings massage and count
//         //   res.render('pages/index', {
//         //     GreetMe: radioBtn + name,
//         //     numberOfgreetings: numberOfgreetings
//         //   })
//         // }
//       }
//       ////////////////////////////////////////oOo/////////////////////////
//
//     //////greeted function to render the list of greeted people//////
//     const greeted = function(req, res, next) {
//
//       models.greeted.find({}, function(err, greeteds) {
//         if (err) {
//           return next(err);
//         }
//         res.render('pages/greeted', {
//           greeteds
//         })
//       })
//
//
//
//       // if (greetedNames.length == 0) {
//       //   req.flash('error',
//       //     'No greeted people yet, put name, choose language and click greet'
//       //   )
//       //   res.redirect('/')
//       // } else {
//       //   res.render('pages/greeted', {
//       //     Greeted: greetedNames
//       //   })
//       // }
//     }
//
//     //////////////////////////////////oOo////////////////////////////
//
//     ////counter function to render how many times the person was greeted///////
//     const counter = function(req, res) {
//         const name = req.params.name;
//         const currentGreetingCounter = greetedNamesCounts[name];
//         // console.log(name);
//         const greetingCounterMsg = 'Hello, ' + name + ' has been greeted ' +
//           currentGreetingCounter + ' times'
//         res.render('pages/counter', {
//           counterMsg: greetingCounterMsg
//         })
//       }
//       ///////////////////////////////oOo///////////////////////////////////////
//
//     ///////////////return all function as object lateral////////////////////////
//     return {
//       index,
//       generateGreetings,
//       greeted,
//       counter
//     }
//     /////////////////////////////////////oOo/////////////////////////////////////
//
//   }
//   ///////////////////////////////////////oOo////////////////////////////////////
//
//
// // /////////////////module exports function/////////////////////////////
// // module.exports = function() {
// //
// //     //empty array for unique greeted names
// //     const greetedNames = [];
// //     //empty to store counts of all greeted names object
// //     const greetedNamesCounts = {};
// //
// // /////////////////////////////////index function to render form///////////
// //     const index = function(req, res) {
// //         var numberOfgreetings = greetedNames.length;
// //         res.render('pages/index', {
// //           numberOfgreetings: numberOfgreetings
// //         })
// //       }
// // //////////////////////////////////////oOo////////////////////////////////
// //
// //
// // /////generateGreetings function to generate greetings and render it/////
// //     const generateGreetings = function(req, res) {
// //
// //         var name = req.body.name;
// //         var radioBtn = req.body.radioBtn;
// //
// //         //condition to make sure the substr is difined
// //         if (!name) {
// //           name = req.body.name;
// //         } else {
// //           name = (req.body.name).substr(0, 1).toUpperCase() + '' + (req.body.name)
// //             .substr(1).toLowerCase();
// //         }
// //
// //
// //         //finding if the name already exists
// //         var foundGreeting = greetedNames.find(function(currentGreeting) {
// //           return currentGreeting === name;
// //         })
// //
// //         //marking sure that the added names does'nt repeat
// //         if (name && !foundGreeting) {
// //           //pushing the name that does'nt exists in greetedNames
// //           greetedNames.push(name)
// //         }
// //
// //         //mapping the names with the number it was greeted
// //         if (greetedNamesCounts[name] === undefined) {
// //           greetedNamesCounts[name] = 0;
// //         }
// //         //counting
// //         greetedNamesCounts[name]++;
// //
// //         //getting the length of an array
// //         var numberOfgreetings = greetedNames.length;
// //
// //         //checking if the text field has a name and radio button is selected
// //         if (!name || !radioBtn) {
// //           req.flash('error', 'Please enter name and select radio button!')
// //           res.redirect('/')
// //         } else {
// //           //render greetings massage and count
// //           res.render('pages/index', {
// //             GreetMe: radioBtn + name,
// //             numberOfgreetings: numberOfgreetings
// //           })
// //         }
// //       }
// // ////////////////////////////////////////oOo/////////////////////////
// //
// // //////greeted function to render the list of greeted people//////
// //       const greeted = function(req, res) {
// //         if(greetedNames.length==0){
// //           req.flash('error','No greeted people yet, put name, choose language and click greet')
// //           res.redirect('/')
// //         }else {
// //           res.render('pages/greeted', {
// //             Greeted: greetedNames
// //           })
// //         }
// //       }
// // //////////////////////////////////oOo////////////////////////////
// //
// // ////counter function to render how many times the person was greeted///////
// //     const counter = function(req, res) {
// //         const name = req.params.name;
// //         const currentGreetingCounter = greetedNamesCounts[name];
// //         const greetingCounterMsg = 'Hello, ' + name + ' has been greeted ' +
// //           currentGreetingCounter + ' times'
// //         res.render('pages/counter', {
// //           counterMsg: greetingCounterMsg
// //         })
// //       }
// // ///////////////////////////////oOo///////////////////////////////////////
// //
// // ///////////////return all function as object lateral////////////////////////
// //     return {
// //       index,
// //       generateGreetings,
// //       greeted,
// //       counter
// //     }
// // /////////////////////////////////////oOo/////////////////////////////////////
// // }
// // ////////////////////////////////oOo////////////////////////////////////////3
