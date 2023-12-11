const API_KEY = 'AIzaSyBd8omqHYMF2EcznrGsMf4pnsMH8hoedrk'; 
const VIDEO_ID = 'F4bxfV6dKew'; 

function fetchVideo() {
  fetch(`https://www.googleapis.com/youtube/v3/videos?id=${VIDEO_ID}&key=${API_KEY}&part=snippet`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const videoItem = data.items[0];
      if (!videoItem) {
        throw new Error('Video not found');
      }

      const videoTitle = videoItem.snippet.title;
      const embedUrl = `https://www.youtube.com/embed/${VIDEO_ID}`;

      displayVideo(videoTitle, embedUrl);
    })
    .catch(error => {
      console.error('Error fetching or displaying video:', error);
    });
}

function displayVideo(title, embedUrl) {
  const videoContainer = document.getElementById('video-container');
  videoContainer.innerHTML = `
    <h2>${title}</h2>
    <iframe width="640" height="360" src="${embedUrl}" frameborder="0" allowfullscreen></iframe>
  `;
}

fetchVideo();
