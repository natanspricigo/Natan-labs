 'use strict';
 const nodemailer = require('nodemailer');

 var fs = require('fs');
 var path = require('path');
 var config;
 const moment = require('moment');

 class MailSender {

     constructor() {
         this.pathConfig = 'config/config.cfg';
         this.__init();
     }

     __init() {
         var self = this;
         this.__readCfg((err, data) => {
             if (!err) {
                 self.config = JSON.parse(data);
             } else {
                 self.config = {
                     "user": {},
                     "email": {}
                 }
             }
             self.createTransport();
             self.verify(() => {
                 console.log("Email ok !")
             }, () => {
                 console.error("Email com problemas")
             });
         });
     }

     __readCfg(onRead) {
         var filePath = path.join(this.pathConfig);
         fs.readFile(filePath, {
             encoding: 'utf-8'
         }, function(err, data) {
             if (!err) {
                 console.log("Propriedades ok ...");
             } else {
                 console.log(err);
             }
             onRead(err, data);
         });
     }

     createTransport() {
         var self = this;
         if (self.config) {
             this.transporter = nodemailer.createTransport({
                 host: self.config.user.host,
                 port: self.config.user.port,
                 secure: self.config.user.secure || false,
                 auth: {
                     user: self.config.user.user,
                     pass: self.config.user.pass
                 }
             });

         };
         return this.transporter;
     }

     verify(onSucess, onError) {
         if (this.transporter) {
             this.transporter.verify(function(error, success) {
                 if (error) {
                     console.log(error);
                     onError(this);
                 } else {
                     onSucess(this);
                 }
             });
         }else{
            onError();
         }
     }

     send(mailOptions) {
         // send mail with defined transport object
         this.transporter.sendMail(mailOptions, (error, info) => {
             if (error) {
                 return console.log(error);
             }
             console.log('Message sent: %s', info.messageId);
             // Preview only available when sending through an Ethereal account
             console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

             // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
             // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
         });
     }

     crateMailOption(listaDestinatarios, titulo, textMessage, htmlMessage, attachments) {
         return {
             from: this.config.email.from,
             to: listaDestinatarios,
             subject: titulo,
             text: textMessage,
             html: htmlMessage,
             attachments: attachments,
             data: moment().format("DD/MM/YYYY  HH:mm")
         };
     }

     createAttachment(filename, path, cid) {
         return {
             filename: filename,
             path: path,
             cid: cid // deve ser unico, como se fosse um ID
         }
     }
 }

 /* setup email data with unicode symbols
 let mailOptions = {
     from: '"Autavi equipamentos naoresponder@autavi.com.br', // sender address
     to: 'natan.spricigo@gmail.com', // list of receivers
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
*/

 module.exports = MailSender;