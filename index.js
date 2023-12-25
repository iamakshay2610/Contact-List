const express = require('express');
const path = require('path');
const port = 8002;

// require mongoose for database connection
const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'))

// Middleware1
/* app.use(function(req,res,next){
    console.log('Middleware1 called');
    next();
});

app.use(function(req,res,next){
    req.myName = 'Arpan';
    next();
})
*/

var contactList = [
    {
        name: "Akshay",
        phone: "9009080444"
    },
    {
        name: "Ranjay",
        phone: "7888327752"
    },
    {
        name: "Poonam",
        phone: "9060254137"
    }
]


/*app.get('/', async function(req,res){
    // console.log(__dirname);
   // return res.render('home');
   const contacts = await Contact.find({}, function(err, contacts){
    if(err){
        console.log(err);
        return;
    }

    return res.render('home',{
        title:'My Contact List',
        contact_list: contacts

   })


   
});
});*/

app.get('/', async function(req,res){
    try {
        const contacts = await Contact.find({});
        return res.render('home',{
            title:'My Contact List',
            contact_list: contacts
    
       })
        
        
    } catch (error) {
        console.log(err);
        return;
        
    }
})

app.get('/practice', function(req,res){
    return res.render('practice',{
        title: "Let's Play with EJS"
    })
});

app.post('/create_contact', async function(req,res){
   /* contactList.push({
        name: req.body.name,
        phone: req.body.phone
    });*/
    //contactList.push(req.body);

   // return res.redirect('/');
   try {
    const contact = await Contact.create({
        name: req.body.name,
        phone: req.body.phone
       })
       
        console.log(contact)
        
        return res.redirect('back')
       
    
   } catch (error) {
    console.log(err);
    return res.redirect('back')
    
   }
   /*Contact.create({
    name: req.body.name,
    phone: req.body.phone
   }, function(err, newContact){
    if(err){
        console.log(err);
        return;
    }
    console.log(newContact);
    return res.redirect('back')
   })*/
   //return res.redirect('back');
});

// for deleting a contact
/*
app.get('/delete-contact', function(req,res){
    //console.log(req.params)
    console.log(req.query);
    //let phone = req.params.phone;
    let phone = req.query.phone;
    let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    if(contactIndex != -1){
        contactList.splice(contactIndex, 1);

    }
    return res.redirect('back');
})*/


app.get('/delete-contact', async function(req,res){
    
    try {
        
        const deleteContact = await Contact.findByIdAndDelete(req.query.id);
        
        console.log(deleteContact);
        
        
    }
    catch (error) {
        if(error){
            console.log(error);
            return;
        }
        
  
    }

    return res.redirect('back')
})


app.listen(port, function(err){
    if(err){console.log(err)}
    console.log('Express app is running on port:', port)
})