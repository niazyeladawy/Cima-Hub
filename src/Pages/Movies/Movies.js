import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Genres from '../../components/Genres/Genres';
import CustomPagination from '../../components/Pagination/CustomPagination';
import SingleContent from '../../components/SingleContent/SingleContent';
import useGenres from '../../hooks/useGenre';

const Movies = () => {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const genreForUrl = useGenres(selectedGenres);

    const fetchMovies = async ()=>{
        const {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForUrl}&with_watch_monetization_types=flatrate`);
        
        setContent(data.results);
        setNumberOfPages(data.total_pages);
    }

    useEffect(() => {
        fetchMovies();
        // eslint-disable-next-line
    }, [page,genreForUrl])

    return (
        <div>
            <span className="pageTitle">Discover Movies </span>
            <Genres type="movie" setPage={setPage} selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} genres={genres} setGenres={setGenres}  />
            <div className="trending">
                {
                    content && content.map((c,idx)=> (<SingleContent key={idx} id={c.id} title={c.title || c.name} poster={c.poster_path} date={c.release_date || c.first_air_date} media_type={c.media_type} vote_average={c.vote_average}  />))
                }
            </div>
            {numberOfPages >1 &&(
                <CustomPagination setPage={setPage} numberOFPages={numberOfPages}/>
            )}
        </div>
    )
}

export default Movies
