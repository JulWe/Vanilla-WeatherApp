function displayTemperature(response) {
console.log(response.data);
let temperatureElement = document.querySelector("#temperature");
temperatureElement.innerHTML = Math.round(response.data.temperature.current);
let cityElement = document.querySelector("#city");
cityElement.innerHTML = response.data.city;
let descriptionElement = document.querySelector("#description");
descriptionElement.innerHTML = response.data.condition.description;
let humidityElement = document.querySelector("#humidity");
humidityElement.innerHTML = response.data.temperature.humidity;
let windElement = document.querySelector("#windspeed");
windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "29a19a2a04o29b700f9cbf09t43af556";
let query = "Vienna";
let apiUrl =
  "https://api.shecodes.io/weather/v1/current?query=Vienna&key=29a19a2a04o29b700f9cbf09t43af556&units=metric";

console.log(apiUrl);

axios.get(apiUrl).then(displayTemperature);
