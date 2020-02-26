import HttpRequest from "../utils/HttpRequest";

const fetchMovies = function (data:any) {
    return HttpRequest('3/discover/movie?sort_by=popularity.desc&api_key=57ff28fc1529c4f78e38a880b8c59f56&page='+data.page, 'GET');
};
export default fetchMovies;
