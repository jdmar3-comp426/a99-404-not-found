const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

var username;

loginButton.addEventListener("click", (bclick) => {

    //When this is done for the creation of user to send to the database, don't prevent default
    //Otherwise it'll prevent the submission of the data
    bclick.preventDefault();
    username = loginForm.username.value;
    const password = loginForm.password.value;


    //Will have to make the field connect to the back end database to check if the
    //username and password match
    fetch('https://localhost:5000/app/user/username', {
        method: 'GET',
        body:{
            user: username,
            pass: password
        }
    }).then(response => response.json())
    .then(data=> {
    
        if (username === data.user && md5(password) === data.pass){
            alert("Login successful");
            location.href="index.html";
            // location.reload();
        } 
        else {
            loginErrorMsg.style.opacity = 5;
        }
    })
    /*if (username === "user" && password === "user"){
        alert("Login successful");
        location.href="index.html";
        // location.reload();
    } 
    else {
        loginErrorMsg.style.opacity = 5;
    }*/
})

function getUserInfo(){
    return username;
}

function toggleSidebar(){
    document.getElementById("sidebar").classList.toggle('active');
}

function toggleTab(){
    document.getElementById("tabs").classList.toggle('active');
}

function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tabs is-medium is-centered" );
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }

