var mongoose = require('mongoose');

//configuring promise to mongoose
mongoose.promise = global.promise;
//var MongoDbURL = 'mongodb://172.21.0.0/16:27017/TodosApp';
mongoose.connect(process.env.MONGODB_URI);
//mongoose.connect('mongodb://admin-vittal288:welcome123@ds127928.mlab.com:27928/todoapp-vittal288');

module.exprts={mongoose};

/*
 * process.env.NODE_ENV ='production'-->the app which runs on Heroku
 * process.env.NODE_ENV = 'development' -->the app which runs from locally
 * process.env.NODE_ENV = 'test' -->the app which runs from mocha 
 */