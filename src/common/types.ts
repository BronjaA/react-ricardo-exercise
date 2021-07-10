import { RouteComponentProps } from "react-router-dom";

export type SearchBarProps = {
  performSearch: (searchText: string) => void;
};

interface MatchParams {
  searchText: string;
}

export interface SearchPageProps extends RouteComponentProps<MatchParams> {}
