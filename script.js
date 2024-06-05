// **WARNING: Exposing API key in client-side Javascript is not secure**
// Replace '931a625118d275b4be444b7f828cfab1' with your actual MyAnimeList API key at your own risk

const clientId = '931a625118d275b4be444b7f828cfab1';

const fetchManga = async () => {
  const response = await fetch(`https://api.myanimelist.net/v2/top/manga?limit=20`, {
    headers: {
      'X-MAL-Client-ID': clientId
    }
  });
  const data = await response.json();
  const mangaContainer = document.querySelector('.manga-container');
  
  data.data.forEach(manga => {
    const card = document.createElement('div');
    card.classList.add('manga-card');
    
    const image = document.createElement('img');
    image.src = manga.images.jpg.image_url;
    card.appendChild(image);

    const title = document.createElement('h3');
    title.textContent = manga.title;
    card.appendChild(title);

    const synopsis = document.createElement('p');
    synopsis.textContent = manga.synopsis;
    card.appendChild(synopsis);

    const genres = document.createElement('p');
    genres.textContent = `Genres: ${manga.genres.map(genre => genre.name).join(', ')}`;
    card.appendChild(genres);

    const type = document.createElement('p');
    type.textContent = `Type: ${manga.type}`;
    card.appendChild(type);

    mangaContainer.appendChild(card);
  });
};

const fetchAnime = async () => {
  const response = await fetch(`https://api.myanimelist.net/v2/top/anime?limit=20`, {
    headers: {
      'X-MAL-Client-ID': clientId
    }
  });
  const data = await response.json();
  const animeContainer = document.querySelector('.anime-container');
  
  data.data.forEach(anime => {
    const card = document.createElement('div');
    card.classList.add('anime-card');
    
    const image = document.createElement('img');
    image.src = anime.images.jpg.image_url;
    card.appendChild(image);

    const title = document.createElement('h3');
    title.textContent = anime.title;
    card.appendChild(title);

    const synopsis = document.createElement('p');
    // Limit synopsis length to avoid overwhelming the page
    synopsis.textContent = anime.synopsis.slice(0, 200) + "..."; 
    card.appendChild(synopsis);

    const genres = document.createElement('p');
    genres.textContent = `Genres: ${anime.genres.map(genre => genre.name).join(', ')}`;
    card.appendChild(genres);

    const type = document.createElement('p');
    type.textContent = `Type: ${anime.type}`;
    card.appendChild(type);

    animeContainer.appendChild(card);
  });
};

// Call the functions to fetch and display data on page load
window.addEventListener('DOMContentLoaded', async () => {
  await fetchManga();
  await fetchAnime();
});
