const coverURL = "https://covers.openlibrary.org/b/OLID/"

const alreadyRead = 'https://openlibrary.org/people/devonbarks/books/already-read.json'
const bookshelf = 'https://openlibrary.org/people/devonbarks/lists/OL209537L/On-My-Bookshelf/export?format=json'

async function getMyBooks() {
    const resp = await fetch(alreadyRead);
    const respData = await resp.json();
    const main = document.querySelector('main')

    respData.reading_log_entries.forEach((book) => {
        var img = coverURL + book.work.cover_edition_key + "-M.jpg";
        const bookEl = document.createElement('div');
        bookEl.classList.add('book');

        var link = 'https://openlibrary.org' + book.work.key + '.json';
        //console.log(link);

        var resp2 = await fetch(link);
        var respData2 = await resp2.json();

        respData2.description.forEach(descriptions => {
            console.log(descriptions.value)
        });

        bookEl.innerHTML = `
            <img src="${img}"/>
            <div class="book-info">
                <h3>${book.work.title}</h3>
                <h4>${book.work.author_names}</h4>
                <h5>${book.work.first_publish_year}</h5>
            </div>
            <div class="overview">
            </div>
        `
        main.appendChild(bookEl)
    });

    return respData;
}

async function getMyBookshelf() {
    const resp = await fetch(bookshelf);
    const respData = await resp.json();
    const main = document.querySelector('main')

    respData.reading_log_entries.forEach((book) => {
        var img = coverURL + book.work.cover_edition_key + "-M.jpg";
        const bookEl = document.createElement('div');
        bookEl.classList.add('book');

        bookEl.innerHTML = `
            <img src="${img}"/>
            <div class="book-info">
                <h3>${book.work.title}</h3>
                <h4>${book.work.author_names}</h4>
                <h5>${book.work.first_publish_year}
            </div>
        `
        main.appendChild(bookEl)
    });

    return respData;
}

getMyBooks()

const myBooks = document.querySelector('[my-books]')

myBooks.addEventListener('click', () => {
    getMyBooks()
})