const moogoose = require('mongoose');

async function connect (){
    try{
        await moogoose.connect('mongodb://localhost:/tasks_db',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('connect db successfully!');
    }catch(err){
        console.log('connect db fail!');
    }
}


module.exports = { connect}