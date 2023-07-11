import axios from "axios";

export class PixabayAPI {
    #BASE_URL = 'https://pixabay.com/api/';
    #API_KEY = '13806699-094791483596adb8f8eca5126';

    page = 1;
    q = null;

    async fetchPhotos() {
        return await axios.get(`${this.#BASE_URL}`, {
            params: {
                key: this.#API_KEY,
                q: this.q,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,       
                page: this.page,
                per_page: 40,
      },
    });
  }
}
