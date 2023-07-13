import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { PixabayAPI } from './js/pixabay-api';
 
const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const pixabayApi = new PixabayAPI();
let lightbox = new SimpleLightbox('.gallery a', { 
    captionsData: 'alt',
    captionDelay: 250,
 });

formEl.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    galleryEl.innerHTML = '';

    loadMoreBtn.classList.add('is-hidden');

    pixabayApi.q = event.currentTarget.elements['searchQuery'].value;    
    pixabayApi.page = 1;

    if (pixabayApi.q.trim() === '') {
        Notiflix.Notify.failure('The field must not be empty');
        return;  
    }

    try {
        const { data } = await pixabayApi.fetchPhotos();
        
        if (!data.hits.length) {           
            throw new Error();            
        }
        
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
       
        createGallaryCards(data.hits);

        if (data.totalHits > pixabayApi.perPage) {
            loadMoreBtn.classList.remove('is-hidden');
        }
    }
    catch (err) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
});

loadMoreBtn.addEventListener('click', async () => {
    pixabayApi.page += 1;

    try {
        const { data } = await pixabayApi.fetchPhotos();
        const totalPages = Math.ceil(data.totalHits / pixabayApi.perPage);
        
        if (pixabayApi.page === totalPages) {
            loadMoreBtn.classList.add('is-hidden');
            
            Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
        }
        createGallaryCards(data.hits);
        
    } catch (err) {
        Notiflix.Notify.failure('Oops! Something went wrong. Please try again.');
    }
})
  
function createGallaryCards(images) {
    for (const image of images) {
        const imageCard = `<div class="photo-card">
            <a class="photo-card-link" href="${image.largeImageURL}".jpg">
                <img class ="photo-card-img" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
            </a>
            <div class="info">
                <p class="info-item"><b>Likes</b> ${image.likes}</p>
                <p class="info-item"><b>Views</b> ${image.views}</p>  
                <p class="info-item"><b>Comments</b> ${image.comments}</p>
                 <p class="info-item"><b>Downloads</b>${image.downloads}</p>           
            </div>
        </div>`;
        galleryEl.insertAdjacentHTML('beforeend', imageCard);
    }
    lightbox.refresh();
}

    
                

