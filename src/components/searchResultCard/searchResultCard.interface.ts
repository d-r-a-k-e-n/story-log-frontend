export interface ISearchResultCardProps {
  imgUrl: string;
  title: string;
  rating?: number;
  genres?: string[];
  onClick: () => void;
}
