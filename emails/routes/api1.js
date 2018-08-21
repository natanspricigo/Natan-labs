 'use strict';
 var express = require('express');
 var ROUTER = express.Router();
 var MailSender = require('../scripts/MailSender');
 const dbm = require('../scripts/DatabaseService');
 const dataMananger = new dbm.DatabaseMananger();

 ROUTER.get('/versao', function(req, res, next) {
 	res.json("1.0");
 });

 ROUTER.get('/emailsEnviados', function(req, res, next) {
 	res.json(dataMananger.getAll(dataMananger.tableNames.EMAILS));
 });

  ROUTER.get('/contatos', function(req, res, next) {
 	res.json(dataMananger.getAll(dataMananger.tableNames.DESTINATARIOS));
 });

 module.exports = ROUTER;