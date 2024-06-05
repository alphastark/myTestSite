const mangaContainer = document.querySelector('.manga-container');
const animeContainer = document.querySelector('.anime-container');

const baseUrl = 'https://api.jikan.moe/v3/top/anime'; // Base URL for both requests

async function fetchTopData(type, page) {
  const url = `${baseUrl}/${page}/bypopularity`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }
    const data = await response.json();
    return data.top;
  } catch (error) {
    console.error('Error:', error);
    // Handle error, display message to user if needed
  }
}

async function createTopList(mediaType, container) {
  const topData = await fetchTopData(mediaType, 1);
  const limitedData = topData.slice(0, 20); // Get only top 20
  limitedData.forEach(entry => createEntry(entry, container));
}

function createEntry(data, container) {
  const entryElement = document.createElement('div');
  entryElement.classList.add(data.type === 'manga' ? 'manga' : 'anime');
  let synopsis = data.synopsis ? data.synopsis.substring(0, 150) + "..." : "No synopsis available.";
  entryElement.innerHTML = `
    <img src="${data.image_url}" alt="${data.title}">
    <h3>${data.title}</h3>
    <p class="genres">Genres: ${data.genres.map(genre => genre.name).join(', ')}</p>
    <p class="synopsis">${synopsis}</p>
  `;
  container.appendChild(entryElement);
}

createTopList('manga', mangaContainer);
createTopList('anime', animeContainer);
