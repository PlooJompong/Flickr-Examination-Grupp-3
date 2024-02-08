const apiKey = "0ba3e5e52a281ae26a09d3e016ae8d1d";
const method = "flickr.photos.search";
const baseUrl = "https://api.flickr.com/services/rest";
const submitBtn = document.querySelector("#input-button");

let textInput = document.querySelector("#search-field");
let text = "";
let imgSize = "w"; // 400px

function fetchImages() {
  let url = `${baseUrl}?api_key=${apiKey}&method=${method}&text=${text}&per_page=20t f&format=json&nojsoncallback=1`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // här vill vi hämta vår div med sökresultat
      const imageContainer = document.querySelector("#search-results");
      // töm containern från tidigare bilder
      imageContainer.innerHTML = "";
      data.photos.photo.forEach((img) => {
        let imgUrl = `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}_${imgSize}.jpg`;
        // skapa ett nytt img-element för varje bild
        let imgElement = document.createElement("img");
        imgElement.src = imgUrl;
        // lägg till nya img-elementet i bildcontainern
        imageContainer.appendChild(imgElement);
        console.log(imgUrl);
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
