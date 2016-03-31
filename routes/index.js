var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
  		title: 'Express',
  		content:'这是一些扯淡的话'
  	});
});
router.get('/index', function(req, res) {
  res.render('index', { 
  			title: 'Express' ,
  			content: '这是一些扯淡的话',
  			arr:{"yt1":"t2","yt2":"t3"}
	});
});
module.exports = router;//这一行前面加上代码，这样首页（“/”,”/index”）就同时指向了index


// module.exports = router;
