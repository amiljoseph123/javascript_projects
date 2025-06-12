async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "1ce116f57850632c9d07eaeb1bb8c818"; // Replace with your OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();

    const weatherHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
      <p><strong>Condition:</strong> ${data.weather[0].description}</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;

    document.getElementById("weatherResult").innerHTML = weatherHTML;
  } catch (error) {
    document.getElementById("weatherResult").innerHTML = `<p>${error.message}</p>`;
  }
}
// .......................
// ⏰ Clock
function updateClock() {
  const now = new Date();
  document.getElementById("clock").textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// 🎤 Voice input (Web Speech API)
const micBtn = document.getElementById("micBtn");
if ('webkitSpeechRecognition' in window) {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";

  micBtn.addEventListener("click", () => {
    recognition.start();
  });

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    document.getElementById("cityInput").value = transcript;
    getWeather();
  };
} else {
  micBtn.disabled = true;
  micBtn.title = "Speech recognition not supported";
}

