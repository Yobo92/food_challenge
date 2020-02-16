var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

var Provider = require('../models/Providers');

const request = require('request');
const TAPIKey = "CFcHIxY9q69ZAPZL2JQ9AdARTv0jXns3";



/* GET route. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', function(req, res, next) {
    var hash = bcrypt.hashSync(req.header("password"), 8);
    var addr = encodeURIComponent(req.header("address"));
    
    const TAPI_EXPLORER = `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(req.header("address"))}.json?countrySet=US&key=${TAPIKey}`;
    var lon;
    var obj;
function pushData() {
    var lat;
    let proPromise = new Promise((resolve, reject) => {

        request(TAPI_EXPLORER, function (err, response, body) {
            obj = JSON.parse(body);
            resolve(obj)
        });  
    });
  proPromise.then((obj) => {
    var provider = new Provider({
        email: req.header("email"),
        name: req.header("name"),
        password: hash,
        description: req.header("description"),
        isBusiness: req.header("isBusiness"),
        address: req.header("address"),
        city: obj.results[0].address.localName,
        lat: obj.results[0].position.lat,
        lon: obj.results[0].position.lon
        
    });

    provider.save(function (err, provider) {
        (err) ? res.json({PId: '1'}) : res.json({PId: provider._id});
    })
    

 })
};

pushData();
});

router.post('/update', function(req, res, next) {
    
    const updateQuery = {};

  if (req.header("name")) {
    updateQuery.name = req.header("name");
  } 
  if (req.header("email")) {
    updateQuery.email = req.header("email");
  } 
  if (req.header("description")) {
    updateQuery.description = req.header("description");
  } 
  if (req.header("isBusiness")) {
    updateQuery.isBusiness = req.header("isBusiness");
  } 
  if (req.header("address")) {
    updateQuery.address = req.header("address");
  } 
  if (req.header("lat")) {
    updateQuery.lat = req.header("lat");
  } 
  if (req.header("lon")) {
    updateQuery.lon = req.header("lon");
  } 

  Provider.findByIdAndUpdate({_id: req.session.Id}, {$set: updateQuery}, {new: true}, (err, data)=> {
      (err) ? res.json({PId: '1'}) : res.json({PId: data._id});
  });

});

module.exports = router;

/*


*/
