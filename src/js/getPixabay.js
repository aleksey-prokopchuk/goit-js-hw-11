import axios from 'axios';
import { KEY } from './pixabayKey';

const URL = 'https://pixabay.com/api/';
const image_type = 'photo';
const orientation = 'horizontal';
const safesearch = 'true';
const page = 1;
const per_page = 40;

async function getPixabay(q) {
  try {
    const response = await axios.get(
      `${URL}?key=${KEY}&q=${q}&image_type=${image_type}&orientation=${orientation}&safesearch=${safesearch}?page=${page}&per_page=${per_page}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export default getPixabay;
