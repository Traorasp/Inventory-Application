var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ElementSchema = Schema({
    Name: {type: String, required: true, maxlength: 50},
    Weakness: [{type: Schema.Types.ObjectId, ref: 'Element'}],
    Strengths: [{type: Schema.Types.ObjectId, ref: 'Element'}],
    Description: {type: String, required: true}
});

ElementSchema
.virtual('url')
.get(function() {
    return '/catalog/element/' + this._id;
});

module.exports = mongoose.model('Element', ElementSchema)