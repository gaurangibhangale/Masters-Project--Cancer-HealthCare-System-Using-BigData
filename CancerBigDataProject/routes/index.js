/*
 * GET home page.
 */

exports.index = function(req, res) {
	var sessionset;
	if (req.session.fname == undefined) {
		var sessionset="";
	}
	else{
		var sessionset="set";
		console.log("inside no admin");
	}
		res.render('index', {
			title : 'Welcome',
			session1 : sessionset
		});
};

/*exports.index = function(req, res) {
	if (req.session.fname == undefined) {
		var sessionset = "";
		res.render('index', {
			title : 'Welcome',
			session1 : sessionset
		});
	}else {
		var sessionset = "set";
		res.render('index', {
			title : 'Welcome',
			session1 : sessionset
		});
	}
};*/

