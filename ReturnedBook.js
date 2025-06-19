window.onload = function () {
    const form = document.getElementById("returnBookForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const bookName = document.getElementById("bookName").value.trim();
        const userId = document.getElementById("userId").value.trim();
        const returnDate = document.getElementById("returnDate").value;

        if (!bookName || !userId || !returnDate) {
            displayMessage("All fields are required.", "red");
            return;
        }

        const encodedTitle = encodeURIComponent(bookName);
        const apiUrl = `http://localhost:8080/api/members/${userId}/return/title/${encodedTitle}`;

        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(function (response) {
                if (!response.ok) {
                    return response.text().then(err => {
                        throw new Error(err || "Failed to return book");
                    });
                }
                return response.text();
            })
            .then(function (message) {
                displayMessage(message, "green");
                form.reset();
            })
            .catch(function (error) {
                console.error("Error returning book:", error);
                displayMessage(error.message || "Return failed", "red");
            });
    });
};

function displayMessage(message, color) {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = message;
    messageDiv.style.color = color;
}
