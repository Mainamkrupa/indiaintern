const apiKey = getApiKey(); // Replace with your function to retrieve API key

const cityInput = document.getElementById('cityInput');
const submitButton = document.getElementById('submitButton');
const weatherOutput = document.getElementById('weatherOutput');

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  const cityName = cityInput.value;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}
&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const weatherDescription = data.weather[0].main;
      const temperature = convertKelvinToFahrenheit(data.main.temp);
      weatherOutput.textContent = `The weather in ${cityName} is ${weatherDescription} with a temperature of ${temperature}°F.`;
    })
    .catch(error => {
      if (error.response) {
        weatherOutput.textContent = `Error: ${error.response.statusText}`;
      } else {
        weatherOutput.textContent = 'Error: Could not fetch weather data.';
      }
    });
});

function convertKelvinToFahrenheit(kelvin) {
  return Math.floor((kelvin - 273.15) * 1.8) + 32;
}
