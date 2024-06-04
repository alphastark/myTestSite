const clientId = "931a625118d275b4be444b7f828cfab1"; // Replace with your actual MyAnimeList API client ID

const updateLists = async () => {
  const baseUrl = "https://api.jikan.moe/v4/top"; // Base URL for v4 API
  const limit = 20; // Number of entries to fetch

  try {
    const [mangaResponse, animeResponse] = await Promise.all([
      fetch(`${baseUrl}/manga?limit=${limit}&sort=bypopularity`),
      fetch(`${baseUrl}/anime?limit=${limit}&sort=bypopularity`),
    ]);

    if (!mangaResponse.ok || !animeResponse.ok) {
      throw new Error("Failed to fetch data from MyAnimeList API");
    }

    const mangaData = await mangaResponse.json();
    const animeData = await animeResponse.json();

    const mangaList = document.getElementById("top-manga");
    const animeList = document.getElementById("top-anime");

    mangaList.innerHTML = "";
    animeList.innerHTML = "";

    mangaData.data.forEach((manga) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${manga.rank}. ${manga.title}`;
      mangaList.appendChild(listItem);
    });

    animeData.data.forEach((anime) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${anime.rank}. ${anime.title}`;
      animeList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    // Optionally display an error message to the user
  }
};

const updateButton = document.getElementById("update-button");

updateButton.addEventListener("click", updateLists);

updateLists(); // Initial fetch on page load
