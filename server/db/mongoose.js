var mongoose = require('mongoose');

//configuring promise to mongoose
mongoose.promise = global.promise;
mongoose.connect("mongodb://localhost:27017/TodosApp");

module.exprts={mongoose};