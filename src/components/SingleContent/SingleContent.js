import React from 'react'
import { img_300, unavailable } from '../../Config/config';
import './SingleContent.css';
import Badge from '@mui/material/Badge';
import ContentModal from '../ContentModal/ContentModal';


const SingleContent = ({ id, title, poster, date, media_type, vote_average }) => {

    
    return (
        <ContentModal media_type={media_type} id={id} vote_average={vote_average}>
            <Badge badgeContent={vote_average} color={vote_average >= 7 ? "success" : "secondary"}></Badge>
            <img className='poster' src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
            <b className="title">{title}</b>
            <span className="subTitle">{media_type === 'tv' ? 'Tv Series' : 'Movie'}
                <span>{date}</span>
            </span>
        </ContentModal>
    )
}

export default SingleContent
