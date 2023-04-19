import './style.css';
import loadShows from './modules/shows.js';
import { involvementAppID, baseUrl } from './config/api.js';

const commentUrl = `${baseUrl}apps/${involvementAppID}/comments`;

const showsList = document.querySelector('.shows');
const showsCount = document.querySelector('.shows-count');
const commentsList = document.querySelector('.comments-list');
const comments = document.querySelector('.comments');

let shows = [];

const getComment = async (id) => {
  try {
    const response = await fetch(`${commentUrl}?item_id=${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const commentCounter = () => {
  const length = commentsList.childElementCount;
  comments.textContent = `Comments (${length})`;
};

const createList = (item) => {
  const comment = document.createElement('li');
  comment.textContent = `${item.creation_date} ${item.username}: ${item.comment}`;
  commentsList.appendChild(comment);
};

const postComment = () => {
  const nameInput = document.querySelector('.name-input');
  const commentInput = document.querySelector('.comment-input');
  const submitCommentBtn = document.querySelector('.submit-comment-btn');

  const submitCommentHandler = async (e) => {
    e.preventDefault();
    const id = Number(e.target.id);

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
          commentsList.innerHTML = '';
          if (arr.length > 0) {
            arr.forEach((item) => {
              createList(item);
              commentCounter();
            });
          }
        });
      });
    }
  };

  submitCommentBtn.addEventListener('click', submitCommentHandler);
};

const commentFunc = (array) => {
  const commentBtns = document.querySelectorAll('.comments-btn');
  const commentPopup = document.querySelector('.comment-popup');
  const closeBtn = document.querySelector('.close-popup-btn');

  commentBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const movieSummary = document.querySelector('.movie-summary');
      const movieTitle = document.querySelector('.movie-title');
      const popupPhoto = document.querySelector('.popup-photo');
      const submitCommentBtn = document.querySelector('.submit-comment-btn');

      submitCommentBtn.setAttribute('id', index);

      commentPopup.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      popupPhoto.src = array[index].image.original;
      movieTitle.textContent = array[index].name;
      movieSummary.innerHTML = array[index].summary;

      getComment(index).then((arr) => {
        commentsList.innerHTML = '';
        if (arr.length > 0) {
          arr.forEach((item) => {
            createList(item);
            commentCounter();
          });
        }
      });
    });
  });

  closeBtn.addEventListener('click', () => {
    commentPopup.style.display = 'none';
    document.body.style.overflow = 'auto';
    comments.textContent = 'Comments';
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

  commentFunc(shows);
};

loadData();
postComment();
