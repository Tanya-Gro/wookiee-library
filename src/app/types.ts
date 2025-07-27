export type Card = {
  id: string;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  url: string;
  created: string;
  edited: string;
  imageURL: string;
};

export type DataType = {
  cards: Card[];
  pageCount: number;
};

export type FetchError = {
  hasError: boolean;
  message: string;
};

export type Response = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Card[];
};

export type Url = {
  readonly people: string;
  readonly image: string;
  readonly planets: string;
  readonly RSS: string;
  readonly GitHub: string;
};
