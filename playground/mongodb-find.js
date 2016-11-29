//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{

    //to fetcht the docs or records
    // db.collection("Todos").find({
    //         _id:new ObjectID("583c30679a14af2e3cd632e7")
    // }).toArray().then((docs)=>{
    //     console.log(JSON.stringify(docs,undefined,2));
    // },(err)=>{
    //     console.log("Unable to fetch the records",err);
    // });


    // db.collection("Todos").find().count().then((count)=>{
    //     console.log(`Todos Count is :${count}`);
    // },(err)=>{
    //     console.log("undable to fetch",err);
    // });

    db.collection("Users").find({name:"Vittal Kamkar"}).toArray().then((docs)=>{
        console.log("Fetched Users",docs);
    },(err)=>{
         console.log("undable to fetch",err);
    });

    //db.close();
});