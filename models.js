const mongoose = require('mongoose');
module.exports = function(mongoUrl) {
  mongoose.connect(mongoUrl);

  const greeted = mongoose.model('greeted', {
    name: String
  });

  const rendani = mongoose.model('rendani',{
    
  })

  return {
    greeted
  };
console.log(greeted);
};
