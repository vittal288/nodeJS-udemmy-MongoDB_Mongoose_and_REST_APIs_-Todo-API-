const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');
const {Todo} = require('./../../models/todos');
const {User} = require('./../../models/user');
//----------------------------------------------------


var userOneId  = new ObjectID();
var userTwoId = new ObjectID();
const users =[{
        _id:userOneId,
        email:'vittal@example.com',
        password:'userOnePass',
        tokens:[{
            access:'auth',
            token:jwt.sign({_id:userOneId,access:'auth'},process.env.JWT_SECRETE).toString()
        }]
    },
    {
        _id:userTwoId,
        email:'sample@exmaple.com',  
        password:'userTwoPass',
        tokens:[{
            access:'auth',
            token:jwt.sign({_id:userTwoId,access:'auth'},process.env.JWT_SECRETE).toString()
        }]
    }];

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo',
  _creator:userOneId
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333,
  _creator:userTwoId
},{
  _id: new ObjectID(),
  text: 'Second test todo Item',
  completed: true,
  completedAt: 333,
  _creator:userTwoId
}];

//Saving to DB
const populateTodos =(done)=>{
    //remove all the documents from the Todo collection , because in below test suit we are expecting length to be 1
    //Todo.remove({}).then(()=>done());

    Todo.remove({}).then((done)=>{
        return Todo.insertMany(todos);
    }).then(()=> done());
};


const populateUsers = (done)=>{
    //the reason for saving in this way is that, we have to save passwords after hashing
    User.remove({}).then(()=>{
         var userOne = new User(users[0]).save();//promise 1
         var userTwo = new User(users[1]).save();//Promise 2

         return Promise.all([userOne,userTwo]);
    }).then(()=>done());
};
module.exports ={todos,populateTodos,users,populateUsers};