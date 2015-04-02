exports.tracksymptoms = function(req, res) {
	if (req.session.fname == undefined) {
		res.redirect("/");
	} else {
		var sessionset;
		if (req.session.fname == undefined) {
			var sessionset = "";
		} else {
			var sessionset = "set";
		}

		res.render('tracksymptoms', {
			title : 'TrackSymtoms',
			session1 : sessionset
		});
	}
};
exports.visualization = function(req, res) {
	var sessionset;
	if (req.session.fname == undefined) {
		var sessionset = "";
	} else {
		var sessionset = "set";
	}
	res.render('visualization', {
		title : 'visualization',
		session1 : sessionset
	})
}

exports.contactus = function(req, res) {
	res.render('contact-us', {
		title : 'Contact Us'
	});
};

exports.aboutus = function(req, res) {
	res.render('about-us', {
		title : 'About Us'
	})
}

exports.bladder = function(req, res) {
	var sessionset;
	if (req.session.fname == undefined) {
		var sessionset = "";
	} else {
		var sessionset = "set";
	}
	res.render('bladder-cancer', {
		title : 'bladder-cancer',
		session1 : sessionset
	})
}
exports.breast = function(req, res) {
	var sessionset;
	if (req.session.fname == undefined) {
		var sessionset = "";
	} else {
		var sessionset = "set";
	}
	res.render('breast-cancer', {
		title : 'breast-cancer',
		session1 : sessionset
	})
}
exports.colorectal = function(req, res) {
	var sessionset;
	if (req.session.fname == undefined) {
		var sessionset = "";
	} else {
		var sessionset = "set";
	}
	res.render('colorectal-cancer', {
		title : 'colorectal-cancer',
		session1 : sessionset
	})
}
exports.lung = function(req, res) {
	var sessionset;
	if (req.session.fname == undefined) {
		var sessionset = "";
	} else {
		var sessionset = "set";
	}
	res.render('lung-cancer', {
		title : 'lung-cancer',
		session1 : sessionset
	})
}
exports.prostate = function(req, res) {
	var sessionset;
	if (req.session.fname == undefined) {
		var sessionset = "";
	} else {
		var sessionset = "set";
	}
	res.render('prostate-cancer', {
		title : 'prostate-cancer',
		session1 : sessionset
	})
}
exports.vulvar = function(req, res) {
	var sessionset;
	if (req.session.fname == undefined) {
		var sessionset = "";
	} else {
		var sessionset = "set";
	}
	res.render('vulvar-cancer', {
		title : 'vulvar-cancer',
		session1 : sessionset
	})
}

/**
 * New node file
 */
mysqldb = require('./Connection.js');

exports.addSymptoms = function(req, res) {
	if (req.session.fname == undefined) {
		res.redirect("/");
	} else {

		var input = JSON.parse(JSON.stringify(req.body));
		var data = {
			cancer_type : input.cancertype,
			date : input.date,
			severity : input.severity,
			affected_location : input.location,
			description : input.description
		};
		var connection = mysqldb.getConnection();
		console.log(data);
		connection.connect();

		var query = connection.query("Insert into track_symptoms set ? ", data,
				function(err, rows) {
					if (err) {
						console.log("Error inserting : %s", err);
						res.redirect('/');
					}
					// console.log(rows);
				});
		// res.redirect('/ViewHistory');
		// console.log(rows)
		connection.end();
	}
}

exports.viewhistory = function(req, res) {
	if (req.session.fname == undefined) {
		res.redirect("/");
	} else {
		var connection = mysqldb.getConnection();

		var sessionset;
		if (req.session.fname == undefined) {
			var sessionset = "";
		} else {
			var sessionset = "set";
		}
		connection.connect();
		connection.query("Select * from track_symptoms", function(err, rows) {
			if (err)
				console.log("Error fetching results : %s", err);
			res.render('ViewHistory', {
				data : rows,
				session1 : sessionset
			});
		});
		connection.end();
	}
}
