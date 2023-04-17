var users={
    "p": "testuser",
}

function showPage(pageId) {
    var pages = ['login', 'register', 'about','welcome'];
    for (var i = 0; i < pages.length; i++) {
        var page = document.getElementById(pages[i]);
        if (pages[i] === pageId) {
            page.style.display = 'block';
        } else {
            page.style.display = 'none';
        }
    }
    
}

function about(){
// Get the modal
var modal = document.getElementById("about");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
}
  
function isPassValid(pass) {
    var regex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    return regex.test(pass);
}

function areNamesValid(str) {
    // Regular expression to match non-numeric characters
    var regex = /^[^\d]+$/;
    return regex.test(str);
}

function isEmailValid(email) {
    // Regular expression to match email pattern
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function arePassSame(pass1,pass2) {
    return pass1==pass2;
}

function checkValidation()
{
    if (!areNamesValid(document.getElementById("name").value)) {
        alert("Please enter a valid name.");
        return;
        }

        if (!areNamesValid(document.getElementById("last-name").value)) {
        alert("Please enter a valid last name.");
        return;
        }

        if (!isEmailValid(document.getElementById("email").value)) {
        alert("Please enter a valid email address.");
        return;
        }

        if (!isPassValid(document.getElementById("password").value)) {
        alert("Please enter a valid password with at least 8 characters and a combination of letters and digits.");
        return;
        }

        if (!arePassSame(document.getElementById("confirm-password").value, document.getElementById("password").value)) {
        alert("Please make sure your passwords match.");
        return;
        }

        users[document.getElementById("username").value] = document.getElementById("password").value;
    //   document.getElementById("register").style.display = "none";
    //   document.getElementById("welcome").style.display = "block";
    showPage('welcome')
}

function loginGame(){
    username=document.getElementById("reg_username").value
    password=document.getElementById("reg_password").value

    if (!(username in users)) {
        alert("The username you entered dosent exist.");
        return; 
    }
    else if(!(users[username]==password)){
        alert("Password is not correct.");
        return;   
    }
        
    // document.getElementById("login").style.display = "none";
    // document.getElementById("welcome").style.display = "block";
    showPage('welcome')
}

