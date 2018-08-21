 'use strict';
 var express = require('express');
 var ROUTER = express.Router();
 var MailSender = require('../scripts/MailSender');
 const mailSender = new MailSender();

 const Utilitarios = require('../scripts/Utilitarios');
 
 const EmailsBuilder = require('../scripts/builders/EmailsBuilder').EmailsBuilder;
 EmailsBuilder.setEmailSender(mailSender);

 const SendMailService = require('../scripts/service/SendMailService');
 const sendMailService = new SendMailService(mailSender);
 

 ROUTER.get('/', function(req, res, next) {

 	const mailOptions = EmailsBuilder.EMAIL_CLIENTE("natan.spricigo@gmail.com");
 	sendMailService.dispararEmail(mailOptions);
 	res.redirect("/");
 });


 ROUTER.post('/enviar', function(req, res, next) {

 	var params = Utilitarios.http.objectFromBody(req.body, "email");

 	const mailOptions = EmailsBuilder.EMAIL_AVULSO(params.email);
 	sendMailService.dispararEmail(mailOptions);
 	res.redirect("/");
 });


 ROUTER.get('/api/status', function(req, res, next) {
 	res.json("ok");
 });


 module.exports = ROUTER;