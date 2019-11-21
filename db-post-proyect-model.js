let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let postSchema = mongoose.Schema({
	id : { 
		type : String,
		required : true },
	identifier: {type: String},
	name: { type: String},
	size: {type: Number},
	description: { type: String}
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
	getProjects: function(){
		return projects.find()
				.then(pros =>{
					return pros; 
				})
				.catch( error => {
					throw Error(error); 
				})
	},
	postProject : function( newPost ){
		return projects.create( newPost )
				.then( post => {
					return post;
				})
				.catch( error => {
					throw Error(error);
				});
	},
	updateProject: function( Project ){
		return projects.updateOne( {identifier: Project.identifier}, Project)
				.then( posts => {
					return posts;
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
	}
	*/
};
module.exports = { PostProyect };
