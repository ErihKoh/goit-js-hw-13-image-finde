// fetch(https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ)

const BASE_URL = 'https://pixabay.com/api';
const KEY = '18969292-6634fe46747360e3150bf5a1e'


    function apiServise(sourchName) {
        return fetch(`${BASE_URL}/?image_type=photo&orientation=horizontal&q=${sourchName}&page=1&per_page=12&key=${KEY}`).then(r => r.json());
    }



export default { apiServise };