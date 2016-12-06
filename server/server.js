const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
//------------------------------------------------------
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todos');
var {User} = require('./models/user');
//------------------------------------------------------
var app = express();
//set the middleware to express
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

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

    Todo.find().then((todos)=>{
        res.send({
        todos,
        process:"done",
        customCode:111
    });
    },(err)=>{
        res.status(400).send(err);
    });
});

//fetch todos by id
app.get('/todos/:id',(req,res)=>{
    //res.send(req.params);
    var id = req.params.id;
    if(! ObjectID.isValid(id)){        
        return res.status(404).send();
    }

    Todo.findById(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((err)=>{
        res.status(400).send(err);
    });

});

//remove all docs
/*
Todo.findOneAndRemove({anyKey:val});delete and returns the deleted doc
Todo.findByIdAndRemove({_id:val});delete and returns the deleted doc
OR
Todo.findByIdAndRemove('id in string');delete and returns the deleted doc
Todo.remove({});delete all docs 
*/
app.delete('/todos',(req,res)=>{

    //console.log("Delete all",req);
    Todo.remove({}).then((result)=>{
        res.send({
            "result":`Succesfully removed ${result.result.n } (all) records !!!`
        })
    }).catch((err)=>{
        res.status(400).send(err);
    });
});


//remove the doc by id

app.delete('/todo/:id',(req,res)=>{
    var _id = req.params.id; 
    if(!ObjectID.isValid){
        return res.status(404).send();
    }

    Todo.findByIdAndRemove({
        _id :_id
    }).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((err)=>{
        res.status(400).send(err);
    })
});



app.listen(PORT,()=>{
    console.log(`Server is up on port ${PORT}`);
});

module.exports ={app};

