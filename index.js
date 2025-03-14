const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "77e2ca39e8d404dd15f706af7b70896d";

weatherForm.addEventListener("submit", async event => {

  event.preventDefault();

  const city = cityInput.value;

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } 
    catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("please enter a city")
  }

})

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Could not fetch the data");
  }

  return await response.json();
}

function displayWeatherInfo(data) {
  const {name: city, main: {temp, humidity}, weather: [{description, id}]} = data;

  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humadityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${temp}°C`;
  humadityDisplay.textContent = `Humadity : ${humidity}%`;
  descDisplay.textContent = description;
  weatherEmoji.textContent = displayWeatherEmoji(id);

  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humadityDisplay.classList.add("humadityDisplay");
  descDisplay.classList.add("descDisplay");
  weatherEmoji.classList.add("weatherEmoji");

  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humadityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherEmoji)
}

function displayWeatherEmoji(data) {
  switch (true) {
    case (data >= 200 && data < 300):
      return "⛈️";
    case (data >= 300 && data < 500):
      return "🌦️";
    case (data >= 500 && data < 600):
      return "🌧️";
    case (data >= 600 && data < 700):
      return "🌨️";
    case (data >= 700 && data < 800):
      return "🌪️";
    case data === 800:
      return "🌤️";
    case (data > 800 && data < 805):
      return "☁️";
    default:
      return "🤔⁉️";
  }
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}