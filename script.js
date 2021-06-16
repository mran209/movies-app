//current popular movies on landing page
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=849eacc8fafa192681cb5f103db73a2f&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280' //w1280 is the width of the image
//search for movies
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=849eacc8fafa192681cb5f103db73a2f&query="'

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')

//get initial movies
getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()
    // console.log(data.results)

    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        //some of the data from movie object
        const { title, poster_path, vote_average, overview, release_date } = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h5>Released on: ${release_date}</h5>
                <h3>Movie Summary</h3>
                ${overview}
            </div>
        `
        main.appendChild(movieEl)
    })
}

//movie ratings
function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value
    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

        //clear search bar
        search.value = ''
    } else {

        //reload page if nothing searched
        window.location.reload
    }
})
