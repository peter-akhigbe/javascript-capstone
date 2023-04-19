// import { loadData } from '../index.js';
import { baseUrl, involvementAppID } from '../config/api.js';

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
  // loadData();
};

export const getLikes = async () => {
  try {
    const response = await fetch(`${baseUrl}apps/${involvementAppID}/likes`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};