async function getWeather() {
  const city = document.getElementById('city').value.trim();
  if (!city) {
    document.getElementById('result').innerHTML = `<p>Please enter a city name.</p>`;
    return;
  }

  const apiKey = '8d94e779cda8ad5f5caa5c9ccfec9012';  // ← your key
  const url = `https://api.openweathermap.org/data/2.5/weather` +
              `?q=${encodeURIComponent(city)}` +
              `&appid=${apiKey}` +
              `&units=metric`;

  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `<p>Loading…</p>`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    if (data.cod === 200) {
      const { name } = data;
      const { main, weather } = data;
      const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

      resultDiv.innerHTML = `
        <h2>${name}</h2>
        <img src="${iconUrl}" alt="${weather[0].description}" />
        <p><strong>${weather[0].main}</strong> — ${weather[0].description}</p>
        <p>🌡️ Temperature: ${main.temp}°C</p>
        <p>🌡️ Feels like: ${main.feels_like}°C</p>
        <p>🌡️ Min: ${main.temp_min}°C / Max: ${main.temp_max}°C</p>
      `;
    } else {
      resultDiv.innerHTML = `<p>Error: ${data.message}</p>`;
    }
  } catch (err) {
    console.error('Fetch error:', err);
    resultDiv.innerHTML = `<p>Something went wrong. Check console for details.</p>`;
  }
}

// wire up the button after DOM loads
document.getElementById('getWeatherBtn')
        .addEventListener('click', getWeather);
