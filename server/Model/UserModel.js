const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: {type : String , require : true},
    email: { type : String , require :true},
    password: {type : String , require : true},
    userType: {type: String, default: "user" }
});

const User = mongoose.model("user" , UserSchema); 
module.exports = User ;