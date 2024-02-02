let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.getElementById("toy-collection");
  const form = document.querySelector(".add-toy-form");
  const nameInput = form.querySelector('input[name="name"]');
  const imageInput = form.querySelector('input[name="image"]');
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch("http://localhost:3000/toys")
  .then(function (response) {
    return response.json();
  })
  .then(function (toys) {
    for (const toy of toys) {
      let toyCard = document.createElement("div");
      toyCard.className = "card"

      let name = document.createElement("h2");
      name.textContent = toy.name;
      toyCard.appendChild(name);

      let image = document.createElement("img");
      image.className = "toy-avatar"
      image.src = toy.image;
      toyCard.appendChild(image);

      let likes = document.createElement("p");
      likes.id = toy.id;
      likes.textContent = toy.likes + " " + "likes";
      toyCard.appendChild(likes);

      let likeButton = document.createElement("button")
      likeButton.className = "like-btn"
      likeButton.textContent = "Like <3";
      toyCard.appendChild(likeButton);
      likeButton.addEventListener("click", function() {
        fetch(`http://localhost:3000/toys/${toy.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            "likes": parseInt(likes.textContent) + 1
          }),
        })
        .then(function (response) {
          return response.json();
        })
        .then(function (updatedToy) {
          likes.textContent = `${updatedToy.likes} likes`
        })
        .catch(function (error) {
          alert("ERROR!");
          console.log(error.message);
        });
      });

      toyCollection.appendChild(toyCard)
    }
  });

  form.addEventListener("submit", function(event) {
    event.preventDefault();
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        "name": nameInput.value,
        "image": imageInput.value,
        "likes": 0
      })
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (newToy) {
      let toyCard = document.createElement("div");
      toyCard.className = "card"

      let name = document.createElement("h2");
      name.textContent = newToy.name;
      toyCard.appendChild(name);

      let image = document.createElement("img");
      image.className = "toy-avatar"
      image.src = newToy.image;
      toyCard.appendChild(image);

      let likes = document.createElement("p");
      likes.id = newToy.id;
      likes.textContent = newToy.likes + " " + "likes";
      toyCard.appendChild(likes);

      let likeButton = document.createElement("button")
      likeButton.className = "like-btn"
      likeButton.textContent = "Like <3";
      toyCard.appendChild(likeButton);
      likeButton.addEventListener("click", function() {
        fetch(`http://localhost:3000/toys/${newToy.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            "likes": parseInt(likes.textContent) + 1
          }),
        })
        .then(function (response) {
          return response.json();
        })
        .then(function (updatedToy) {
          likes.textContent = `${updatedToy.likes} likes`
        })
        .catch(function (error) {
          alert("ERROR!");
          console.log(error.message);
        });
      });

      toyCollection.appendChild(toyCard)
    })
    .catch(function (error) {
      alert("ERROR!");
      console.log(error.message);
    });
  });
});
