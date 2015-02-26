/**
 * New node file
 */
exports.taxanomy = function(req, res){
	var sessionset;
	if (req.session.fname == undefined) {
		var sessionset="";
	}
	else{
		var sessionset="set";
	}
	
  res.render('taxanomy', { title: 'Taxanomy',
	  session1:sessionset	});
};