/*
 * GET home page.
 */
exports.index = function(req, res) {
	var sessionset = "";
		res.render('index', {
			title : 'Welcome',
			session1 : sessionset
		});
};