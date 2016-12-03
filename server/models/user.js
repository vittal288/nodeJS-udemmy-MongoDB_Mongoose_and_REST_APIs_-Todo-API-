var mongoose = require('mongoose');
//User Modal
//mongoose.model("collectionName",{Schema});
var User = mongoose.model("User",{
    email:{
        type:String,
        minlength:1,
        required:true,
        trim:true
    }
});


module.exports ={User};