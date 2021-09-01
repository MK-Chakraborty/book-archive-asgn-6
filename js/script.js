const bookContainer = document.getElementById('bookContainer');

// Fetching Data from api
document.getElementById('searchBtn').addEventListener('click', () => {
    bookContainer.textContent = '';
    const searchedItem = document.getElementById('searchBox').value;

    // if search box is empty
    if (searchedItem === '') {
        document.getElementById('totalBook').innerText = 'Search Field can\'t be empty.';
        return;
    }

    document.getElementById('totalBook').innerText = '';
    const url = `https://openlibrary.org/search.json?q=${searchedItem}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayBook(data));
});



// Displaying data

const displayBook = books => {
    document.getElementById('searchBox').value = '';
    document.getElementById('totalBook').innerText = `${books.numFound} Books Found`;
    books.docs.forEach(book => {

        // placeholder image when cover_i isn't available
        if (!book.cover_i) { book.cover_i = 9289367; }

        bookContainer.innerHTML += `
            <div class="card my-5" style="width: 24rem;">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h3 class="card-title fs-3 fw-bold">${book.title}</h3>
                    <h5 class="card-text fs-5">Authors: ${book.author_name ? book.author_name : 'Unavailable'}</h5>
                    <h5 class="card-text fs-5">Publish year: ${book.first_publish_year ? book.first_publish_year : 'Unavailable'}</h5>
                </div>
            </div>
    `;
    });

}