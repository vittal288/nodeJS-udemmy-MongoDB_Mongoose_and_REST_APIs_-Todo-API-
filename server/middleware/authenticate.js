var {User} = require('./../models/user');

//defining middleware(1,2,3) function to authenticate all the routes
var authenticate = (req,res,next)=>{
     //reading the token which is sent from client  
    var token = req.header('x-auth');
    //findByToken is model method 
    User.findByToken(token).then((user)=>{
        //if token is valid but could not able to find the user info
        if(!user){
            //res.status(401).send()
            //OR
            return Promise.reject();
        }

       req.user =user;
       req.token = token;
       next();//if we not call this method here ,then it won't execute the next line of code ,from where the authenticate method is invoked for example /users/me
        
    }).catch((err)=>{ // catch block will execute for invalid token 
        //401, authentication is failed 
        res.status(401).send();
    });
};


module.exports = {authenticate};