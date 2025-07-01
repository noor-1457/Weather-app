let apiKey = "c5b4e5e70d37044d6829c01512230420";

const searchBox = document.querySelector("input");
const searchBtn = document.querySelector(".search-box button");
const weatherIcon = document.querySelector("img");


async function checkWeather(city) {
  let Base_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(Base_url);
  const data = await response.json();
  console.log(data);

  // Update weather details
  document.querySelector(".c-name h2").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".Cloudy").innerHTML = "Feels Like: " + Math.round(data.main.feels_like) + "°C";
  document.querySelector(".Humidity").innerHTML = "Humidity: " + data.main.humidity + "%";
  document.querySelector(".Wind").innerHTML = "Wind: " + data.wind.speed + " km/h";

  //changing weather icon
if(data.weather[0].main == "Clouds"){
  weatherIcon.src = "clouds.png"
}else if(data.weather[0].main == "Sunny"){
    weatherIcon.src = "sun.png"
}else if(data.weather[0].main == "Drizzle"){
    weatherIcon.src = "cloudy(1).png"
}else if(data.weather[0].main == "Storm"){
    weatherIcon.src = "storm.png"
}else if(data.weather[0].main == "Snow"){
    weatherIcon.src = "snow.png"
}else if(data.weather[0].main == "Rain"){
    weatherIcon.src = "rainy.png"
}else if(data.weather[0].main == "Mist"){
    weatherIcon.src = "cloudy.png"
}


  // Format and display local date/time
  function formatLocalTime(utcSeconds, timezoneOffset) {
  const utcMillis = utcSeconds * 1000;
  const localMillis = utcMillis + (timezoneOffset * 1000);
  const localTime = new Date(localMillis); // Correct local time

  let hours = localTime.getUTCHours();  // Use UTC hours
  let minutes = localTime.getUTCMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const time = `${hours}:${minutes}${ampm}`;

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const day = days[localTime.getUTCDay()];
  const date = localTime.getUTCDate();
  const month = localTime.toLocaleString("default", { month: "long", timeZone: "UTC" });
  const year = localTime.getUTCFullYear();

  return `${time} | ${day} ${date} ${month} '${year.toString().slice(2)}`;
}


  const localTimeString = formatLocalTime(data.dt, data.timezone);
  document.querySelector(".datetime-text").innerHTML = localTimeString;
}

// Search button event listener
searchBtn.addEventListener("click", () => {
  const cityInput = searchBox.value.trim();
  if (cityInput !== "") {
    checkWeather(cityInput);
  }
});




searchBox.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    const cityInput = searchBox.value.trim();
     if (cityInput !== "") {
        checkWeather(cityInput);
     }
  }
});