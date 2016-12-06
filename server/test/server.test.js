const expect = require('expect');//assertion library
const request = require('supertest');//to test express router
const {ObjectID} = require('mongodb'); 

const {app} = require('./../server');
const {Todo} = require('./../models/todos');


const todos =[{
    _id:new ObjectID(),
    text:"Sample Todo name"
},{
    _id:new ObjectID(),
    text:"Go to home"
},{
    _id:new ObjectID(),
    text :"Eat Food"
}];

//use unit test life cycle method to make some assumption 
beforeEach((done)=>{
    //remove all the documents from the Todo collection , because in below test suit we are expecting length to be 1
    //Todo.remove({}).then(()=>done());

    Todo.remove({}).then((done)=>{
        return Todo.insertMany(todos);
    }).then(()=> done());

});


describe('POST /todos', ()=>{
    
    it("should create a new todo",(done)=>{
        var text ="Some todo item";    
        request(app)
        .post('/todos')
        .send({text})//suertest component will convert this to JSON object 
        .expect(200)
        //testing the code which comes back 
        .expect((res)=>{
            expect(res.body.text).toBe(text);
        })
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            
            //database test,whether it is inserted or nor,fetch a inserted record and expect it 
            Todo.find({text}).then((todos)=>{
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();

            }).catch((err)=>done(err));
        });        
    });


    //negetive test case scenario
    it("should not create new todo with invalid body data",(done)=>{
        //var text =123;

        request(app)
        .post('/todos')
        .send({})
        .expect(400)               
        .end((err,res)=>{
            if(err){
                return done(err);
            }

            //check DB transanction:it should not create entry into DB
            Todo.find({}).then((todo)=>{
                expect(todo.length).toBe(3);
                //expect(todo[0].text).toBe(text);
                done();
            }).catch((err)=>done(err));
        });
    });
});


describe("GET /todos",()=>{
    
    it("should fetch all toods",(done)=>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
            expect(res.body.todos.length).toBe(3);
        })
        .end(done);
    });   
});


describe("GET /todos/:id",()=>{     
     it("should fetch the document by id",(done)=>{
         request(app)
         .get(`/todos/${todos[0]._id.toHexString()}`)
         .expect(200)
         .expect((res)=>{            
             expect(res.body.todo.text).toBe(todos[0].text);
         })
         .end(done);
    });

    it('should return 404 error if todo is not found',(done)=>{
        var newID = new ObjectID().toHexString();
        request(app)
        .get(`/todos/${newID}`)
        .expect(404)        
        .end(done);
    });


    it('should return 400 for non-ObjectID',(done)=>{
        var newHexId = new ObjectID()+1 || '123abc';
        request(app)
        .get(`/todos/${newHexId}`)
        .expect(404)
        .end(done);
    });
});


describe("DELETE ALL /todos",()=>{
    
    it("should remove all todos",(done)=>{
        request(app)
        .delete('/todos')
        .expect(200)
        .end((err,res)=>{
            if(err){
                return console.log(err)
            }

            Todo.find().then((docs)=>{
                expect(docs.length).toBe(0);
                done();
            }).catch((err) => done(err));
            
        });
    });
});


describe("DELETE /todo/:id",()=>{
    it("should remove todo by id",(done)=>{
        var hexId = todos[0]._id.toHexString();
        request(app)
        .delete(`/todo/${hexId}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo._id).toBe(hexId);
        })
        .end((err,res)=>{
            if(err){
                return console.log(err);
            }

            //Database check , whether data is removed or not check in the data base 
            Todo.find().then((docs)=>{
                expect(docs.length).toBe(todos.length-1);
               // expect(docs._id).toNotExist(hexId);
                done();
            }).catch((err)=>done(err));

            //OR , check the deleted record does not exist into DB
            Todo.findById(hexId).then((doc)=>{
                expect(doc).toNotExist();
                done();
            }).catch((err)=>done(err));
            
        });
    });

    it('should return 404 if todo is not found',(done)=>{
        var _hexId = new ObjectID().toHexString();
        request(app)
        .delete(`/todo/${_hexId}`)
        .expect(404)
        .end(done);
    });

    it("should return 400 for non-ObjectID",(done)=>{
        var _hexid = todos[0]._id.toHexString()+1 || '123abc'
        request(app)
        .delete(`/todo/${_hexid}`)
        .expect(400)
        .end(done);
    });

})
    