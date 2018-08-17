const pug = require('pug');

var EmailsBuilder = {
	__emailSender: undefined,
	setEmailSender: (emailSender) => {
		this.__emailSender = emailSender;
	},
	EMAIL_CLIENTE: (_destinatarios) => {
		const destinatarios = _destinatarios;
		const titulo = 'Olá avicultor ✔';
		const text = 'Muito obrigado pelo interesse, aposto que iniciaremos uma conversa muito próspera sobre a melhoria do seu lote de aves. https://autavi.com.br/';

		// para renderizar a imagem
		const attachments = [
			this.__emailSender.createAttachment("logo.png", "templateEmail/images/logo.png", "logomarca_autavi"),
			this.__emailSender.createAttachment("facebook.png", "templateEmail/images/facebook.png", "facebook")
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

		return this.__emailSender.crateMailOption(destinatarios, titulo, text, html, attachments);
	},

	EMAIL_AVULSO: (email) => {
		return this.__emailSender.crateMailOption(email.destinatarios, email.assunto, email.texto, email.texto);
	}
}


module.exports.EmailsBuilder = EmailsBuilder;