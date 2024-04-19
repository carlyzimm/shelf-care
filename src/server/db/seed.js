const db = require("./client");
const { createUser } = require("./users");

const users = [
  {
    name: "Carly Zimmerman",
    email: "carly@example.com",
    password: "carly123",
  },
  {
    name: "Sammie Springsteen",
    email: "sammie@example.com",
    password: "sammie123",
  },
  {
    name: "Colette Archer",
    email: "colette@example.com",
    password: "colette123",
  },
  {
    name: "Clair Seville",
    email: "clair@example.com",
    password: "clair123",
  },
  {
    name: "Lauren Dougherty",
    email: "lauren@example.com",
    password: "lauren123",
  },
  {
    name: "Kaela Medlyn",
    email: "kaela@example.com",
    password: "kaela123",
  },
  {
    name: "Haley Dugan",
    email: "haley@example.com",
    password: "haley123",
  },
];

const dropTables = async () => {
  try {
    await db.query(`
        DROP TABLE IF EXISTS reviews;
        DROP TABLE IF EXISTS books;
        DROP TABLE IF EXISTS users;
        `);
  } catch (err) {
    throw err;
  }
};

const createTables = async () => {
  try {
    await db.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) DEFAULT 'name',
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        );
        CREATE TABLE books(
          id SERIAL PRIMARY KEY,
          title TEXT,
          author TEXT,
          genre TEXT,
          imageurl TEXT,
          type TEXT,
          recommender TEXT
        );
        CREATE TABLE reviews(
          id SERIAL PRIMARY KEY,
          user_id INT REFERENCES users(id),
          book_id INT REFERENCES books(id),
          content TEXT
        );`);
  } catch (err) {
    throw err;
  }
};

const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser({
        name: user.name,
        email: user.email,
        password: user.password,
      });
    }
    console.log("Seed data inserted successfully.");
  } catch (error) {
    console.error("Error inserting seed data:", error);
  }
};

const addBooks = async () => {
  await db.query(`
  INSERT INTO books (title, author, genre, imageurl, type, recommender)
  VALUES ('The Seven Husbands of Evelyn Hugo', 'Taylor Jenkins Reid', 'Historical Fiction/Romance', 'https://m.media-amazon.com/images/I/71KcUgYanhL._AC_UF1000,1000_QL80_.jpg', 'clubpick', 'none'),
  ('The Paris Apartment', 'Lucy Foley', 'Thriller', 'https://m.media-amazon.com/images/I/81AqVcL4OML._AC_UF1000,1000_QL80_.jpg', 'clubpick', 'none'),
  ('The Good Part', 'Sophie Cousens', 'Fiction', 'https://m.media-amazon.com/images/I/71WXuWQlYuL._AC_UF1000,1000_QL80_.jpg', 'clubpick', 'none'),
  ('One By One', 'Ruth Ware', 'Thriller', 'https://m.media-amazon.com/images/I/81d6gX6RJRL._AC_UF1000,1000_QL80_.jpg', 'clubpick', 'none'),
  ('The Measure', 'Nikki Erlick', 'Fiction', 'https://m.media-amazon.com/images/I/9134SJNuHxL._AC_UF1000,1000_QL80_.jpg', 'clubpick', 'none'),
  ('The Will of the Many', 'James Islington', 'Fantasy', 'https://m.media-amazon.com/images/I/51aBJ7zJBCL.jpg', 'clubpick', 'none'),
  ('Mad Honey', 'Jodi Picoult and Jennifer Finney Boylan', 'Fiction', 'https://m.media-amazon.com/images/I/A1ymg0b1mLL._AC_UF1000,1000_QL80_DpWeblab_.jpg', 'rec', 'Sammie'),
  ('Throne of Glass', 'Sarah J Maas', 'Fantasy', 'https://m.media-amazon.com/images/I/81dfq9ywlaL._AC_UF1000,1000_QL80_.jpg', 'rec', 'Haley'),
  ('In Five Years', 'Rebecca Serle', 'Fiction', 'https://m.media-amazon.com/images/I/81YtGlXiWAL._AC_UF1000,1000_QL80_.jpg', 'rec', 'Lauren'),
  ('The Giver of Stars', 'Jojo Moyes', 'Historical Fiction', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc-9iMKPgDafWJVMyrCT1tWe0y8tE6t1bQs4sXqm_49Q&s', 'rec', 'Carly'),
  ('Project Hail Mary', 'Andy Weir', 'Science Fiction', 'https://m.media-amazon.com/images/I/81zD9kaVW9L._AC_UF1000,1000_QL80_.jpg', 'rec', 'Carly')
  `);
};

const addReviews = async () => {
  await db.query(`
  INSERT INTO reviews (user_id, book_id, content)
  VALUES (1, 1, 'I loved this book so much!')`);
};

const seedDatabse = async () => {
  try {
    db.connect();
    await dropTables();
    await createTables();
    await insertUsers();
    await addBooks();
    await addReviews();
  } catch (err) {
    throw err;
  } finally {
    db.end();
  }
};

seedDatabse();
