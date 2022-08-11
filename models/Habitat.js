var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var HabitatSchema = Schema({
    Name: {type: String, required: true, maxlength: 50},
    Description: {type: String, required: true}
});

HabitatSchema
.virtual('url')
.get(function() {
    return '/catalog/habitat/' + this._id;
});

module.exports = mongoose.model('Habitat', HabitatSchema)