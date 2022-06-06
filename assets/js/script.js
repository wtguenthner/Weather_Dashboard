
var searchFormEl = document.querySelector('#searchForm');
var cityList = document.querySelector('#cityList');
var store = eval(localStorage.cities) || [];

document.querySelector('button').addEventListener('click', handleClick);

function handleClick(e) {
  e.preventDefault();
let city = document.querySelector('#searchInput').value;

if(!city) return;

store.push(city)
console.log(store)

localStorage.setItem('cities',store)

displayCity();

let url= `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;


fetch(url).then(data=>data.json()).then(data => {

  const {lat,lon} = data[0];

  let url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  fetch(url2).then(data=>data.json()).then(data => {

    let { current, daily } = data;
    jsonData = data;
    console.log(data)
  })
})

}

function displayCity(){

  cityList.innerHTML = store
}