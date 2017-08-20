const mongoose = require('mongoose');
module.exports = function(mongoUrl) {
  mongoose.Promise = global.Promise;
  mongoose.connect(mongoUrl);

  const greetedSchema = mongoose.Schema({
    name: String,
    count: Number
  });

  greetedSchema.index({
    name: 1
  }, {
    unique: true
  });

  const greeted = mongoose.model('greeted', greetedSchema);

  return {
    greeted
  };
  // console.log(greeted);
};


//
// const mongoose = require('mongoose');
// module.exports = function(mongoURL) {
//   mongoose.Promise = global.Promise;
//   mongoose.connect(mongoURL);
//
//   const greetedSchema = mongoose.Schema({
//     name: String
//   });
//
//   greetedSchema.index({
//     name: 1
//   }, {
//     unique: true
//   });
//
//   const greeted = mongoose.model('greeted', greetedSchema);
//
//   return {
//     greeted
//   };
//   // console.log(greeted);
// };
//
// // const mongoose = require('mongoose');
// // module.exports = function(mongoUrl) {
// //   mongoose.connect(mongoUrl);
// //
// //   const greeted = mongoose.model('greeted', {
// //     name: String
// //   });
// //
// //   return {
// //     greeted
// //   };
// // console.log(greeted);
// // };
