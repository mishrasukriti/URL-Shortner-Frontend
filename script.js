// let url = "https://password-reset-functionality.herokuapp.com"
let url = "http://localhost:3000"

function onLoad() {
    let resetURL = new URL(window.location.href)
    console.log("shotenredURL is: " + resetURL);
    let hashId = resetURL.searchParams.get("id");
    fetch(url + `/hash/${hashId}`, {
        method: "GET",
        headers: {
            'Content-type': 'application/json'
        }
        })
        .then((resp) => resp.json())
        .then((data) => {
            if (data.message === "Success"){
                window.location.replace(data.longURL);
            }
            else{
                let indexPage = document.getElementById("indexPageId")
                indexPage.setAttribute("class", "login-page")
            }
            
        })
        .catch((err)=>{
            let indexPage = document.getElementById("indexPageId")
            indexPage.setAttribute("class", "login-page")
        })
}

onLoad()


function onLogIn() {
    let email = document.getElementById("logInEmailId").value;
    let password = document.getElementById("loginPassword").value;

    fetch(url + `/login`, {
        method: "POST",
        body: JSON.stringify({
             email, password
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((resp) => resp.json())
        .then((data) => {
            
            let alertDiv = document.createElement('alert');
            alertDiv.setAttribute("role","alert" );
            alertDiv.setAttribute("id","alertDiv" );
            if(data.message === "Login success"){
                window.location.href =  "http://127.0.0.1:5500/frontend/urlShortner.html";
            }
            else if(data.message === "Account not activated"){
                alertDiv.setAttribute("class","alert alert-danger" );
                alertDiv.innerHTML = "'<strong>Your account is not activated yet.!</strong>' +'<br>' + 'Please click on the activation link sent in your mail'" ;
                console.log("Account not activated");
                deleteAlert(alertDiv);
            }

            else if(data.message === "Password Incorrect"){
                alertDiv.setAttribute("class","alert alert-danger" );
                alertDiv.innerHTML = "<strong>Incorrect Password!</strong>" ;
                console.log("Password Incorrect");
                deleteAlert(alertDiv);
            }
            
            else {
                alertDiv.setAttribute("class","alert alert-danger" );
                alertDiv.innerHTML = "<strong>User is not registered!</strong>" ;
                console.log("User is not registered");
                deleteAlert(alertDiv);
            }
            document.getElementById("login-form").append(alertDiv);
        })
        return false;

}

function onSignUp() {
    let name = document.getElementById("signupNameId").value;
    let email = document.getElementById("signupEmailId").value;
    let password = document.getElementById("signUpPassword").value;
    let reEnterPassword = document.getElementById("confirmPassword").value;
    
    // Write password and repeat password matching logic
    let passwordMismatchDiv = document.getElementById("passwordMismatchDiv");
    if(password!== reEnterPassword) {
        let alertDiv = document.createElement('alert');
        alertDiv.setAttribute("role","alert");
        alertDiv.setAttribute("id","alertDiv");

        alertDiv.setAttribute("class","alert alert-danger" );
        alertDiv.innerHTML = "<strong> Passwords entered do not match!</strong>";
        console.log("Passwords do not match");
        deleteAlert(alertDiv);
        document.getElementById("sign-up-form").append(alertDiv);
        return;
    }
    // Add logic to complete signup
    passwordMismatchDiv.classList.add("d-none");

    fetch(url + `/register`, {
        method: "POST",
        body: JSON.stringify({
             name, email, password
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((resp) => resp.json())
        .then((data) => {
            
            let alertDiv = document.createElement('alert');
            alertDiv.setAttribute("role","alert" );
            alertDiv.setAttribute("id","alertDiv" );
            if(data.message === "Activation mail sent"){
                alertDiv.setAttribute("class","alert alert-success" );
                alertDiv.innerHTML = "<p><strong> Success! Verification Email has been sent to your registered email Id.</strong></p>";
                console.log("User Registered Successfully");
                deleteAlert(alertDiv);
            } else if(data.message === "User already exists"){
                alertDiv.setAttribute("class","alert alert-danger" );
                alertDiv.innerHTML = "<strong>Failure!</strong><br>" + data.message;
                console.log("User already Registered ");
                deleteAlert(alertDiv);
            }
            document.getElementById("sign-up-form").append(alertDiv);
            
            
        })
        return false;
}

function sendPasswordResetLink(){
    let email = document.getElementById("emailToResetPassword").value;
    fetch(url + `/reset-password`, {
        method: "PUT",
        body: JSON.stringify({
             email
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((resp) => resp.json())
        .then((data) => {
            let alertDiv = document.createElement('alert');
            alertDiv.setAttribute("role","alert" );
            alertDiv.setAttribute("id","alertDiv" );
            if(data.message === "Verification mail is sent"){
                alertDiv.setAttribute("class","alert alert-success" );
                alertDiv.innerHTML = "<strong> Success! </strong>" + data.message + "Please check your email";
                console.log("User Registered Successfully");
                deleteAlert(alertDiv);
            }
            if(data.message === "User doesn't exist"){
                alertDiv.setAttribute("class","alert alert-danger" );
                alertDiv.innerHTML = "<strong>Failure!</strong>" + data.message;
                console.log("User already Registered ");
                deleteAlert(alertDiv);
            }
            document.body.append(alertDiv);
            
            
        })
        return false;
}

function changePassword() {
    console.log("changing password inside function");
    let currentLocation = new URL(window.location.href);
    let objId = JSON.stringify(currentLocation).split("&rs=")[0].split("?id=")[1];
    console.log("inside change password function: objectId is:" +   objId);

    let newPassword = document.getElementById('newPassword').value;
    let reconfirmedPassword = document.getElementById('reEnterPassword').value;
    if(newPassword!== reconfirmedPassword) {
        let alertDiv = document.createElement('alert');
        alertDiv.setAttribute("role","alert" );
        alertDiv.setAttribute("id","alertDiv" );
        alertDiv.setAttribute("class","alert alert-danger" );
        alertDiv.innerHTML = "<strong>Failure! </strong> + <br> + <p> Re-entered Password did not match! </p>";
        deleteAlert(alertDiv);
        document.getElementById('changePasswordDiv').append(alertDiv);
        return false;
    }

    fetch(url + `/change-password/` + objId, {
        method: "PUT",
        body: JSON.stringify({
             password: newPassword
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((resp) => resp.json())
        .then((data) => {
            let alertDiv = document.createElement('alert');
            alertDiv.setAttribute("role","alert" );
            alertDiv.setAttribute("id","alertDiv" );
            if(data.message === "Password Updated Successfully"){
                alertDiv.setAttribute("class","alert alert-success" );
                alertDiv.innerHTML = "<strong> Success! </strong>" + data.message;
                console.log("Password Updated Successfully");
                deleteAlert(alertDiv);
            }
            else {
                alertDiv.setAttribute("class","alert alert-danger" );
                alertDiv.innerHTML = "<strong>Failure!</strong>" + data.message;
                console.log("Error in changing the password");
                deleteAlert(alertDiv);
            }
            document.getElementById('changePasswordDiv').append(alertDiv);
        })
        return false;

}

function deleteAlert(alert){
    setTimeout(function(){
        alert.remove()
    }, 4000)
}
