function formatDate(timestamp) {
let date = new Date(timestamp);
let hours = date.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
}
let days = [
"Sunday",
"Monday",
"Tuesday",
"Wednesday",
"Thursday",
"Friday",
"Saturday"
];
let day = days[date.getDay()];
return `${day} ${hours}:${minutes}`;
}


function displayForecast(response) {
    console.log(response.data.daily);
    let forecastElement = document.querySelector("#forecast");

let forecastHTML = `<div class="row">`;
let days = ["Fri","Sat", "Sun", "Mon"];
days.forEach(function(day){
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
      <div class="weather-forecast-date">${day}</div>
        <img
          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/few-clouds-day.png"
          alt=""
          width="40"
        />
        <div class="weather-forecast-temperature">
          <span class="weather-forecast-temperature-maximum">27°</span>
          <span class="weather-forecast-temperature-minimum">20°</span>
        </div>
      </div>
    
    `;
}) 

forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    let apiKey = "29a19a2a04o29b700f9cbf09t43af556";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
let temperatureElement = document.querySelector("#temperature");
let cityElement = document.querySelector("#city");
let descriptionElement = document.querySelector("#description");
let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#windspeed");
let dateElement = document.querySelector("#date");
let iconElement = document.querySelector("#icon");

celsiusTemperature = response.data.temperature.current;

temperatureElement.innerHTML = Math.round(celsiusTemperature);
cityElement.innerHTML = response.data.city;
descriptionElement.innerHTML = response.data.condition.description;
humidityElement.innerHTML = response.data.temperature.humidity;
windElement.innerHTML = Math.round(response.data.wind.speed);
dateElement.innerHTML = formatDate(response.data.time * 1000);
iconElement.setAttribute("src",`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
iconElement.setAttribute("alt", response.data.condition.description);


getForecast(response.data.coordinates);
}

function search(city) {
    let apiKey = "29a19a2a04o29b700f9cbf09t43af556";
    let apiUrl =
      `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
      axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let farhenheitTemperature = (celsiusTemperature * 9) /5 + 32;
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(farhenheitTemperature);
}

function displayCelsiusTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;


let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);


let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);



search("Vienna");
