let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let userSchema = mongoose.Schema({
	id : { 
		type : String,
		required : true },
	name: { type: String},
	age: { type: Number},
	birthday: {type: String},
	degree: {type: String},
	email: {type: String},
	skills: {type: String}
});


let persons = mongoose.model( 'persons', userSchema );
let CreatePerson = {
	
	getPersonbyMail : function(userMail){
		return persons.find({email: userMail})
				.then(users => {
					return users;
				})
				.catch( err => {
					throw Error(err);
				}); 
	},
	postPerson : function(newUser){
		return persons.create( newUser)
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

module.exports = {CreatePerson }; 
