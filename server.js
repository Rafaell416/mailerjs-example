'use strict'

const express =  require('express')
const nodemailer = require('nodemailer')
const pug = require('pug')
const app = express()

app.set('view engine', 'pug')

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
        user: 'royal.v98@gmail.com',
        pass: 'la programacion es arte interactivo'
    	}
	})

	let mailOptions = {
    from: req.body.email, // sender address
    to: 'rvillarreal416@gmail.com', // list of receivers
    subject: 'nodemailer test', // Subject line
    text: req.body.msj // plain text body
    
	}

	smtpTrans.sendMail(mailOpts, (err, res) => {
      if (err) {
            res.render('/contact', { title: 'MailerJS', msg: 'Ups, el mensaje no se envió.', err: true, page: '/contact' })
      }else {
          res.render('/contact', { title: 'MailerJS', msg: 'Genial! Mensaje enviado.', err: false, page: '/contact' })
          console.log('sent')
      }   

    })

})



app.listen(8080, (err) => {
	if (err) return console.error('There was an error'), process.exit(1)
	
	console.log('Mailer is listening at port 8080')
})