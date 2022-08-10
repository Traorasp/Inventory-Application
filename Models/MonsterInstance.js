var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MonsterInstanceSchema = Schema({
    Name: {type: String, required: true, maxlength: 50},
    Age: {type: Number, min: 0, required: true},
    Species: {type: Schema.Types.ObjectId, ref: 'Monster'}
});

MonsterInstanceSchema
.virtual('url')
.get(function() {
    return '/catalog/monsterinstance' + this._id;
});

module.exports = mongoose.model('MonsterInstance', MonsterInstanceSchema)