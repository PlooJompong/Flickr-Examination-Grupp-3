// API
const apiKey = "0ba3e5e52a281ae26a09d3e016ae8d1d";
const method = "flickr.photos.search";
const baseUrl = "https://api.flickr.com/services/rest";

// DOM
const submitBtn = document.querySelector("#input-button");
const textInput = document.querySelector("#search-field");
const imageContainer = document.querySelector("#search-results");

let text = "";
let imgSize = "w"; // 400px

if (text === "") {
  text = "art";
  fetchImages();
}

function fetchImages() {
  let url = `${baseUrl}?api_key=${apiKey}&method=${method}&text=${text}&per_page=20&sort=relevance&format=json&nojsoncallback=1`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // töm containern från tidigare bilder
      imageContainer.innerHTML = "";

      data.photos.photo.forEach((img) => {
        const imgUrl = `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}_${imgSize}.jpg`;

        // skapa ett nytt img-element för varje bild
        const imgElement = document.createElement("img");
        imgElement.src = imgUrl;

        // lägg till nya img-elementet i bildcontainern
        imageContainer.appendChild(imgElement);
      });
    })
    .catch((error) => {
      console.error("Error fetching images:", error);
    });
}

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (textInput.value !== "") {
    text = textInput.value;
    fetchImages();
  } else {
    console.log("textInput är tom");
  }
});
