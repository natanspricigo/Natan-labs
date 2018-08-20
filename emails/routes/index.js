var express = require('express');
var router = express.Router();
const dbm = require('../scripts/DatabaseService');
const dataMananger = new dbm.DatabaseMananger();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Emails',
		qtdEmails: dataMananger.count(dataMananger.tableNames.EMAILS),
		qtdContatos: dataMananger.count(dataMananger.tableNames.DESTINATARIOS)
	});
});

router.get('/listaDeEmails', function(req, res, next) {
	res.render('listaEmails', {
		emails: dataMananger.getAll(dataMananger.tableNames.EMAILS)
	});
});

router.get('/novoEmail', function(req, res, next) {
	res.render('formEmail', {title: 'Novo email'});
});

module.exports = router;
