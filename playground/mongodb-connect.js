//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

//Object Destructuring :pulling out the object without dot notification 
// var user ={name:'Vittal',age:28};
// var {name} = user;
// console.log(name);
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{

    // if(err){
    //     console.log("MongoDB is unable to connect",erro);
    // }else{
    //     console.log("MongoDB is connected successfully");
    // }

    if(err){
        return console.log("MongoDB is unable to connect",err);
    }
    console.log("Connected to MongoDB Server");
    
    //insertion query 
    // db.collection("Todos").insertOne({
    //     name:"Something to do ",
    //     complete:false
    // },(err,results)=>{
    //     if(err){
    //         return console.log("Undable to insert",err)
    //     }
    //     console.log(JSON.stringify(results.ops,undefined,2));
    // });

    // db.collection("Users").insertOne({
    //     name:"Vittal Kamkar",
    //     age:28,
    //     location:"Bangalore India"
    // },(err,results)=>{
    //     if(err){
    //         return console.log("unable to insert an document",err)
    //     }
    //     //console.log(JSON.stringify(results.ops,undefined,2));
    //     console.log(results.ops[0]._id.getTimestamp());
    // });

    db.close();
});