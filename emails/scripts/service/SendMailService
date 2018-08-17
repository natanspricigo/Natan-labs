 const dbm = require('../DatabaseService');
 const dataMananger = new dbm.DatabaseMananger();

 class MailSenderService {
 	constructor(mailSender) {
 		this.mailSender = mailSender;
 	}

 	dispararEmail(mailOptions) {
 		console.log(mailOptions);
 		this.mailSender.send(mailOptions);
 		this.__salvar(mailOptions);
 	}

 	__salvar(mailOptions) {
 		dataMananger.insert(dataMananger.tableNames.EMAILS, mailOptions);

 		dataMananger.insert(dataMananger.tableNames.DESTINATARIOS, mailOptions.to.split(", "));
 	}
 }



 module.exports = MailSenderService;