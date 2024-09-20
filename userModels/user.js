const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/userinfo`)

const userShema=mongoose.Schema({
    image:String,
    user:String,
    email:String
})

module.exports=mongoose.model('user',userShema)