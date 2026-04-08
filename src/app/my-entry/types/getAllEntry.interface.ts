export interface IGetAllEntry {
  id: number;
  title: string;
  image: string;
  description: string;
  status: {
    id?: number;
    name: string;
  };
  type: {
    id?: number;
    name: string;
  };
  genres: {
    id?: number;
    name: string;
  }[];
}
