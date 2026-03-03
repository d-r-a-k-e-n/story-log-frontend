export interface IGetInfoFromTmdbItem {
  title: string;
  posterPath: string;
  rating: number;
  genreIds: string[];
}

export interface IGetInfoFromTmdb {
  getInfoFromTmdb: IGetInfoFromTmdbItem[];
}
