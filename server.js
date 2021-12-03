// Define app using express
var express = require("express")
var app = express()
// Require database SCRIPT file
var db = require("./database.js")
// Require md5 MODULE
var md5 = require('md5')
// Make Express use its own built-in body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set server port
HTTP_PORT = 5000
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

// endpoints that require "req.body.{something}" need to be formatted "user=adsf&pass=pass123" etc.
// endpoints that require id require the number replacing ":id" in the URL



// CREATE a new user (HTTP method POST) at endpoint /app/new/
app.post("/app/new/", (req, res) =>{
	const stmt = db.prepare(`INSERT INTO userinfo (user, pass, email, score, logins, past) VALUES (?, ?,? 0, 1, "")`)
	const info = stmt.run(req.body.user, md5(req.body.pass), req.body.email)
	res.status(201).json({"message": info.changes + " record created: ID " + info.lastInsertRowid + " (201)"});
})


//To get the scores recorded, one should call GET and do past.split(" ") for an array of past scores
// READ a list of all users (HTTP method GET) at endpoint /app/users/
app.get("/app/users/", (req, res) => {	
	const stmt = db.prepare("SELECT * FROM userinfo").all();
	res.status(200).json(stmt);
});

// READ a single user (HTTP method GET) BY ID at endpoint /app/user/id/:id
app.get("/app/user/id/:id", (req, res)=>{
	const stmt = db.prepare(`SELECT * FROM userinfo WHERE id=${req.params.id}`).get()
	res.status(200).json(stmt);
})
// READ a single user (HTTP method GET) BY USERNAME at endpoint /app/user/username/
app.get("/app/user/username/", (req, res)=>{
	const stmt = db.prepare(`SELECT * FROM userinfo WHERE user=${req.body.user}`).get()
	res.status(200).json(stmt);
})



// UPDATE a single user USER AND PASSWORD AND EMAIL (HTTP method PATCH) at endpoint /app/update/user/logininfo/:id
app.patch("/app/update/user/logininfo/:id", (req, res)=>{
	const stmt = db.prepare("UPDATE userinfo SET user = COALESCE(?,user), pass = COALESCE(?,pass), email = COALESCE(?, email) WHERE id=?")
	const info = stmt.run(req.body.user, md5(req.body.pass), req.body.email, req.params.id)
	res.status(200).json({"message": info.changes + " record updated: ID " + req.params.id + " (200)"});
})

//Appends the new score onto the game history.
// UPDATE a single user SCORE (HTTP method PATCH) at endpoint /app/update/user/:id
app.patch("/app/update/user/score/:id", (req, res)=>{
	const stmt = db.prepare(`UPDATE userinfo SET score = COALESCE(?, score), past = past + " " + ${req.body.score} WHERE id=?`)
	const info = stmt.run(req.body.score, req.params.id)
	res.status(200).json({"message": info.changes + " record updated: ID " + req.params.id + " (200)"});
})

//Here a | character indicates that a game has ended, and separates the scores of the following game
// UPDATE a single user GAME COMPLETE (HTTP method PATCH) at endpoint /app/update/user/past/:id
app.patch("/app/update/user/past/:id", (req, res)=>{
	const stmt = db.prepare(`UPDATE userinfo SET past = past + " |"  WHERE id=?`)
	const info = stmt.run(req.params.id)
	res.status(200).json({"message": info.changes + " record updated: ID " + req.params.id + " (200)"});
})

// UPDATE a single user LOGIN COUNT (HTTP method PATCH) at endpoint /app/update/user/logincount/:id
app.patch("/app/update/user/logincount/:id", (req, res)=>{
	const stmt = db.prepare(`UPDATE userinfo SET login = login + 1  WHERE id=?`)
	const info = stmt.run(req.params.id)
	res.status(200).json({"message": info.changes + " record updated: ID " + req.params.id + " (200)"});
})



// DELETE a single user (HTTP method DELETE) at endpoint /app/delete/user/:id
app.delete("/app/delete/user/:id", (req, res)=>{
	const stmt = db.prepare("DELETE FROM userinfo WHERE id=?")
	const info = stmt.run(req.params.id)
	res.status(200).json({"message": info.changes + " record deleted: ID " + req.params.id + " (200)"});
})
// Default response for any other request
app.use(function(req, res){
	res.json({"message":"Endpoint not found. (404)"});
    res.status(404);
});
