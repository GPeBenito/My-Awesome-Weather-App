function formatDate(timestamp){
  let date = new Date(timestamp);

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

return `${day} ${formatHours(timestamp)}`;
}

function formatHours (timestamp) {
  let date = new Date(timestamp);
  let hours=date.getHours();
  if (hours < 10){
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes <10) {
    minutes=`0${minutes}`;
  }
return `${hours}:${minutes}`;
}
function displayWeatherCondition(response) {

  let iconElement=document.querySelector("#weather-icon");
  document.querySelector("#city").innerHTML=response.data.name;
  document.querySelector("#temperature").innerHTML=Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML=response.data.main.humidity;
  document.querySelector("#wind").innerHTML=Math.round(response.data.wind.speed);
document.querySelector("#description").innerHTML=response.data.weather[0].description;
dateElement.innerHTML=formatDate (response.data.dt * 1000);
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

iconElement.setAttribute("alt",response.data.weather[0].description);
}


function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  console.log(forecast);
  
  for (let index=0; index < 6; index++) {
    forecast=response.data.list[index];
    forecastElement.innerHTML += `<div class="col-2"><h3>${formatHours(forecast.dt * 1000)}</h3><img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt=""/> <div class="weather-forecast-temperature"> <strong> ${Math.round(forecast.main.temp_max)} ° </strong>${Math.round(forecast.main.temp_min)}°</div> </div>`;
  }
}

function searchCity(city) {
  let apiKey ="0e6a69651885d99335f23f200403f8a4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayWeatherCondition);

let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
axios.get(forecastURL).then(displayForecast);

}

function handleSubmit(event){
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey ="0e6a69651885d99335f23f200403f8a4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);

  let geoForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
axios.get(geoForecastUrl).then(displayForecast);
}

function getCurrentLocation(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}


function convertFahrenheit(response) {
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let celsius = Math.round(response.data.main.temp);
  document.querySelector("#temperature").innerHTML = Math.round((celsius * 9) / 5 + 32);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city").innerHTML;
  let apiKey ="0e6a69651885d99335f23f200403f8a4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(convertFahrenheit);
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

function convertCelsius(response) {
fahrenheitLink.classList.remove("active");
celsiusLink.classList.add("active");
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
}

function displayCelsius(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city").innerHTML;
  let apiKey ="0e6a69651885d99335f23f200403f8a4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(convertCelsius);

}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);


let currentLocationButton=document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("New York");

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);


