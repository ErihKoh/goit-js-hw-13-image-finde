
import galleryImagesTpl from '../templates/gallery_image.hbs';
import ImageApiServise from './api-servise';
import refs from './refs';
import LoadMoreBtn from './load-more-btn';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';
import { defaults } from '@pnotify/core';

defaults.delay = 2000;

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const imageApiService = new ImageApiServise();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMoreBtn);

function onLoadMoreBtn() {
    fetchData();
}

function onSearch(e) {
    e.preventDefault();

    imageApiService.query = e.currentTarget.elements.query.value;

    if (imageApiService.query === '') {
        clearImageMarkup();
        loadMoreBtn.hide();
        return error({
            title: "Error",
            text: "Please enter query!"
        });
    }
    loadMoreBtn.show();
    imageApiService.resetPage();
    clearImageMarkup();
    fetchData();
}

function fetchData() {
loadMoreBtn.disable();
    imageApiService.fetchImage().then(hits => {
        appendImagesMarkup(hits);
        loadMoreBtn.enable();
    });
}

function appendImagesMarkup(hits) {
    refs.gallery.insertAdjacentHTML('beforeend', galleryImagesTpl(hits));
}

function clearImageMarkup() {
    refs.gallery.innerHTML = '';
}

