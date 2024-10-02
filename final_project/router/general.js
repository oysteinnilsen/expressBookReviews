const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  // Send list of available books in shop
  res.status(200).send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function(req, res) {
  // Read the data from URL
  const isbn = req.params.isbn;
  let book = books[isbn]; // Retrieve the requested book from the database
  // Return book details based on ISBN
  res.status(200).send(book);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  // Read data from URL
  const author = req.params.author;
  // Retreive the books of the author
  const filteredBooks = filterBooksByAuthor(books, author);
  // Send the filtered books to the client
  return res.status(200).send(filteredBooks);
});

// Creates a function to iterate through the JSON object searching for authors
function filterBooksByAuthor(books, authorName) {
    let filteredBooks = {};
    for (let key in books) {
        if (books[key].author == authorName) {
            filteredBooks[key] = books[key];
        }
    }
    return filteredBooks;
}

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  // Read argument from URL
  const title = req.params.title;
  // Call function to filter books
  const filteredBooks = filterBooksByTitle(books, title);
  return res.status(200).send(filteredBooks);
});

// Creates a function to iterate through the JSON object searching for titles
function filterBooksByTitle(books, titleName) {
    let filteredBooks = {};
    for (let key in books) {
        if (books[key].title == titleName) {
            filteredBooks[key] = books[key];
        }
    }
    return filteredBooks;
}

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  // Read argument from HTTP Get request
  const isbn = req.params.isbn;
  // Send review of requested book to client
  return res.status(200).send(books[isbn].reviews);
});

module.exports.general = public_users;
