var mongoose = require('mongoose');

//Modeling the collection 
//Modeling means which object shold be there in the collection , structuring the collection 
var Todo = mongoose.model("Todo",{
    text:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    completedAt:{
        type:Number,
        default:null
    }
});

module.exports ={Todo};