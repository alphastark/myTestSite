const mangaList = document.getElementById("manga-list");
const animeList = document.getElementById("anime-list");

const fetchTopList = async (type, targetList) => {
  const response = await fetch(`https://api.jikan.moe/v4/top/${type}/1/bypopularity`);
  const data = await response.json();
  
  data.data.forEach((item) => {
    const listItem = document.createElement("div");
    listItem.classList.add(`${type}-item`);

    listItem.innerHTML = `
      <img src="<span class="math-inline">\{item\.images\.jpg\.image\_url\}" alt\="</span>{item.title}">
      <h3><span class="math-inline">\{item\.title\}</h3\>
<p class\="synopsis"\></span>{item.synopsis}</p>
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
};
