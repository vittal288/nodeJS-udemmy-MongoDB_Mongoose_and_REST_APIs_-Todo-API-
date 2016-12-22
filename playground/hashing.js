/*
 * we are not using this module in our app , since we have to write lot of code
 */
const {SHA256} = require('crypto-js');  

const jwt = require('jsonwebtoken');//which has to method sign and verify

const bcrypt = require('bcryptjs');



//hasing password 

var password ="abc123";
//bcrypt.genSalt('no of rounds which algorithm can run that no of time to generate a key which is used for SALTING')
//SALTING is method of adding random no to a password which is used for hashing to avoide password hacking 
// bcrypt.genSalt(10,(err,salt)=>{
//     bcrypt.hash(password,salt,(err,hash)=>{
//         console.log(hash);
//     });
// });

var hashedPassword ='$2a$10$s8t2av2g0hEwciYn823Gku0ysYmqBpXCtqiFyTXR3XBHziHCn.hXe';

bcrypt.compare(password,hashedPassword,(err,res)=>{
    console.log(res);
});





//generaring JWT tokem 
// var data ={
//     id:5
// };
// //jwt.sign(data,key) which accepts the data and secrete key, hash it and returns the token
// var token = jwt.sign(data,'someSecretekey123');
// console.log(token);
// //jwt.verify(token,key) ,it opposite to sign method, which accpepts the token and secrete key and make sure that the data was not manupulated
// var decoded = jwt.verify(token,'someSecretekey123');
// console.log("Decoded" ,decoded);




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