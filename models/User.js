/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var findorcreate = require('mongoose-findorcreate');

var userSchema = new Schema({
    groupme_user_id: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: false
    },
    groups:[{
        ref: 'Group',
        type: Schema.ObjectId
    }],
    bots:[{
        ref: 'Bot',
        type: Schema.ObjectId
    }]
});

userSchema.plugin(findorcreate);
module.exports = mongoose.model('User', userSchema);