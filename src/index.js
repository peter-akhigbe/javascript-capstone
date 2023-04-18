import './style.css'
import { loadShows } from './modules/shows.js';

const showsList = document.querySelector('.shows');
const showsCount = document.querySelector('.shows-count');

let shows = [];
const loadData = async () => {
  const data = await loadShows();
  shows = data;
  showsList.innerHTML = '';
  shows.forEach((item) => {
    showsList.innerHTML += `
        <li class="show">
          <div class="show-img-box">
            <img src="${item.image.original}" class="show-img" />
          </div>
          <div class="show-details">
            <div class="show-title">${item.name}</div>
            <div class="show-likes">
              <div class="likes-icon"><i class="fa-regular fa-heart"></i></div>
              <small class="likes-text">99 Likes</small>
            </div>
          </div>
          <button class="comments-btn">Comments</button>
        </li> 
      `;
  });
  showsCount.innerHTML = `TV Shows (${shows.length})`;
};

loadData();