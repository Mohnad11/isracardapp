import IMovie from "../Types/Movie";

export default interface IMovieState {
    fetching:boolean,
    movies:IMovie[]
    favMovies:IMovie[]
}
