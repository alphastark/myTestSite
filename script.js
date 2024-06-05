const apiBaseUrl = 'https://api.jikan.moe/v4/top'; // Update with actual v4 URL if different

async function fetchData(mediaType) {
  const url = `${apiBaseUrl}/${mediaType}/1/bypopularity`; // Fetch only page 1 for top 20

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }
    const data = await response.json();
    return data.top.slice(0, 20); // Extract only top 20 entries directly
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
    const topData = await fetchData(mediaType);
    topData.forEach(entry => container.appendChild(createEntryElement(entry)));
  } catch (error) {
    // Error handling already handled in fetchData
  } finally {
    hideLoadingIndicator(loadingContainer); // Hide loading indicator regardless of success or error
  }
}

function createEntryElement(data) {
  const mediaType = data.type || 'anime'; // Use "type" property directly (check documentation)

  const fragment = document.createDocumentFragment(); // Improve performance with fragment
  const entryElement = document.createElement('div');
  entryElement.classList.add(mediaType === 'manga' ? 'manga' : 'anime');

  // Access data fields based on Jikan API v4 structure (check documentation)
  const imageUrl = data.images?.jpg?.image_url || "";
  const title = data.title || "No title available";
  const synopsis = data.synopsis || "No synopsis available";
  const truncatedSynopsis = synopsis.substring(0, 150) + "..."; // Truncate synopsis
  const genres = data.genres?.map(genre => genre.name).join(', ') || "No genres available";
  const url = data.url || ""; // Add link to the entry on Jikan

  fragment.innerHTML = `
    <img src="${imageUrl}" alt="${title}">
    <h3><a href="${url}" target="_blank">${title}</a></h3>
    <p class="genres">Genres: ${genres}</p>
    <p class="synopsis">${truncatedSynopsis}</p>
  `;

  entryElement.appendChild(fragment); // Append fragment for efficiency
  return entryElement;
}

function showLoadingIndicator(container) {
  container.querySelector('#loading-indicator').style.display = 'block';
}

function hideLoadingIndicator(container) {
  container.querySelector('#loading-indicator').style.display = 'none';
}

// Media types to fetch
const mediaTypes = ['manga', 'anime'];

window.addEventListener('DOMContentLoaded', () => {
  mediaTypes.forEach(mediaType => createTopList(mediaType, document.getElementById(mediaType + '-container')));
});
