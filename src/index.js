function formatDate(date){
let hours = date.getHours();
let minutes = date.getMinutes();
if (hours < 10){
  hours = `0${hours}`;
}
if (minutes <10) {
  minutes=`0${minutes}`;
}

let dayIndex = date.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[dayIndex];

return `${day} ${hours}:${minutes}`;
}

function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML=response.data.name;
  document.querySelector("#temperature").innerHTML=Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML=response.data.main.humidity;
  document.querySelector("#wind").innerHTML=Math.round(response.data.wind.speed);
document.querySelector("#description").innerHTML=response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey ="0e6a69651885d99335f23f200403f8a4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayWeatherCondition);
console.log(apiUrl);
}

function handleSubmit(event){
  
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey ="0e6a69651885d99335f23f200403f8a4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`;
  
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertTemp(event) {
  event.preventDefault();
  let displayTemp = document.querySelector("#temperature");
  displayTemp.innerHTML = "66";
}
let f = document.querySelector("#fahrenheit-link");
f.addEventListener("click", convertTemp);

function convertCels(event) {
  event.preventDefault();
  let displayCels = document.querySelector("#temperature");
  displayCels.innerHTML = "19";
}
let c = document.querySelector("#celsius-link");
c.addEventListener("click", convertCels);

let currentLocationButton=document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("New York");

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

//function showTemp(cityInput){
  //let showTemp = document.querySelector("#city-input");
  

//  let h1 = document.querySelector(".city");
//h1.innerHTML = `${cityInput.value}`;
//let temperature = Math.round(response.data.main.temp);
//let span = document.querySelector("span.temperature#temperature");
//span.innerHTML= temperature;

//let currentDay = day[daysIndex];
//let clock = document.querySelector("span.clock#displayTime");
//clock.innerHTML = ` ${currentDay} ${hours} : ${minutes}`;
// or // return `${day} ${hours}:${minutes}`;
//console.log(clock);
