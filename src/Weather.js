import "./Weather.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faDroplet, faWind } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef } from 'react';

function Weather() {

    const buttonRef = useRef(null);

    const inputBox = document.querySelector(".inputBox");
    const searchButton = document.querySelector(".searchButton")
    const weatherImage = document.querySelector(".weatherImage");
    const temperature = document.querySelector(".temperature");
    const description = document.querySelector(".description");
    const humidity = document.querySelector("#humidity");
    const windSpeed = document.querySelector("#windSpeed");


    const handleClick = async (city) => {
        alert('Weather search initiated!');
        const url = `http://localhost:5000/weather?city=${city}`;
        const weatherData = await fetch(`${url}`)
            .then(response => response.json())
            .catch((error) => { console.log(error) });
        if (weatherData.cod === "404") {
            temperature.innerHTML = `Location Not Found!`;
            description.innerHTML = ``;
            humidity.innerHTML = `-`;
            windSpeed.innerHTML = `-`;
            weatherImage.src = "./images/404.png";
            console.log("error");
            return;
        }
        else {
            temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`;
            description.innerHTML = `${weatherData.weather[0].description}`;
            humidity.innerHTML = `${Math.round(weatherData.main.humidity)}%`;
            windSpeed.innerHTML = `${Math.round(weatherData.wind.speed)} Kmph`;
            switch (weatherData.weather[0].main) {
                case "Clouds": weatherImage.src = "./images/cloud.png";
                    break;
                case "Clear": weatherImage.src = "./images/clear.png";
                    break;
                case "Smoke": weatherImage.src = "./images/mist.png";
                    break;
                case "Mist": weatherImage.src = "./images/mist.png";
                    break;
                case "Rain": weatherImage.src = "./images/rain.png";
                    break;
                case "Snow": weatherImage.src = "./images/snow.png";
                    break;
                case "Haze": weatherImage.src = "./images/mist.png";
                    break;
                default: weatherImage.src = "./images/404.png";
            }
        }
    };
    useEffect(() => {
        const btn = buttonRef.current;

        if (btn) {
            btn.addEventListener('click', handleClick);
        }

        // Clean up when component unmounts
        return () => {
            if (btn) {
                btn.removeEventListener('click', handleClick);
            }
        };
    }, []);


    // const checkWeather = async (city) => {
    //         // const api_key = "fc34e826721f6f51edcb2d5f35c83b4c";
    //         // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    //         const url  = `http://localhost:5000/weather?city=${city}`;
    //         const weatherData = await fetch(`${url}`)
    //             .then(response => response.json())
    //             .catch((error) => { console.log(error) });
    //         if (weatherData.cod === "404") {
    //             temperature.innerHTML = `Location Not Found!`;
    //             description.innerHTML = ``;
    //             humidity.innerHTML = `-`;
    //             windSpeed.innerHTML = `-`;
    //             weatherImage.src = "./images/404.png";
    //             // console.log("error");
    //             return;
    //         } else {
    //             temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`;
    //             description.innerHTML = `${weatherData.weather[0].description}`;
    //             humidity.innerHTML = `${Math.round(weatherData.main.humidity)}%`;
    //             windSpeed.innerHTML = `${Math.round(weatherData.wind.speed)} Kmph`;
    //             switch (weatherData.weather[0].main) {
    //                 case "Clouds": weatherImage.src = "./images/cloud.png";
    //                     break;
    //                 case "Clear": weatherImage.src = "./images/clear.png";
    //                     break;
    //                 case "Smoke": weatherImage.src = "./images/mist.png";
    //                     break;
    //                 case "Mist": weatherImage.src = "./images/mist.png";
    //                     break;
    //                 case "Rain": weatherImage.src = "./images/rain.png";
    //                     break;
    //                 case "Snow": weatherImage.src = "./images/snow.png";
    //                     break;
    //                 case "Haze": weatherImage.src = "./images/mist.png";
    //                     break;
    //                 default: weatherImage.src = "./images/404.png";
    //             }
    //         }
    //     }

    // searchButton.addEventListener("click", () => {
    //     checkWeather(inputBox.value);
    // })

    // inputBox.addEventListener("keydown", function (e1) {
    //     if (e1.code === "Enter" || e1.code === "NumpadEnter") {
    //         checkWeather(inputBox.value);
    //     }
    // })


    return (
        <div className="container">
            <div className="header">
                <div className="searchBox">
                    <input type="text" placeholder="Enter location" className="inputBox" id="inputBox" />
                    <button ref={buttonRef} className="searchButton" id="searchButton" >
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="searchButton" />
                    </button>
                </div>
            </div>
            <div className="weatherBody">
                <img src="./images/clear.png" alt="" className="weatherImage"></img>
            </div>
            <div className="weatherBox">
                <p className="temperature">0<span><sup>°</sup>C</span></p>
                <p className="description">Light Rain</p>
            </div>
            <div className="weatherDetails">
                <div className="humidity">
                    <FontAwesomeIcon icon={faDroplet} className="faIcon" />
                    <div className="text">
                        <span id="humidity">45%</span>
                        <p>Humidity</p>
                    </div>
                </div>

                <div className="windSpeed">
                    <FontAwesomeIcon icon={faWind} className="faIcon" />
                    <div className="text">
                        <span id="windSpeed">12 Kmph</span>
                        <p>Wind-Speed</p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Weather;

// import { useState } from 'react';

// function Weather() {
//     const [city, setCity] = useState('');
//     const [weather, setWeather] = useState(null);

//     const getWeather = async () => {
//         const response = await fetch(`http://localhost:5000/weather?city=${city}`);
//         const data = await response.json();
//         setWeather(data);
//     };

//     return (
//         <div style={{ textAlign: 'center', marginTop: '2rem' }}>
//             <h1>Weather App</h1>
//             <input
//                 type="text"
//                 placeholder="Enter city"
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//             />
//             <button onClick={getWeather}>Get Weather</button>

//             {weather && (
//                 <div>
//                     <h2>{weather.location.name}</h2>
//                     <p>{weather.current.temp_c} °C</p>
//                     <p>{weather.current.condition.text}</p>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Weather;
