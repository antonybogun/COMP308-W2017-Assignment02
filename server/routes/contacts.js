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

module.exports = router;