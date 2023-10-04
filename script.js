let container = document.createElement("main");
container.setAttribute("class","container")
document.body.appendChild(container);

let row = document.createElement("div");
row.setAttribute("class","row","gap-3")
container.appendChild(row);

let latLonArr = [];

fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => {

        console.log(data);

        data.forEach((arr,index) => {
            const countryData = {
                countryName: arr.name.common,
                capital: arr.capital || "no data available",
                region: arr.region,
                flag: arr.flags.png,
                countryCode: arr.cca3,
                latIng: arr.latlng,
            }
            cardCreate(countryData,data,index);
        });
    })
    .catch((err) => console.log(err));

function cardCreate(ele,data,index){
    row.innerHTML += `
    <div class="col-lg-4 col-sm-12 col-md-6 card" id="country-card">
        <div class="card-content">
            <p class="country-name card-header"><span>${ele.countryName}</span></p> 
            <img src="${ele.flag}" alt="${ele.countryName}" class="image" loading="lazy">
            <div class="card-body">
                <p><span>Capital: ${ele.capital}</span></p> 
                <p><span>Region: ${ele.region}</span></p> 
                <p><span>Country Code: ${ele.countryCode}</span></p> 
                <button class="weather-btn btn btn-primary">Click for Weather</button>
                <p class="weather-data-${index}"></p> 
            </div>
        </div>
    </div>
    `;


    getWeather(data);
}

function getWeather(data){
    let get = document.querySelectorAll(".btn");
    get.forEach((e,index) => {   
        e.addEventListener("click",() =>{
            let apiKey = "ad25de67d12562202ef4fcd4bb9a6ded";

            let lat = data[index].latlng[0];
            let lon = data[index].latlng[1];

            const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
            fetch(apiURL)
                .then((weatherRes) => weatherRes.json())
                .then((weatherData) => {
                    let weatherShow = document.querySelector(`.weather-data-${index}`);
                    weatherShow.innerHTML = `Temperature: ${weatherData.main.temp}°F<br>
                                            Humidity: ${weatherData.main.humidity}°F`;
                    console.log(weatherData);
                })
                .catch((err) => console.log(`Error in getting ind weather data:${err}`));


        })
    });
}