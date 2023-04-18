import './style.css';
import loadShows from './modules/shows.js';
import { involvementAppID, baseUrl } from './config/api.js';

const commentUrl = `${baseUrl}apps/${involvementAppID}/comments`;

const showsList = document.querySelector('.shows');
const showsCount = document.querySelector('.shows-count');

let shows = [];

const getComment = async (id) => {
  const response = await fetch(`${commentUrl}?item_id=${id}`);
  const data = await response.json();
  return data;
};

const postComment = (id, list) => {
  const nameInput = document.querySelector('.name-input');
  const commentInput = document.querySelector('.comment-input');
  const submitCommentBtn = document.querySelector('.submit-comment-btn');

  submitCommentBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const username = nameInput.value;
    const comment = commentInput.value;

    if (username && comment) {
      const data = { item_id: id, username, comment };

      fetch(commentUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then(() => {
        nameInput.value = '';
        commentInput.value = '';

        getComment(id).then((arr) => {
          list.innerHTML = '';
          arr.forEach((item) => {
            const comment = document.createElement('li');
            comment.textContent = `${item.creation_date} ${item.username}: ${item.comment}`;
            list.appendChild(comment);
          });
        });
      });
    }
  });
};

const commentFunc = (array) => {
  const commentBtns = document.querySelectorAll('.comments-btn');
  const commentPopup = document.querySelector('.comment-popup');
  const closeBtn = document.querySelector('.close-popup-btn');

  commentBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const commentsList = document.querySelector('.comments-list');
      const movieSummary = document.querySelector('.movie-summary');
      const movieTitle = document.querySelector('.movie-title');
      const popupPhoto = document.querySelector('.popup-photo');

      // index = array[index].id - 1;
      console.log(index);

      commentPopup.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      popupPhoto.src = array[index].image.original;
      movieTitle.textContent = array[index].name;
      movieSummary.innerHTML = array[index].summary;

      getComment(index).then((arr) => {
        commentsList.innerHTML = '';
        arr.forEach((item) => {
          const comment = document.createElement('li');
          comment.textContent = `${item.creation_date} ${item.username}: ${item.comment}`;
          commentsList.appendChild(comment);
        });
      });

      postComment(index, commentsList);
    });
  });

  closeBtn.addEventListener('click', () => {
    commentPopup.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
};

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

  // console.log(shows);

  commentFunc(shows);
};

loadData();
