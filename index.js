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


//------------------------------------------------------
// 1 & 2 solution
//-----------------------------------------------------

// Helper: progress bar

function setProgress(value) {
  if (!progressBar) return;
  progressBar.style.width = `${value}%`;
  progressBar.setAttribute("aria-valuenow", value);
}


// Load breed images + info

async function loadBreedData(breedId) {
  try {
    setProgress(20);

    // Clear carousel & info
    Carousel.clear();
    infoDump.innerHTML = "";

    // Fetch MULTIPLE images
    const res = await fetch(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&limit=8`,
      {
        headers: {
          "x-api-key": API_KEY
        }
      }
    );

    const images = await res.json();

    // Build carousel items
    images.forEach((img) => {
      const breedName = img.breeds?.[0]?.name ?? "Cat";

      const carouselItem = Carousel.createCarouselItem(
        img.url,
        `${breedName} image`,
        img.id
      );

      Carousel.appendCarousel(carouselItem);
    });

    // Breed info section
    const breed = images?.[0]?.breeds?.[0];

    if (breed) {
      const title = document.createElement("h2");
      title.textContent = breed.name;

      const meta = document.createElement("p");
      meta.innerHTML = `
        <strong>Origin:</strong> ${breed.origin}<br/>
        <strong>Life span:</strong> ${breed.life_span} years<br/>
        <strong>Temperament:</strong> ${breed.temperament}
      `;

      const desc = document.createElement("p");
      desc.textContent = breed.description;

      infoDump.append(title, meta, desc);

      if (breed.wikipedia_url) {
        const link = document.createElement("a");
        link.href = breed.wikipedia_url;
        link.target = "_blank";
        link.textContent = "Learn more on Wikipedia";
        infoDump.appendChild(link);
      }
    }

    // Restart carousel
    Carousel.start();

    setProgress(100);
    setTimeout(() => setProgress(0), 400);
  } catch (err) {
    console.error("Error loading breed data:", err);
    infoDump.textContent = "Failed to load breed data.";
    setProgress(0);
  }
}

// Event handler 
breedSelect.addEventListener("change", (e) => {
  loadBreedData(e.target.value);
});


// Initial load (breeds)

async function initialLoad() {
  try {
    setProgress(10);

    const res = await fetch("https://api.thecatapi.com/v1/breeds", {
      headers: {
        "x-api-key": API_KEY
      }
    });

    const breeds = await res.json();

    breedSelect.innerHTML = "";

    breeds.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });

    // Create initial carousel
    if (breeds.length > 0) {
      breedSelect.value = breeds[0].id;
      loadBreedData(breeds[0].id);
    }

    setProgress(100);
    setTimeout(() => setProgress(0), 400);
  } catch (err) {
    console.error("Error loading breeds:", err);
    infoDump.textContent = "Failed to load breeds.";
    setProgress(0);
  }
}

// Execute immediately 
initialLoad();


// export for Carousel.js

export function favourite(imgId) {
  console.log("Favourite clicked:", imgId);
}
