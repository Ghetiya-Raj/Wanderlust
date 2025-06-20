const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportlocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type:String,
        required: true
    }
});

userSchema.plugin(passportlocalMongoose);       //use pbkdf2 hashing algorithm                  //autometacally generate username and password in hashform

module.exports = mongoose.model("User",userSchema);