import { baseUrl, involvementAppID } from '../config/api.js';

export const getLikes = async () => {
  try {
    const response = await fetch(`${baseUrl}apps/${involvementAppID}/likes`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateLikes = async () => {
  const likesText = document.querySelectorAll('.likes-text');

  const getlikes = await getLikes();
  const likes = getlikes;

  likesText.forEach((item) => {
    let movieLikes = 0;
    if (likes.find((like) => like.item_id === Number(item.getAttribute('likes-text-id')))) {
      movieLikes = likes.find((like) => like.item_id === Number(item.getAttribute('likes-text-id'))).likes;
    }
    item.textContent = `${movieLikes} ${movieLikes === 1 ? 'like' : 'likes'}`;
  });
};

export const addLike = async (id) => {
  const response = await fetch(`${baseUrl}apps/${involvementAppID}/likes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item_id: id,
    }),
  });
  Promise.resolve(response);
  updateLikes();
};
