const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  
  description: {
    type: String,
  },
  
  
})

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;