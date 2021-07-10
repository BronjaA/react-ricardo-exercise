import React from "react";
import "./article-card.scss";
import { Link } from "react-router-dom";
import { SearchArticle } from "../../common/types";

const ArticleCard: React.FC<SearchArticle> = ({
  id,
  imageUrl,
  title,
  endDate,
  buyNowPrice,
}) => {
  return (
    <Link to={`/article/${id}`} id="article-card-container">
      <div className="image-container">
        <img src={imageUrl} alt="Product" />
      </div>
      <h3 className="title">{title}</h3>
      <p className="end-date">{endDate}</p>
      <h3 className="price">{buyNowPrice}</h3>
    </Link>
  );
};

export default ArticleCard;
