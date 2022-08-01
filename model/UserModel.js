const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['basic','admin','supervisor'],
        default: 'basic'
    },
    accessToken:{
        type:String,
    }
})

module.exports =  mongoose.model('User', userSchema);