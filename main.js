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
            // 만약 데이터 베이스 상으로 null이 포함되어 있을 경우 기본값을 정해
            // includes 함수가 오류를 발생시키지 않게 함
            let title = articles[i]['title'] || 'No title available';
            let author = articles[i]['author'] || 'Unknown author';
            let publishDate = articles[i]['publishedAt'] || 'Unknown date';
            let url = articles[i]['url'] || '#';
            let content = articles[i]['content'] || 'No content available';
            let image = articles[i]['urlToImage'] || 'default_image.jpg';
            // 검색어를 입력하고, 대소문자 모두 구분 가능하도록 toLowerCase 이용
            if (keyword !== '' && (title.toLowerCase().includes(keyword.toLowerCase()) || author.toLowerCase().includes(keyword.toLowerCase()) || content.toLowerCase().includes(keyword.toLowerCase()))){
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
        }
        if (resultTxt === ''){
            resultTxt = '<div>검색어가 입력되지 않았거나 존재하지 않습니다.</div>'
        }
        result.innerHTML = resultTxt
    }
    xhr.send()
})