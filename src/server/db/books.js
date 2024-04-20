const db = require("./client");

async function getAllBooks() {
  const { rows } = await db.query("SELECT * FROM books");
  return rows;
}

async function addNewBook(book) {
  const { title, author, genre, imageurl, type, recommender } = book;

  const { rows } = await db.query(
    `INSERT INTO books (title, author, genre, imageurl, type, recommender)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;`,
    [title, author, genre, imageurl, type, recommender]
  );
  return rows[0];
}

async function getBookById(id) {
  const { rows } = await db.query(
    `
    SELECT * FROM books
    WHERE id = $1
    `,
    [id]
  );

  return rows;
}

module.exports = { getAllBooks, addNewBook, getBookById };
