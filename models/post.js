const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    body : {
        type : String,
        required : true
    },
    

}, {
    timestamps: true
});

module.exports = mongoose.model ('Post', postSchema);