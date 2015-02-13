
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.TrackSymptoms = function(req, res){
	  res.render('TrackSymptoms', { title: 'Track symptoms' });
	};