const expect = require('expect');//assertion library
const request = require('supertest');//to test express router

const {app} = require('./../server');
const {Todo} = require('./../models/todos');


const todos =[{
    text:"Sample Todo name"
},{
    text:"Go to home"
},{
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
            Todo.find({text:"Some todo item"}).then((todos)=>{
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
        .end(done());
    });
});
    