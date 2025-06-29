import "./Weather.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faDroplet, faWind } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";

function Weather2() {
    const [loading, setLoading] = useState(true);
    const [fetching, setFetching] = useState(false);
    // const inputBox = document.querySelector(".inputBox");
    // const searchButton = document.querySelector(".searchButton");
    const weatherImage = document.querySelector(".weatherImage");
    const temperature = document.querySelector(".temperature");
    const description = document.querySelector(".description");
    const humidity = document.querySelector("#humidity");
    const windSpeed = document.querySelector("#windSpeed");
    // if (!inputBox) {
    //     console.error("Input element not found!");
    //     return;
    // }

    useEffect(() => {
        // Simulate component render delay
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // wait 1 second

        return () => clearTimeout(timer);
    }, []);

    const checkWeather = async () => {

        const inputBox = document.querySelector(".inputBox");
        if (!inputBox) {
            console.error("Input element not found!");
            return;
        }
        // console.log(city);
        const city = inputBox.value.trim();

        if (!city) {
            console.error("city element not found!");
            return;
        }

        setFetching(true);

        const url = `http://localhost:5000/weather?city=${city}`;
        const weatherData = await fetch(`${url}`)
            .then(response => response.json())
            .catch((error) => { console.log(error) });
        // console.log(weatherData);
        if (weatherData.cod === "404") {
            temperature.innerHTML = `Location Not Found!`;
            description.innerHTML = ``;
            humidity.innerHTML = `-`;
            windSpeed.innerHTML = `-`;
            weatherImage.src = "/images/404.png";
            console.log("error");
            return;
        }
        else {
            // if (!temperature) {
            //     console.warn("Temperature element not found yet.");
            //     return;
            // }
            temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`;
            description.innerHTML = `${weatherData.weather[0].description}`;
            humidity.innerHTML = `${Math.round(weatherData.main.humidity)}%`;
            windSpeed.innerHTML = `${Math.round(weatherData.wind.speed)} Kmph`;
            switch (weatherData.weather[0].main) {
                case "Clouds": weatherImage.src = "/images/cloud.png";
                    break;
                case "Clear": weatherImage.src = "/images/clear.png";
                    break;
                case "Smoke": weatherImage.src = "/images/mist.png";
                    break;
                case "Mist": weatherImage.src = "/images/mist.png";
                    break;
                case "Rain": weatherImage.src = "/images/rain.png";
                    break;
                case "Snow": weatherImage.src = "/images/snow.png";
                    break;
                case "Haze": weatherImage.src = "/images/mist.png";
                    break;
                default: weatherImage.src = "/images/404.png";
            }
        }
    }

    // searchButton.addEventListener("click", () => {
    //     checkWeather(inputBox.value);
    // })

    // inputBox.addEventListener("keydown", function (e1) {
    //     if (e1.code === "Enter" || e1.code === "NumpadEnter") {
    //         checkWeather(inputBox.value);
    //     }
    // })

    // window.onload = () => {
    //     const searchBtn = document.getElementById("searchButton");
    //     if (searchBtn) {
    //         searchBtn.addEventListener("click", checkWeather);
    //     }
    // };
    if (loading) {
        return <div className="loader"></div>; // Spinner while component loads
    }

    return (
        <div className="container">
            <div className="header">
                <div className="searchBox">
                    <input type="text" placeholder="Enter location" className="inputBox" id="inputBox" />
                    <button
                        onClick={() => {
                            const input = document.getElementById("inputBox");
                            if (input) {
                                checkWeather();
                            } else {
                                console.log("UI not ready. Try again in a moment.");
                            }
                        }}
                        className="searchButton" id="searchButton" >
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


export default Weather2;