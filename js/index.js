document.addEventListener("DOMContentLoaded", function() {
  main();
});

const booksUrl = `http://localhost:3000/books`;
const usersUrl = `http://localhost:3000/users`;
const user1 = {"id": 1, "username":"pouros"};
const list = document.getElementById('list');
const showPanel = document.getElementById('show-panel');


function main(){
fetchBooks().then(books => displayBookList(books))
}

/*fetch books
  taking books api, and fetching it as a json hash. books => displayBookList(books)
*/
function fetchBooks(){
  return fetch(booksUrl)
  .then(res => res.json())
}



/* display Books
  book.forEach(function(book){

  let title = book.title;

})

*/
function displayBookList(books){
  for (let book of books) {
    let title = book.title;
    let img = book.img_url;
    let desc = book.description;
    let users = book.users;
    let button = document.createElement("button")
    button.innerText = "Read Book";
    let li = document.createElement("li");
    let likeButton = document.createElement("button")
    likeButton.innerText = "Like Button"
    li.innerText = title;
    list.appendChild(li)
    li.addEventListener("click", function(){
      showPanel.innerHTML = `<h2>${title}</h2><img src=${img}></img><p id="desc">${desc}</p>`
      showPanel.appendChild(button)
      showPanel.appendChild(likeButton)


      likeButton.addEventListener("click", function(){
        bookid = book.id;
        let arr = [];
        users.forEach(function(user){
        let name = user.username;
        arr.push(name)
      })
        if (arr.includes( user1.username)){
          console.log("YES")
        }
        else {
          users.push(user1)
          console.log(users)
          patchLikes(bookid, users)
        }
      })
    })
    let ul = document.createElement("ul")

      button.addEventListener("click", function(){
          ul.innerHTML = "";
        for (var i = 0; i < book.users.length; i++) {
          user = book.users[i]
          userName = user.username
          let userli = document.createElement("li")
          userli.innerText = userName
          ul.appendChild(userli)
        }
        showPanel.appendChild(ul)
      })
    }
  }

  function patchLikes(bookid, users){
    fetch(`${booksUrl}/${bookid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "users":users
      })
    })
  }
