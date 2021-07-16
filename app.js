const api = {
    key: "302b7d428a7ebd623931a6edfac5e386",
    baseUrl: "https://api.openweathermap.org/data/2.5/"
};

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults (query) {
  fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function changeBg (e) {
    if(e == 'Haze' || e == 'Fog' || e == 'Mist') {
        document.body.style.backgroundImage = "url('haze.jpg')";
    }
    else if(e == 'Clouds') {
        document.body.style.backgroundImage = "url('cloudy.jpg')";
    }
    else if(e == 'Thunderstrom' || e == 'Drizzle' || e == 'Rain'){
        document.body.style.backgroundImage = "url('rain.jpg')";
    }
    else if(e == 'Snow' || e == 'Winterstrom' || e == 'Blizzard'){
        document.body.style.backgroundImage = "url('snow.jpg')";
    }
    else if(e == 'Clear'){
        document.body.style.backgroundImage = "url('bg.jpg')";
    }
}

function displayResults (weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;
    console.log(typeof(weather.weather[0].main));

    let hilow = document.querySelector('.high-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

    changeBg(weather.weather[0].main);
}

function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}
