// script.js

document.addEventListener("DOMContentLoaded", () => {
    const storyContainer = document.getElementById("story-content");
  
    // Get the "story" parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const storyName = urlParams.get("story");
  
    if (storyName) {
      // Fetch the story content from the respective HTML file
      fetch(`../stories/${storyName}.html`)
        .then(response => {
          if (!response.ok) {
            throw new Error("Story not found");
          }
          return response.text();
        })
        .then(data => {
          // Inject the story content into the container
          storyContainer.innerHTML = data;
        })
        .catch(error => {
          storyContainer.innerHTML = `<p>${error.message}. Please select a valid story.</p>`;
        });
    } else {
      storyContainer.innerHTML = "<p>No story selected. Please choose a story to read.</p>";
    }
  });
  