var exec = require('child_process').execFile;

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

exports.visualization_map = function(req, res) {
	var sessionset;
	if (req.session.fname == undefined) {
		var sessionset = "";
	} else {
		var sessionset = "set";
	}
	res.render('visualization_map', {
		title : 'visualization_map',
		session1 : sessionset
	})
}

exports.query = function(req, res) {
	var sessionset;
	if (req.session.fname == undefined) {
		var sessionset = "";
	} else {
		var sessionset = "set";
	}
	
	var input = JSON.parse(JSON.stringify(req.body));
    var data = {
    		cancertype : input.cancertype,
    		attribute : input.attribute
            
        };
    //console.log("Performing Data Extract"+data.attribute+"  sdfs"+data.cancertype);
	//var x="select bd."+data.attribute+" from "+data.cancertype +" where bd." + data.attribute +"<10;";
    //var x="select bd."+data.attribute+" from "+data.cancertype +" limit 1;";
	//var x= "select bd.age_at_diagnosis from bd where bd.age_at_diagnosis<40";
    

    var x= "select bd.race_ethnicity from bd";
    
    
    console.log("Performing Data Extract"+x);
    exec('FetchHiveData.exe',[x],function(err,data){
        console.log(err);
        console.log(data.toString());
        console.log("Inside Fetch");
    });
    console.log("after fetch");
    
	res.render('visualization', {
		title : 'visualization',
		session1 : sessionset
	})
}


exports.admin = function(req, res) {
	var sessionset;
	if (req.session.isAdmin == '0') {
		sessionset = "";
		res.redirect("/");
	} else {
		sessionset = "set";
		var connection = mysqldb.getConnection();
		connection.connect();
		connection.query("Select * from cancerinfo", function(err, rows) {
			if (err)
				console.log("Error fetching results : %s", err);
			console.log("sessionset:"+sessionset);
			res.render('admin', {
				title : 'Admin Dashboard',
				data : rows,
				session1 : sessionset
			});
		});
	}
}

mysqldb = require('./Connection.js');

exports.addinfo = function(req, res) {
	if (req.session.fname == "g") {
		var input = JSON.parse(JSON.stringify(req.body));
		var type=input.cancertype;
		console.log(type);
		var data = {
			description : input.description,
			symptoms : input.symptoms,
			stages : input.stages,
			treatment : input.treatment,
		};
		var connection = mysqldb.getConnection();
		console.log(data);
		connection.connect();

		var query = connection.query("Update cancerinfo set ? where cancertype = ? ", [data, type],
				function(err, rows) {
					if (err) {
						console.log("Error inserting : %s", err);
						res.redirect('/');
					}
					// console.log(rows);
				});
		res.redirect('/');
		// res.redirect('/ViewHistory');
		// console.log(rows)
		connection.end();
	}
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
exports.cancerinfo = function(req, res) {
	var sessionset;
	if (req.session.fname == undefined) {
		var sessionset = "";
	} 
	else {
		var sessionset = "set";
	}
	res.render('cancerinfo', {
		title : 'Cancer Info',
		session1 : sessionset
	})
	
	
}
exports.bladder = function(req, res) {
	var sessionset;
	if (req.session.fname == undefined) {
		var sessionset = "";
	} 
	else {
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
	} 
	else {
		var sessionset = "set";
	}
	res.render('breast-cancer', {
		title : 'breast-cancer',
		session1 : sessionset
	})
	
	
	
	
	/*	var connection = mysqldb.getConnection();

		var sessionset;
		if (req.session.fname == undefined) {
			var sessionset = "";
		} else {
			var sessionset = "set";
		}
		connection.connect();
		connection.query("Select * from breastcancer", function(err, rows) {
			if (err)
				console.log("Error fetching results : %s", err);
			res.render('breast-cancer', {
				title : 'breast-cancer',
				data : rows,
				session1 : sessionset
			});
		});
		connection.end();*/
	
	
	
	
	
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
exports.maps = function(req, res) {
	var sessionset;
	if (req.session.fname == undefined) {
		var sessionset = "";
	} else {
		var sessionset = "set";
	}
	res.render('maps', {
		title : 'maps',
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
			description : input.description,
			email : req.session.email
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
		res.redirect('/viewhistory');
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
		connection.query("Select * from track_symptoms where email= ?",[req.session.email], function(err, rows) {
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
