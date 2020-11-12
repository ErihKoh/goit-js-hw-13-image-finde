
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
loadMoreBtn.refs.button.addEventListener('click', fetchData);


function onImageclick(e) {
    e.preventDefault();
    
    if (e.target.nodeName !== 'IMG') {
        return;
    }
    const largeImage = e.target.dataset.source;
    // console.log(largeImage);
    const instance = basicLightbox.create(`<img src="${largeImage}" alt="image"  />`);

    instance.show();
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

async function fetchData() {

    loadMoreBtn.disable();

    try {

    // imageApiService.fetchImage().then(({ hits }) => {
     
      const {hits} = await imageApiService.fetchImage();

    // console.log(hits);
    
      if (hits.length === 0) {
            
        clearImageMarkup();
        loadMoreBtn.hide();
                
        return error({
              
            title: "Error",
            text: "Image not found! Repeat query!"
        });
    }
      appendImagesMarkup(hits);
      loadMoreBtn.enable();

    
    } catch (error) {
      console.log('ошибка в fetchData', error);
    }
    
     imageApiService.incrementPage();
}

function appendImagesMarkup(hits) {
    let movePage = document.body.scrollHeight;
    refs.gallery.insertAdjacentHTML('beforeend', galleryImagesTpl(hits));
  console.log(movePage);
  // document.body.scrollHeight
  console.log(document.body.scrollHeight);
 
    window.scrollTo({

      top: movePage,
      behavior: "smooth",
      
  });
}

function clearImageMarkup() {
    refs.gallery.innerHTML = '';
}

