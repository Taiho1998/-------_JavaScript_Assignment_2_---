"use strict";


let button = document.getElementById('searchButton')

button.addEventListener('click', function(){
    let xhr = new XMLHttpRequest()
    xhr.open('get', 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=ba24d04380254934968f842b7a8ea184', true)
    xhr.onload = function(){
        let title
        let author
        let publishDate
        let url
        let description
        let image
    }
    xhr.send()
})