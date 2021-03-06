import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Comment } from '../../types/comment';
import { Film} from '../../types/film';
import { State} from '../../types/state';

type AppData = {
  film: {
    data: Film;
    isLoaded: boolean;
    isError: boolean;
    similarFilms: Film[];
    comments: {
      data: Comment[];
      isLoaded: boolean;
    };
  }
  films: {
    data: Film[];
    isLoaded: boolean;
    filteredFilmsByGenre: Film[];
  }
  favoriteFilms: {
    data: Film[];
    isLoaded: boolean;
  }
  initialFilms: Film[];
  promoFilm?: Film;
  error?: string;
};

const initialState: AppData = {
  film: {
    data: {} as Film,
    isLoaded: false,
    isError: false,
    similarFilms: [],
    comments: {
      data: [],
      isLoaded: false,
    },
  },
  films: {
    data: [],
    isLoaded: false,
    filteredFilmsByGenre: [],
  },
  favoriteFilms: {
    data: [],
    isLoaded: false,
  },
  initialFilms: [],
  promoFilm: undefined,
  error: undefined,
};

export const appData = createSlice({
  name: NameSpace.data,
  initialState,
  reducers: {
    loadFilms: (state, action) => {
      state.initialFilms = action.payload.data;
      state.films.data = action.payload.data;
      state.films.isLoaded = true;
    },
    loadFavoriteFilms: (state, action) => {
      state.favoriteFilms.data = action.payload;
      state.favoriteFilms.isLoaded = true;
    },
    loadFilm: (state, action) => {
      state.film.data = action.payload.data;
      state.film.isLoaded = action.payload.isLoaded;
    },
    loadPromoFilm: (state, action) => {
      state.promoFilm = action.payload;
    },
    loadSimilarFilms: (state, action) => {
      state.film.similarFilms = action.payload;
    },
    loadComments: (state, action) => {
      state.film.comments.data = action.payload;
      state.film.comments.isLoaded = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const getInitialFilms = (state: State): Film[] | [] => state[NameSpace.data].initialFilms;
export const getFilm = (state: State): Film | undefined => state[NameSpace.data].film.data;
export const getPromoFilm = (state: State): Film | undefined => state[NameSpace.data].promoFilm;
export const getSimilarFilms = (state: State): Film[]  => state[NameSpace.data].film.similarFilms;
export const getFavoriteFilms = (state: State): Film[]  => state[NameSpace.data].favoriteFilms.data;
export const getLoadedFilmStatus = (state: State): boolean => state[NameSpace.data].film.isLoaded;
export const getLoadedFilmsStatus = (state: State): boolean => state[NameSpace.data].films.isLoaded;
export const getComments = (state: State): Comment[] => state[NameSpace.data].film.comments.data;
export const getLoadedCommentsStatus = (state: State): boolean => state[NameSpace.data].film.comments.isLoaded;
export const getFilmLoadingError = (state: State): string | undefined => state[NameSpace.data].error;

export const {loadFilm, loadFilms, loadPromoFilm, loadSimilarFilms, loadComments, setError, loadFavoriteFilms} = appData.actions;
