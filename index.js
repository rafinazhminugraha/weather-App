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
  
}

function displayWeatherInfo(data) {
  
}

function displayWeatherEmoji(data) {
  
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}