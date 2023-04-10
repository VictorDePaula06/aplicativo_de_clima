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
          //neve
            imageResults.src = "./imgs/snowing.png"
            container.style.backgroundImage = "url('./imgs/backNeve3.jpg')"
        } else if (temperature > 0 && temperature <= 10.00){
          //chuva
            imageResults.src = "./imgs/rain.png";
            container.style.backgroundImage = "url('./imgs/backChuva.jpg')"
        } else if(temperature > 10.00 && temperature <= 20){
          //frio
            imageResults.src = "./imgs/cloud.png";
            container.style.backgroundImage = "url('./imgs/backFrio.jpg')"
        }else if(temperature > 20 && temperature <= 30){
          // clima agradavel
            imageResults.src = "./imgs/nuvens-e-sol.png";
            container.style.backgroundImage = "url('./imgs/backOutono.jpg')"
        }else{
          //sol
            imageResults.src = "./imgs/sun.png"
            container.style.backgroundImage = "url('./imgs/backSol.jpg')"
           
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
