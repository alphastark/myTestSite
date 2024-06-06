const mangaList = document.getElementById("manga-list");
const animeList = document.getElementById("anime-list");

const fetchTopList = async (type, targetList) => {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/top/${type}?filter=bypopularity`); // Fetch the lists for each type (anime and manga)
    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${type}`);
    }
    const data = await response.json();

    data.data.forEach((item) => {
      const listItem = document.createElement("div");
      listItem.classList.add(`${type}-item`); // Create list items for each entry to the anime and manga lists

      listItem.innerHTML = `
        <figure class="item-cover">
          <!-- Display the the cover art for this item -->
          <img src="${item.images.jpg.image_url}" alt="${item.title}">
          <!-- Show the synopsis for this item -->
          <div class="synopsis">${item.synopsis}</div>
        </figure>
        <div>
          <!-- Show the title of this item -->
          <h2><a href="${item.url}">${item.title}</a></h2>
          <!-- List all the alternate titles on new lines -->
          <h3>Alternate titles:</h2> ${item.titles.map(alttitles => alttitles.title).join("<br>")}<br>
          <!-- List the genres for this item -->
          <b>Genres:</b> ${item.genres.map(genre => genre.name).join(", ")}<br>
          <!-- List the type of media (manga, manhwa, tv, movie, ova, etc.) -->
          <b>Type:</b> ${item.type}
        </div>
        <button class="showSynopsis" role="button">Show Synopsis</button>
      `;

      const synopsis = listItem.querySelector(".synopsis");
      const showSynopsisBtn = listItem.querySelector("button");
      const image = listItem.querySelector("img");

      let isSynopsisVisible = false; // Track the initial visibility state

      showSynopsisBtn.addEventListener("click", () => {
        synopsis.classList.toggle("synopsis--visible");
        isSynopsisVisible = !isSynopsisVisible;
        showSynopsisBtn.textContent = isSynopsisVisible ? "Hide Synopsis" : "Show Synopsis";
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
