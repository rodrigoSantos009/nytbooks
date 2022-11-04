const apiKey = "E1Qp2iZXo2GrZi56kkyGLlJaN1gcUNYK";

const backButton = document.querySelector("#back");
const booksElement = document.querySelector("#books");
const buttonSearch = document.querySelector("#btn-search");
const inputBook = document.querySelector("#input-book");

const isValidFields = () => {
  return document.querySelector("#input-book").value !== "" ? true : false;
};

const clearField = () => {
  inputBook.value = "";
};

const createBookElements = (book) => {
  const Book = document.createElement("div");
  booksElement.appendChild(Book);
  Book.className = "book";
  Book.innerHTML = `
    <h4 class="book-title">${book.title}</h4>
    <img class="book-img" src="${book.book_image}"/>
    <p class="book-author">${book.author}</p>
    <p class="book-description">${book.description}</p>
    <a class="book-link-buy" href="${book.amazon_product_url}" target="_blank">Compre agora</a>
  `;
};

const clearBookData = () => {
  bookData = document.querySelectorAll("#books>div");
  bookData.forEach((book) => book.parentNode.removeChild(book));
};

const getBooks = async () => {
  const apiBooksURL = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${apiKey}`;
  const res = await fetch(apiBooksURL);
  const data = await res.json();
  return data;
};

const getBookTitle = async () => {
  const data = await getBooks();

  let books = data.results.books;
  let bookFound = false;

  if (isValidFields && inputBook.value !== "") {
    books.forEach((book) => {
      if (book.title.match(inputBook.value.toUpperCase())) {
        bookFound = true;
        createBookElements(book);
        backButton.style.display = "inline";
      }
    });
    if (!bookFound) {
      alert("Not found");
      showBooks();
      backButton.style.display = "none";
    }
    clearField();
  } else {
    alert("Digite o nome de um livro");
    showBooks();
    backButton.style.display = "none";
  }
};

const showBooks = async () => {
  const data = await getBooks();
  const books = data.results.books;
  books.forEach((book) => {
    createBookElements(book);
  });
};

showBooks();

buttonSearch.addEventListener("click", () => {
  getBookTitle();
  clearBookData();
});

inputBook.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    getBookTitle();
    clearBookData();
  }
});