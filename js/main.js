import {IMG_URL, MOVIE_URL, TV_URL } from "./api.js";

const movie = document.querySelector("#movie");
const infoContainer = document.querySelector("#about");
const shuffleButton = document.querySelector("button");
const findTypeText = document.querySelector("#type");

const poster = document.createElement("img");
const displayTitle = document.createElement("h2");
const synopsis = document.createElement("p");

let URL = "";
let currIndex = 0;


window.addEventListener("click", (e) => {
    console.log(e.target.id)
    let type = e.target.textContent;
    
    if(type == "Filmes") {
        URL = MOVIE_URL;
        shuffleButton.innerHTML = `<img src="./assets/shuffle.svg" alt="">Encontrar Filme`;
        findTypeText.textContent = "filme"
    } else if(type == "Séries") {
        URL = TV_URL;
        shuffleButton.innerHTML = `<img src="./assets/shuffle.svg" alt="">Encontrar Série`;
        findTypeText.textContent = "série"
    }

    let clickedOnButton = (e.target.id == "button");
    if (clickedOnButton) {
        shuffleTvShow(URL)
    }
})

function addTvShow(list, index, url) {
    let imgSrc = list[index].poster_path
    let title;
    console.log("urdddl", url)

    if(url == MOVIE_URL) {
       title = list[index].title 
    }  else {
        title = list[index].name

    }
    let overview = list[index].overview

    console.log(title, imgSrc, overview)

    if( overview == "") {
        poster.setAttribute('src', (IMG_URL + imgSrc))
        displayTitle.textContent = title;
        synopsis.textContent = "Sinopse Não encontrada!! Veja e descubra o mistério"; 
    } else {
        poster.setAttribute('src', (IMG_URL + imgSrc))
        displayTitle.textContent = title;
        synopsis.textContent = overview; 
    }
    movie.prepend(poster)
    infoContainer.append(displayTitle, synopsis)
}

function shuffleTvShow(url) {
    console.log("url", url)
   fetch(url)
    .then(data => data.json())
    .then((data) => {
        console.log(data.results)
        if(currIndex == 20) {
            currIndex = 0;
        }
        addTvShow(data.results, currIndex, url)
    })
    currIndex++
}
