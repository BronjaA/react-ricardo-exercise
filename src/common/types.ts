import { RouteComponentProps } from "react-router-dom";

export type SearchBarProps = {
  performSearch: (searchText: string) => void;
};

interface MatchParams {
  searchText: string;
}

export interface SearchPageProps extends RouteComponentProps<MatchParams> {}

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
