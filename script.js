const mangaContainer = document.querySelector('.manga-container');
const animeContainer = document.querySelector('.anime-container');

fetch('https://api.jikan.moe/v3/top/manga/1/bypopularity')
  .then(response => response.json())
  .then(data => {
    const topManga = data.top.slice(0, 20); // Get only top 20
    topManga.forEach(manga => createMangaEntry(manga));
  });

fetch('https://api.jikan.moe/v3/top/anime/1/bypopularity')
  .then(response => response.json())
  .then(data => {
    const topAnime = data.top.slice(0, 20); // Get only top 20
    topAnime.forEach(anime => createAnimeEntry(anime));
  });

function createMangaEntry(manga) {
  const mangaEntry = document.createElement('div');
  mangaEntry.classList.add('manga');
  // Check if synopsis is available and truncate if too long
  let synopsis = manga.synopsis ? manga.synopsis.substring(0, 150) + "..." : "No synopsis available.";
  mangaEntry.innerHTML = `
    <img src="${manga.image_url}" alt="${manga.title}">
    <h3>${manga.title}</h3>
    <p class="genres">Genres: ${manga.genres.map(genre => genre.name).join(', ')}</p>
    <p class="synopsis">${synopsis}</p>
  `;
  mangaContainer.appendChild(mangaEntry);
}

function createAnimeEntry(anime) {
  const animeEntry = document.createElement('div');
  animeEntry.classList.add('anime');
  // Check if synopsis is available and truncate if too long
  let synopsis = anime.synopsis ? anime.synopsis.substring(0, 150) + "..." : "No synopsis available.";
  animeEntry.innerHTML = `
    <img src="${anime.image_url}" alt="${anime.title}">
    <h3>${anime.title}</h3>
    <p class="genres">Genres: ${anime.genres.map(genre => genre.name).join(', ')}</p>
    <p class="synopsis">${synopsis}</p>
  `;
  animeContainer.appendChild(animeEntry);
}
