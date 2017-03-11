/*
 *   File-name: contacts.js
 *   Author's name: Tony Bogun   
 *   Web-site name: antonybogun2.herokuapp.com
 *   File description: Contains declaration of contacts schema
 */

let mongoose = require('mongoose');

// create a model class for contacts
let contactsSchema = mongoose.Schema({
  Name: String,
  PhoneNumber: String,
  Email: String
}, {
  collection: "contacts"
});

// export contactsSchema class to be available to import
module.exports = mongoose.model('contacts', contactsSchema);