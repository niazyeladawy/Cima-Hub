import axios from 'axios';
import React, { useEffect } from 'react';
import './Genres.css';
import Chip from '@mui/material/Chip';



const Genres = ({type,setPage,selectedGenres,setSelectedGenres,genres,setGenres}) => {

    const handleAdd = (genre)=>{
        setSelectedGenres([...selectedGenres,genre]);
        setGenres(genres.filter((g)=> g.id !== genre.id));
        setPage(1);
    }

    const handleRemove = (genre)=>{
        setSelectedGenres(selectedGenres.filter((selected) => selected.id !== genre.id));
        setGenres([...genres,genre]);
        setPage(1);
    }

    const fetchGenres = async ()=>{
        const {data} = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        setGenres(data.genres);
    }

    console.log(genres);
    useEffect(() => {
        fetchGenres();
        // eslint-disable-next-line
        return ()=>{
            setGenres({});
        }
         // eslint-disable-next-line
    }, [])

    return (
        <div className="genres">
            {
                selectedGenres && (selectedGenres.map((g)=> <Chip  label={g.name} color="success"  onDelete={()=> handleRemove(g)} style={{margin:5}}  clickable key={g.id}/>))
            }
            {
                genres && (genres.map((g)=> <Chip onClick={()=> handleAdd(g)} label={g.name} color="primary"  style={{margin:5}}  clickable key={g.id} />))
            }
        </div>
    )
}

export default Genres
