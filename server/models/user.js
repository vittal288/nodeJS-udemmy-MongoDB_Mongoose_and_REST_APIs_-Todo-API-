const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
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
    var token = jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();
    console.log(token);
    //pushing genereated token to user's token array which is declared in above schema
    user.tokens.push({access,token});
    
    //to allow promise chaining in server.js, we returning here
    return user.save().then(()=>{
        return token;
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
        decoded = jwt.verify(token,'abc123');
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



var User = mongoose.model('User',UserSchema);
module.exports ={User};