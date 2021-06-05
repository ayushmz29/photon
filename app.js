// API Auth Key
const auth = "563492ad6f91700001000001d64b561fb64647279774fef480dfdf88";

const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const showmore = document.querySelector(".show-more-btn");

let searchValue = "";
let page = 1;
let fetchLink;
let currentSearch;

// Adding Event Listeners:-
searchInput.addEventListener("input", updateInput);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});

showmore.addEventListener("click", loadMore);

// funtion to update the searchValue with new value enterd by user
function updateInput(event) {
  searchValue = event.target.value;
}

// function to fetch data from api
async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });

  const data = await dataFetch.json();
  return data;
}

// function to generate photos
function generatePhotos(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    // Adda a class name to the retrived photo (div)
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
      <img src=${photo.src.large}></img>
      <div class="gallery-info">
        <p>${photo.photographer}</p>
        <a href=${photo.src.original} target="__blank">Download</a>
      </div>    
    `;

    // Add the retrieved photo to existing photos
    // .appendChild() method to append html-element into it's parent element (div)
    gallery.appendChild(galleryImg);
  });
}

// function to remove the previous photos from page and clear the prev input from search bar
function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}

async function curatedPhotos() {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
  const data = await fetchApi(fetchLink);

  generatePhotos(data);
}

// function to call when user search for photos
async function searchPhotos(query) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);

  generatePhotos(data);
}

// Funtion to call when Show-More button is clicked
async function loadMore() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generatePhotos(data);
}

curatedPhotos();
