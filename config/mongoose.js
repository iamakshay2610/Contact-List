// require library
//const mongoose = require('mongoose');

// connect to database
//mongoose.connect('mongodb://0.0.0.0:27017/contacts_list_db');

// acquire the connection to check if it is successful
/* const db = mongoose.connection;

//error
db.on('error', console.error.bind(console, 'Error connecting to db'));

// un and running then print message
db.once('open', function(){
    console.log('successfully connected to database');
})
*/

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://0.0.0.0:27017/contacts_list_db');
  console.log('successfully connected');

}