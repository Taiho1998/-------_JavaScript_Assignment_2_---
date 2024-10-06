"use strict";


let button = document.getElementById('searchButton')
let result = document.getElementById('result')
let input = document.getElementById('searchInput')

button.addEventListener('click', function(){
    let xhr = new XMLHttpRequest()
    let keyword = input.value
    xhr.open('get', 'https://newsapi.org/v2/everything?q=apple&from=2024-10-05&to=2024-10-05&sortBy=popularity&apiKey=ba24d04380254934968f842b7a8ea184', true)
    xhr.onload = function(){
        let output = xhr.responseText
        let outputObj = JSON.parse(output)

        let articles = outputObj['articles']
        let resultTxt = ''

        for (let i = 0; i < articles.length; i++){
            console.log(xhr.status)
            let title = articles[i]['title'] || 'No title available';
            let author = articles[i]['author'] || 'Unknown author';
            let publishDate = articles[i]['publishedAt'] || 'Unknown date';
            let url = articles[i]['url'] || '#';
            let content = articles[i]['content'] || 'No content available';
            let image = articles[i]['urlToImage'] || 'default_image.jpg';

            if (title.toLowerCase().includes(keyword.toLowerCase()) || author.toLowerCase().includes(keyword.toLowerCase()) || content.toLowerCase().includes(keyword.toLowerCase()))
                resultTxt += `
                <div style="margin-bottom: 20px;">
                    <img src="${image}" class="thumbnail">
                    <div>
                        <h3 class="aTitle"> ${title}</h3><br>
                        <span class="aAuthor">${author}</span>
                        <span> ${publishDate} —— </span>
                        <a href="${url}"> more</a><br>
                        <a>${content} </a>
                    </div>
                </div>
                `

        }
        result.innerHTML = resultTxt
    }
    xhr.send()
})