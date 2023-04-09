const apiKey = "ec1724aa0b3bff974f15ef482ecab5c9";

const getWeather = () => {
  const cityInput = document.querySelector("#city-input");
  const cityName = cityInput.value;
  const weatherResultsCity = document.querySelector("#weather-results");
  const clima = document.querySelector("#clima-results")
  const errorMessage = document.querySelector("#error-message");
  const imageResults = document.querySelector("#weather-image");

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Cidade não encontrada.");
      }
      return response.json();
    })
    .then(data => {
        const temperature = data.main.temp;
        const resultText = `${cityName}`.toUpperCase();
        const resultClima = `${temperature}°C`
        errorMessage.textContent = "";
        weatherResultsCity.textContent = resultText;
        clima.textContent = resultClima;
        
      
        // Lógica para mudar a imagem de fundo ou exibir um ícone de chuva
        const container = document.querySelector(".container");
        const containerResults = document.querySelector(".containerResult");
        if (temperature <= 0) {
            imageResults.src = "./imgs/snowing.png"
            containerResults.style.backgroundImage = "url('./imgs/backNeve.jpg')"
            container.style.backgroundColor = "snow"
        } else if (temperature > 0 && temperature <= 20.00) {
            imageResults.src = "./imgs/rain.png";
            container.style.backgroundColor = "#264da3"
            containerResults.style.backgroundImage = "url('./imgs/backRain.jpg')"
        } else if(temperature > 20.00 && temperature <= 30){
            imageResults.src = "./imgs/cloud.png";
            containerResults.style.backgroundImage = "url('./imgs/backOutono.jpg')"
            container.style.backgroundColor = "#646d75"
        }else{
            imageResults.src = "./imgs/sun.png"
            containerResults.style.backgroundImage = "url('./imgs/backSun.jpg')"
            container.style.backgroundColor = "#87ceeb"
        }
      })
      
     
    
    .catch(error => {
      weatherResultsCity.textContent = "";
      clima.textContent = "";
      errorMessage.textContent = error.message;
      
    });
};

const button = document.querySelector("#get-weather-button");
button.addEventListener("click", getWeather);
