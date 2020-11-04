export default class ImageApiServise {
    constructor() {
        this.searchName = '';
        this.page = 1;
    }

    fetchImage() {
       console.log(this)
        const key = '18969292-6634fe46747360e3150bf5a1e';
        const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchName}&page=${this.page}&per_page=12&key=${key}`;
        fetch(url)
            .then(res => res.JSON)
        
        
        
    }

    incremetPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchName;
    }
    set query(newSearchName) {
        this.searchName = newSearchName;
    }
}
