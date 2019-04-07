import React from "react";
import ForecastCard from "../Daily Forecast Card";
import css from "./forecasts.module.css";

const Forecast = props => {
  const { forecasts } = props;
  console.log("forecasts handed down", forecasts);

  return (
    <div className={css.container}>
      {forecasts.slice(1, 6).map((item, idx) => (
        <ForecastCard
          key={idx}
          maxtemp={item.day.maxtemp_c}
          mintemp={item.day.mintemp_c}
          image={item.day.condition.icon}
          description={item.day.condition.text}
          sunrise={item.astro.sunrise}
          sunset={item.astro.sunset}
          date={item.date}
        />
      ))}
    </div>
  );
};

export default Forecast;
