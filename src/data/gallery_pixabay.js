
import galleryImagesTpl from '../templates/gallery_image.hbs';
import ImageApiServise from './api-servise';
import refs from './refs';
// import '@pnotify/core/dist/BrightTheme.css';
// import '@pnotify/core/dist/PNotify.css';
// import { error } from '@pnotify/core';
// import { defaults } from '@pnotify/core';

const debounce = require('lodash.debounce');

refs.searchForm.addEventListener('submit', onSearch);
refs.LoadMoreBtn.addEventListener('click', onLoadMore);

const imageApiService = new ImageApiServise();



function onSearch(e) {
    e.preventDefault();
    imageApiService.query = e.currentTarget.elements.query.value;
    imageApiService.resetPage();
    imageApiService.fetchImage()

    //     .then(data => {
    //     const markup = galleryImagesTpl(data.hits);
    //     // console.log(data.hits)
    //     // console.log(markup);
    //    return refs.gallery.insertAdjacentHTML('beforeend', markup);
    // });
}

function onLoadMore() {
    imageApiService.incremetPage();
    imageApiService.fetchImage()
        // .then(data => {
        // const markup = galleryImagesTpl(data.hits);
        // // console.log(data.hits)
        // // console.log(markup);
        // return refs.gallery.insertAdjacentHTML('beforeend', markup);
    // });
}
