const express = require('express');
const bodyParser = require('body-parser');
//------------------------------------------------------
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todos');
var {User} = require('./models/user');
//------------------------------------------------------
var app = express();
//set the middleware to express
app.use(bodyParser.json());

//Define the resource end points
app.post('/todos',(req,res)=>{   
    var todo = new Todo({
        text:req.body.text
    });

    todo.save().then((doc)=>{
        res.send(doc);
    },(err)=>{
        res.status(400).send(err);
    })

}); 


app.get("/todos",(req,res)=>{

    Todo.find().then((docs)=>{
        res.send({
        docs,
        process:"done",
        customCode:111
    });
    },(err)=>{
        res.status(400).send(err);
    });
});

app.listen(3000,()=>{
    console.log("Server is up on port 3000");
});

module.exports ={app};

