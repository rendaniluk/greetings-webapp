const mongoose = require('mongoose');
module.exports = function(mongoUrl) {
  mongoose.connect(mongoUrl);

  const greeted = mongoose.model('greeted', {
    name: String
  });

  return {
    greeted
  };
console.log(greeted);
};
