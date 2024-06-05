const mangaList = document.getElementById("manga-list");
const animeList = document.getElementById("anime-list");

const fetchTopList = async (type, targetList) => {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/top/${type}/1/bypopularity`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${type}`);
    }
    const data = await response.json();
  
    data.data.forEach((item) => {
      const listItem = document.createElement("div");
      listItem.classList.add(`${type}-item`);

      listItem.innerHTML = `
        <img src="${item.images.jpg.image_url}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p class="synopsis">${item.synopsis}</p>
        <div>
          <b>Genres:</b> ${item.genres.map(genre => genre.name).join(", ")}<br>
          <b>Type:</b> ${item.type}
        </div>
        <button>Show Synopsis</button>
      `;

      const synopsis = listItem.querySelector(".synopsis");
      const showSynopsisBtn = listItem.querySelector("button");

      showSynopsisBtn.addEventListener("click", () => {
        synopsis.classList.toggle("synopsis--visible");
        showSynopsisBtn.textContent = synopsis.classList.contains("synopsis--visible") ? "Hide Synopsis" : "Show Synopsis";
      });

      targetList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    // You can display an error message to the user here
  }
};

// Call the functions after the page loads
window.onload = async () => {
  await fetchTopList("manga", mangaList);
  await fetchTopList("anime", animeList);
};
