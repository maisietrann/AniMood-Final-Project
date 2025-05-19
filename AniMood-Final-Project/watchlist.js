import { supabase } from './supabase.js';

const container = document.getElementById('watchlistContainer');

async function loadWatchlist() {
  const { data, error } = await supabase.from('watchlist').select('*');

  if (error) {
    container.innerHTML = '<p>Failed to load your watchlist.</p>';
    console.error('Supabase error:', error);
    return;
  }

  if (!data || data.length === 0) {
    container.innerHTML = '<p>No saved anime yet.</p>';
    return;
  }

  container.innerHTML = '';
  data.forEach(anime => {
    const short = anime.synopsis?.slice(0, 100) || '';
    const card = document.createElement('div');
    card.className = 'watchlist-item';
    card.innerHTML = `
      <img src="${anime.image}" alt="${anime.title}" class="watchlist-img">
      <div class="watchlist-text">
        <h3>${anime.title}</h3>
        <p class="short-description">${short}...</p>
        <p class="full-description" style="display:none;">${anime.synopsis}</p>
        <p><strong>Score:</strong> ${anime.score || 'N/A'}</p>
        <div class="button-group">
          <button class="desc-btn" onclick="toggleDescription(this)">Show Full Description</button>
          <button class="remove-btn" onclick="removeAnime(${anime.id})">Remove</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

window.toggleDescription = function (button) {
  const card = button.closest('.watchlist-text');
  const full = card.querySelector('.full-description');
  const short = card.querySelector('.short-description');
  const isHidden = full.style.display === 'none';

  full.style.display = isHidden ? 'block' : 'none';
  short.style.display = isHidden ? 'none' : 'block';
  button.textContent = isHidden ? 'Hide Full Description' : 'Show Full Description';
};

window.removeAnime = async function (id) {
  const { error } = await supabase.from('watchlist').delete().eq('id', id);

  if (error) {
    console.error('Failed to remove anime:', error);
    alert('Could not remove anime.');
    return;
  }

  alert('Anime removed!');
  loadWatchlist(); 
};

window.onload = loadWatchlist;
