import React from "react";

const Input = ({ getWeather, handleChange, handleEnter }) => {
  return (
    <div>
      <input
        onChange={handleChange}
        type="text"
        placeholder="Enter Postcode or City"
        onKeyUp={handleEnter}
      />
      <br />
      <button onClick={getWeather}>Grab the Weather</button>
    </div>
  );
};

export default Input;
