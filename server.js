let express = require('express');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let moment = require('moment');
const uuidv4 = require('uuid/v4');
let { PostProyect } = require('./db-post-proyect-model');
let {LoginEmployer } = require('./db-login-register-model.js'); 
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

app.get('/employerDB/login-users',(req, res, next) => {
    if(req.body.email && req.body.password)
        return res.status(406).json("Missing data");
    LoginEmployer.getbyMail(req.query.email).then(users => {
        if(users.length == 0)
            return res.status(404).json("User not found");
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