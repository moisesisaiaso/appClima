import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAmericas, faDroplet } from "@fortawesome/free-solid-svg-icons";

function App() {
    const apiKey = "122a39b935b281addacf6fff7057d4f4";
    const [weather, setWeather] = useState({});
    const [isCelsiusOrFahrenheit, setIsCelsiusOrFahrenheit] = useState(true);

    const lang = "es";

    const success = (pos) => {
        let crd = pos.coords;
        const latitude = crd.latitude;
        const longitude = crd.longitude;

        axios
            .get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=${lang}`
            )
            .then((res) => {
                setWeather(res.data);
                console.log(res.data);
            });
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);
    }, []);

    let temperatureC = Math.round(weather?.main?.temp) - 273;
    let temperatureF = Math.round(temperatureC * (9 / 5)) + 32;
    return (
        <div className="App">
            <header className="App-header">
                <div className="card">
                    <div className="app-title">
                        <p className="title">Weather</p>
                    </div>
                    <hr />
                    <div className="notification">
                        <p>{weather?.name}</p>
                        <p className="country">
                            <span style={{ color: "#c8f5c5" }}>
                                <FontAwesomeIcon icon={faEarthAmericas} />
                                {"  "}
                            </span>
                            {weather?.sys?.country}
                        </p>
                    </div>
                    <div className="weather-container">
                        <div className="weather-icon">
                            {weather !== undefined ? (
                                <img
                                    src={`http://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
                                    alt=""
                                />
                            ) : (
                                <img src="" alt="" />
                            )}
                        </div>

                        <div className="temperature-value">
                            <p
                                className="title"
                                onClick={() => setIsCelsiusOrFahrenheit(!isCelsiusOrFahrenheit)}
                            >
                                {isCelsiusOrFahrenheit ? (
                                    <>
                                        {temperatureC}
                                        <span>ºC</span>
                                    </>
                                ) : (
                                    <>
                                        {temperatureF}
                                        <span>ºF </span>
                                    </>
                                )}
                            </p>
                        </div>
                        <div className="temperature-description">
                            {weather !== undefined ? (
                                <p>{weather?.weather[0]?.description}</p>
                            ) : (
                                <p>-</p>
                            )}
                        </div>
                        <div className="location">-</div>
                        <div className="box-humidity">
                            <FontAwesomeIcon
                                icon={faDroplet}
                                style={{
                                    color: "#6c6c6c",
                                    height: "1.9rem",
                                }}
                            />
                            <span className="humidity title">
                                {weather.main && `${weather.main.humidity}%`}
                            </span>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default App;
