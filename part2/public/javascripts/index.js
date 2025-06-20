// when clicking the login button, this function executes
function loginSubmit(){
    // get values of username and password from HTML page
    const user = document.getElementById('uname').value;
    const pass = document.getElementById('pwd').value;

    // create a new AJAX request
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200){
            
        }
    };

    xhttp.open("POST", "/login", true);

    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.send(JSON.stringify({ uname: user, pwd: pass }));
}
