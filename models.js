const mongoose = require('mongoose');
module.exports = function(mongoURL) {
  mongoose.connect(mongoURL);

  const greetedSchema = mongoose.Schema({
    name: String
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
