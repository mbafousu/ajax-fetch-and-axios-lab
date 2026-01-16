import * as Carousel from "./Carousel.js";

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// Step 0: Store your API key here for reference and easy access.
const API_KEY = "live_nwqmLhcQVU2kACF4jicw8P6woY0mm5veCcvdDC8KlZNP9DIBTk02cL73xH7bgvuT";

/**
 * 1. Create an async function "initialLoad" 
 */
async function initialLoad() {
  try {
    const { data: breeds } = await axios.get("/breeds");

    breeds.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });

  } catch (error) {
    console.error("Error loading breeds:", error);
  }
}


export async function favourite(imgId) {
  console.log("Favourite clicked:", imgId);
}