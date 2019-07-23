// document.addEventListener("DOMContentLoaded", function() {});
const booksUrl = "http://localhost:3000/books";

fetch(booksUrl)
  .then(res => res.json())
  .then(json => {
    showBooks(json);
  });

function showBooks(books) {
  let ul = document.getElementById("list");

  books.forEach(function(book) {
    let li = document.createElement("li");

    let bookTitle = book.title;
    li.innerText = bookTitle;
    ul.appendChild(li);

    let button = document.createElement("button");
    button.innerText = "Show More";
    ul.appendChild(button);
    button.setAttribute("id", book.id);
    button.addEventListener("click", showMore);
  });
}

function showMore(e) {
  e.preventDefault();
  let bookId = e.target.id;
  fetch(booksUrl + "/" + bookId)
    .then(res => res.json())
    .then(json => {
      bookInfo(json);
    });
}

function bookInfo(book) {
  let bookId = book.id
  let bookTitle = book.title;
  let bookDesc = book.description;
  let bookPic = book.img_url;
  let likers = book.users;

  let div = document.getElementById("show-panel");
  let ul = document.createElement("ul");
  div.appendChild(ul);
  ul.innerText = bookTitle;

  let img = document.createElement("img");
  div.appendChild(img);
  img.src = bookPic;

  let desc = document.createElement("p");
  desc.innerText = bookDesc;
  div.appendChild(desc);

  likers.forEach(function(liker) {
    let likeList = "";
    let p = document.createElement("p");
    likeList += liker.username;
    p.innerText = likeList + " has liked this book";
    div.appendChild(p);
  });

  let button = document.createElement("button");
  button.innerText = "Like This Book";
  div.appendChild(button);
  button.setAttribute("id", book.id);
  button.addEventListener("click", function(e){

    let newLike = {'id': 1, 'username': "pouros"}
    likers.push(newLike)

      return fetch(booksUrl + "/" + bookId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          id: bookId,
          title: bookTitle,
          description: bookDesc,
          img_url: bookPic,
          users: likers
        })
      }).then(res => res.json());
  });
}
