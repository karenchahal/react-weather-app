import React, { Component } from "react";
import Weather from "../Weather";
//Key finding so far 25/3 -- keep a track of the state and where it needs to go i.e doesn't alwas get pushed up parent
//Key findings 2/4 --- console.log to get down to specific data from api & think about how to turn to degress and return it as this value
// will need to put the API key in the .env and config file/folder

const API_KEY = "9aa6942360cfed730ae34abe603d59a2";

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      country: "",
      temperature: undefined,
      description: undefined
    };
  }

  onChange = event => {
    const { value, name } = event.target;
    this.setState(state => ({
      [name]: value
    }));
  };

  getWeather = async event => {
    const { city, country } = this.state;
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}`
    );
    const data = await response.json();
    console.log(data);
    this.setState(state => ({
      temperature: data.main.temp,
      description: data.weather[0].description
    }));
    console.log(this.state.temperature);
    console.log(this.state.description);
    const degrees = Math.round(this.state.temperature - 273.15);
    console.log(degrees);
  };

  render() {
    const { city, country, temperature, description } = this.state;
    return (
      <div>
        <input
          onChange={this.onChange}
          type="text"
          placeholder="City"
          name="city"
          value={city}
        />
        <input
          onChange={this.onChange}
          type="text"
          placeholder="Country"
          name="country"
          value={country}
        />
        <button onClick={this.getWeather}>Grab the Weather</button>
        <Weather temperature={temperature} description={description} />
      </div>
    );
  }
}

export default Input;
