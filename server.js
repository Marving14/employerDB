let express = require('express');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let moment = require('moment');
const uuidv4 = require('uuid/v4');
let { PostProyect } = require('./db-post-proyect-model.js');
let {LoginEmployer } = require('./db-login-register-model.js'); 
let {CreatePerson } = require('./db-create-person-model.js');
// PostList  -> turned PostProyect
let { DATABASE_URL, PORT } = require('./config');
let mongoose = require('mongoose');

let jsonParser = bodyParser.json();
let app = express();
mongoose.Promise = global.Promise;

app.use(express.static("public"));
app.use( morgan( "dev" ) );



let registered =[
    {
        id: uuidv4(),
        name: "Marving",
        email: "bryan_marving@hotmail.com",
        password: "admin"
    }

];

let postss = [
	{
        id: uuidv4(),
        name: "Piloto",
        size: "45", 
        description: "proyecto piloto pa probar",
        author: "carlos Santana",
        publishDate: moment(Date.now()).format('MM/DD/YYYY')
	},
	{
        id: uuidv4(),
        name: "Piloto 2 ",
        size: "35", 
        description: "prueba delete con este",
        author: "Peter Parker",
        publishDate: moment(Date.now()).format('MM/DD/YYYY')
	},
	{
        id: uuidv4(),
        title: "gol",
        content: "Si la pelota entra, es gol",
        author: "Jorge Campos",
        publishDate: moment(Date.now()).format('MM/DD/YYYY')
    },
	{
        id: uuidv4(),
        title: "penal",
        content: "No fue penal porque no lo marco el arbitro",
        author: "Jorge Campos",
        publishDate: moment(Date.now()).format('MM/DD/YYYY')
	}
];

//  LOGIN SECTION 

app.get('/employerDB/login-users/:email',(req, res, next) => {
    LoginEmployer.getbyMail(req.params.email).then(users => {
        if(users.length == 0){
            console.log(req.params.email);
            console.log(users);
            return res.status(404).json("User not found");
        }
        return res.status(200).json(users);
    }).catch( error => {
        res.statusMessage = "Something went wrong with the DB. Try again later.";
        return res.status( 500 ).json({
            status : 500,
            message : "Something went wrong with the DB. Try again later."
        })
    });
});
//////////// END LOGIN /////////////

// REGISTER SECTION //////////
app.post('/employerDB/register-users', jsonParser, (req, res, next)=>{
    if(req.body.name && req.body.email && req.body.password){
        let nUser = req.body;
        nUser.id = uuidv4();
        LoginEmployer.post(nUser).then(post => {
            return res.status(201).json({
                message : "User registered",
                status : 201,
                post : post
            });
        }).catch( error => {
            res.statusMessage = "Something went wrong with the DB. Try again later.";
            return res.status( 500 ).json({
                status : 500,
                message : "Something went wrong with the DB. Try again later."
            })
        });
    }
    else{
        return res.status(406).json("Missing variables in body");
    }
});

//////////// END REGISTER /////
///////////////////////////////////////////////////////////
// CREATE PROJECT 


	//POST PROJECT 
app.post('/employerDB/create-project', jsonParser, (req, res, next)=>{
		
    if(req.body.identifier && req.body.name && req.body.size && req.body.description){
        let nUser = req.body;
        nUser.id = uuidv4();
        PostProyect.postProject(nUser).then(post => {
            return res.status(201).json({
                message : "Project registered",
                status : 201,
                post : post
            });
        }).catch( error => {
            res.statusMessage = "Something went wrong with the DB. Try again later.";
            return res.status( 500 ).json({
                status : 500,
                message : "Something went wrong with the DB. Try again later."
            })
        });
    }
    else{
        return res.status(406).json("Missing variables in body, PROJECT");
    }
});

//  FIND PROJECT BY IDENTIFIER 
app.get('/employerDB/busqueda-proyecto/:identifier',(req, res, next) => {
    PostProyect.getbyIdentifier(req.params.identifier).then(users => {
        if(users.length == 0){
            console.log(req.params.identifier);
            console.log(users);
            return res.status(404).json("project identifier not found");
        }
        return res.status(200).json(users);
    }).catch( error => {
        res.statusMessage = "Something went wrong with the DB. Try again later.";
        return res.status( 500 ).json({
            status : 500,
            message : "Something went wrong with the DB. Try again later."
        })
    });
});
//  End get project by identifier 

// Get all projects 

app.get('/employerDB/busqueda-proyectos',(req, res, next) => {
    PostProyect.getProjects().then(users => {
        return res.status(200).json(users);
    }).catch( error => {
        res.statusMessage = "Something went wrong with the DB. Try again later.";
        return res.status( 500 ).json({
            status : 500,
            message : "Something went wrong with the DB. Try again later."
        })
    });
});

// End get all projects 

// Update one project by identifier 
app.put('/employerDB/update-project/:identifier', jsonParser, (req, res, next)=>{
    if(req.body.identifier){
        let post = req.body;
        if(post.identifier != req.params.identifier)
            return res.status(409).json("emails don't match");
        PostProyect.updateProject(post).then(posts => {
            return res.status(202).json(posts);
        }).catch( error => {
            res.statusMessage = "Something went wrong with the DB. Try again later.";
            return res.status( 500 ).json({
                status : 500,
                message : "Something went wrong with the DB. Try again later."
            })
        });
    }
    else{
        return res.status(406).json("Missing id in body");
    }
});
/////// End update PROJECT by identifier


// Update one project Follow
app.put('/employerDB/update-projectFollow/:identifier/:email', jsonParser, (req, res, next)=>{
    if(req.params.identifier){
        LoginEmployer.updateArray(req.params.identifier, req.params.email).then(posts => {
        return res.status(202).json(posts);
    }).catch( error => {
            res.statusMessage = "Something went wrong with the DB. Try again later.";
            return res.status( 500 ).json({
                status : 500,
                message : "Something went wrong with the DB. Try again later."
            })
        });
    }
    else{
        return res.status(406).json("Missing id in body");
    }
});
/////// End update PROJECT by Follow






// Post Person Information 


// CREATE PERSON  SECTION //////////
app.post('/employerDB/create-person', jsonParser, (req, res, next)=>{
    if(req.body.name && req.body.age && req.body.birthday && req.body.degree  && req.body.email && req.body.skills){
        let nUser = req.body;
        nUser.id = uuidv4();
        CreatePerson.postPerson(nUser).then(post => {
            return res.status(201).json({
                message : "User registered",
                status : 201,
                post : post
            });
        }).catch( error => {
            res.statusMessage = "Something went wrong with the DB. Try again later.";
            return res.status( 500 ).json({
                status : 500,
                message : "Something went wrong with the DB. Try again later."
            })
        });
    }
    else{
        return res.status(406).json("Missing variables in body Post Person");
    }
});

// Get one person by email
app.get('/employerDB/busqueda-persona/:email',(req, res, next) => {
    CreatePerson.getPersonbyMail(req.params.email).then(users => {
        if(users.length == 0){
            console.log(req.params.email);
            console.log(users);
            return res.status(404).json("User not found");
        }
        return res.status(200).json(users);
    }).catch( error => {
        res.statusMessage = "Something went wrong with the DB. Try again later.";
        return res.status( 500 ).json({
            status : 500,
            message : "Something went wrong with the DB. Try again later."
        })
    });
});

// Update one person by email
app.put('/employerDB/update-person/:email', jsonParser, (req, res, next)=>{
    if(req.body.email){
        let post = req.body;
        if(post.email != req.params.email)
            return res.status(409).json("emails don't match");
        CreatePerson.updatePerson(post).then(posts => {
            return res.status(202).json(posts);
        }).catch( error => {
            res.statusMessage = "Something went wrong with the DB. Try again later.";
            return res.status( 500 ).json({
                status : 500,
                message : "Something went wrong with the DB. Try again later."
            })
        });
    }
    else{
        return res.status(406).json("Missing id in body");
    }
});

// Delete one person 
app.delete('/employerDB/delete-person/:email', (req, res, next)=>{
    CreatePerson.deletePerson(req.params.email).then(mess => {
        // Case when person is found and deleted
        
        return res.status(200).json("Success! person deleted");
    }).catch( error => {
        res.statusMessage = "Something went wrong with the DB. Try again later.";
        return res.status( 500 ).json({
            status : 500,
            message : "Something went wrong with the DB. Try again later."
        })
    });
});
// End delete person 

// Delete one project 
app.delete('/employerDB/delete-project/:identifier', (req, res, next)=>{
    PostProyect.deleteProject(req.params.identifier).then(mess => {
        // Case when person is found and deleted
        
        return res.status(200).json("Success! project deleted");
    }).catch( error => {
        res.statusMessage = "Something went wrong with the DB. Try again later.";
        return res.status( 500 ).json({
            status : 500,
            message : "Something went wrong with the DB. Try again later."
        })
    });
});
// End delete project 

















///////////////////////////////////////////////////////////

/*
app.get('/api/db-project',(req, res, next) => {
    if(req.query.author == undefined)
        return res.status(406).json("Missing author");
    PostProyect.getbyA(req.query.author).then(posts => {
        if(posts.length == 0)
            return res.status(404).json("Author not found");
        return res.status(200).json(posts);
    }).catch( error => {
        res.statusMessage = "Something went wrong with the DB. Try again later.";
        return res.status( 500 ).json({
            status : 500,
            message : "Something went wrong with the DB. Try again later."
        })
    });
});

app.post('/api/db-project-posts', jsonParser, (req, res, next)=>{
    if(req.body.title && req.body.content && req.body.author && req.body.publishDate){
        let nPost = req.body;
        nPost.id = uuidv4();
        PostProyect.post(nPost).then(post => {
            return res.status(201).json({
				message : "Post added!",
				status : 201,
				post : post
			});
        }).catch( error => {
            res.statusMessage = "Something went wrong with the DB. Try again later.";
            return res.status( 500 ).json({
                status : 500,
                message : "Something went wrong with the DB. Try again later."
            })
        });
    }
    else{
        return res.status(406).json("Missing variables in body");
    }
});

app.delete('/api/db-project-posts/:id', (req, res, next)=>{
    PostProyect.del(req.params.id).then(mess => {
        if(mess.deletedCount == 0)
            return res.status(404).send("That id doesn't exist");
        return res.status(200).json("Success!");
    }).catch( error => {
        res.statusMessage = "Something went wrong with the DB. Try again later.";
        return res.status( 500 ).json({
            status : 500,
            message : "Something went wrong with the DB. Try again later."
        })
    });
});

app.put('/api/db-project-posts/:id', jsonParser, (req, res, next)=>{
    if(req.body.id){
        let post = req.body;
        if(post.id != req.params.id)
            return res.status(409).json("Ids don't match");
        PostProyect.update(post).then(posts => {
            return res.status(202).json(posts);
        }).catch( error => {
            res.statusMessage = "Something went wrong with the DB. Try again later.";
            return res.status( 500 ).json({
                status : 500,
                message : "Something went wrong with the DB. Try again later."
            })
        });
    }
    else{
        return res.status(406).json("Missing id in body");
    }
});
*/

let server;
function runServer(port, databaseUrl){
	return new Promise( (resolve, reject ) => {
    	mongoose.connect(databaseUrl, response => {
			if ( response ){
				return reject(response);
			}
			else{
				server = app.listen(port, () => {
					console.log( "App is running on port " + port );
					resolve();
				})
				.on( 'error', err => {
					mongoose.disconnect();
					return reject(err);
				})
			}
		});
	});
}

function closeServer(){
	return mongoose.disconnect()
		.then(() => {
			return new Promise((resolve, reject) => {
				console.log('Closing the server');
				server.close( err => {
					if (err){
						return reject(err);
					}
					else{
						resolve();
					}
				});
			});
		});
}

runServer( PORT, DATABASE_URL )
	.catch( err => {
		console.log( err );
	});
module.exports = { app, runServer, closeServer };
