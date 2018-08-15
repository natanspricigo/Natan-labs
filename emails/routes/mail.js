 'use strict';
 var express = require('express');
 var router = express.Router();
 const nodemailer = require('nodemailer');
 const pug = require('pug');

 /* GET users listing. */
 router.get('/', function(req, res, next) {


 	let transporter = nodemailer.createTransport({
 		host: 'smtp.umbler.com',
 		port: 587,
 		secure: false,
 		auth: {
 			user: "",
 			pass: ""
 		}
 	});

 	// verify connection configuration
 	transporter.verify(function(error, success) {
 		if (error) {
 			console.log(error);
 		} else {
 			console.log('Servidor de Email ok !');
 		}
 	});

 	// setup email data with unicode symbols
 	let mailOptions = {
 		from: '"Autavi equipamentos naoresponder@autavi.com.br', // sender address
 		to: 'natan.spricigo@gmail.com, souza.car@hotmail.com, natan_spricigo@hotmail.com', // list of receivers
 		subject: 'Olá avicultor ✔', // Subject line
 		text: 'Muito obrigado pelo interesse, aposto que iniciaremos uma conversa muito próspera sobre a melhoria do seu lote de aves. https://autavi.com.br/', // plain text body
 		html: pug.renderFile('templateEmail/email.pug', {
 			name: 'Avicultor',
 			autavi: {
 				nome: "Autavi equipamentos",
 				telefone: "49 9 9940 7837",
 				email: "vendas@autavi.com.br",
 				endereco: "Rua General Osório, 706, Centro | Xanxerê - SC",
 			}
 		}),
 		attachments: [{
 			filename: 'logo.png',
 			path: 'templateEmail/images/logo.png',
 			cid: 'logomarca_autavi' //same cid value as in the html img src
 		}, {
 			filename: 'facebook.png',
 			path: 'templateEmail/images/facebook.png',
 			cid: 'facebook' //same cid value as in the html img src
 		}]
 	};



 	// send mail with defined transport object
 	transporter.sendMail(mailOptions, (error, info) => {
 		if (error) {
 			return console.log(error);
 		}
 		console.log('Message sent: %s', info.messageId);
 		// Preview only available when sending through an Ethereal account
 		console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

 		// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
 		// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
 	});
 	res.redirect("/");
 });

 module.exports = router;