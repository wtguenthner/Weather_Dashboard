
//Sets variables for multiple text areas in the HTML
var searchFormEl = document.querySelector('#searchForm');
var cityDisplay = document.querySelector('#cityList');
var currentDisplay = document.querySelector('.current');

//Sets variables for each text area for the separate days for the five day forecast
var forecastOne = document.querySelector('#forecastOne')
var forecastTwo = document.querySelector('#forecastTwo')
var forecastThree = document.querySelector('#forecastThree')
var forecastFour = document.querySelector('#forecastFour')
var forecastFive = document.querySelector('#forecastFive')

document.querySelector('#searchButton').addEventListener('click', handleClick);
var apiKey = "8f87f54427e5d35cb5573ebaf16d36fb";
displayCity();

// Function for retrieving and setting the API and local storage values
function handleClick(e) {
  e.preventDefault();
let city = document.querySelector('#searchInput').value;
if(!city) return;

//If local storage has no value then it is set to an array
if (localStorage.getItem('cities') == null) {
  localStorage.setItem('cities', '[]')
}

var cityList = JSON.parse(localStorage.getItem('cities'));
cityList.push(city);
localStorage.setItem('cities', JSON.stringify(cityList));

let url= `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

fetch(url).then(data=>data.json()).then(data => {

  //Retrieves the latitude and longitude values from the city being searched
  const {lat,lon} = data[0];

  let url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  fetch(url2).then(data=>data.json()).then(data => {

  jsonData = data;
  displayCity();
  displayCurrent(jsonData,city);
  })
})
}

function displayCity(){
  cityDisplay.innerHTML = " "
  cityList = JSON.parse(localStorage.getItem('cities'))

//Loop for creating buttons for the previous cities searched. Does not run if there is no value in local storage
if(cityList!=null){
  for(var x =0; x < cityList.length; x++){

  cityDisplay.innerHTML += `<button class=button value = "${cityList[x]}" onclick = "displayPrevious(this.value)">` + cityList[x].toUpperCase() +`</button>`;
  
}
}
}

function clearStorage(){

  localStorage.clear();
}

function displayCurrent(jsonData, city){
  var icon = jsonData.current.weather[0].icon
  var weatherDescr = jsonData.current.weather[0].description
  var myDate = new Date();

//Object created for each aspect of the date that is needed
const parts = {
        date: myDate.getDate(),
        day: myDate.getDay(),
        month: myDate.getMonth(),
        year: myDate.getFullYear(),
        hour: myDate.getHours(),
    };

  //Displays the current day of the city searched
  currentDisplay.innerHTML = `<h3>` + city.toUpperCase() +  " " + `(${parts.month+1}/` + parts.date + `/${parts.year})` +`<img src="http://openweathermap.org/img/wn/${icon}@2x.png" width="80" height="80" alt="${weatherDescr}" ></h3> `;
  currentDisplay.innerHTML += `<p>Temp: ${jsonData.current.temp}</p>` ;
  currentDisplay.innerHTML += `<p>Wind: ${jsonData.current.wind_speed} MPH</p>`;
  currentDisplay.innerHTML += `<p>Humidity: ${jsonData.current.humidity}%</p>`;

  //Statement for determing the color of the text box for the UV index
  if(jsonData.current.uvi < 2){
  currentDisplay.innerHTML += `<p>UV Index: <span style="background-color:green;border-radius:5px">${jsonData.current.uvi}</span</p>`;
  }else if(jsonData.current.uvi > 7 ){
    currentDisplay.innerHTML += `<p>UV Index: <span style="background-color:red;border-radius:5px">${jsonData.current.uvi}</span</p>`;
  }else{
    currentDisplay.innerHTML += `<p>UV Index: <span style="background-color:yellow;border-radius:5px">${jsonData.current.uvi}</span</p>`;
  }

  //Creates variables for the weather icon for the current day and the five day forecast
  var iconOne = jsonData.daily[0].weather[0].icon
  var iconTwo = jsonData.daily[1].weather[0].icon
  var iconThree = jsonData.daily[2].weather[0].icon
  var iconFour = jsonData.daily[3].weather[0].icon
  var iconFive = jsonData.daily[4].weather[0].icon

  //Sets day one of the forecast
  forecastOne.innerHTML = `<h3>${parts.month+1}/` + `${parts.date+1}` + `/${parts.year}</h3>` + `<img src="http://openweathermap.org/img/wn/${iconOne}@2x.png" width="60" height="60">` 
  forecastOne.innerHTML += `<p>Temp: ${jsonData.daily[0].temp.day}</p>`
  forecastOne.innerHTML += `<p>Wind: ${jsonData.daily[0].wind_speed} MPH</p>`
  forecastOne.innerHTML += `<p>Humidity: ${jsonData.daily[0].humidity}</p>`

  //Sets day two of the forecast
  forecastTwo.innerHTML = `<h3>${parts.month+1}/` + `${parts.date+2}` + `/${parts.year}</h3>` + `<img src="http://openweathermap.org/img/wn/${iconTwo}@2x.png" width="60" height="60">` 
  forecastTwo.innerHTML += `<p>Temp: ${jsonData.daily[1].temp.day}</p>`
  forecastTwo.innerHTML += `<p>Wind: ${jsonData.daily[1].wind_speed} MPH</p>`
  forecastTwo.innerHTML += `<p>Humidity: ${jsonData.daily[1].humidity}</p>`

  //Sets day three of the forecast
  forecastThree.innerHTML = `<h3>${parts.month+1}/` + `${parts.date+3}` + `/${parts.year}</h3>` + `<img src="http://openweathermap.org/img/wn/${iconThree}@2x.png" width="60" height="60">` 
  forecastThree.innerHTML += `<p>Temp: ${jsonData.daily[2].temp.day}</p>`
  forecastThree.innerHTML += `<p>Wind: ${jsonData.daily[2].wind_speed} MPH</p>`
  forecastThree.innerHTML += `<p>Humidity: ${jsonData.daily[2].humidity}</p>`

  //Sets day four of the forecast
  forecastFour.innerHTML = `<h3>${parts.month+1}/` + `${parts.date+4}` + `/${parts.year}</h3>` + `<img src="http://openweathermap.org/img/wn/${iconFour}@2x.png" width="60" height="60">` 
  forecastFour.innerHTML += `<p>Temp: ${jsonData.daily[3].temp.day}</p>`
  forecastFour.innerHTML += `<p>Wind: ${jsonData.daily[3].wind_speed} MPH</p>`
  forecastFour.innerHTML += `<p>Humidity: ${jsonData.daily[3].humidity}</p>`

  //Sets day five of the forecast
  forecastFive.innerHTML = `<h3>${parts.month+1}/` + `${parts.date+5}` + `/${parts.year}</h3>` + `<img src="http://openweathermap.org/img/wn/${iconFive}@2x.png" width="60" height="60">` 
  forecastFive.innerHTML += `<p>Temp: ${jsonData.daily[4].temp.day}</p>`
  forecastFive.innerHTML += `<p>Wind: ${jsonData.daily[4].wind_speed} MPH</p>`
  forecastFive.innerHTML += `<p>Humidity: ${jsonData.daily[4].humidity}</p>`
  
}

//Function for displaying the previous cities searched
function displayPrevious(value){

  var city = value;
  let url= `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

  fetch(url).then(data=>data.json()).then(data => {

  const {lat,lon} = data[0];

  let url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  fetch(url2).then(data=>data.json()).then(data => {

  jsonData = data;
  displayCity();
  displayCurrent(jsonData,city);
  })
})
}