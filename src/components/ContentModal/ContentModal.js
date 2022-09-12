import React, { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import axios from 'axios';
import { img_500, unavailable, unavailableLandscape } from '../../Config/config';
import YouTubeIcon from '@mui/icons-material/YouTube';

import Carousel from './Carousel/Carousel'
import './ContentModal.css';
import Badge from '@mui/material/Badge';

const style = {
    width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow: 5,
    p: (1, 1, 3),
    margin: "50px auto"

};


export default function ContentModal({ children, media_type, id, vote_average }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [content, setContent] = useState([]);
    const [trailer, setTrailer] = useState([]);

    const fetchData = async () => {

        try {
            const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

            setContent(data);
        } catch (error) {

        }
    }

    const fetchTrailer = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        setTrailer(data.results[0]?.key);
    }

    useEffect(() => {
        fetchData();
        fetchTrailer();
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div onClick={handleOpen} className="media">{children}</div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition 
                
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    {
                        content && (
                            <Box sx={style}>
                                <div className="contentModal">

                                    <img alt={content.name || content.title} className="content_portrait " style={{ borderRadius: "10px", overflow: "Hidden" }} src={content.poster_path ? `${img_500}/${content.poster_path}` : unavailable} />
                                    <img style={{ borderRadius: "10px", overflow: "Hidden" }} alt={content.name || content.title} className="content_landscape" src={content.backdrop_path ? `${img_500}/${content.backdrop_path}` : unavailableLandscape} />

                                    <div className="ContentModal_about">
                                        <span className="ContnetModal_title" style={{ fontSize: "2vw" }}>
                                            {content.name || content.title} (
                                            {(
                                                content.first_air_date ||
                                                content.release_date ||
                                                "-----"
                                            ).substring(0, 4)}
                                            )
                                        </span>
                                        {
                                            content.tagline && (
                                                <i className="tagline">{content.tagline}</i>
                                            )
                                        }
                                        <Badge badgeContent={vote_average} color={vote_average >= 7 ? "success" : "secondary"} style={{ right: "50%" }}></Badge>
                                        <span className="ContnetModal_description">
                                            {content.overview}
                                        </span>
                                        <div>
                                            <Carousel media_type={media_type} id={id} />
                                        </div>
                                        <Button color="secondary" startIcon={<YouTubeIcon />} target="_blank" href={`https://www.youtube.com/watch?v=${trailer}`} variant="contained">Watch Trailer</Button>

                                    </div>
                                </div>
                            </Box>
                        )
                    }
                </Fade>
            </Modal>
        </>
    );
}
