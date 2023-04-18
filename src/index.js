import './style.css';
import loadShows from './modules/shows.js';

const showsList = document.querySelector('.shows');
const showsCount = document.querySelector('.shows-count');

let shows = [];

const commentFunc = (array) => {
  const commentBtns = document.querySelectorAll('.comments-btn');
  const commentPopup = document.querySelector('.comment-popup');
  const closeBtn = document.querySelector('.close-popup-btn');
  const popupPhoto = document.querySelector('.popup-photo');
  const movieTitle = document.querySelector('.movie-title');
  const movieSummary = document.querySelector('.movie-summary');
  // const submitCommentBtn = document.querySelector('.submit-comment-btn');

  commentBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      commentPopup.style.display = 'flex';
      popupPhoto.src = array[index].image.original;
      movieTitle.textContent = array[index].name;
      movieSummary.innerHTML = array[index].summary;
    });
  });

  closeBtn.addEventListener('click', () => {
    commentPopup.style.display = 'none';
  });
};

const loadData = async () => {
  const data = await loadShows();
  shows = data;
  showsList.innerHTML = '';
  // console.log(shows);

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

  commentFunc(shows);
};

loadData();
