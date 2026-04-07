export interface IGetInfoFromTmdbItem {
  title: string;
  posterPath: string;
  rating: number;
  genreIds: string[];
  mediaType: "movie" | "tv";
}

export interface IGetInfoFromTmdb {
  getInfoFromTmdb: IGetInfoFromTmdbItem[];
}
