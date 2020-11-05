
import galleryImagesTpl from '../templates/gallery_image.hbs';
import ImageApiServise from './api-servise';
import refs from './refs';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';
import { defaults } from '@pnotify/core';

defaults.delay = 2000;

refs.searchForm.addEventListener('submit', onSearch);
refs.LoadMoreBtn.addEventListener('click', onLoadMore);

const imageApiService = new ImageApiServise();



function onSearch(e) {
    e.preventDefault();

    imageApiService.query = e.currentTarget.elements.query.value;

    if (imageApiService.query === '') {
        clearImageMarkup();
        return error({
                title: "Error",
                text: "Please enter query!"
            });
    }

    imageApiService.resetPage();
    imageApiService.fetchImage().then(hits => {
        clearImageMarkup();
        appendImagesMarkup(hits);
    });

}

function onLoadMore() {
    
    imageApiService.fetchImage().then(appendImagesMarkup);
      
}

function appendImagesMarkup(hits) {
    refs.gallery.insertAdjacentHTML('beforeend', galleryImagesTpl(hits));
}

function clearImageMarkup() {
    refs.gallery.innerHTML = '';
}

