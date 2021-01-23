// 1. Show local date and time
// 1.1 Define the attributes for the current time and date
let now = new Date();
let hour = now.getHours();
let minutes = now.getMinutes();

//1.1.1 When minutes < 10, then the zero is missing. With this function we add the zero
function minutesWithZero() {
  if (minutes < 10) {
    return "0" + minutes;
  } else {
    return minutes;
  }
  return now.getMinutes() < 10 ? "0" : "";
}

let time = `${hour}:${minutes}`;

// 1.2 Change the HTML part with the "fake time" into the new defined one
let localTime = document.querySelector("#local-time");
localTime.innerHTML = `${time}`;

// 1.3 Define the attributes for the current day and date
// 1.3.1 For defining the day you need an array to display the name of the weekdays (not numbers)
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

// 1.3.2 Define the date
let daydate = now.getDate();
let month = now.getMonth() + 1;
let year = now.getFullYear();

// 1.4 Change the HTML part with the "fake date" into the new defined one
let localDate = document.querySelector("#local-date");
localDate.innerHTML = `${day}, ${daydate}.${month}.${year}`;

// 2. Add a search engine, display the city name on the page after submit
// 2.1 Define function, what should happen when clicking on the search button
function searchCityButton(event) {
  event.preventDefault(); //prevents the default behaviour (=reload page) after clicking button
  let searchInput = document.querySelector("#entercity").value; //Select the form for entering the city's name
  let cityName = document.querySelector("#city-name"); //Select part of HTML which shall be changed
  cityName.innerHTML = searchInput;
  let apiKey = "641aea60f164eb7376c34eaed6daea65";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
  console.log(cityName);
}

// 2.2 Define event (click on search button)
// 2.2.1 Select search button
let searchButton = document.querySelector("#searchbutton");
// 2.2.2 Define event
searchButton.addEventListener("click", searchCityButton); //when CLICK on button -> run function searchCityButton

// 3. Current Weather Data for typed in city
// 3.1 Implement axios.github in INDEX in HEAD-Part
// 3.2 Define api data from openweathermap

// 3.3 Function for show Temperature
function showTemperature(response) {
  //Select data from the apiUrl:
  let temperature = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let windSpeed = response.data.wind.speed;
  //Select HTML parts, which have to be substitute with the api data:
  let temp = document.querySelector(".degree");
  let hum = document.querySelector("#local-humidity");
  let wind = document.querySelector("#local-wind");
  temp.innerHTML = `${temperature}`;
  hum.innerHTML = `${humidity}`;
  wind.innerHTML = `${windSpeed}`;
}
