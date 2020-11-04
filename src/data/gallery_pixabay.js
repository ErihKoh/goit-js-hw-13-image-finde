
import galleryImagesTpl from '../templates/gallery_image.hbs';
import API from './apiService';
import refs from './refs';
// import '@pnotify/core/dist/BrightTheme.css';
// import '@pnotify/core/dist/PNotify.css';
// import { error } from '@pnotify/core';
// import { defaults } from '@pnotify/core';

const debounce = require('lodash.debounce');

refs.searchForm.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
    e.preventDefault();
    const seurchName = e.target.value;
    // console.log(seurchName);
    API.apiServise(seurchName).then(data => {
        const markup = galleryImagesTpl(data.hits);
        // console.log(data.hits)
        // console.log(markup);
       return refs.gallery.insertAdjacentHTML('beforeend', markup);
    });
}