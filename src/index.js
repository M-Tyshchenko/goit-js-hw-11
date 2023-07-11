import Notiflix from 'notiflix';
import { PixabayAPI } from './js/pixabay-api';

const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const pixabayApi = new PixabayAPI();

formEl.addEventListener('submit', async (event) => {
    event.preventDefault();

    pixabayApi.q = event.currentTarget.elements['searchQuery'].value;
    
    pixabayApi.page = 1;

    if (pixabayApi.q === '') {
        Notiflix.Notify.failure('The field must not be empty');
        return;  
    }

    try {
        const { data } = await pixabayApi.fetchPhotos();
        
        if (!data.hits.length) {
            galleryEl.innerHTML = '';
            throw new Error();
            
        }
        const imgsData = data.hits;
        createGallaryCards(imgsData);
        loadMoreBtn.classList.remove('is-hidden');
    }
    catch (err) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
});
  
function createGallaryCards(images) {
    for (const image of images) {
        const imageCard = `<div class="photo-card">
            <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
            <div class="info">
                <p class="info-item"><b>Likes</b> ${image.likes}</p>
                <p class="info-item"><b>Views</b> ${image.views}</p>  
                <p class="info-item"><b>Comments</b> ${image.comments}</p>
                <p class="info-item"><b>Downloads</b>${image.downloads}</p>           
            </div>
        </div>`;
        galleryEl.insertAdjacentHTML('beforeend', imageCard);
    }
}

    
                

