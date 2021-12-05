const { application } = require("express");

document.getElementById("login-form-submit").addEventListener("click", createNewProfile());

function createNewProfile() {
    var newUser = {
        username: document.getElementById("username-field"),
        password: document.getElementById("password-field")
    }

    // feed to database for creating new user

}