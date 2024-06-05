const apiBaseUrl = 'https://api.jikan.moe/v4/top'; // Update with actual v4 URL if different
const mediaTypes = ['manga', 'anime'];

async function fetchData(mediaType, page) {
  const url = `${apiBaseUrl}/${mediaType}/${page}/bypopularity`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }
    const data = await response.json();
    return data.data; // Assuming data is nested under "data" in v4 response
  } catch (error) {
    console.error('Error:', error);
    // Display user-friendly error message (optional)
    const errorContainer = document.createElement('div');
    errorContainer.textContent = "An error occurred. Please try again later.";
    document.body.appendChild(errorContainer);
    errorContainer.style.color = 'red';
    errorContainer.style.textAlign = 'center';
  }
}

async function createTopList(mediaType, container) {
  const topData = await fetchData(mediaType, 1);
  const limitedData = topData.slice(0, 20); // Get only top 20
  limitedData.forEach(entry => createEntry(entry, container));
}

function createEntry(data, container) {
  const mediaType = data.attributes?.type || 'anime'; // Default to 'anime' if type is missing

  const entryElement = document.createElement('div');
  entryElement.classList.add(mediaType === 'manga' ? 'manga' : 'anime');

  // Access data fields based on potential nesting (check v4 documentation)
  const imageUrl = data.attributes?.images?.jpg?.image_url || "";
  const title = data.attributes?.title || "No title available";
  const synopsis = data.attributes?.synopsis || "No synopsis available";
  const truncatedSynopsis = synopsis.substring(0, 150) + "..."; // Truncate synopsis
  const genres = data.attributes?.genres?.map(genre => genre.name).join(', ') || "No genres available";

  entryElement.innerHTML = `
    <img src="${imageUrl}" alt="${title}">
    <h3>${title}</h3>
    <p class="genres">Genres: ${genres}</p>
    <p class="synopsis">${truncatedSynopsis}</p>
  `;
  container.appendChild(entryElement);
}

// Call the function for both media types with loading indicator

const loadingIndicator = document.getElementById('loading-indicator');

async function fetchData(mediaType, page) {
  const url = `${apiBaseUrl}/${mediaType}/${page}/bypopularity`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }
    const data = await response.json();
    return data.data; // Assuming data is nested under "data" in v4 response
  } catch (error) {
    console.error('Error:', error);
    // Display user-friendly error message in a designated location
    const errorElement = document.getElementById('error-message'); // Assuming you have an element with this ID
    if (errorElement) {
      errorElement.textContent = "An error occurred. Please try again later.";
      errorElement.style.display = 'block'; // Show the error message
    } else {
      console.warn("No error message element found. Consider adding one for better user experience.");
    }
  }
}


mediaTypes.forEach(mediaType => fetchAndDisplayData(mediaType, document.getElementById(mediaType + '-container')));

