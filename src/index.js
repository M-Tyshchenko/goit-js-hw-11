import Notiflix from 'notiflix';
import axios from "axios";

const formEl = document.querySelector('.search-form');

formEl.addEventListener('submit', (event) => {
    event.preventDefault();
});