
var searchFormEl = document.querySelector('#searchForm');
var cityDisplay = document.querySelector('#cityList');
// var store = eval(localStorage.cities) || [];
// var store = localStorage.getItem('cities') || [];
document.querySelector('button').addEventListener('click', handleClick);

function handleClick(e) {
  e.preventDefault();
let city = document.querySelector('#searchInput').value;
if(!city) return;

if (localStorage.getItem('cities') == null) {
  localStorage.setItem('cities', '[]')
}

var cityList = JSON.parse(localStorage.getItem('cities'));
cityList.push(city);
localStorage.setItem('cities', JSON.stringify(cityList));






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
  cityDisplay.innerHTML = " "
cityList = JSON.parse(localStorage.getItem('cities'))
if(cityList!=null){
for(var x =0; x < cityList.length; x++){

  cityDisplay.innerHTML += `<p class = button>` + cityList[x] +`</p>`;
}
}
}

function clearStorage(){

  localStorage.clear();
}