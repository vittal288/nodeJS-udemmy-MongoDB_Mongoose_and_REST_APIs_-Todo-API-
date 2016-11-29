//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    
    //deleteMany
    // db.collection("Todos").deleteMany({text:"Have Lunch"}).then((result)=>{
    //     console.log(result);
    // });

    //deleteOne
    // db.collection("Todos").deleteOne({text:"Eat Lunch"}).then((result)=>{
    //     console.log(result);
    // });
    
    //findOneAndDelete
    // db.collection("Todos").findOneAndDelete({completed:true}).then((results)=>{
    //     console.log(results);
    // });

    // db.collection("Users").deleteMany({name:"Vittal Kamkar"}).then((result)=>{
    //     console.log(result);
    // });

    db.collection("Users").findOneAndDelete({name:"Sandesh"}).then((result)=>{
        console.log(result);
    });
    //db.close();
});