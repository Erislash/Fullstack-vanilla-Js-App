const BookService = require('./services/BookServices.js');
const bookService = new BookService();
const timeago = require('timeago.js');

class UI {
    async renderBooks() {
        const books = await bookService.getBooks();

        const booksCardContainer = document.getElementById('books-cards');
        booksCardContainer.innerHTML = '';
        books.forEach(({ _id, title, author, isbn, imgPath, created_at }) => {
            const container = document.createElement('div');
            container.className = '';

            container.innerHTML = `
                <div class="card m-2">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="${imgPath}" alt="${title} by ${author}" class="img-fluid">
                        </div>
                        <div class="col-md-8">
                            <div class="card-block px-2">
                                <h4 class="card-title">${title}</h4>
                                <p class="card-text">${author}</p>
                                <a href="#" class="btn btn-danger delete" data-id="${_id}">Delete</a>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        ${timeago.format(created_at)}
                    </div>
                </div>
            `;
            booksCardContainer.appendChild(container);
        });
    }

    async addNewBook(book) {
        await bookService.saveBook(book);
        this.clearBookForm();
        this.renderBooks();
    }

    clearBookForm() {
        document.getElementById('book-form').reset();
    }

    renderMessage(message, colorMessage, secondsToRemove) {
        const div = document.createElement('div');
        div.className = `alert alert-${colorMessage} message`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.col-md-4');
        const bookForm = document.querySelector('#book-form');

        container.insertBefore(div, bookForm);
        setTimeout(() => {
            document.querySelector('.message').remove();
        }, secondsToRemove);
    }

    async deleteBook(id) {
        await bookService.deleteBook(id);
        this.renderBooks();
    }
}

module.exports = UI;
