/* eslint-disable no-unused-vars */
import { AxiosError } from "axios";
import { RouteComponentProps } from "react-router-dom";

export type listMethod = (
  searchText: string,
  onSuccessCallback: (responseData: SearchResponse) => void,
  onErrorCallback: (error: Error | AxiosError) => void
) => void;

export type showMethod = (
  articleId: string,
  articleCallback: (responseData: ArticleDetails) => void,
  userCallback: (responseData: User) => void,
  onErrorCallback: (error: Error | AxiosError) => void
) => void;

export type HomePageProps = {
  resetPriceRange: () => void;
  resetTypeFilters: () => void;
};

export type SearchBarProps = {
  performSearch: (searchText: string) => void;
};

interface SearchPageParams {
  searchText: string;
}

interface SearchPageFilterProps {
  buyNowFilter: boolean;
  toggleBuyNowFilter: () => void;
  auctionFilter: boolean;
  toggleAuctionFilter: () => void;
  savedMinPrice: number;
  setSavedMinPrice: (minPrice: number) => void;
  savedMaxPrice: number;
  setSavedMaxPrice: (maxPrice: number) => void;
  resetTypeFilters: () => void;
}

export interface SearchPageProps
  extends RouteComponentProps<SearchPageParams>,
    SearchPageFilterProps {}

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

export type PriceInputProps = {
  value: number;
  placeholder: string;
  minAllowedPrice: number;
  maxAllowedPrice: number;
  onChange: (price: number) => void;
};
