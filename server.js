'use strict'

const express =  require('express')
const nodemailer = require('nodemailer')
const pug = require('pug')
const bodyParser = require('body-parser')
const app = express()

app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/contact', (req, res) => {
	res.render('index')
})

app.get('/', (req, res) => {
	res.send('Go to  /contact   to view the contact form')
})

app.post('/contact',urlencodedParser, (req, res) => {

	let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'royal.v98@gmail.com',
        pass: 'la programacion es arte interactivo'
    	}
	})

	let mailOptions = {
    //from: req.body.email, // sender address
    to: 'rvillarreal416@gmail.com', // list of receivers
    subject: 'Tienes un correo de: ' + req.body.email, // Subject line
    text: req.body.msj  // plain text body
    
	}

	transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error)
    }
    console.log('Message %s sent: %s', info.messageId, info.response)
	})

})



app.listen(8080, (err) => {
	if (err) return console.error('There was an error'), process.exit(1)
	
	console.log('Mailer is listening at port 8080')
})