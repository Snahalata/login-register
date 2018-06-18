const mongoose = require('../config/database');

 const userSchema = mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
    }
});

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;