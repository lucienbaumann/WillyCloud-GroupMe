/**
 * Module dependencies
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var botSchema = new Schema({
    groupme_group_id: {
        type: String,
        unique: true,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: true
    },
    users:[{
        ref: 'User',
        type: Schema.ObjectId
    }],

    bots:[{
        ref: 'Bot',
        type: Schema.ObjectId
    }]
});

module.exports = mongoose.model('Bot', botSchema);