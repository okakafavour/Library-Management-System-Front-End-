document.getElementById("addBookForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const book = {
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        isbn: document.getElementById("isbn").value,
        publicationYear: document.getElementById("publicationYear").value,
        status: document.getElementById("status").value
    };

    fetch("http://localhost:8080/api/liberian/add-books", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(book)
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Failed to add book");
            }
            return response.json(); 
        })
        .then(function (data) {
            alert(" Book added successfully!");
            document.getElementById("addBookForm").reset();
        })
        .catch(function (error) {
            alert(" Error: " + error.message);
        });
});
