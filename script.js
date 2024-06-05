const baseUrl = 'https://api.jikan.moe/v4/top'; // Update with actual v4 URL if different
const mediaTypes = ['manga', 'anime'];

async function fetchTopData(mediaType, page) {
  const url = `${baseUrl}/${mediaType}/${page}/bypopularity`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }
    const data = await response.json();
    return data.data; // Assuming data is nested under "data" in v4 response
  } catch (error) {
    console.error('Error:', error);
    // Handle error, display user-friendly message (e.g., "An error occurred. Please try again later.")
  }
}

async function createTopList(mediaType, container) {
  const topData = await fetchTopData(mediaType, 1);
  const limitedData = topData.slice(0, 20); // Get only top 20
  limitedData.forEach(entry => createEntry(entry, container));
}

function createEntry(data, container) {
  const mediaType = data.attributes?.type || 'anime'; // Default to 'anime' if type is missing
  const entryElement = document.createElement('div');
  entryElement.classList.add(mediaType === 'manga' ? 'manga' : 'anime');

  // Access data fields based on potential nesting (check v4 documentation)
  let imageUrl = data.attributes?.images?.jpg?.image_url || "";
  let title = data.attributes?.title || "No title available";
  let synopsis = data.attributes?.synopsis || "No synopsis available";
  synopsis = synopsis.substring(0, 150) + "..."; // Truncate synopsis
  let genres = data.attributes?.genres?.map(genre => genre.name).join(', ') || "No genres available";

  entryElement.innerHTML = `
    <img src="${imageUrl}" alt="${title}">
    <h3>${title}</h3>
    <p class="genres">Genres: ${genres}</p>
    <p class="synopsis">${synopsis}</p>
  `;
  container.appendChild(entryElement);
}

mediaTypes.forEach(mediaType => createTopList(mediaType, mediaType === 'manga' ? mangaContainer : animeContainer));
