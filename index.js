const apiKey = "0ba3e5e52a281ae26a09d3e016ae8d1d";
const method = "flickr.photos.search";
const baseUrl = "https://api.flickr.com/services/rest";

// let text = document.querySelector("#");
let text = "cars";
let imgSize = "w"; // 400px

let url = `${baseUrl}?api_key=${apiKey}&method=${method}&text=${text}&per_page=20t f&format=json&nojsoncallback=1`;

function fetchImages() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      data.photos.photo.forEach((img) => {
        let imgUrl = `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}_${imgSize}.jpg`;
        console.log(imgUrl);
      });
    })
    .catch((error) => {
      console.error("Error fetching images:", error);
    });
}

fetchImages();

let submitBtn = document.getElementById("button");
submitBtn.addEventListener("submit", fetchImages);

const search = document.getElementById("search");

search.addEventListener("input", (event) => {
  text = event.target.value;
  fetchImages();
});
