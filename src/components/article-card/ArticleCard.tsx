import React from "react";
import "./article-card.scss";
import { Link } from "react-router-dom";
import { SearchArticle } from "../../common/types";

const ArticleCard: React.FC<SearchArticle> = ({ id, imageUrl, title, endDate, buyNowPrice }) => {
  const dateString = new Date(endDate).toLocaleString("de-DE", {
    minute: "numeric",
    hour: "numeric",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link to={`/article/${id}`} id="article-card-container">
      <div className="image-container">
        <img src={imageUrl} alt="Product" />
      </div>
      <p className="title">{title}</p>
      <p className="end-date">{dateString}</p>
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
