const mangaList = document.getElementById('manga-list');
const animeList = document.getElementById('anime-list');

fetch('https://api.jikan.moe/v3/top/manga/1/bypopularity')
    .then(response => response.json())
    .then(data => {
        const topManga = data.top.slice(0, 20); // Get top 20 entries
        topManga.forEach(manga => {
            const mangaItem = document.createElement('li');
            mangaItem.classList.add('manga-item');
            mangaItem.innerHTML = `
                <img src="${manga.image_url}" alt="${manga.title}">
                <h3>${manga.title}</h3>
                <p class="synopsis">${manga.synopsis}</p>
                <p class="genres">Genres: ${manga.genres.map(genre => genre.name).join(', ')}</p>
                <p>Media Type: Manga</p>
            `;
            mangaList.appendChild(mangaItem);
        });
    });

fetch('https://api.jikan.moe/v3/top/anime/1/bypopularity')
    .then(response => response.json())
    .then(data => {
        const topAnime = data.top.slice(0, 20); // Get top 20 entries
        topAnime.forEach(anime => {
            const animeItem = document.createElement('li');
            animeItem.classList.add('anime-item');
            animeItem.innerHTML = `
                <img src="${anime.image_url}" alt="${anime.title}">
                <h3>${anime.title}</h3>
                <p class="synopsis">${anime.synopsis}</p>
                <p class="genres">Genres: ${anime.genres.map(genre => genre.name).join(', ')}</p>
                <p>Media Type: Anime</p>
            `;
            animeList.appendChild(animeItem);
        });
    });
