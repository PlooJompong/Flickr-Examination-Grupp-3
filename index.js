// API
const apiKey = "0ba3e5e52a281ae26a09d3e016ae8d1d";
const method = "flickr.photos.search";
const baseUrl = "https://api.flickr.com/services/rest";

// DOM
const inputContainer = document.querySelector("#input-container");
const submitBtn = document.querySelector("#input-button");
const textInput = document.querySelector("#search-field");
const imageContainer = document.querySelector("#section-results");
const currentPage = document.querySelector("#current-page");
const previousPageButton = document.querySelector("#prev-page");
const nextPageButton = document.querySelector("#next-page");

// createElement
const errorEmpty = document.createElement("p");

let text = "";
let imgSize = "w"; // 400px
let page = 1;

if (text === "") {
  text = "art";
  fetchImages();
}

function fetchImages() {
  let url = `${baseUrl}?api_key=${apiKey}&method=${method}&text=${text}&page=${page}&per_page=20&sort=relevance&format=json&nojsoncallback=1`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      imageContainer.innerHTML = "";

      data.photos.photo.forEach((img) => {
        const imgUrl = `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}_${imgSize}.jpg`;
        displayImage(imgUrl);
      });

      const lightbox = document.createElement("div");
      lightbox.id = "lightbox";
      imageContainer.appendChild(lightbox);

      const images = document.querySelectorAll("img:not(#img-header)");
      images.forEach((image) => {
        image.addEventListener("click", () => {
          lightbox.classList.add("active");
          const img = document.createElement("img");
          img.src = image.src;
          while (lightbox.firstChild) {
            lightbox.removeChild(lightbox.firstChild);
          }
          lightbox.appendChild(img);
        });
      });

      lightbox.addEventListener("click", (e) => {
        if (e.target !== e.currentTarget) return;
        lightbox.classList.remove("active");
      });
    })
    .catch((error) => {
      const errorMsg = document.createElement("p");
      errorMsg.innerText = `Error fetching images: ${error}`;
      errorMsg.classList.add("errorMsg");
      imageContainer.appendChild(errorMsg);
    });
}

function displayImage(imgUrl) {
  const imgElement = document.createElement("img");
  imgElement.src = imgUrl;
  imageContainer.appendChild(imgElement);
}

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (textInput.value !== "") {
    if (textInput.value !== text) {
      page = 1;
    } else if (textInput.value === text) {
      inputContainer.appendChild(errorEmpty);
      errorEmpty.classList.remove("errorEmpty");
      errorEmpty.classList.add("alreadyShowing");
      errorEmpty.innerText = `*${text} is already showing!`;
      textInput.value = "";
      return;
    }
    text = textInput.value;
    currentPage.innerText = page;
    textInput.value = "";
    fetchImages();
    errorEmpty.remove();
  } else {
    errorEmpty.classList.remove("alreadyShowing");
    inputContainer.appendChild(errorEmpty);
    errorEmpty.classList.add("errorEmpty");
    errorEmpty.innerText = "*The input is empty!";
  }
});

previousPageButton.addEventListener("click", () => {
  if (page > 1) {
    page--;
    fetchImages();
    currentPage.innerText = page;
  }
});

nextPageButton.addEventListener("click", () => {
  page++;
  fetchImages();
  currentPage.innerText = page;
});
