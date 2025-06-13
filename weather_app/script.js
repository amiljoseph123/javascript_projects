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

// ..................

// 🌤️ Weather fetch + emoji
async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = "1ce116f57850632c9d07eaeb1bb8c818"; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();

    const condition = data.weather[0].description.toLowerCase();
    const iconUrl = getWeatherImage(condition);
    const emoji = getWeatherEmoji(condition);

    const weatherHTML = `
      <img class="weather-icon" src="${iconUrl}" alt="${condition}" />
      <h2>${data.name}, ${data.sys.country}</h2>
      <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
      <p><strong>Condition:</strong> ${data.weather[0].description} ${emoji}</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;

    document.getElementById("weatherResult").innerHTML = weatherHTML;
  } catch (error) {
    document.getElementById("weatherResult").innerHTML = `<p>${error.message}</p>`;
  }
}

function getWeatherImage(condition) {
  if (condition.includes("clear")) {
    return "https://cdn-icons-png.flaticon.com/512/869/869869.png";
  } else if (condition.includes("cloud")) {
    return "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";
  } else if (condition.includes("rain")) {
    return "https://cdn-icons-png.flaticon.com/512/1146/1146858.png";
  } else if (condition.includes("thunderstorm")) {
    return "https://cdn-icons-png.flaticon.com/512/1146/1146860.png";
  } else if (condition.includes("snow")) {
    return "https://cdn-icons-png.flaticon.com/512/642/642102.png";
  } else if (condition.includes("mist") || condition.includes("fog")) {
    return "https://cdn-icons-png.flaticon.com/512/4005/4005901.png";
  } else {
    return "https://cdn-icons-png.flaticon.com/512/869/869869.png";
  }
}

function getWeatherEmoji(condition) {
  if (condition.includes("clear")) return "☀️";
  if (condition.includes("cloud")) return "☁️";
  if (condition.includes("rain")) return "🌧️";
  if (condition.includes("thunderstorm")) return "⛈️";
  if (condition.includes("snow")) return "❄️";
  if (condition.includes("mist") || condition.includes("fog")) return "🌫️";
  return "🌤️";
}