import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CustomPagination from '../../components/Pagination/CustomPagination';
import SingleContent from '../../components/SingleContent/SingleContent';
import './Trending.css';

const Trending = () => {

    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);

    const fetchTrnding = async ()=>{
        const {data} = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);
        
        setContent(data.results);
    }

    useEffect(() => {
        fetchTrnding();
        // eslint-disable-next-line
    }, [page])

    return (
        <div>
            <span className="pageTitle">Trending Today</span>
            <div className="trending">
                {
                    content && content.map((c,idx)=> (<SingleContent key={idx} id={c.id} title={c.title || c.name} poster={c.poster_path} date={c.release_date || c.first_air_date} media_type={c.media_type} vote_average={c.vote_average}  />))
                }
            </div>
            <CustomPagination setPage={setPage} />
        </div>
    )
}

export default Trending
