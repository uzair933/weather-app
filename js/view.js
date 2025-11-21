class View {
    constructor() {
        this.loader = document.getElementById("loader");
        this.errorDiv = document.getElementById("error");
        this.currentWeatherDiv = document.getElementById("currentWeather");
        this.forcastDiv = document.getElementById("forecast");
    }

    _clear(condition = false) {
        this.errorDiv.textContent = condition ? "City not found" : "";
        this.currentWeatherDiv.innerHTML = "";
        this.forcastDiv.innerHTML = "";
    }

    _timer(seconds = 1) {
        setTimeout(() => {
            this._load(false);
        }, seconds * 1000);
    }

    _currentCity(city) {
        return `
            <h2>${city.name}, ${city.sys.country}</h2>
            <p>Temperature: ${city.main.temp}°C</p>
            <p>Weather: ${city.weather[0].description}</p>
        `;
    }

    _forcastDay(day, parent) {
        const div = document.createElement("div");
        div.className = "day";
        div.innerHTML = `
            <h4>${new Date(day.dt_txt).toLocaleDateString()}</h4>
            <p>${day.main.temp}°C</p>
            <p>${day.weather[0].main}</p>
        `;
        parent.appendChild(div);
    }

    _load(show = true) {
        this.loader.style.display = show ? "block" : "none";
    }
}

export default new View();
