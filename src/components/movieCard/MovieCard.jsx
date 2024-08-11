import React from 'react'
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import Img from '../lazyloadImage/img';
import posterFallback from '../../assets/no-poster.png'
import './style.scss'
import CircleRating from '../circleRating/CircleRating';
import Generes from '../generes/Generes';
import { useNavigate } from 'react-router-dom';


const MovieCard = ({ data, fromSerach, mediaType }) => {

    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();
    const posterUrl = data?.poster_path ? url.poster + data?.poster_path : posterFallback;
    return (
        <div className='movieCard' 
        onClick={() => 
        navigate(`/${data.media_type || mediaType}/ ${data.id}`)}>
            <div className='posterBlock'>
                <Img className="posterImg" src={posterUrl} />
                {!fromSerach && (
                    <>
                        <CircleRating rating={data?.vote_average.toFixed(1)} />
                        <Generes data={data?.genre_ids.slice(0, 2)} />

                    </>
                )}
            </div>
            <div className='textBlock'>
                <span className='title'>{data?.title || data?.name} </span>
                <span className='date'>{dayjs(data?.release_date).format("MMM D, YYYY")}</span>

            </div>

        </div>

      
   
  )
}

export default MovieCard
