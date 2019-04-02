import React from "react";

const Weather = ({ temperature, description }) => {
  return (
    <div className="info-container">
      <h3> Temperature: {temperature}</h3>
      <h3> Weather Conditions: {description}</h3>
    </div>
  );
};

export default Weather;
