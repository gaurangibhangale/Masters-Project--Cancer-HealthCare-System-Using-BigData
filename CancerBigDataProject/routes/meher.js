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
	//	var chance = new Chance();
	console.log(input);
	//console.log("Password: " + input.hash + " " + input.password);
	var password = input.password;
	var password_temp = input.password1;
	if(password == password_temp){
	console.log("Password_temp and password: " + password_temp + password);
	var cipher = crypto.createCipher(algorithm, key);
	var encrypted = cipher.update(password, 'utf8', 'hex')
			+ cipher.final('hex');
	console.log(encrypted);
	var data = {
		fname : input.firstname,
		lname : input.lastname,
		email : input.email,
		password : encrypted
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
					var query = connection.query("INSERT INTO user set ?",
							data, function(err, rows) {
								if (err)
									console.log("Error Inserting: %s", err);
								console.log('enter flash');
								//req.flash('error','You are registered.Please Login!');
								res.redirect('/');
							});
					connection.end();
				} else {
					if (rows[0].email == input.email) {
						//req.flash('error','Email ID already exists.Please Login');
						console.log("i am sad");
						res.redirect('/');
					}
				}

			});
	}
	else{
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
							//req.flash('error','Username does not exists in database');
							res.redirect('/');
						} else {
							if (rows[0].password == encrypted_password) {
								sess = req.session;
								console.log(req.session);
								console.log(rows[0].firstname);
								sess.uid = rows[0].id;
								sess.fname = rows[0].fname;
								sess.lname = rows[0].lname;
								sess.email = rows[0].email;
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
									lastlogin : sess.lastlogin,
								});
								connection.end();
							} else {
								//req.flash('error','Username or password is incorrect. Try Again!');
								res.redirect('/');
							}
						}
					});
};

exports.logout = function(req, res) {
    var email = sess.email;
    var lastlogin = new Date();
    console.log(email);
    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
        } else {
            var connection = mysqldb.getConnection();

            connection.query("UPDATE users set lastlogin = ? WHERE email = ? ",
                    [ lastlogin, email ], function(err, rows) {
                        if (err) {
                            cosole.log("error : %s", err);
                        }
                        res.redirect('/');
                    });

            connection.end();
        }
    });
}