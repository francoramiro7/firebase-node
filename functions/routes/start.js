/**
 * Created by franc on 05/10/2017.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('start', { title: 'Adivinador!' });
});

router.post('/', function(req, res) {
    res.send("Subido");
});

module.exports = router;