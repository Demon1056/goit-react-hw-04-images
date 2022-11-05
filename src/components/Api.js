import axios from 'axios';

export async function searchImages(value, currentPage) {
  try {
    const BASEURL = 'https://pixabay.com/api/';
    let requestParams = {
      params: {
        q: value,
        page: currentPage,
        key: '29803921-0264c7261e6b7092956a87835',
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
      },
    };
    const response = await axios.get(BASEURL, requestParams);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
