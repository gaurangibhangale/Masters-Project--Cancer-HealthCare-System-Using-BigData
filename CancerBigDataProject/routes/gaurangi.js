/**
 * New node file
 */
mysqldb = require('./Connection.js');

exports.addSymptoms = function(req, res){
//	if(req.session.fname == undefined){
//		res.redirect("/");
//	}
//	else {
//		
		var input = JSON.parse(JSON.stringify(req.body));
		var data = {
				cancer_type : input.cancertype,
				date : input.date,
				severity : input.severity,
				affected_location: input.location,
				description : input.description
		};
		var connection = mysqldb.getConnection();
		console.log(data);
		connection.connect();
		
		var query = connection.query("Insert into track_symptoms set ? ", data, function(err, rows){
			if(err)
				console.log("Error inserting : %s", err);
			res.redirect('/index');
		});
		connection.end();
	}