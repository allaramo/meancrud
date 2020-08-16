const express = require('express');
var router = express.Router();
var ObjectID = require('mongoose').Types.ObjectId;

var { Contact } = require('../models/contact');

//listing all contacts
router.get('/', (req, res) => {
    Contact.find((err, docs) => {
        if(!err) { res.send(docs);}
        else { console.log('Error in retrieving Contacts: ' + JSON.stringify(err, undefined, 2)); }
    });
});

//consulting a single contact
router.get('/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('No record found with the id: $(req.params.id)');
    
    Contact.findById(req.params.id, (err,doc)=>{
        if(!err) { res.send(doc);}
        else { console.log('Error while retrieving Contact: ' + JSON.stringify(err,undefined,2));}
    });
});

//inserting a new contact
router.post('/',(req,res)=>{
    var contact = new Contact({
        name: req.body.name,
        phone1: req.body.phone1,
        phone2: req.body.phone2,
        phone3: req.body.phone3,
        address: req.body.address
    });
    contact.save((err,doc)=>{
        if (!err) {res.send(doc);}
        else { console.log('Error while saving Contact: ' + JSON.stringify(err,undefined,2));}
    });
});

//update Contact
router.put('/:id', (req,res) =>{
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('No record found with the id: $(req.params.id)');

    var contact = {
        name: req.body.name,
        phone1: req.body.phone1,
        phone2: req.body.phone2,
        phone3: req.body.phone3,
        address: req.body.address
    };

    Contact.findByIdAndUpdate(req.params.id, {$set:contact},{new: true}, (err, doc) =>{
        if(!err) { res.send(doc);}
        else { console.log('Error while updating the Contact: ' + JSON.stringify(err,undefined,2));}
    });
});

//delete Contact
router.delete('/:id', (req,res)=>{
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('No record found with the id: $(req.params.id)');
    
        Contact.findByIdAndRemove(req.params.id, (err,doc)=> {
            if(!err) {res.send(doc);}
            else { console.log('Error while deleting the Contact: ' + JSON.stringify(err,undefined,2));}
        });
});

module.exports = router;