require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
//mongoose.promise = global.promise;
//------------------------------------------------------
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todos');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');
//------------------------------------------------------
var app = express();
//set the middleware to express
app.use(bodyParser.json());

//this is already set in prod environment
console.log("##### PORT" ,process.env.PORT);
const PORT = process.env.PORT;

//Define the resource end points, while making the routes to private: call authenticate fn
app.post('/todos',authenticate,(req,res)=>{   
    var todo = new Todo({
        text:req.body.text,
        _creator:req.user._id
    });

    todo.save().then((doc)=>{
        res.send(doc);
    },(err)=>{
        res.status(400).send(err);
    });

}); 


app.get("/todos",authenticate,(req,res)=>{

    Todo.find({
        _creator:req.user._id
    }).then((todos)=>{
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
app.get('/todos/:id',authenticate,(req,res)=>{
    //res.send(req.params);
    var _id = req.params.id;
    if(! ObjectID.isValid(_id)){        
        return res.status(404).send();
    }

    Todo.findOne({
        _id:_id,
        _creator:req.user._id
    }).then((todo)=>{
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
app.delete('/todos',authenticate,(req,res)=>{

    //console.log("Delete all",req);
    Todo.remove({
        _creator:req.user._id
    }).then((result)=>{
        res.send({
            "result":`Succesfully removed ${result.result.n } (all) records !!!`
        })
    }).catch((err)=>{
        res.status(400).send(err);
    });
});


//remove the doc by id

app.delete('/todo/:id',authenticate,(req,res)=>{
    var _id = req.params.id; 
    if(!ObjectID.isValid){
        return res.status(404).send();
    }

    Todo.findOneAndRemove({
        _id :_id,
        _creator:req.user._id
    }).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((err)=>{
        res.status(400).send(err);
    })
});


//UPDATE
app.patch('/todo/:id',authenticate,(req,res)=>{
    var _id = req.params.id;
    if(!ObjectID.isValid(_id)){
        return res.status(404).send()
    }
    //console.log(_id);
    //pick(utility method from lodash) only required fields from req object to update into DB 
    var body = _.pick(req.body,['text','completed']);


    //double check for boolean value , if the task completed from the user and if sends true then only we have to update completedAt field 
    if(_.isBoolean(body.completed) && body.completed){
        //completedAt is key name from todo model ,
        body.completedAt = new Date().getTime();
    }else{
        body.completed= false;
        body.completedAt = null
    }

    //do database transanction 
    Todo.findOneAndUpdate({
        _id:_id,
        _creator:req.user._id
    },{$set:body},{new:true}).then((todo)=>{
        if(!todo){
            return res.status(404).send()
        }
        res.send({todo})
    },(err)=>{
        res.status(400).send(err);
    })

});






/***USER related routes***/
app.post('/users',(req,res)=>{
    
    var body = _.pick(req.body,['email','password']);//which returns an object 
    //this the document which we are saving into db, which has method called save() 
    var user = new User(body);
    
    //Model method , which should call with capital letter
    //User.findByToken
    //Instance method
    //user.generateAuthToken
   
    user.save().then(()=>{
        return user.generateAuthToken();
        //res.send(user);
    }).then((token)=>{
        res.header('x-auth',token).send(user);
    }).catch((err)=>{
        res.status(400).send(err);
    });

});


//private route
app.get('/users/me',authenticate,(req,res)=>{
    res.send(req.user);
});


//User's Login 
app.post('/users/login',(req,res)=>{

    var body = _.pick(req.body,['email','password']);        
    User.findByCredentials(body.email,body.password).then((user)=>{
        //res.send(user);

        return user.generateAuthToken().then((token)=>{
            res.header('x-auth',token).send(user);
        });

    }).catch((err)=>{
        res.status(400).send()
    })

});

//user logout ,once we log out from the application , we have to delete the dynamically generated token everytime from user 
app.delete('/users/me/token',authenticate,(req,res)=>{

    //add a method to instance of user , because this is releated to each user 
    //req.user object is appended in middleware/authentication.js in line no 16 and 17
    req.user.removeToken(req.token).then(()=>{
        res.status(200).send()
    },(err)=>{
        res.status(400).send();
    });
});




app.listen(PORT,()=>{
    console.log(`Server is up on port ${PORT}`);
});

module.exports ={app};

