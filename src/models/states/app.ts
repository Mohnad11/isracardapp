import IUserState from "./User";
import IMovieState from "./Movie";

export type AppState = {

    user: IUserState;
    movie:IMovieState;
  };
