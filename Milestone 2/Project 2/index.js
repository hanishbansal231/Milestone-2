const key = ''; // use own key
const showBtn = document.querySelector('.showBtn');
const movieBoxs = document.querySelector('.movieBoxs');
const movieField = document.querySelector('#movieField');
const form = document.querySelector('.form');
let page = 1;
const movieData = async () => {
    try {
        const movieName = movieField.value;
        const url = `https://omdbapi.com/?s=${movieName}&page=${page}&apikey=${key}`;
        const response = await fetch(url);
        const data = await response.json();
        if(data.Response === "False"){
            alert('Invalid Input please write valid input...');
            return;
        }
        const datas = data.Search;
        let movieBox = '';
        datas.forEach(element => {
            movieBox += ` <div class="movieBox">
        <div class="image"><img src="${element.Poster}" alt=""></div>
        <div class="contant">
            <h2 class="heading">${element.Title}</h2>
            <button class="watchBtn">Watch Now</button>
        </div>
    </div>`
        });
        movieBoxs.innerHTML += movieBox;
        page++;
        if (page > 1) showBtn.style.display = 'inline-block';
    } catch (err) {
        console.error(err);
    }
}
form.addEventListener('submit',(e) => {
    e.preventDefault();
    page = 1;
    movieData();
});
showBtn.addEventListener('click', () => {
    movieData();
});
