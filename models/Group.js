/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var findorcreate = require('mongoose-findorcreate');

var groupSchema = new Schema({
    groupme_group_id: {
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
    users:[{
        ref: 'User',
        type: Schema.ObjectId
    }],
    bot:{
        ref: 'Bot',
        type: Schema.ObjectId,
        default: null
    }
});
module.exports = groupSchema.plugin(findorcreate);

mongoose.model('Group', groupSchema);