async function fetchData(mediaType, page) {
  const apiBaseUrl = 'https://api.jikan.moe/v4/top'; // Update with actual v4 URL if different
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
    handleError(mediaType, error); // Delegate error handling with media type information
  }
}

function handleError(mediaType, error) {
  const errorMessageElement = document.getElementById(`${mediaType}-container .error-message`);
  if (errorMessageElement) {
    errorMessageElement.textContent = `An error occurred fetching ${mediaType} data. Please try again later.`;
    errorMessageElement.style.display = 'block'; // Show the error message
  } else {
    console.warn("Error message element not found for", mediaType);
  }
}

async function createTopList(mediaType, container) {
  const loadingContainer = container.querySelector('.loading-container');
  showLoadingIndicator(loadingContainer); // Show loading indicator efficiently

  try {
    const topData = await fetchData(mediaType, 1);
    const limitedData = topData.slice(0, 20); // Get only top 20
    limitedData.forEach(entry => container.appendChild(createEntryElement(entry)));
  } catch (error) {
    // Error handling already handled in fetchData
  } finally {
    hideLoadingIndicator(loadingContainer); // Hide loading indicator regardless of success or error
  }
}

function createEntryElement(data) {
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

  return entryElement;
}

function showLoadingIndicator(container) {
  container.querySelector('#loading-indicator').style.display = 'block';
}

function hideLoadingIndicator(container) {
  container.querySelector('#loading-indicator').style.display = 'none';
}

export { initTopList };  // Export the initialization function

// Initialization function (optional - for potential customization)
function initTopList(mediaType) {
  const container = document.getElementById(`${mediaType}-container`);
  createTopList(mediaType, container);
}
