document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("travel-form");
  const fromInput = document.getElementById("from-location");
  const destinationInput = document.getElementById("destination");
  const fromSuggestionsBox = document.getElementById("from-suggestions");
  const destinationSuggestionsBox = document.getElementById("destination-suggestions");
  const comparisonResults = document.getElementById("comparison-results");
  // Get the "story" parameter from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const storyName = urlParams.get("story");
  // Mock function to fetch place suggestions
  async function fetchPlaceSuggestions(query) {
    // Mock data - replace with actual API calls like Google Places API or any location service
    const mockPlaces = [
      "New York, USA",
      "New Delhi, India",
      "Newcastle, UK",
      "New Orleans, USA",
      "Newport, Australia",
      "Toronto, Canada",
      "Paris, France",
      "Berlin, Germany",
    ];
    return mockPlaces.filter((place) =>
      place.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Populate suggestions dynamically for input field
  async function populateSuggestions(query, suggestionsBox, inputField) {
    if (query.length > 2) {
      const suggestions = await fetchPlaceSuggestions(query);

      // Clear previous suggestions
      suggestionsBox.innerHTML = "";

      // Populate suggestions
      suggestions.forEach((place) => {
        const suggestionDiv = document.createElement("div");
        suggestionDiv.textContent = place;
        suggestionDiv.addEventListener("click", () => {
          inputField.value = place; // Fill the input with selected place
          suggestionsBox.innerHTML = ""; // Clear suggestions
        });
        suggestionsBox.appendChild(suggestionDiv);
      });
    } else {
      suggestionsBox.innerHTML = ""; // Clear suggestions if query is too short
    }
  }

  // Handle typing in the "From" location input field
  fromInput.addEventListener("input", (event) => {
    populateSuggestions(event.target.value, fromSuggestionsBox, fromInput);
  });

  // Handle typing in the "Destination" input field
  destinationInput.addEventListener("input", (event) => {
    populateSuggestions(event.target.value, destinationSuggestionsBox, destinationInput);
  });

  // Mock function to fetch rates from different websites
  async function fetchRates(from, destination, fromDate, toDate) {
    // For demonstration purposes, this function returns mock data
    // Replace this with API calls to your backend or external APIs
    return [
      { site: "Expedia", price: 1200, link: "https://www.expedia.com" },
      { site: "Priceline", price: 1150, link: "https://www.priceline.com" },
      { site: "Makemytrip", price: 1100, link: "https://www.makemytrip.com" },
      { site: "Cleartrip", price: 1120, link: "https://www.cleartrip.com" },
    ];
  }

  // Handle form submission
  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent form from reloading the page

    // Get form values
    const from = fromInput.value;
    const destination = destinationInput.value;
    const fromDate = document.getElementById("from-date").value;
    const toDate = document.getElementById("to-date").value;

    // Clear previous results
    comparisonResults.innerHTML = "<p>Searching for the best rates...</p>";

    // Fetch travel rates
    try {
      const rates = await fetchRates(from, destination, fromDate, toDate);

      // Display results
      comparisonResults.innerHTML = ""; // Clear the loading message
      rates.forEach((rate) => {
        const rateDiv = document.createElement("div");
        rateDiv.innerHTML = `
          <a href="${rate.link}" target="_blank">${rate.site}</a>: $${rate.price}
        `;
        comparisonResults.appendChild(rateDiv);
      });
    } catch (error) {
      comparisonResults.innerHTML = "<p>Failed to fetch rates. Please try again later.</p>";
      console.error("Error fetching rates:", error);
    }
  });
});
// Load stories data from JSON
let currentStoryIndex = 0;
let stories = [];

fetch('stories/stories.json')
  .then(response => response.json())
  .then(data => {
    stories = data;
    displayStory(currentStoryIndex);
  })
  .catch(error => {
    console.error('Error loading the stories:', error);
  });

// Function to display the story based on index
function displayStory(index) {
  const story = stories[index];
  const storyImage = document.getElementById('story-image');
  const storyTitle = document.getElementById('story-title');
  const storyDescription = document.getElementById('story-description');

  // Update the image, title, and description
  

  storyDescription.textContent = story.description;
  storyTitle.textContent = story.title;
  storyImage.src = story.image;
}

// Event listener for "Next" button
document.getElementById('nextBtn').addEventListener('click', () => {
  currentStoryIndex = (currentStoryIndex + 1) % stories.length;
  displayStory(currentStoryIndex);
});

// Event listener for "Prev" button
document.getElementById('prevBtn').addEventListener('click', () => {
  currentStoryIndex = (currentStoryIndex - 1 + stories.length) % stories.length;
  displayStory(currentStoryIndex);
});
