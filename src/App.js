import { useState } from "react";
import axios from 'axios'
import "./App.css";
import key from "./key";
//Api погоди -
//&units=metric - додали перевести в цельсія


//.Через бектіки записати і зробити пробіл і буде відступ справа
// {`${ data.main.temp.toFixed()} `} 
//{data.main.temp.toFixed()}  - так було

function App() {
  const [data, setData] = useState({});
  const [town, setTown] = useState("");

  const mykey = key;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${town}&units=metric&appid=${mykey}`;

  const searchWeather = (e) => {
    if (e.key === "Enter") {
        axios.get(url).then((response) => {
        setData(response.data);
      });
      setTown("");
    }
  };

  return (
    <div className="app">
      <div className="inp-field">
        <input
          type="text"
          value={town}
          onChange={(e) => setTown(e.target.value)}
          placeholder="Enter your town..."
          onKeyDown={searchWeather}
        />
      </div>
      <div className="container">
        <div className="header">
          <div className="city">
            <p>{data.name}</p>
          </div>
        </div>
        <div className="temp">
          {data.main ? (
            <h1>
              {`${ data.main.temp.toFixed()} `}
              °C
            </h1>
          ) : null}
        </div>
        <div className="desc">
          {data.weather ? <p>{data.weather[0].main} </p> : null}
        </div>
      </div>
      {data.name !== undefined && (
        <div className="footer">
          <div className="feels">
            <p> Feels like  </p>
            {data.main ? (
              <p className="bold">{data.main.feels_like.toFixed()} °C</p>
            ) : null}
          </div>
          <div className="humidity">
            <p> Humidity  </p>
            {data.main ? <p className="bold">{`${data.main.humidity} ` }%</p> : null}
          </div>
          <div className="wind">
          <p> Speed of wind  </p>
            {data.wind ? <p className="bold">{`${data.wind.speed} ` } M/S</p> : null}
          </div>
      
        </div>
      )}
    </div>
  );
}

export default App;
