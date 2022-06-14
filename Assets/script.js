/* GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city */

// define all your html static selectors
var cityEl = document.querySelector("#city");
var cityFormEl = document.querySelector("#cityForm")

var citySearchedEl = document.querySelector("#citySearched")
var tempEL = document.querySelector("#temp")
var windEl = document.querySelector("#wind")
var humidityEl = document.querySelector("#humidity")
var uviEl = document.querySelector("#uvi")

var cityCard1El = document.querySelector("#citySearched-1")
var api = "483b2d6e329a288bff58b487cf57c0cd"

function displayWeather(event) {
    event.preventDefault()
    var cityName = cityEl.value
    var urlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api}&units=imperial`

    fetch(urlCurrent)
        .then(function (response) {
            return response.json()
        })
        .then(function (currentData) {
            console.log(currentData)
            var fiveDayUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&appid=${api}`

            fetch(fiveDayUrl)
                .then(function(response){
                    return response.json()
                })
                .then(function(fiveDayData){
                    console.log(fiveDayData)
                    var currentDate = moment.unix(currentData.dt).format("MM/DD/YYYY")
                    var iconImage = document.createElement("img")
                    iconImage.setAttribute("src", `http://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`)
                    citySearchedEl.innerHTML=currentData.name + " " + currentDate
                    citySearchedEl.appendChild(iconImage)
                    tempEL.textContent=currentData.main.temp + " " + "F"


                })
        })

}





// add eventlistener on Submit and create displayDashboard function - shows current weather for the last five days
cityFormEl.addEventListener("submit", displayWeather)

