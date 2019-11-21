let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let postSchema = mongoose.Schema({
	id : { 
		type : String,
		required : true },
	name: { type: String},
	size: {type: String},
	description: { type: String},
	identifier: {type: String}
});



let projects = mongoose.model( 'projects', postSchema );

let PostProyect = {
	getbyIdentifier: function(identifierS){
		return projects.find({identifier: identifierS})
				.then( posts => {
					return posts;
				})
				.catch( error => {
					throw Error( error );
				});
	},
	postProject : function( newPost ){
		return projects.create( newPost )
				.then( post => {
					return post;
				})
				.catch( error => {
					throw Error(error);
				});
	}
	/*
	del : function( iD ){
		return projects.deleteOne( {identifier: iD} )
				.then( mess => {
					return mess;
				})
				.catch( error => {
					throw Error(error);
				});
	},
	update: function( nPost ){
		return projects.updateOne( {id: nPost.id}, nPost)
				.then( posts => {
					return posts;
				})
				.catch( error => {
					throw Error(error);
				});
	}
	*/
};
module.exports = { PostProyect };
