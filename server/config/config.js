var env = process.env.NODE_ENV || 'development';
console.log('ENV ####' ,env);

if(env === 'development'){
    process.env.PORT =3000;
    process.env.MONGODB_URI ='mongodb://localhost:27017/TodosApp';
}else if(env === 'test'){    
    process.env.PORT=3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodosAppTest';
}else if(env === 'prod'){
    process.env.PORT= process.env.PORT || 3000;
    process.env.MONGODB_URI = 'mongodb://admin-vittal288:welcome123@ds127928.mlab.com:27928/todoapp-vittal288';
}