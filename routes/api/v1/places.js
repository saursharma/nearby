/**
 * Created by saurabhsharma on 09/07/16.
 */

var express = require('express');
var http = require('http');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send("You are in no man's land. It can be dangerous to stay here son.");
});

/* GET users listing. */
router.get('/all', function(req, res, next) {
  connection.query('SELECT * FROM `locations`', function (error, results, fields) {
    if (error) {
      console.error('error fetching: ' + error.stack);
      return;
    }
    var data = [];
    for(count in results) {
      data.push(results[count]);
    }

    var response = {
      'data': data
    }
    res.send(response);
  });
});


/* GET users listing. */
router.get('/nearest', function(req, res, next) {
  // Uses Haversine formula to calculate distance and find nearest place.
  var query = 'SELECT *, (6371 * acos (cos ( radians('+
      parseFloat(req.param('lat'))+') ) * cos( radians(latitude) ) * cos( radians(longitude) - radians('+
      parseFloat(req.param('long'))+')) + sin( radians('+
      req.param('lat')+') ) * sin( radians( latitude ) ))) AS distance FROM locations WHERE confidence > 90 ORDER BY distance ASC LIMIT 1;';

  connection.query(query,
      function (error, results, fields) {
    if (error) {
      console.error('error fetching: ' + error.stack);
      return;
    }
    var data = [];
    for(count in results) {
      data.push(results[count]);
    }

    var response = {
      'data': data
    }
    res.send(response);
  });
});


module.exports = router;
