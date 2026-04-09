export interface IGetAllGenres {
  getAllGenres: {
    id: number;
    name: string;
  }[];
}

export interface IGetAllStatuses {
  getAllStatuses: {
    id: number;
    name: string;
  }[];
}

export interface IGetAllTypes {
  getAllTypes: {
    id: number;
    name: string;
  }[];
}

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

export interface ICreateEntryMutation {
  createEntry: {
    id: number;
    title: string;
    description?: string | null;
  };
}

export interface IDeleteEntryResponse {
  deleteEntry: {
    id: number;
    title: string;
  };
}

export interface IDeleteEntryVariables {
  id: number;
}

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
