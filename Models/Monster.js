var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MonsterSchema = Schema({
    Name: {type: String, required: true, maxlength: 50},
    InStock: {type: Number, min: 0, required: true},
    Price: {type: Number, min: 0, required: true},
    Habitat: {type: Schema.Types.ObjectId, ref: 'Habitat'},
    Element: {type: Schema.Types.ObjectId, ref: 'Element'},
    Description: {type: String, required: true}
});

MonsterSchema
.virtual('url')
.get(function() {
    return '/catalog/monster' + this._id;
});

module.exports = mongoose.model('Monster', MonsterSchema)