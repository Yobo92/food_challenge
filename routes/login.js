var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var Provider = require('../models/Providers');

router.post('/', function(req, res){
    
    Provider.findOne({email: req.header("email")}, function (err, provider){
        if(!provider) {
            req.session.Id= null;
            res.json({auth: false});
        }
            else {
                bcrypt.compare(req.header("password"), provider.password, function (err, result) {
                    if (result) {
                        req.session.Id = provider.id;
                        res.json({auth: true});
                    }
                    else {
                        req.session.Id = null;
                        res.json({auth: false});       
                    }
                })
            }
        })
});

module.exports = router;
