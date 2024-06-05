const clientId = "YOUR_CLIENT_ID"; // Replace with your actual MyAnimeList API client ID
const tabs = document.querySelectorAll('.tab');
const contentSections = document.querySelectorAll('.content-container section');


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
        const genres = document.createElement("p");
        const mediaType = document.createElement("p"); // Separate element for media type

        image.src = entry.images.jpg.image_url || "placeholder.png"; // Set default image if missing
        image.alt = `${entry.title} image`;
        title.textContent = `${entry.rank}. ${entry.title}`;
        synopsis.textContent = entry.synopsis; // Full synopsis
        genres.textContent = `Genres: ${entry.genres.map((genre) => genre.name).join(", ")}`;
        mediaType.textContent = `Type: ${entry.type}`;

        infoContainer.appendChild(title);
        infoContainer.appendChild(synopsis);
        infoContainer.appendChild(genres);
        infoContainer.appendChild(mediaType); // Append media type element
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

tabs.forEach(tab => tab.addEventListener('click', (e) => {
  const targetSection = document.getElementById(e.target.dataset.tab);
  
  tabs.forEach(tab => tab.classList.remove('active'));
  e.target.classList.add('active');
  
  contentSections.forEach(section => section.style.display = 'none');
  targetSection.style.display = 'block';
}));
