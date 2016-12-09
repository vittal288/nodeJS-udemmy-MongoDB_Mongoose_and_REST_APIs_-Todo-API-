const {SHA256} = require('crypto-js');//we are not using this module in our app , since we have to write lot of code

const jwt = require('jsonwebtoken');//which has to method sign and verify


var data ={
    id:5
};
//jwt.sign(data,key) which accepts the data and secrete key, hash it and returns the token
var token = jwt.sign(data,'someSecretekey123');
console.log(token);
//jwt.verify(token,key) ,it opposite to sign method, which accpepts the token and secrete key and make sure that the data was not manupulated
var decoded = jwt.verify(token,'someSecretekey123');
console.log("Decoded" ,decoded);




// //THE below concept is called JWT(JSON WEB TOKEN)

// var message ="I am user number 3";
// var hash = SHA256(message).toString();


// console.log(`Message : ${message}`);
// console.log(`HASH ${hash}`);

// var data={
//     id:4
// };

// var token={
//     data,
//     hash:SHA256(JSON.stringify(data)+"somesecete").toString()
// }

// /*
//     HACKING-->
//     man in the middle attack ,
//     hacker is trying to hack from client place by chaning the data but unfortunately he could not able to access token 
//     because there is SECRETE key with us and which is resides in the SERVER 
// */
// token.data.id =5
// token.hash=SHA256(JSON.stringify(token.data)).toString();

// //adding some secrete key to hashed string is called as salting
// var resultHash=SHA256(JSON.stringify(token.data)+'somesecete').toString();

// if(token.hash === resultHash){
//     console.log("Data was not manupulated");
// }else{
//     console.log("Data was changed and do not trust");
// }