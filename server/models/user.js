const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
//User Modal
//mongoose.model("collectionName",{Schema});
//To add method to user model , we have to use following mongoose Schema
var UserSchema = new mongoose.Schema({
    email:{
        type:String,
        minlength:1,
        required:true,
        trim:true,
        unique:true,
        //validetor component syntax
        validate:{
            validator:validator.isEmail,
            message:'{VALUE} is not a valid email !'
        }
    },
    password:{
        type:String,
        minlength:6,
        required:true
    },

    /*Mongoose is providing a default feature for token mechanism*/
    tokens:[{
        access:{
            type:String,
            required:true
        }, 
        token:{
            type:String,
            required:true
        }
    }]
});

//convert mongoose user object to JSON object by over riding,TO PICK ONLY ID AND EMAIL 
UserSchema.methods.toJSON = function(){
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject,['_id','email']);
};
/**
 * INSTANCE method
 * var user = this;
 * instance method is responsible a document or records
 */
//here we are not using the arrow function, since it does not support this keyword to point to current user or doc
UserSchema.methods.generateAuthToken = function(){
    
    var user = this;
    var access ='auth';
    //jwt.sign({id},'secretekey')
    var token = jwt.sign({_id:user._id.toHexString(),access},process.env.JWT_SECRETE).toString();   
    //pushing genereated token to user's token array which is declared in above schema
    user.tokens.push({access,token});
    
    //to allow promise chaining in server.js, we returning here
    return user.save().then(()=>{
        return token;
    });
};

//deleting the token once user log out 
//creating an instance method 
UserSchema.methods.removeToken=function(token){
    var user = this;
    //$pull opertor is of mongoose lib and it removes the object from an array if matches the criteria  
    //pulling out token property from token array if it matches the token which accepting as parameter 
    return user.update({
        $pull:{
            tokens:{
                token:token
            }
        }
    });
};



/**
 * MODEL METHOD 
 * var User = this
 * Model method is responsible for entire model or enitre schema
 * 
 */
//To define Model method 
UserSchema.statics.findByToken = function(token){
    //entire Model or schema is pointing to User from this
    var User = this;
    var decoded;

    try{
        decoded = jwt.verify(token,process.env.JWT_SECRETE);
    }catch(err){
        // return new Promise((resolve,reject)=>{
        //     reject();
        // });
        //OR
        //return Promise.reject('some text');
        //OR
        return Promise.reject(err);
    }

    //success care , if found that there is no man in middle attack 
    //if we return here, we can get this response in then block in server.js file 
    return User.findOne({
        _id:decoded._id,
        //to read token from token array from USER SCHEMA 
        'tokens.token':token,
        'tokens.access':'auth'
    });
};

//this method runs before the event which is mentioned,
//currently this method runs before, UserSchema saves to DB 
UserSchema.pre('save',function(next){
    var user = this;
    //checking if the password field is modified, then only we can hash. Otherwise we are wrong stage where we can hash the possowrd which is already hashed and it leads to wrong results 
    if(user.isModified('password')){
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(user.password,salt,(err,hash)=>{
                user.password = hash;
                next();
            });
        });
    }else{
        next();
    }
    
});


UserSchema.statics.findByCredentials = function(email,password){

    //we are making promise here to handle the response in server.js
    return User.findOne({email}).then((user)=>{
        //console.log(JSON.stringify(user,undefined,2));
        if(!user){
            return Promise.reject();
        }
        //for successfull user 
        //bcryptJS will not use promise in its library , sinc we are handling the promise resolve and rjection in server.js so we are implementing here
        return new Promise((resolve,reject)=>{
            //comparing user login password and stored hashed password 
            bcrypt.compare(password,user.password,(err,res)=>{                      
                if(res){
                   resolve(user);                   
                }else{
                    reject();
                }                
            });
        });
    });
};



var User = mongoose.model('User',UserSchema);
module.exports ={User};