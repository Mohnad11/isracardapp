export default interface IMovie{
    popularity:number;
    vote_count:number;
    video:boolean;
    poster_path:string;
    id:number;
    adult:boolean;
    backdrop_path:string;
    original_language:string;
    original_title:string;
    genre_ids:[];
    title:string;
    vote_average:number;
    overview:number;
    release_date:number;

}
/*


{"popularity":61.463,"vote_count":5459,"video":false,"poster_path":"\/hKHZhUbIyUAjcSrqJThFGYIR6kI.jpg","id":466282,"adult":false,"backdrop_path":"\/uZTtVdOEIwPA6vwVRI3217DoPM.jpg","original_language":"en","original_title":"To All the Boys I've Loved Before","genre_ids":[35,10749],"title":"To All the Boys I've Loved Before","vote_average":7.8,"overview":"Lara Jean's love life goes from imaginary to out of control when her secret letters to every boy she's ever fallen for are mysteriously mailed out.","release_date":"2018-08-16"}
 */
