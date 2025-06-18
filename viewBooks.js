window.onload = function () {
    fetch("http://localhost:9090/api/liberian/view-books")
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Failed to load books");
            }
            return response.json();
        })
        .then(function (books) {
            const tableBody = document.getElementById("bookTableBody");
            tableBody.innerHTML = "";

            books.forEach(function (book) {
                const row = document.createElement("tr");

                const titleCell = document.createElement("td");
                titleCell.textContent = book.title;

                const authorCell = document.createElement("td");
                authorCell.textContent = book.author;

                const isbnCell = document.createElement("td");
                isbnCell.textContent = book.isbn;

                const publicationYearCell = document.createElement("td");
                publicationYearCell.textContent = book.publicationYear;

                const statusCell = document.createElement("td");

                const status = book.status ? book.status.toLowerCase() : "";
                statusCell.textContent = status === "borrowed" ? "Borrowed" : "Available";

                row.appendChild(titleCell);
                row.appendChild(authorCell);
                row.appendChild(isbnCell);
                row.appendChild(publicationYearCell);
                row.appendChild(statusCell);

                tableBody.appendChild(row);
            });
        })
        .catch(function (error) {
            console.error("Error fetching books:", error);
            const tableBody = document.getElementById("bookTableBody");
            tableBody.innerHTML = "<tr><td colspan='4'> Error loading books</td></tr>";
        });
};
