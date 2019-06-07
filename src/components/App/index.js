import React, { Component } from "react";
import "./App.css";
import Input from "../Input";
import Forecast from "../Forecasts";
import Weather from "../Weather";
import ReactGA from "react-ga";
import { Redirect } from 'react-router-dom';

function initializeReactGA() {
  ReactGA.initialize("UA-138282755-1");
  ReactGA.pageview("/homepage");
}

const API_KEY = "9168a10593c24a24bf7181401190304";

const initialState = {
  value: "",
  location: undefined,
  temperature: undefined,
  description: undefined,
  iconURL: undefined,
  hasGrabbedData: false,
  forecasts: []
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      location: undefined,
      temperature: undefined,
      description: undefined,
      iconURL: undefined,
      hasGrabbedData: false,
      forecasts: []
    };
  }

  handleChange = event => {
    const { value } = event.target;
    // console.log(event.target.value);
    this.setState(state => ({ value }));
  };

  handleEnter = event => {
    if (event.keyCode === 13) {
      this.getWeather();
    }
  };

  handleClick = () => {
    if (!this.state.value) {
      return;
    }
  };

  backToHome = () => {
    this.setState(() => (initialState));
  };

  getWeather = async () => {
    const { value } = this.state;
    try {
      const response = await fetch(
        `https://api.apixu.com/v1/forecast.json?key=${API_KEY}&q=${value}&days=6`
      );
      const data = await response.json();
      console.log(data);
      this.setState(state => ({
        hasGrabbedData: true,
        location: data.location,
        temperature: data.current.temp_c,
        description: data.current.condition.text,
        iconURL: data.current.condition.icon,
        forecasts: data.forecast.forecastday
      }));
      console.log("has the data been grabbed", this.state.hasGrabbedData);
      console.log("forecasts state", this.state.forecasts);
    } catch (err) {
      alert("Whoops looks like you mistyped something, we couldn't find that address. Redirecting you back to the homepage to try again");
      // return <Redirect to='localhost:3000' />

      // could also throw an error for better logging then do something else like a redirect
      // throw new Error(`Cannot resolve weather selection because: [${err.message}]`);
    }
  };

  render() {
    const {
      value,
      location,
      temperature,
      description,
      iconURL,
      hasGrabbedData,
      forecasts
    } = this.state;

    return (
      <div className="App">
        <div className="header">
          <h1>Cloud Watch</h1>
          <h2>Enter the city name or postcode to get weather conditions</h2>
        </div>
        {hasGrabbedData ? (
          <div className="weather">
            <Weather
              location={location}
              hasGrabbedData={hasGrabbedData}
              iconURL={iconURL}
              temperature={temperature}
              description={description}
              backToHome={this.backToHome}
            />
            <Forecast forecasts={forecasts} />
          </div>
        ) : (
          <Input
            getWeather={this.getWeather}
            handleChange={this.handleChange}
            handleEnter={this.handleEnter}
            value={value}
            temperature={temperature}
            description={description}
          />
        )}
      </div>
    );
  }
}

export default App;
