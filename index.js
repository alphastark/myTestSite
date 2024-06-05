import { initTopList } from './api'; // Import the initialization function

// Media types to fetch
const mediaTypes = ['manga', 'anime'];

window.addEventListener('DOMContentLoaded', () => {
  mediaTypes.forEach(mediaType => initTopList(mediaType));
});
