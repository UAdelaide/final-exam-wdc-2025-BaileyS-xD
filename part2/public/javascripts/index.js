// when clicking the login button, this function executes
function loginSubmit(){
    // get values of username and password from HTML page
    const user = document.getElementById('uname').value;
    const pass = document.getElementById('pwd').value;

    // create a new AJAX request
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200){
            const user = JSON.parse(this.responseText);
            if (this.responseText.role === 'owner'){
                window.location.href = "/owner-dashboard.html";
            } else if (this.user.role === 'walker'){
                window.location.href = "/walker-dashboard.html";
            }
        }
    };

    xhttp.open("POST", "/login", true);

    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.send(JSON.stringify({ uname: user, pwd: pass }));
}
