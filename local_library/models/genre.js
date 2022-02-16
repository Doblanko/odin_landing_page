const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 100 },
});

// virtual for this genre instance URL
GenreSchema.virtual('url').get(function () {
  return `/catalog/genre/${this._id}`;
});

// export the model
module.exports = mongoose.model('Genre', GenreSchema);
