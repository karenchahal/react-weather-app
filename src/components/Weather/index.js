import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import css from "./weather.module.css";

class Weather extends Component {
  render() {
    const {
      temperature,
      location,
      description,
      iconURL,
      backToHome
    } = this.props;
    return (
      <div className={css.container}>
        <div className={css.name}>
          <h3>
            {location.name}, {location.region}
          </h3>
        </div>
        <div className={css.temp}>
          <h3> Temperature: {temperature}°C</h3>
        </div>
        <div className={css.image}>
          <img src={iconURL} alt="" />
        </div>
        <div className={css.description}>
          <h3> Weather Conditions: {description}</h3>
        </div>
        <Button
          className={css.button}
          variant="extendedFab"
          enum="small"
          onClick={backToHome}
        >
          Select New Location
        </Button>
      </div>
    );
  }
}

export default Weather;
