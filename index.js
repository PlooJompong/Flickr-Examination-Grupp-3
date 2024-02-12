// API
const apiKey = "0ba3e5e52a281ae26a09d3e016ae8d1d";
const method = "flickr.photos.search";
const baseUrl = "https://api.flickr.com/services/rest";

// DOM
const submitBtn = document.querySelector("#input-button");
const textInput = document.querySelector("#search-field");
const imageContainer = document.querySelector("#section-results");

//Paging 
let currentPage = 1;
const previousPageButton = document.querySelector("#prev-page");
const nextPageButton = document.querySelector("#next-page");

previousPageButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    fetchImages();
  }
});

nextPageButton.addEventListener("click", () => {
  currentPage++;
  fetchImages();
});

let text = "";
let imgSize = "w"; // 400px

if (text === "") {
  text = "art";
  fetchImages();
}

function fetchImages() {
  let url = `${baseUrl}?api_key=${apiKey}&method=${method}&text=${text}&page=${currentPage}&per_page=20&sort=relevance&format=json&nojsoncallback=1`;
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
      const errorMsg = document.createElement("p");
      errorMsg.textContent = `Error fetching images: ${error}`;
      errorMsg.style.color = "red";
      errorMsg.style.fontSize = "11px";
      console.error("Error fetching images:", error);
    });
}

let errorAdded = false;
const errorEmpty = document.createElement("p");
errorEmpty.style.fontSize = "11px";
errorEmpty.style.display = "block";
errorEmpty.style.fontStyle = "italic";
errorEmpty.style.margin = "0";
errorEmpty.style.alignSelf = "center";

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (textInput.value !== "") {
    text = textInput.value;
    fetchImages();
    errorEmpty.textContent = "";
    errorAdded = false;
  } else {
    if (!errorAdded) {
      errorEmpty.textContent = "Textfältet är tomt";
      const form = document.getElementsByTagName("form")[0];
      submitBtn.insertAdjacentElement("afterend", errorEmpty);
      errorAdded = true;
    }
    console.log("textInput är tom");
  }
});
