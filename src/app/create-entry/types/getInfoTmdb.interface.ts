export interface IGetInfoTmdbItem {
  title: string;
  posterPath: string;
}

export interface IGetInfoTmdb {
  getInfo: IGetInfoTmdbItem[];
}
