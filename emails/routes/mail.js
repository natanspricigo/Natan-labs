 'use strict';
 var express = require('express');
 var ROUTER = express.Router();
 var MailSender = require('../scripts/MailSender');
 const pug = require('pug');
 const dbm = require('../scripts/DatabaseService');
 const Utilitarios = require('../scripts/Utilitarios');

 const dataMananger = new dbm.DatabaseMananger();
 const mailSender = new MailSender();

 ROUTER.get('/', function(req, res, next) {

 	const destinatarios = "natan.spricigo@gmail.com";
 	const titulo = 'Olá avicultor ✔';
 	const text = 'Muito obrigado pelo interesse, aposto que iniciaremos uma conversa muito próspera sobre a melhoria do seu lote de aves. https://autavi.com.br/';

 	// para renderizar a imagem
 	const attachments = [
 		mailSender.createAttachment("logo.png", "templateEmail/images/logo.png", "logomarca_autavi"),
 		mailSender.createAttachment("facebook.png", "templateEmail/images/facebook.png", "facebook")
 	];

 	const html = pug.renderFile('templateEmail/email.pug', {
 		name: 'Avicultor',
 		autavi: {
 			nome: "Autavi equipamentos",
 			telefone: "49 9 9940 7837",
 			email: "vendas@autavi.com.br",
 			endereco: "Rua General Osório, 706, Centro | Xanxerê - SC",
 		}
 	});

 	const mailOptions = mailSender.crateMailOption(destinatarios, titulo, text, html, attachments);

 	//raliza o envio
 	mailSender.send(mailOptions);

 	dataMananger.insert(dataMananger.tableNames.EMAILS, mailOptions);
 	dataMananger.insert(dataMananger.tableNames.DESTINATARIOS, destinatarios.split(", "));

 	res.redirect("/");
 });

 module.exports = ROUTER;