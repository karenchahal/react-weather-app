import React, { Component } from "react";

class Weather extends Component {

  render() {
    const { temperature, description, isDay, iconURL, backToHome } = this.props;
    return (
      <div className="info-container">
        <h3> Temperature: {temperature} °C</h3>
        <h3> Weather Conditions: {description}</h3>
        <h3> isDay: {isDay}</h3>
        <img src={iconURL} alt="" />
        <button onClick={backToHome}>Select New Location</button>
      </div>
    );
  }
}

export default Weather;
