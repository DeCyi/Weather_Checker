document.getElementById('weatherForm').addEventListener('submit', function (event) {
    event.preventDefault();
    var location = document.getElementById('location').value;
    getWeather(location);
});

 async function getWeather(location) {
    const apiKey = ''; // Replace with your actual API key
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        document.getElementById('weather').innerText = 'Failed to retrieve weather data. Please try again.';
    }

}

function displayWeather(data) {
    const weatherDiv = document.getElementById('weather');
    weatherDiv.innerHTML = `
        <h2>Weather in ${data.location.name}, ${data.location.region}, ${data.location.country}, ${data.location.tz_id}</h2>
        <h3> ${data.location.lat}, ${data.location.lon} </h3>
        <p><strong>Temperature:</strong> ${data.current.temp_c} °C</p>
        <p><strong>Condition:</strong> ${data.current.condition.text}</p>
        <img src="${data.current.condition.icon}" alt="${data.current.condition.text}">
        <p><strong>Wind:</strong> ${data.current.wind_kph} kph</p>
        <p><strong>Humidity:</strong> ${data.current.humidity} %</p>
    `;
} 