const mangaListContainer = document.getElementById('mangaList');
const updateButton = document.getElementById('updateButton');

async function loadMangaData() {
    try {
        const cachedData = await caches.match('manga-data'); // Check for cached data

        if (cachedData) {
            const data = await cachedData.json();
            updateMangaList(data);
        } else {
            const response = await fetch('https://api.mangadex.org/manga/popular?limit=20'); // Fetch data if not cached
            const data = await response.json();
            updateMangaList(data);

            // Update cache with new data
            const cache = await caches.open('manga-data');
            await cache.put('manga-data', new Response(JSON.stringify(data)));
        }
    } catch (error) {
        console.error('Error loading manga data:', error);
        // Handle potential errors gracefully (e.g., display an error message)
    }
}

function updateMangaList(mangaList) {
    mangaListContainer.innerHTML = ''; // Clear previous content

    mangaList.forEach(manga => {
        const mangaItem = document.createElement('div');
        mangaItem.classList.add('manga-item');

        const mangaImage = document.createElement('img');
        mangaImage.src = manga.attributes.thumbnail.original;

        const mangaTitle = document.createElement('h3');
        mangaTitle.textContent = manga.attributes.title;

        mangaItem.appendChild(mangaImage);
        mangaItem.appendChild(mangaTitle);

        mangaListContainer.appendChild(mangaItem);
    });
}

// Update button event listener (optional, if you have a way to update data)
updateButton.addEventListener('click', () => {
    // Implement logic to fetch new data and update local storage
    console.log('Update button clicked (not implemented in this local version)');
});

loadMangaData();
