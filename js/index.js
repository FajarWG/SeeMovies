const IMAGEBASEURL = 'https://image.tmdb.org/t/p/w500';
const searchURL = 'https://api.themoviedb.org/3/search/movie?api_key=c6a36b80cc4c15edf75aebb21bb21aa9&query=';
const discover = 'https://api.themoviedb.org/3/discover/movie?api_key=c6a36b80cc4c15edf75aebb21bb21aa9';
const trendingUrl = 'https://api.themoviedb.org/3/trending/movie/week?api_key=c6a36b80cc4c15edf75aebb21bb21aa9';
const upComingUrl = 'https://api.themoviedb.org/3/movie/now_playing?api_key=c6a36b80cc4c15edf75aebb21bb21aa9';

const form = document.getElementById("form");
const search = document.getElementById("search");
const detail = document.getElementById("detail");


getMovies(discover);


function getMovies(url) {
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        showData(data.results)
    })
}

const showData = (movies) => {
    let HTMLCard = ''
    const container = document.getElementById('container')

    for (let index = 0; index < 10; index++) {
        const data = movies[index]
        // const year = new Date(data.release_date).getFullYear()

        HTMLCard += `
        <a href="#hero" onclick="showDetailMovie(${data.id})" class="card">
            <img id="card" class="card__image" src="${IMAGEBASEURL}/${data.poster_path}"/>
            <div class="card__content">
               <h3 class="card__title">${data.title}</h3>
               <div class="card__vote">
                    <span>&#11088 ${data.vote_average}</span>
                </div>
            </div>
        </a>
        
        `
    }

    container.innerHTML = HTMLCard


    
}

const showDetailMovie = (id) => {
    let movie =
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=c6a36b80cc4c15edf75aebb21bb21aa9&language=en-US`)
    .then( res => res.json() )
    .then( data => {
        let HTMLCard = ''
        const detail = document.getElementById('detail')
    
        const year = new Date(data.release_date).getFullYear()
        
        HTMLCard += `
        <div onclick="showDetailMovie(${data.id})" id="hero" class="hero">
            <div class="card__overview">
                <img class="card__image" src="${IMAGEBASEURL}/${data.poster_path}"/>
                    

            </div>
            <div class="card__detail">
                <h3 class="card__title2">${data.title}</h3>
                <hr>
                <br>
                <p class="card__explain">${data.overview}</p>
                <br>
                <p>&#128154; : ${data.popularity}</p>
                <p>&#x1F4C5; : ${data.release_date}</p>
                <p>&#11088; : ${data.vote_average}</p>
                

        </div>    
        `
        

        detail.innerHTML = HTMLCard
        
    })
}

getTrending(trendingUrl);

function getTrending(url) {
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        console.log(data.results)
        trendingShow(data.results)
    })
}

const trendingShow = (movies) => {
    let HTMLCard = ''
    const trendingid = document.getElementById('trending')

    for (let index = 0; index < 5; index++) {
        const data = movies[index]
        // const year = new Date(data.release_date).getFullYear()

        HTMLCard += `
        <a href="#hero" onclick="showDetailMovie(${data.id})" class="card">
            <img class="card__image" src="${IMAGEBASEURL}/${data.poster_path}"/>
            <div class="card__content">
               <h3 class="card__title">${data.title}</h3>
               <div class="card__vote">
                    <p>&#11088 ${data.vote_average}</p>
                </div>
            </div>
        </a>
        `
    }

    trendingid.innerHTML = HTMLCard
}

getUpComing(upComingUrl);

function getUpComing(url) {
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        upShow(data.results)
    })
}

const upShow = (movies) => {
    let HTMLCard = ''
    const upid = document.getElementById('upcoming')

    for (let index = 0; index < 5; index++) {
        const data = movies[index]
        // const year = new Date(data.release_date).getFullYear()

        HTMLCard += `
        <a href="#hero" onclick="showDetailMovie(${data.id})" class="card"">
            <img class="card__image" src="${IMAGEBASEURL}/${data.poster_path}"/>
            <div class="card__content">
               <h3 class="card__title">${data.title}</h3>
               <div class="card__vote">
                    <p>&#11088 ${data.vote_average}</p>
                </div>
            </div>
        </div>
        `
    }

    upid.innerHTML = HTMLCard
}

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const carilah = search.value;
    fetch(searchURL+carilah)
        .then((res) => res.json())
        .then((data) => {
            let results = data.results

            console.log(results)
            showData(results)
        })

})