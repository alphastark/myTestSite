const clientId = "YOUR_CLIENT_ID"; // Replace with your actual MyAnimeList API client ID

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

    const processData = (data, listElement) => {
      data.data.forEach((entry) => {
        const listItem = document.createElement("li");
        const image = document.createElement("img");
        const infoContainer = document.createElement("div");
        const title = document.createElement("h3");
        const synopsis = document.createElement("p");
        const type = document.createElement("p");
        const genres = document.createElement("p");

        image.src = entry.images.jpg.image_url || "placeholder.png"; // Set default image if missing
        image.alt = `${entry.title} image`;
        title.textContent = `${entry.rank}. ${entry.title}`;
        synopsis.textContent = entry.synopsis; // Full synopsis
        type.textContent = entry.type;
        genres.textContent =  entry.genres;

        infoContainer.appendChild(title);
        infoContainer.appendChild(synopsis);
        infoContainer.appendChild(genres);
        infoContainer.appendChild(type);
        listItem.appendChild(image);
        listItem.appendChild(infoContainer);

        listElement.appendChild(listItem);
      });
    };

    processData(mangaData, mangaList);
    processData(animeData, animeList);

  } catch (error) {
    console.error("Error fetching data:", error);
    // Optionally display an error message to the user
  }
};

const updateButton = document.getElementById("update-button");

updateButton.addEventListener("click", updateLists);

updateLists(); // Initial fetch on page load
