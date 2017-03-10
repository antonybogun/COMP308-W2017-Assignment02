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

// define the book model
let contact = require('../models/contacts');

/* GET / - display contact list */
router.get('/', (req, res, next) => {

  // find all contacts in the contacts collection
  contact.find((err, contacts) => {
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

//  GET /add -  render the Contact Details page in order to add a new contact
router.get('/add', (req, res, next) => {

  // render an empty form to add a new book
  res.render('contacts/details', {
    title: "Add a new contact",
    contacts: ''
  });

});

// POST /add - process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  // create a new book object with attributes from form
  let newContact = contact({
    "Name": req.body.name,
    "PhoneNumber": req.body.phoneNumber,
    "Email": req.body.email
  });

// add a book document to the collection
  contact.create(newContact, (err, contact) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect('/contacts');
    }
  });
});

module.exports = router;