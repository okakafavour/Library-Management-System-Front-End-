var a = document.getElementById("loginBtn");
var b = document.getElementById("registerBtn");
var x = document.getElementById("login");
var y = document.getElementById("register");

function login (){
    x.style.left = "4px";
    y.style.right =  "-520px";
}

function register (){
    x.style.left = "-510px";
    y.style.right = "5px";
}

document.addEventListener("DOMContentLoaded", function(){
    const registerBtn = document.getElementById("registerSubmitBtn");

    registerBtn.addEventListener("click", function(event){
        event.preventDefault();

        const fullName = document.getElementById("fullName").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const phoneNumber = document.getElementById("phoneNumber").value;

        const requestData = {fullName, email, password, phoneNumber};

        fetch("http://localhost:9090/api/libraryMember/register", {
            method : "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(requestData)
        })
            .then(response => response.json())
            .then(data => {
                alert("Registered successfully!");
                console.log(data);
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Registration failed.");
            });
    });
})
