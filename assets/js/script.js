
var searchFormEl = document.querySelector('#searchForm');
var cityDisplay = document.querySelector('#cityList');
var currentDisplay = document.querySelector('.current');
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








let url= `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;


fetch(url).then(data=>data.json()).then(data => {

  const {lat,lon} = data[0];

  let url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  fetch(url2).then(data=>data.json()).then(data => {

    jsonData = data;
    console.log(data)
    displayCity();
    displayCurrent(jsonData,city);
  })
})


}


function displayCity(){
  cityDisplay.innerHTML = " "
cityList = JSON.parse(localStorage.getItem('cities'))
if(cityList!=null){
for(var x =0; x < cityList.length; x++){

  cityDisplay.innerHTML += `<button class=button onclick="displayCurrent(jsonData[x],cityList[x])">` + cityList[x] +`</button>`;
}
}
}

function clearStorage(){

  localStorage.clear();
}

function displayCurrent(jsonData, city){

  currentDisplay.innerHTML = `<h3>` +city.toUpperCase() + `</h3>`;
  currentDisplay.innerHTML += `<p>Temp: ${jsonData.current.temp}</p>` ;
  currentDisplay.innerHTML += `<p>Wind: ${jsonData.current.wind_speed} MPH</p>`;
  currentDisplay.innerHTML += `<p>Humidity: ${jsonData.current.humidity}%</p>`;
  if(jsonData.current.uvi < 2){
  currentDisplay.innerHTML += `<p>UV Index: <span style="background-color:green">${jsonData.current.uvi}</span</p>`;
  }else if(jsonData.current.uvi > 7 ){
    currentDisplay.innerHTML += `<p>UV Index: <span style="background-color:red">${jsonData.current.uvi}</span</p>`;
  }else{
    currentDisplay.innerHTML += `<p>UV Index: <span style="background-color:yellow">${jsonData.current.uvi}</span</p>`;
  }
}