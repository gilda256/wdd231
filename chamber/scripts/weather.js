const weatherImage = document.querySelector('.currentWeatherImage');
const weatherInformation = document.querySelector('.currentWeatherInformation');

const url = "https://api.openweathermap.org/data/2.5/forecast?lat=6.32691&lon=5.60750&units=imperial&APPID=61a0af6c0abff327e78c6ce5bfbb578c";

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayWeather(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

apiFetch();

function displayWeather(data) {

    const weather = data.list[0];
    const iconsrc = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
    const weatherIcon = document.createElement('img');
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', "weather");
    weatherIcon.setAttribute('width', '100px');
    weatherIcon.setAttribute('height', '100px');
    weatherImage.appendChild(weatherIcon);

    const weatherInfoUl = document.querySelector('.currentWeatherInformation ul');

    weatherInfoUl.innerHTML = `<li class="degree">${weather.main.temp.toFixed(0)}&deg;F</li>
    <li>${weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1)}</li>
    <li>High: ${weather.main.temp_max.toFixed(0)}&deg;</li>
    <li>Low: ${weather.main.temp_min.toFixed(0)}&deg;</li>
    <li>Humidity: ${weather.main.humidity}%;</li>`;
}