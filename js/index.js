const booksUrl = "http://localhost:3000/books"


function createBooks() {
  return fetch(booksUrl)
  .then(response => response.json())
  .then(json => renderBooks(json));
}

function renderBooks(json) {
  // console.log(json)
  for (var i = 0; i < json.length; i++) {
    let title = json[i].title;
    let imageUrl = json[i].img_url;
    let description = json[i].description;
    let bookId = json[i].id;
    let userList = json[i].users;
    // console.log(userList)
    createBooksContainer(title, bookId, imageUrl, description, userList);
  }
} 

function createBooksContainer(title, bookId, imageUrl, description, userList) {
  const ul = document.getElementById('list');
  const li = document.createElement('li');
  // li.innerText = title;
  ul.appendChild(li);
  const aTag = document.createElement('a');
  aTag.href = `http://localhost:3000/books/${bookId}`;
  aTag.innerText = title;
  li.appendChild(aTag);
  aTag.addEventListener('click', function(e){
    e.preventDefault();

    createShowPanel(title, bookId, imageUrl, description, userList);
  })
}

function createShowPanel(title, bookId, imageUrl, description, userList) {
  const showPanel = document.getElementById("show-panel");
  showPanel.innerHTML = "";
  // create h5, img, p, p, button
  const h5 = document.createElement('h5');
  const img = document.createElement('img');
  const p1 = document.createElement('p');
  const p2 = document.createElement('p');
  const button = document.createElement('button');
  showPanel.appendChild(h5);
  showPanel.appendChild(img);
  showPanel.appendChild(p1);
  showPanel.appendChild(p2);
  showPanel.appendChild(button);
  h5.innerText = title;
  img.src = imageUrl;
  p1.innerText = description;
  let userNameList = "";
  userList.forEach (user => {
    userNameList += user.username + " | "
  })
  p2.innerText = userNameList;
  button.innerText = "like it 😍"
  button.addEventListener('click', function(e){
    let newUser = {"id":1, "username":"pouros"};
    userList.push(newUser);
    console.log(userList);
    return fetch(`http://localhost:3000/books/${bookId}`,  {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          title: title,
          description: description,
          img_url: imageUrl, 
          users: userList
        }
    ),
    })
    .then(response => response.json());  
  })
}

document.addEventListener("DOMContentLoaded", function() {
  createBooks();
});
