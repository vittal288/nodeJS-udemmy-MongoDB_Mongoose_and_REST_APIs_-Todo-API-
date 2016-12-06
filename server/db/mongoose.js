var mongoose = require('mongoose');

//configuring promise to mongoose
mongoose.promise = global.promise;
//var MongoDbURL = 'mongodb://172.21.0.0/16:27017/TodosApp';
mongoose.connect("mongodb://localhost:27017/TodosApp");

module.exprts={mongoose};