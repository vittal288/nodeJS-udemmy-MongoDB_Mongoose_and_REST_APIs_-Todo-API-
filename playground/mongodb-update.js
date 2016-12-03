const {MongoClient,ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    //search MongoDB driver, open the link ,then search METHOD inside the COLLECTION section 
    //http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#findOneAndUpdate
    //Search in google : MongoDB update operators
    //SYNTAX: findOneAndUpdate(filter{},update{},options{},callback())


    db.collection("Users").findOneAndUpdate({
        _id:new ObjectId('583d246b88337f302c7bc7a6')
    },{
        $set:{
            name:"Vittal 123"
        },
        $inc:{
            age:1
        }
    },{
        returnOriginal:false
    }
    ).then((result)=>{
        console.log(result);
    });


    // db.collection('Todos').findOneAndUpdate({
    //     _id:new ObjectId('583c30679a14af2e3cd632e7')
    // },{
    //     $set:{
    //         text:"Have lunch 123"
    //     }        
    // },{
    //     returnOriginal:false
    // }).then((result)=>{
    //     console.log(result);
    // })
    db.close();
});