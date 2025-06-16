var a = document.getElementById("loginBtn");
var b = document.getElementById("registerBtn");
var x = document.getElementById("login");
var y = document.getElementById("register");

function login() {
    x.style.left = "4px";
    y.style.right = "-520px";
}

function register() {
    x.style.left = "-510px";
    y.style.right = "5px";
}

document.addEventListener("DOMContentLoaded", function () {
    const registerBtn = document.getElementById("registerSubmitBtn");
    const loginBtn = document.querySelector('#login .submit');

    registerBtn.addEventListener("click", function (event) {
        event.preventDefault();

        const fullName = document.getElementById("fullName").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const phoneNumber = document.getElementById("phoneNumber").value;

        const requestData = { fullName, email, password, phoneNumber };

        fetch("http://localhost:9090/api/libraryMember/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        })
            .then(response => response.json())
            .then(data => {
                console.log("Registration response:", data);

                if (data.message === "Registered successfully") {
                    alert("Registered successfully!");

                    fetch("http://localhost:9090/api/libraryMember/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ email, password })
                    })
                        .then(response => response.json())
                        .then(loginData => {
                            console.log("Login response:", loginData);
                            if (loginData.message === "Login successfully") {
                                alert("Login successful!");
                                window.location.href = "home.html";
                            } else {
                                alert("Login failed: " + loginData.message);
                            }
                        })
                        .catch(error => {
                            console.error("Login error:", error);
                            alert("Login failed.");
                        });
                } else {
                    alert("Registration failed: " + data.message);
                }
            })
            .catch(error => {
                console.error("Registration error:", error);
                alert("Registration failed.");
            });
    });

    loginBtn.addEventListener('click', function (event) {
        event.preventDefault();

        const emailInput = document.querySelector('#login input[type="text"]');
        const passwordInput = document.querySelector('#login input[type="password"]');

        const email = emailInput.value;
        const password = passwordInput.value;

        fetch("http://localhost:9090/api/libraryMember/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
            .then(response => response.json())
            .then(data => {
                console.log("Manual login response:", data);
                if (data.message === "Login successfully") {
                    alert("Login successful!");
                    window.location.href = "home.html";
                } else {
                    alert("Login failed: " + data.message);
                }
            })
            .catch(error => {
                console.error("Login error:", error);
                alert("Login failed.");
            });
    });
});
