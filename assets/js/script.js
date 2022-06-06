
var searchFormEl = document.querySelector('#searchForm');
var cityList = document.querySelector('#cityList');
var listOfCities = []

function displayCities(){
    var cityName = document.querySelector('#searchInput').value;
    // var listOfCities = localStorage.getItem('cities');
    listOfCities.push(cityName)
    localStorage.setItem('cities', JSON.stringify(listOfCities))
  





    
    for(var x=0; x < listOfCities.length; x++){
    var results = document.createElement('div')
    results.classList.add('button');
    results.textContent = listOfCities[x];
    cityList.append(results);
  }


}

