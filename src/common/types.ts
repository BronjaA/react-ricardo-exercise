import { RouteComponentProps } from "react-router-dom";

export type SearchBarProps = {
  performSearch: (searchText: string) => void;
};

interface SearchPageParams {
  searchText: string;
}

export interface SearchPageProps extends RouteComponentProps<SearchPageParams> {}

export type SearchArticle = {
  id: number;
  title: string;
  endDate: string;
  imageUrl: string;
  buyNowPrice: number;
};

export type SearchResponse = {
  articles: SearchArticle[];
  totalCount: number;
};

export type ArticleDetails = {
  id: string;
  title: string;
  subtitle?: string;
  price: number;
  descriptionHtml: string;
  imageUrl: string;
  sellerId: string;
};

export type User = {
  id: string;
  name: string;
};

interface ProductDetailsParams {
  articleId: string;
}

export interface ProductDetailsPageProps extends RouteComponentProps<ProductDetailsParams> {}
