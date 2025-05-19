import { supabase } from './supabase.js';

window.onload = () => {
  fetchTrendingAnime();
  fetchRandomAnime();
};

function fetchAnimeByMood() {
  const mood = document.getElementById('mood').value;
  const animeList = document.getElementById('animeList');
  const randomPage = Math.floor(Math.random() * 10) + 1;
  animeList.innerHTML = '<p>Loading recent anime...</p>';

  fetch(`https://api.jikan.moe/v4/anime?genres=${mood}&order_by=start_date&sort=desc&page=${randomPage}&limit=6`)
    .then(res => res.json())
    .then(data => {
      animeList.innerHTML = '';
      data.data.forEach(anime => {
        animeList.innerHTML += generateAnimeCard(anime);
      });
      setTimeout(() => AOS.refresh(), 100);
    })
    .catch(() => {
      animeList.innerHTML = '<p>Failed to load recent anime. Try again later.</p>';
    });
}
window.fetchAnimeByMood = fetchAnimeByMood;

function fetchTrendingAnime() {
  const trendingList = document.getElementById('trendingList');
  trendingList.innerHTML = 'Loading...';

  fetch('https://api.jikan.moe/v4/top/anime?limit=9')
    .then(res => res.json())
    .then(data => {
      trendingList.innerHTML = '';
      data.data.forEach(anime => {
        const cleanSynopsis = (anime.synopsis || 'No synopsis available.').replace(/["`]/g, "'");
        const slide = document.createElement('li');
        slide.className = 'splide__slide';
        slide.innerHTML = `
          <div class="trending-card" data-aos="fade-up">
            <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
            <h3>${anime.title}</h3>
            <p>${cleanSynopsis.slice(0, 100)}...</p>
            <div class="card-footer">
              <p>Score: ${anime.score || 'N/A'}</p>
              <button 
                onclick="saveAnimeFromCard(this)"
                data-title="${anime.title}"
                data-image="${anime.images.jpg.image_url}"
                data-synopsis="${cleanSynopsis}"
                data-score="${anime.score || 'N/A'}"
              >Save</button>
            </div>
          </div>
        `;
        trendingList.appendChild(slide);
      });

      new Splide('#trendingSplide', {
        type: 'slide',
        perPage: 3,
        perMove: 3,
        gap: '1rem',
        pagination: true,
        arrows: true,
        drag: true,
        breakpoints: {
          768: { perPage: 2, perMove: 2 },
          480: { perPage: 1, perMove: 1 },
        },
      }).mount();

      setTimeout(() => AOS.refresh(), 100);
    });
}

function fetchRandomAnime() {
  const container = document.getElementById('randomAnime');
  container.innerHTML = 'Loading...';

  const promises = Array.from({ length: 3 }, () =>
    fetch('https://api.jikan.moe/v4/random/anime').then(res => res.json())
  );

  Promise.all(promises)
    .then(results => {
      container.innerHTML = '';
      results.forEach(result => {
        const anime = result.data;
        const cleanSynopsis = (anime.synopsis || 'No synopsis available.').replace(/["`]/g, "'");
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-aos', 'fade-up');
        card.innerHTML = `
          <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
          <h3>${anime.title}</h3>
          <p>${cleanSynopsis.slice(0, 100)}</p>
          <p>Score: ${anime.score || 'N/A'}</p>
          <button 
            onclick="saveAnimeFromCard(this)"
            data-title="${anime.title}"
            data-image="${anime.images.jpg.image_url}"
            data-synopsis="${cleanSynopsis}"
            data-score="${anime.score || 'N/A'}"
          >Save</button>
        `;
        container.appendChild(card);
      });

      setTimeout(() => AOS.refresh(), 100);
    })
    .catch(() => {
      container.innerHTML = '<p>Could not load random anime. Try again!</p>';
    });
}
window.fetchRandomAnime = fetchRandomAnime;

function generateAnimeCard(anime) {
  const cleanSynopsis = (anime.synopsis || 'No synopsis available.').replace(/["`]/g, "'");
  return `
    <div class="card" data-aos="fade-up">
      <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
      <h3>${anime.title}</h3>
      <p>${cleanSynopsis.slice(0, 100)}</p>
      <p>Score: ${anime.score || 'N/A'}</p>
      <button 
        onclick="saveAnimeFromCard(this)"
        data-title="${anime.title}"
        data-image="${anime.images.jpg.image_url}"
        data-synopsis="${cleanSynopsis}"
        data-score="${anime.score || 'N/A'}"
      >Save</button>
    </div>
  `;
}


async function saveAnimeFromCard(button) {
    const title = button.dataset.title;
    const image = button.dataset.image;
    const synopsis = button.dataset.synopsis;
    const scoreRaw = button.dataset.score;
    const score = scoreRaw === "N/A" ? null : parseFloat(scoreRaw);
  
    console.log("Save button clicked");
  
    const { data, error } = await supabase.from('watchlist').insert([
      { title, image, synopsis, score }
    ]);
  
    if (error) {
      console.error('Supabase insert error:', error);
      alert('Failed to save anime.');
    } else {
      alert(`${title} added to your watchlist!`);
    }
  }
  


window.fetchAnimeByMood = fetchAnimeByMood;
window.fetchRandomAnime = fetchRandomAnime;
window.saveAnimeFromCard = saveAnimeFromCard;
