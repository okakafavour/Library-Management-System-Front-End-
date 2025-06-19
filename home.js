
function fetchBooks(){
    fetch("http://localhost:8080/books")
        .then(function (response) {
            if(!response.ok)throw new Error("Failed to fetch book")
            return response.json();
        })
        .then(function(books){
            var gallery = document.getElementById("bookGallery")
            gallery.innerHTML = "";

            books.forEach(function (book){
                var bookCard = document.createElement("div");
                bookCard.className = "bookCard";
                bookCard.innerHTML = `
                
                 <img src="${book.coverImage}" alt="${book.title}">
                 <div class="book-info">
                      <h3>${book.title}</h3>
                      <p>ISBN: ${book.isbn}</p>
                      <p>Author: ${book.author}</p>
                  </div>           
                     `;
                gallery.appendChild(bookCard);
            });
        })
        .catch(function(error) {
            console.error("Error loading books:", error);
        });
}
    window.onload = fetchBooks;

function searchBooks() {
    const query = document.getElementById("searchInput").value.toLowerCase();

    fetch("http://localhost:9090/api/liberian/view-books")
        .then(function (res) {
            if (!res.ok) {
                throw new Error("Failed to fetch books");
            }
            return res.json();
        })
        .then(function (books) {
            const filteredBooks = books.filter(function (book) {
                return book.title.toLowerCase().includes(query) ||
                    book.author.toLowerCase().includes(query);
            });

            displayBooks(filteredBooks);
        })
        .catch(function (error) {
            alert(" Error: " + error.message);
        });
}

function displayBooks(books) {
    const gallery = document.getElementById("bookGallery");
    gallery.innerHTML = "";

    if (books.length === 0) {
        gallery.innerHTML = "<p>🔍 No matching books found.</p>";
        return;
    }

    books.forEach(function (book) {
        const card = document.createElement("div");
        card.className = "book-card";
        card.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>ISBN:</strong> ${book.isbn}</p>
            <p><strong>Year:</strong> ${book.publicationYear}</p>
        `;
        gallery.appendChild(card);
    });
}

function logOut() {
    alert("Logged out!");
    window.location.href = "index.html";
}
