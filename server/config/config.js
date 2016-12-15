var env = process.env.NODE_ENV || 'development';
console.log('ENV ####' ,env);


if(env === 'development' || env==='test' || env==='prod'){
    var config = require('./config.json');   
    var envConfig = config[env];//config.test or config["test"]   
    Object.keys(envConfig).forEach((key)=>{        
        process.env[key]= envConfig[key];
    });
}
// if(env === 'development'){
//     process.env.PORT =3000;
//     process.env.MONGODB_URI ='mongodb://localhost:27017/TodosApp';
// }else if(env === 'test'){    
//     process.env.PORT=3000;
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/TodosAppTest';
// }else if(env === 'prod'){
//     /*
//         Why I am using PROD block here means , heroku is not allowed to install mlab in heroku console so I have installed Mlab in its parent website 
//         and reffering the URL here
//     */
//     process.env.PORT= process.env.PORT || 3000;
//     process.env.MONGODB_URI = 'mongodb://admin-vittal288:welcome123@ds127928.mlab.com:27928/todoapp-vittal288';
// }