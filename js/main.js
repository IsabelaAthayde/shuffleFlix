import { API_KEY, BASE_URL, IMG_URL, language, API_URL } from "./api.js";

const poster = document.querySelector("#movie img");
const title = document.querySelector("#about h2");
const synopsis = document.querySelector("#about p");
const shuffleButton = document.querySelector("button");


function addTvShow(list, randomMovie) {
    let imgSrc = list[randomMovie].poster_path
    let { name } = list[randomMovie]
    let { overview } = list[randomMovie]

    console.log(name, imgSrc, overview)

    if( overview == "") {
        poster.setAttribute('src', (IMG_URL + imgSrc))
        title.textContent = name;
        synopsis.textContent = "Sinopse Não encontrada!! Veja e descubra o mistério"; 
    } else {
        poster.setAttribute('src', (IMG_URL + imgSrc))
        title.textContent = name;
        synopsis.textContent = overview; 
    }
}

let randomMovie = 0;
function shuffleTvShow(url) {

   fetch(url)
    .then(data => data.json())
    .then((data) => {
        console.log(data.results)
        if(randomMovie == 20) {
            randomMovie = 0;
        }
        addTvShow(data.results, randomMovie)
    })
    randomMovie++
}

shuffleButton.onclick = () => {
    console.log("clicked")
    shuffleTvShow(API_URL)
}