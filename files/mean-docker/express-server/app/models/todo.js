var mongoose = require('mongoose');

// Define the schema
Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        type: String,
        default: ''
    },

    pwd: {
        type: Number,
        default: '000000'
    },

    balance: {
        type: Number,
        default: ''
    },

    createdate: {
        type: Date,
        default: '2019/5/26'
    },
});

module.exports = mongoose.model('Todo',UserSchema);
