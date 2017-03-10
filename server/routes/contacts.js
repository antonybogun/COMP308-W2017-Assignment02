/*
 *   File-name: contacts.js
 *   Author's name: Tony Bogun   
 *   Web-site name: antonybogun2.herokuapp.com
 *   File description: Handles routes to contact-list-related webpages
 */

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the contact model
let contact = require('../models/contacts');

// function  to check if the user is authorized
function requireAuth(req, res, next) {
  //check if the user is logged in
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
};

/* GET / - display contact list */
router.get('/', requireAuth, (req, res, next) => {

  // find all contacts in the contacts collection
  contact.find().sort({"Name":1}).find((err, contacts) => {
    if (err) {
      return console.error(err);
    } else {
      res.render('contacts/index', {
        title: 'Contact List',
        contacts: contacts
      });
    }
  });
});

//  GET /add -  render the Contact Details page in order to add a new Contact
router.get('/add', requireAuth, (req, res, next) => {

  // render an empty form to add a new contact
  res.render('contacts/details', {
    title: "Add a new contact",
    contacts: ''
  });

});

// POST /add - process the Contact Details page and create a new Contact
router.post('/add', requireAuth, (req, res, next) => {

  // create a new contact object with attributes from form
  let newContact = contact({
    "Name": req.body.name,
    "PhoneNumber": req.body.phoneNumber,
    "Email": req.body.email
  });

// add a contact document to the collection
  contact.create(newContact, (err, contact) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect('/contacts');
    }
  });
});

// GET / - the Contact Details page in order to edit an existing Contact
router.get('/:id', requireAuth, (req, res, next) => {

    // get a reference to the id from the url
    let id = mongoose.Types.ObjectId.createFromHexString(req.params.id);

    // find one contact by its id
    contact.findById(id, (err, contacts) => {
      if (err) {
        console.log(err);
        res.end(error);
      } else {
        // render the contact details view
        res.render('contacts/details', {
          title: 'Contact Details',
          contacts: contacts
        });
      }
    });
});

// POST / - process the information passed from the details form and update the document
router.post('/:id', requireAuth, (req, res, next) => {

  // get a reference to the id from the url
  let id = req.params.id;

  // create an updated contact object with attributes from form
  let updatedContact = contact({
    "_id": id,
    "Name": req.body.name,
    "PhoneNumber": req.body.phoneNumber,
    "Email": req.body.email
  });

  // update a contact in the collection
  contact.update({
    _id: id
  }, updatedContact, requireAuth, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the contact List
      res.redirect('/contacts');
    }
  });
});

// GET /delete - process the delete by contact id
router.get('/delete/:id', requireAuth, (req, res, next) => {

  // get a reference to the id from the url
  let id = req.params.id;

  contact.remove({
    _id: id
  }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the contact list
      res.redirect('/contacts');
    }
  });
});

module.exports = router;