import Notiflix from 'notiflix';
import axios from "axios";

const apiKey = '13806699-094791483596adb8f8eca5126';
const baseUrl = 'https://pixabay.com/api';
axios.defaults.headers.common["x-api-key"] = apiKey;

const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');

//let queriedImgsArr = [];

formEl.addEventListener('change', (event) => {
    const inputData = event.target.value;
    console.log(inputData);

    formEl.addEventListener('submit', (event) => {
    event.preventDefault();
        fetch(`${baseUrl}/?key=${apiKey}&q=${inputData}`)
            .then(response => {
                return response.json();
            })
            .then(imgsData => {
                
                console.log(imgsData);
                
                // imgsData.forEach((image) => {
                //     const imageCard = `<div class="photo-card">
                //         <img src="" alt="" loading="lazy" />
                //         <div class="info">
                //             <p class="info-item">
                //             <b>Likes</b>
                //             </p>
                //             <p class="info-item">
                //             <b>Views</b>
                //             </p>
                //             <p class="info-item">
                //             <b>Comments</b>
                //             </p>
                //             <p class="info-item">
                //             <b>Downloads</b>
                //             </p>
                //         </div>
                //         </div>`;
                //     galleryEl.innerHTML = imageCard;
                // });
            })
            .catch(err => {
                console.log(err);
            });
});
})
