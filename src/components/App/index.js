import React, { Component } from "react";
import "./App.css";
import Input from "../Input";
import Forecast from "../Forecasts";
import Weather from "../Weather";
import ReactGA from "react-ga";

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
    this.setState(() => initialState);
  };

  getWeather = () => {
    const { value } = this.state;
    fetch(
      `https://api.apixu.com/v1/forecast.json?key=${API_KEY}&q=${value}&days=6`
    )
      .then(response => response.json())
      .then(data =>
        this.setState({
          hasGrabbedData: true,
          location: data.location,
          temperature: data.current.temp_c,
          description: data.current.condition.text,
          iconURL: data.current.condition.icon,
          forecasts: data.forecast.forecastday
        })
      )
      .catch(err => {
        alert(
          "Ooops it seems like you've entered an incorrect destination. Please try again."
        );
        console.log(err);
      });
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
          <div>
            <div className="header">
              <h1>Cloud Watch</h1>
              <h2>Enter the city name or postcode to get weather conditions</h2>
            </div>

            <Input
              getWeather={this.getWeather}
              handleChange={this.handleChange}
              handleEnter={this.handleEnter}
              value={value}
              temperature={temperature}
              description={description}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
