const animeList = document.getElementById('anime-list');
const mangaList = document.getElementById('manga-list');
const updateButton = document.getElementById('update-button');

const clientId = '931a625118d275b4be444b7f828cfab1'; // Replace with placeholder, don't expose secret

const fetchAnime = async () => {
  try {
    const headers = new Headers();
    headers.append('Client-ID', clientId); // Optional header with your client ID

    const response = await fetch(`https://api.myanimelist.net/v2/top/anime?limit=20`, { headers });
    const data = await response.json();
    const anime = data.data;
    animeList.innerHTML = ''; // Clear entries only once before populating

    anime.forEach(anime => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        ${anime.rank}. <strong>${anime.title}</strong><br>
        (Type: ${anime.type}, Score: ${anime.score})
      `;
      animeList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error fetching anime data:', error);
    animeList.innerHTML = '<li>Error fetching data. Please try again later.</li>';
  }
};

const fetchManga = async () => {
  try {
    const headers = new Headers();
    headers.append('Client-ID', clientId); // Optional header with your client ID

    const response = await fetch(`https://api.myanimelist.net/v2/top/manga?limit=20`, { headers });
    const data = await response.json();
    const manga = data.data;
    mangaList.innerHTML = ''; // Clear entries only once before populating

    manga.forEach(manga => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        ${manga.rank}. <strong>${manga.title}</strong><br>
        (Type: ${manga.type}, Score: ${manga.score})
      `;
      mangaList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error fetching manga data:', error);
    mangaList.innerHTML = '<li>Error fetching data. Please try again later.</li>';
  }
};

const updateData = async () => {
  await fetchAnime();
  await fetchManga();
};

updateData(); // Fetch data on page load

updateButton.addEventListener('click', updateData);
