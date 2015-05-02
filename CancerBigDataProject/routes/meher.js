var crypto = require('crypto');
var assert = require('assert');
var algorithm = 'aes256';
var key = 'password';
var password_temp;
var mysqldb = require('./Connection.js');

exports.signin = function(req, res) {
	res.render('signin', {
		title : 'Login'
	});
};

exports.signup = function(req, res) {
	res.render('signup', {
		title : 'Register'
	});
};

exports.saveUser = function(req, res) {
	var input = JSON.parse(JSON.stringify(req.body));
	// var chance = new Chance();
	console.log(input);
	// console.log("Password: " + input.hash + " " + input.password);
	var password = input.password;
	var password_temp = input.password1;
	if (password == password_temp) {
		console.log("Password_temp and password: " + password_temp + password);
		var cipher = crypto.createCipher(algorithm, key);
		var encrypted = cipher.update(password, 'utf8', 'hex')
				+ cipher.final('hex');
		console.log(encrypted);
		var data = {
			fname : input.firstname,
			lname : input.lastname,
			email : input.email,
			password : encrypted,
			isAdmin : '0'
		};
		var connection = mysqldb.getConnection();
		connection.connect();
		var query = connection.query("SELECT * from user WHERE email = ? ",
				[ data.email ], function(err, rows) {
					if (err) {
						console.log("Error fecthing details : %s", err);
						res.redirect('/');
					}
					if (rows[0] == undefined) {
						var query = connection
								.query("INSERT INTO user set ?", data,
										function(err, rows) {
											if (err)
												console.log(
														"Error Inserting: %s",
														err);
											//console.log('enter flash');
											// req.flash('error','You are
											// registered.Please Login!');
											res.redirect('/');
										});
						connection.end();
					} else {
						if (rows[0].email == input.email) {
							// req.flash('error','Email ID already exists.Please
							// Login');
							res.redirect('/');
						}
					}

				});
	} else {
		console.log("Password Mismatch. Please confirm your password!!")
		res.redirect('/');
	}
};

exports.signindo = function(req, res) {
	var input = JSON.parse(JSON.stringify(req.body));
	var data = {
		email : input.email,
		password : input.password,
	};
	console.log(data);
	var password_check = input.password;
	var cipher = crypto.createCipher(algorithm, key);
	var encrypted_password = cipher.update(password_check, 'utf8', 'hex')
			+ cipher.final('hex');
	var connection = mysqldb.getConnection();
	connection.connect();
	var query = connection
			.query(
					"SELECT * from user WHERE email = ? ",
					[ data.email ],
					function(err, rows) {
						if (err) {
							console.log("Error fecthing details : %s", err);
							res.redirect('/');
						}
						var userexist = rows[0];
						console.log("rows: " + userexist);
						if (userexist == undefined) {
							console.log("rows: " + userexist);
							// req.flash('error','Username does not exists in
							// database');
							res.redirect('/');
						} else {
							if (rows[0].password == encrypted_password) {
								sess = req.session;
								var sessionset="set";
								console.log("sess: "+req.session);
								console.log("Undef: "+rows[0].fname);
								sess.uid = rows[0].id;
								sess.fname = rows[0].fname;
								sess.lname = rows[0].lname;
								sess.email = rows[0].email;
								sess.isAdmin = rows[0].isAdmin;
								if (rows[0].lastlogin == null) {
									sess.lastlogin = "First Login";
								} else {
									sess.lastlogin = rows[0].lastlogin
											.toString().substr(0, 24);
								}
								var lastlogin = new Date();
								connection
										.query(
												'UPDATE user SET lastlogin = ? WHERE email = ?',
												[ lastlogin, sess.email ]);
								console.log("Session: " + JSON.stringify(sess));

								res.render('index', {
									page_title : "Welcome",
									data : rows,
									personId : sess.uid,
									firstname : sess.fname,
									lastname : sess.lname,
									email : sess.email,
									isAdmin : sess.isAdmin,
									lastlogin : sess.lastlogin,
									session1:sessionset
								});
								connection.end();
							} else {
								// req.flash('error','Username or password is
								// incorrect. Try Again!');
								res.redirect('/');
							}
						}
					});
};

exports.signout = function(req, res) {
	if (req.session.fname == undefined) {
		res.redirect("/");
	} else {
		//req.flash('info', 'Successfully Signed Out..!!');
		var sessionset="";
		res.render('index', {
			page_title : "Welcome",
			session1 : sessionset
		}, function(err, result) {
			if (!err) {
				res.end(result);
			} else {
				res.end('An error occured');
				console.log(err);
			}
		});
		req.session.destroy();
		console.log('session destroyed');
	}
};

exports.screening = function(req, res) {
	var sessionset;
	if (req.session.fname == undefined) {
		var sessionset="";
	}
	else{
		var sessionset="set";
	}
		res.render('screening', {
			title : 'Screening Recommendation',
			session1 : sessionset
		});
};

exports.screeningSubmit = function(req,res){
	var input = JSON.parse(JSON.stringify(req.body));
	var data = {
			age : input.age,
			gender : input.gender,
			alcohol : input.alcohol,
			cancertype : input.cancertype,
			hiv : input.hiv,
			bladder : input.bladder,
			rectal : input.rectal
		};
		console.log(data);
	var screen = "";
	var sessionset;
	if (req.session.fname == undefined) {
		var sessionset="";
	}
	else{
		var sessionset="set";
	}
	if(data.cancertype=="breast" || data.cancertype =="none" && data.gender=="female" && data.alcohol=="high" && data.hiv=="no" && data.bladder=="no" && data.rectal=="no"){
		screen="breast";	
	}
	else if(data.cancertype=="none" && data.gender=="male" && data.alcohol=="high"||data.alcohol=="low"||data.alcohol=="no" && data.hiv=="no" && data.bladder=="yes" && data.rectal=="no"){
		screen="bladder";
	}
	else if(data.cancertype=="lung" || data.cancertype =="none" && data.gender=="male" || data.gender=="female" && data.alcohol=="high"||data.alcohol=="low"||data.alcohol=="no" && data.hiv=="no" && data.bladder=="no" && data.rectal=="no"){
		screen="lung";
	}
	else if(data.cancertype=="none" && data.gender=="female" && data.alcohol=="high"||data.alcohol=="low"||data.alcohol=="no" && data.hiv=="yes" && data.bladder=="no" && data.rectal=="no"){
		screen="vulvar";
	}
	else if(data.cancertype=="rectal" || data.cancertype =="none" && data.gender=="male" && data.alcohol=="high" && data.hiv=="no" && data.bladder=="no" && data.rectal=="yes"){
		screen="rectal";
	}
	else if(data.cancertype=="prostate" || data.cancertype =="none" && data.gender=="male" && data.alcohol=="high"||data.alcohol=="low"||data.alcohol=="no" && data.hiv=="yes" && data.bladder=="no" && data.rectal=="no"){
		screen="prostate";
	}
	else {
		screen="none";
	}
	console.log("screen:"+screen);
	res.render('screeningResult', {
		title : 'Screening Recommendation',
		session1 : sessionset,
		screen : screen
	});
}

exports.screeningResult = function(req, res) {
	var sessionset;
	if (req.session.fname == undefined) {
		var sessionset="";
	}
	else{
		var sessionset="set";
	}
		res.render('screeningResult', {
			title : 'Screening Recommendation',
			session1 : sessionset
		});
};