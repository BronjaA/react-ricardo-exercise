import React, { useEffect, useState } from "react";
import "./article-card.scss";
import { Link } from "react-router-dom";
import { SearchArticle } from "../../common/types";

const ArticleCard: React.FC<SearchArticle> = ({ id, imageUrl, title, endDate, buyNowPrice }) => {
  const [dateString, setDateString] = useState("");
  const [endsSoon, setEndsSoon] = useState(false);

  const returnDateString = () => {
    return new Date(endDate).toLocaleString("de-DE", {
      minute: "numeric",
      hour: "numeric",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  let intervalId: any;

  useEffect(() => {
    const difference = Date.parse(endDate) - Date.now();

    // If there's less than 30 min left until the article offer ends, start a countdown
    if (difference < 1800000) {
      setEndsSoon(true);
      initializeCountDown();
    } else {
      setDateString(returnDateString());
    }

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const initializeCountDown = () => {
    intervalId = setInterval(() => {
      const difference = Date.parse(endDate) - Date.now();
      const differenceDate = new Date(difference);
      if (difference <= 1000) {
        clearInterval(intervalId);
      }

      const minutes = ("0" + differenceDate.getMinutes()).slice(-2);
      const seconds = ("0" + differenceDate.getSeconds()).slice(-2);
      setDateString(`ends in ${minutes}:${seconds}`);
    }, 1000);
  };

  return (
    <Link to={`/article/${id}`} id="article-card-container">
      <div className="image-container">
        <img src={imageUrl} alt="Product" />
      </div>
      <p className="title">{title}</p>
      <p className={`${endsSoon && "ends-soon"} end-date`}>{dateString}</p>
      <p className="price">
        {buyNowPrice !== null && (
          <>
            <span>Buy now: </span>
            <span>{buyNowPrice} CHF</span>
          </>
        )}
      </p>
    </Link>
  );
};

export default ArticleCard;
