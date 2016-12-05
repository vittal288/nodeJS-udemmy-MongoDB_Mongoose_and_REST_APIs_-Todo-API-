const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');
const {User} = require('./../server/models/user');

//var _id = '584504db4b24d40f1941638d121';

// if(! ObjectId.isValid(_id)){
//     console.log("Id is not valid");
// }

// //which returns an array 
// Todo.find({
//     _id:_id
// }).then((todos)=>{
//     console.log("Todos",todos);
// },(err)=>{
//     console.log(err);
// });


// //which returns an object:Use when sure about fetching a single object instead of an array 
// Todo.findOne({
//     _id:_id
// }).then((todo)=>{
//     console.log("Todo",todo);
// },(err)=>{
//     console.log(err);
// });

//which is also returns an object 
// Todo.findById(_id).then((todo)=>{
//     if(!todo){
//         return console.log("Id is not found");
//     }
//     console.log("Todo",todo);
// }).catch((err)=> console.log(err));


//Users

User.findById('584504db4b24d40f1941638d').then((user)=>{
    if(! user){
        return console.log('Unable to fetch the user');
    }
    console.log('User',user);
},(err)=>{
    console.log('Unable to fetcht the id',err);
}).catch((err)=> console.log(err));
