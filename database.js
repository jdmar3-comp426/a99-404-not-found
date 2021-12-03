// This ensures that things do not fail silently but will throw errors instead.
"use strict";
// Require better-sqlite.
const Database = require('better-sqlite3');

// Connect to a database or create one if it doesn't exist yet.
const db = new Database('user.db');

// Initializing database using a table of userinfo objects.
const stmt = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='userinfo';`);
let row = stmt.get();
if (row === undefined) {
// Set a const that will contain your SQL commands to initialize the database with two dummy users.
// userinfo contains an email, username, password, and score fields. Score is updated and recorded as games are played. 
// Email, username, and password should remain static until user wants to change them.
// score will be represented by the sum of the hand of the player
//logins keeps track of the number of times the user has logged on
// past stores the past scores of previous games as a string. ex: new_user.past="", * 1 game later* new_user.past="17" *1 more game later* new user.past="17, 14"
    const sqlInit = `
        CREATE TABLE userinfo ( id INTEGER PRIMARY KEY, user TEXT, pass TEXT, score INTEGER, logins INTEGER, past TEXT );
		INSERT INTO userinfo (user, pass, score, logins, past) VALUES ('chris is cool','for making the database', 21, 1, ""), ('will is cool','for making the API', 0, 1, "")
    `;
// Execute SQL commands above.
    db.exec(sqlInit);
// Echo information about what we just did to the console.
    console.log('Your database has been initialized with a new table and two test entries crediting the backend devs.');
} else {
// Since the database already exists, echo that to the console.
    console.log('Database exists.')
}
// Export all of the above as a module so that we can use it elsewhere.
module.exports = db