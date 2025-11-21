import view from "./view.js";
import { ID } from "./config.js";

const currentWeatherDiv = document.getElementById("currentWeather");
const cityInput = document.getElementById("cityInput");
const loader = document.getElementById("loader");
const errorDiv = document.getElementById("error");
const forcastDiv = document.getElementById("forecast");
const prevCitiesDiv = document.getElementById("prevCities");

const previousCities = JSON.parse(localStorage.getItem("cities")) || [];

export const API = async function (city, apiKey = ID) {
    try {
        const feti = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)

        if (!feti.ok) throw new Error("City not found");
        const currentData = await feti.json();
        view._clear();
        currentWeatherDiv.innerHTML = view._currentCity(currentData);
        view._timer();

        const fet = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);
        const forecastData = await fet.json();
        const daily = forecastData.list.filter(reading => reading.dt_txt.includes("12:00:00"));
        daily.forEach(days => view._forcastDay(days, forcastDiv));
        view._timer();

    } catch (error) {
        view._timer();
        view._clear(true)
    }
}

export const renderPrevious = function (city) {
    prevCitiesDiv.innerHTML = "";
    if (city && !previousCities.includes(city)) {
        previousCities.push(city)
        localStorage.setItem("cities", JSON.stringify(previousCities));
    }
    previousCities.forEach(cites => {
        const btn = document.createElement("button");
        btn.textContent = cites;
        prevCitiesDiv.appendChild(btn);
        btn.addEventListener("click", function () {
            cityInput.value = cites;
            view._load();
            API(cites);
        })
    })
}
