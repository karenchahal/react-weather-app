import React from "react";
import Button from "@material-ui/core/Button";
import css from "./input.module.css";


const Input = ({ getWeather, handleChange, handleEnter, value}) => {
  return (
    <div>
      <input
        className={css.input}
        onChange={handleChange}
        type="text"
        placeholder="Enter Postcode or City"
        onKeyUp={handleEnter}
      />
      <br /> <br />
      <Button
        disabled={value === ''}
        className={css.button}
        variant="extendedFab"
        enum="small"
        onClick={getWeather}
      >
        Grab the Weather
      </Button>
    </div>
  );
};

export default Input;
