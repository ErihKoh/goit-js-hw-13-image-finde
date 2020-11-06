
import galleryImagesTpl from '../templates/gallery_image.hbs';
import ImageApiServise from './api-servise';
import refs from './refs';
import LoadMoreBtn from './load-more-btn';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
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
refs.gallery.addEventListener('click', onImageclick);
loadMoreBtn.refs.button.addEventListener('click', onLoadMoreBtn);

function onImageclick(e) {
    
    const largeImage = e.target.dataset.source;
    console.log(largeImage);
    const instance = basicLightbox.create(`<img src="${largeImage}" alt="image"  />`);

    instance.show();
}
    
function onSearch(e) {
    e.preventDefault();
    const largeImage = e.currentTarget.dataset.value;
    console.log(largeImage);
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

function onLoadMoreBtn() {
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

