var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var MonsterInstance = require('./MonsterInstance')

var MonsterSchema = Schema({
    Name: {type: String, required: true, maxlength: 50},
    Price: {type: Number, min: 0, required: true},
    Habitat: {type: Schema.Types.ObjectId, ref: 'Habitat', required: true},
    Element: {type: Schema.Types.ObjectId, ref: 'Element', required: true},
    Description: {type: String, required: true}
});

MonsterSchema
.virtual('url')
.get(function() {
    return '/catalog/monster/' + this._id;
});

MonsterSchema
.virtual('InStock')
.get(function(){
    let inStock = MonsterInstance.find({ 'Species' : this._id}).count()
    return inStock;
})

module.exports = mongoose.model('Monster', MonsterSchema)