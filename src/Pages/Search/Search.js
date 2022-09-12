import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CustomPagination from '../../components/Pagination/CustomPagination';
import SingleContent from '../../components/SingleContent/SingleContent';


import './search.css'
import axios from 'axios';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: "#fff",
        },
    },
})

const Search = () => {
    const [type, setType] = useState(0);
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numberOfPages, setNumberOfPages] = useState();
    const [searchText, setSearchText] = useState("");
    const [errors, seterrors] = useState("");

    const handleSearchInput = (e) => {
        setSearchText(e.target.value);
        seterrors("")
    }

    const fetchSearch = async () => {
        if (searchText) {
            seterrors("");
            const { data } = await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`);

            setContent(data.results);
            setNumberOfPages(data.total_pages);
            setSearchText("")
        }
        else {
            seterrors("Can't be Empty");
        }

    }



    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <div className="searchForm">
                    <TextField id="filled-basic" label="Search" value={searchText} variant="filled" className="searchBox" onChange={handleSearchInput} error={errors ? true : false}  />
                    
                    <Button className="searchButton" style={{ marginLeft: "15px" }} variant="contained" onClick={fetchSearch}><SearchIcon /></Button>
                </div>

                <Tabs
                    value={type}
                    aria-label="wrapped label tabs example"
                    textColor="primary"
                    indicatorColor="primary"
                    onChange={(event, newValue) => {

                        setType(newValue);
                        setPage(1);

                    }}
                    style={{ marginBottom: "30px" }}
                >
                    <Tab style={{ width: "50%" }} label="Search Movies" />
                    <Tab style={{ width: "50%" }} label="Search Series" />
                </Tabs>

            </ThemeProvider>
            <div className="trending">

                {
                    content && content.map((c, idx) => (<SingleContent key={idx} id={c.id} title={c.title || c.name} poster={c.poster_path} date={c.release_date || c.first_air_date} media_type={type ? "tv" : "movie"} vote_average={c.vote_average} />))
                }
                {
                    searchText && !content && (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)
                }
            </div>
            {numberOfPages > 1 && (
                <CustomPagination setPage={setPage} numberOFPages={numberOfPages} />
            )}

        </div>
    )
}

export default Search
