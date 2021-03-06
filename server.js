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

app.post('/contact', (req, res) => {

	let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '',
        pass: ''
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
          res.render('index', { txtName: 'Message Not Sent :('})
      }
      else {
          //console.log('Message %s sent: %s', info.messageId, info.response)
          console.log('Message Sent Sucessfully :)')
          res.render('index')
      }
  })

})



app.listen(8080, (err) => {
	if (err) return console.error('There was an error'), process.exit(1)
	
	console.log('Mailer is listening at port 8080')
})
