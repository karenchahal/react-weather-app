import React, { Component } from "react";
import "./App.css";
import Header from "../Header";
import Input from "../Input";
import Forecast from "../Forecasts";
import Weather from "../Weather";

// add in a default

const API_KEY = "9168a10593c24a24bf7181401190304";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      temperature: undefined,
      description: undefined,
      isDay: undefined,
      iconURL: undefined,
      hasGrabbedData: false
    };
  }

  handleChange = event => {
    const { value } = event.target;
    console.log(event.target.value);
    this.setState(state => ({ value }));
  };

  handleEnter = event => {
    if (event.keyCode === 13) {
      this.getWeather();
    }
  };

  getWeather = async () => {
    const { value } = this.state;
    const response = await fetch(
      `http://api.apixu.com/v1/forecast.json?key=${API_KEY}&q=${value}&days=5`
    );
    const data = await response.json();
    console.log(data);
    this.setState(state => ({
      hasGrabbedData: true,
      temperature: data.current.temp_c,
      description: data.current.condition.text,
      isDay: data.current.is_day,
      iconURL: data.current.condition.icon
    }));
    console.log(this.state.hasGrabbedData);
  };

  backToHome = () => {
    this.setState(() => ({ hasGrabbedData: false }));
  };

  render() {
    const {
      value,
      temperature,
      description,
      isDay,
      iconURL,
      hasGrabbedData
    } = this.state;

    return (
      <div className="main-container">
        <Header />
        {hasGrabbedData ? (
          <>
            <Weather
              isDay={isDay}
              hasGrabbedData={hasGrabbedData}
              iconURL={iconURL}
              temperature={temperature}
              description={description}
              backToHome={this.backToHome}
            />
            <Forecast />
          </>
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
