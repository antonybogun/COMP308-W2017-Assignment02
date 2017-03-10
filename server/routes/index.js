/*
 *   File-name: index.js
 *   Author's name: Tony Bogun   
 *   Web-site name: antonybogun2.herokuapp.com
 *   File description: Handles routes to web-pages
 */

let express = require('express');
let nodemailer = require('nodemailer');
let router = express.Router();

// Global Route Variables
let currentDate = new Date();
currentDate = currentDate.toLocaleTimeString();

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tbportfoliomessage@gmail.com',
        pass: 'qwertyasdfgh'
    }
});

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
    res.render('content/index', {
        title: 'Home',
        skills: "Web Developer &#x25CF; .NET Developer &#x25CF; Software Engineer",
        description: "I am a responsible, proactive, and fast-learning IT professional with over 2 years’ hands-on experience and strong educational background in Software Engineering, who is passionate about ambitious projects, robust development, and high-quality software"
    });
});

/* GET about page. */
router.get('/about', (req, res, next) => {
    res.render('content/about', {
        title: 'About'
    });
});

/* GET projects page. */
router.get('/projects', (req, res, next) => {
    res.render('content/projects', {
        title: 'Projects'
    });
});

/* GET services page. */
router.get('/services', (req, res, next) => {
    res.render('content/services', {
        title: 'Services'
    });
});

/* GET contact page. */
router.get('/contact', (req, res, next) => {
    res.render('content/contact', {
        title: 'Contact',
        messageSent: false
    });
});

/* GET contact page. */
router.post('/contact', (req, res, next) => {

    let name = req.body.inputName;
    let emailAddr = req.body.inputEmail;
    let message = req.body.inputMessage;

    let fromParam = "\"" + req.body.inputName + "\" < " + req.body.inputEmail + " > ";
    let htmlParam = "<b>Name: </b>" + name + "<br/>" + "<b>Email: </b>" + emailAddr + "<br/>" + "<b>Message: </b>" + message;

    let mailOptions = {
        from: fromParam, // sender address
        to: 'antonybogun@gmail.com', // list of receivers
        subject: 'Tony Bogun\'s Portfolio Message', // Subject line
        html: htmlParam
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.render('content/contact', {
                title: 'Contact',
                messageSent: true,
                error: true
            })
        }
        // Email sent
        else {
            res.render('content/contact', {
                title: 'Contact',
                messageSent: true,
                error: false
            })
        }
    });
});


module.exports = router;