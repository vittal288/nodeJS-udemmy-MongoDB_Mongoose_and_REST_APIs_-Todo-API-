var mongoose = require('mongoose');

//configuring promise to mongoose
mongoose.promise = global.promise;
mongoose.connect("mongodb://localhost:27017/TodosApp");


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

//User Modal
//mongoose.model("collectionName",{Schema});
var User = mongoose.model("User",{
    email:{
        type:String,
        minlength:1,
        require:true,
        trim:true
    }
});

//lets try to save some document inside the colletion 

var newTodo = new Todo(
    {
        text:"Cook Dinner"
    }
);

newTodo.save().then((doc)=>{
    console.log("Saved a document",doc);
},(err)=>{
    console.log("Unable to save the document ",err);
})

//console.log("DATE" , new Date().getTime());
var newTodo1 = new Todo({
    text:'    2345    '
});

newTodo1.save().then((doc)=>{
    console.log("Saved a document",doc);
},(err)=>{
    console.log("unable to save the document ", err);
});



var newUser = new User({
    email:"  vittal288@gmail.com"
});

newUser.save().then((doc)=>{
    console.log(JSON.stringify(doc,undefined,2));
},(err)=>{
    console.log("Undable save the data" ,err);
});