document.getElementById("borrowBookForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const userId = document.getElementById("id").value.trim();
    const title = document.getElementById("title").value.trim();
    const responseBox = document.getElementById("borrowResponse");

    if (!userId || !title) {
        responseBox.style.color = "red";
        responseBox.innerText = "Please enter both User ID and Book Title.";
        return;
    }

    fetch(`http://localhost:8080/api/libraryMember/${userId}/borrow/title/${title}`, {
        method: "POST"
    })
        .then(async response => {
            const message = await response.text();
            responseBox.style.color = response.ok ? "green" : "red";
            responseBox.innerText = message;
        })
        .catch(error => {
            responseBox.style.color = "red";
            responseBox.innerText = "Something went wrong: " + error.message;
        });
});