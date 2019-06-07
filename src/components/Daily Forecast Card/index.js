import React from "react";
import css from "./card.module.css";

const ForecastCard = ({
  mintemp,
  maxtemp,
  image,
  description,
  sunrise,
  sunset,
  date
}) => {
  return (
    <div className={css.cardcontainer}>
      <div className={css.date}>{date}</div>
      <div className={css.image}>
        <img src={image} alt="" />
      </div>
      <div className={css.description}>
        <h3>{description}</h3>
      </div>
      <div className={css.mintemp}>
        <h3>Min Temp: {mintemp} °C</h3>
      </div>
      <div className={css.maxtemp}>
        <h3>Max Temp: {maxtemp} °C</h3>
      </div>
      <div className={css.sunrise}>
        <h3> Sunrise: {sunrise}</h3>
      </div>
      <div className={css.sunset}>
        <h3> Sunset: {sunset}</h3>
      </div>
    </div>
  );
};

export default ForecastCard;
