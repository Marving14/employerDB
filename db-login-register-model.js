let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let userSchema = mongoose.Schema({
	id : { 
		type : String,
		required : true },
	name: { type: String},
	email: {type: String},
	password: {type: String}
});

let Register = mongoose.model( 'Register', userSchema );
let LoginEmployer = {
	getbyMail : function(userMail){
		return Register.find({email: userMail})
				.then(users => {
					return users;
				})
				.catch( err => {
					throw Error(err);
				}); 
	},
	post : function(newUser){
		return Register.create( newUser)
				.then(users => {
					return users;
				})
				.catch( err => {
					throw Error(err);
				}); 
	}
/*
	del : function( iD ){
		return Post.deleteOne( {id: iD} )
				.then( mess => {
					return mess;
				})
				.catch( error => {
					throw Error(error);
				});
	},
	update: function( email ){
		return Post.updateOne( {id: email.id}, email)
				.then( posts => {
					return posts;
				})
				.catch( error => {
					throw Error(error);
				});
	}
	*/
};

module.exports = {LoginEmployer }; 