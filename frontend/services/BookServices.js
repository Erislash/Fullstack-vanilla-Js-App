class BookService {
    constructor() {
        this.URI = '/api';
    }

    async getBooks() {
        const response = await fetch(`${this.URI}/books`);
        const books = await response.json();
        return books;
    }

    async saveBook(book) {
        const response = await fetch(`${this.URI}/books`, {
            method: 'POST',
            body: book,
        });

        const data = await response.json();
        console.log(data);
    }

    async deleteBook(bookID) {
        const response = await fetch(`${this.URI}/${bookID}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'DELETE',
        });

        const data = await response.json();
        console.log(data);
    }
}

module.exports = BookService;
