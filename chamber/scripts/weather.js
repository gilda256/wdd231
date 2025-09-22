// انتخاب عناصر DOM برای نمایش وضعیت فعلی
const currentDateTempSpan = document.querySelector("#current-date-temp");
const currentDateHighTempSpan = document.querySelector("#current-date-high-temp");
const currentDateLowTempSpan = document.querySelector("#current-date-low-temp");
const currentWeatherHumidity = document.querySelector("#current-weather-humidity");
const currentWeatherSunriseTime = document.querySelector("#current-weather-sunrise-time");
const currentWeatherSunsetTime = document.querySelector("#current-weather-sunset-time");
const currentDateWeatherConditions = document.querySelector("#current-weather-conditions");
const weatherIconImg = document.querySelector("#weather-icon");

// کلید API و مختصات
const apiKey = "61a0af6c0abff327e78c6ce5bfbb578c"; // 👈 همونی که خودت داری
const lat = "6.32691";
const lon = "5.60750";

// URL برای وضعیت فعلی و پیش‌بینی
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

// نمایش وضعیت فعلی
function displayCurrentDayResults(data) {
    currentDateTempSpan.innerHTML = `${data.main.temp.toFixed(0)}&deg;F`;
    currentDateHighTempSpan.innerHTML = `${data.main.temp_max.toFixed(0)}&deg;F`;
    currentDateLowTempSpan.innerHTML = `${data.main.temp_min.toFixed(0)}&deg;F`;
    const description = data.weather[0].description;
    currentDateWeatherConditions.textContent = description.charAt(0).toUpperCase() + description.slice(1);

    const sunriseDateStr = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', {hour: "2-digit", minute: "2-digit"});
    const sunsetDateStr = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', {hour: "2-digit", minute: "2-digit"});

    currentWeatherHumidity.innerHTML = `${data.main.humidity}%`;
    currentWeatherSunriseTime.innerHTML = `${sunriseDateStr}`;
    currentWeatherSunsetTime.innerHTML = `${sunsetDateStr}`;

    const icon = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    weatherIconImg.setAttribute("src", icon);
    weatherIconImg.setAttribute("alt", description);
    weatherIconImg.setAttribute("width", 95);
    weatherIconImg.setAttribute("height", 95);
}

// نمایش پیش‌بینی سه روز آینده
function displayForecastResults(data) {
    if (data.cnt > 2) {
        const dataList = data.list;
        const days = ['Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

        let dayCounter = 0;
        let lastDay = -1;

        dataList.forEach((day) => {
            const a = new Date(day.dt_txt);
            const newDay = a.getDay();

            // فقط یکبار برای هر روز
            if (lastDay !== newDay && (dayCounter < 3)) {
                const dayTemperature = document.querySelector(`#day${dayCounter}temp`);
                dayTemperature.innerHTML = `${day.main.temp.toFixed(0)}&deg;F`;

                if (dayCounter > 0) { // روز جاری اسم روز نمی‌گیره
                    const dayOfWeek = days[newDay];
                    const dayOfWeekSpan = document.querySelector(`#day${dayCounter}-day-of-week`);
                    dayOfWeekSpan.textContent = dayOfWeek;
                }

                lastDay = newDay;
                dayCounter += 1;
            }
        });
    } else {
        console.log("Error - insufficient data returned by the forecast API");
    }
}

// گرفتن داده‌ها
const apiFetch = async () => {
    try {
        // وضعیت فعلی
        let response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
            console.log("Current weather:", data);
            displayCurrentDayResults(data);
        } else {
            throw Error(await response.text());
        }

        // پیش‌بینی
        response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            console.log("Forecast:", data);
            displayForecastResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
};

apiFetch();
