const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');
const {User} = require('./../server/models/user');



//Todo.remove({}): which removes all documents from a collection and which returns only no of counts
//Todo.findOneAndRemove({}):which remove matched document or else return null and post success remove which notifies the user  that which records is removed
//Todo.findByIdAndRemove({}):removes the match record with specific id and returns the removed document to user 





// Todo.remove({}).then((results)=>{
//     console.log(results);
// });


// Todo.findOneAndRemove('584567924b24d40f1941638e').then((doc)=>{
//     console.log(doc);
// });

//OR

// Todo.findOneAndRemove({text:"something to do"}).then((doc)=>{
//     console.log(doc);
// });

//OR

// Todo.findOneAndRemove({_id:"584568ab4b24d40f19416390"}).then((doc)=>{
//     console.log(doc);
// });

Todo.findByIdAndRemove({
    _id:ObjectId('584568ab4b24d40f19416390')
}).then((doc)=>{
    console.log(doc);
});
