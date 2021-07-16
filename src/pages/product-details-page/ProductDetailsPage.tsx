import "./product-details-page.scss";
import { AxiosError } from "axios";
import React, { useState, useEffect } from "react";
import { ArticleDetails, ProductDetailsPageProps, User } from "../../common/types";
import { showArticleById } from "../../services/ArticleService";

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({ match }) => {
  const [article, setArticle] = useState<ArticleDetails>();
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const articleCallback = (data: ArticleDetails) => {
      setArticle(data);
    };

    const userCallback = (data: User) => {
      setUser(data);
      setIsLoading(false);
    };

    const onErrorCallback = (error: Error | AxiosError) => {
      alert(error);
    };

    showArticleById(match.params.articleId, articleCallback, userCallback, onErrorCallback);
  }, []);

  return (
    <>
      {!isLoading && (
        <div id="product-details-page-container">
          <img src={article?.imageUrl} alt="Product" />
          <div className="info-wrapper">
            <h2 className="title">{article?.title}</h2>
            <h5 className="subtitle">{article?.subtitle}</h5>
            <hr />
            <p>
              <strong>Seller: </strong>
              <span className="seller">{user?.name}</span>
            </p>
            <p>
              <strong>Price: </strong>
              <span className="price">{article?.price} CHF</span>
            </p>
            <hr />
            <article
              className="description"
              dangerouslySetInnerHTML={{ __html: article!.descriptionHtml }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetailsPage;
