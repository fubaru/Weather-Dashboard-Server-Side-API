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
var cityCard2El = document.querySelector("#citySearched-2")
var cityCard3El = document.querySelector("#citySearched-3")
var cityCard4El = document.querySelector("#citySearched-4")
var cityCard5El = document.querySelector("#citySearched-5")

var tempCardEL = document.querySelector("#tempCard")
var windCardEL = document.querySelector("#windCard")
var humidityCardEl = document.querySelector("#humidityCard")

var tempCard1EL = document.querySelector("#tempCard1")
var windCard1EL = document.querySelector("#windCard1")
var humidityCard1El = document.querySelector("#humidityCard1")

var tempCard2EL = document.querySelector("#tempCard2")
var windCard2EL = document.querySelector("#windCard2")
var humidityCard2El = document.querySelector("#humidityCard2")

var tempCard3EL = document.querySelector("#tempCard3")
var windCard3EL = document.querySelector("#windCard3")
var humidityCard3El = document.querySelector("#humidityCard3")

var tempCard4EL = document.querySelector("#tempCard4")
var windCard4EL = document.querySelector("#windCard4")
var humidityCard4El = document.querySelector("#humidityCard4")
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
            var fiveDayUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&appid=${api}&units=imperial`

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
                    tempEL.textContent=currentData.main.temp + " " + "°F"
                    windEl.textContent=currentData.wind.speed + " " + "MPH"
                    humidityEl.textContent=currentData.main.humidity + " " + "%"
                    uviEl.textContent=fiveDayData.current.uvi

                    var forecastOne = moment.unix(fiveDayData.daily[1].dt).format("MM/DD/YY")
                    var forecastOneIcon = document.createElement("img")
                    forecastOneIcon.setAttribute("src", `http://openweathermap.org/img/wn/${fiveDayData.daily[1].weather[0].icon}@2x.png`)
                    cityCard1El.innerHTML=forecastOne
                    cityCard1El.appendChild(forecastOneIcon)
                    tempCardEL.textContent=fiveDayData.daily[1].temp.day + " " + "°F"
                    windCardEL.textContent=fiveDayData.daily[1].wind_speed + " " + "MPH"
                    humidityCardEl.textContent=fiveDayData.daily[1].humidity + " " + "%"

                    var forecastTwo = moment.unix(fiveDayData.daily[2].dt).format("MM/DD/YY")
                    var forecastTwoIcon = document.createElement("img")
                    forecastTwoIcon.setAttribute("src", `http://openweathermap.org/img/wn/${fiveDayData.daily[2].weather[0].icon}@2x.png`)
                    cityCard2El.innerHTML=forecastTwo
                    cityCard2El.appendChild(forecastTwoIcon)
                    tempCard1EL.textContent=fiveDayData.daily[2].temp.day + " " + "°F"
                    windCard1EL.textContent=fiveDayData.daily[2].wind_speed + " " + "MPH"
                    humidityCard1El.textContent=fiveDayData.daily[2].humidity + " " + "%"

                    var forecastThree = moment.unix(fiveDayData.daily[3].dt).format("MM/DD/YY")
                    var forecastThreeIcon = document.createElement("img")
                    forecastThreeIcon.setAttribute("src", `http://openweathermap.org/img/wn/${fiveDayData.daily[2].weather[0].icon}@2x.png`)
                    cityCard3El.innerHTML=forecastThree
                    cityCard3El.appendChild(forecastThreeIcon)
                    tempCard2EL.textContent=fiveDayData.daily[3].temp.day + " " + "°F"
                    windCard2EL.textContent=fiveDayData.daily[3].wind_speed + " " + "MPH"
                    humidityCard2El.textContent=fiveDayData.daily[3].humidity + " " + "%"
                })
        })

}





// add eventlistener on Submit and create displayDashboard function - shows current weather for the last five days
cityFormEl.addEventListener("submit", displayWeather)

