The database is designed to hold fields related to the user's loging including, id: integer (provided), username (provided by user),
password (provided by user), email (provided by user), number of logins (kept track of by program), current score in game (kept track of by program), and 
past scores in previous games (kept track of by program)
as defined below: 

Set a const that will contain your SQL commands to initialize the database with two dummy users.
userinfo contains an email, username, password, and score, previous scores, and past logins in a table. Score is updated and recorded as games are played. 
Email, username, and password will be stored as strings with password hashed using md5, should remain static until user wants to change them.
score will be represented by the sum of the hand of the player at any given in game moment.
logins keeps track of the number of times the user has logged on using an integer.
the past ending scores of previous games are stored as the field "past" as a string. ex: new_user.past="", * 1 game later* new_user.past="17" *1 more game later* new user.past="17, 14"
