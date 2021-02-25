var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/train', function(req, res, next) {
  res.render('train', { title: 'Express' });
});



// get signal
router.post('/signal-mask', (req,res,next) => {

});
module.exports = router;
