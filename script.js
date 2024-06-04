const clientId = "931a625118d275b4be444b7f828cfab1"; // Replace with your actual client ID

const updateLists = async () => {
  const mangaUrl = `https://api.jikan.moe/v3/top/manga/1/bypopularity?limit=20`;
  const animeUrl = `https://api.jikan.moe/v3/top/anime/1/bypopularity?limit=20`;

  const [mangaResponse, animeResponse] = await Promise.all([
    fetch(mangaUrl),
    fetch(animeUrl),
  ]);

  const mangaData = await mangaResponse.json();
  const animeData = await animeResponse.json();

  const mangaList = document.getElementById("top-manga");
  const animeList = document.getElementById("top-anime");

  mangaList.innerHTML = "";
  animeList.innerHTML = "";

  mangaData.top.forEach((manga) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${manga.rank}. ${manga.title}`;
    mangaList.appendChild(listItem);
  });

  animeData.top.forEach((anime) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${anime.rank}. ${anime.title}`;
    animeList.appendChild(listItem);
  });
};

const updateButton = document.getElementById("update-button");

updateButton.addEventListener("click", updateLists);

updateLists(); // Initial fetch on page load
