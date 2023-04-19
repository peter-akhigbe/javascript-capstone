import loadShows from './shows.js';
// import { involvementAppID, baseUrl } from '../config/api.js';
import { addLike, getLikes, updateLikes } from './likes.js';

const showsList = document.querySelector('.shows');
const showsCount = document.querySelector('.shows-count');

let shows = [];
let likes = [];

const loadData = async () => {
  const data = await loadShows();
  const getlikes = await getLikes();
  shows = data;
  likes = getlikes;

  showsList.innerHTML = '';

  shows.forEach((item) => {
    let movieLikes = 0;
    if (likes.find((like) => like.item_id === item.id)) {
      movieLikes = likes.find((like) => like.item_id === item.id).likes;
    }
    showsList.innerHTML += `
        <li class="show">
          <div class="show-img-box">
            <img src="${item.image.original}" class="show-img" />
          </div>
          <div class="show-details">
            <div class="show-title">${item.name}</div>
            <div class="show-likes">
              <div class="likes-icon"><i class="fa-regular fa-heart" show-id="${item.id}"></i></div>
              <small class="likes-text" likes-text-id="${item.id}">${movieLikes} ${movieLikes === 1 ? 'like' : 'likes'}</small>
            </div>
          </div>
          <button class="comments-btn">Comments</button>
        </li>
      `;

    const hearts = document.querySelectorAll('.likes-icon i');
    hearts.forEach((heart) => {
      heart.addEventListener('click', () => {
        addLike(Number(heart.getAttribute('show-id')));
        // loadData();
        updateLikes();
        console.log(`clicked ${heart.getAttribute('show-id')}`);
      });
    });
  });

  showsCount.innerHTML = `TV Shows (${shows.length})`;

  // commentFunc(shows);
};

export default loadData;