import React, { useRef } from 'react'
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import Img from '../lazyloadImage/img';
import posterFallback from '../../assets/no-poster.png'
import './style.scss'
import CircleRating from '../circleRating/CircleRating';
import Generes from '../generes/Generes';
import { fetchDataFromApi } from "../../utils/api";





const Carousel = ({ data, loading, endpoint, title }) => {
  const carouselContainer = useRef();
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();


  const skItem = () => {
    return (
      <div className='skeletonItem'>
        <div className='posterBlock skeleton'></div>
        <div className='textBlock'>
          <div className='title skeleton'></div>
          <div className='date skeleton'></div>

        </div>
      </div>
    )
  }
  const navigation = (dir) => {
    // Ensure carouselContainer.current is a valid reference to a DOM element
    const container = carouselContainer.current;

    // Verify that container is available and scrollable
    if (container && typeof container.scrollTo === 'function') {
      const scrollAmount = dir === "left" ?
        container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

      container.scrollTo({
        left: scrollAmount,
        behavior: "smooth"
      });
    } else {
      // Handle the case where container is not a valid scrollable element
      console.error("Invalid container or container does not support scrollTo.");
    }
  };



  return (
    <div className='carousel'>
      <ContentWrapper>
        {title && <div className="carouselTitle">{title}</div>}
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRighttNav arrow"
          // next={fetchNextPageData}
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div className='carouselItems' ref={carouselContainer}>
            {data?.map((item) => {
              const posterUrl = item.poster_path
                ? url.poster + item.poster_path
                : posterFallback; 
                
                console.log("*****************poster url**************", posterUrl)
              return (
                <div key={item?.id} className='carouselItem' onClick={() => navigate(`/${item?.media_type || endpoint}/${item?.id}`)} >
                  <div className='posterBlock'>
                    <Img src={posterUrl} />
                    <CircleRating rating={item?.vote_average.toFixed(1)} />
                    <Generes data={item?.genre_ids.slice(0, 2)} />
                  </div>
                  <div className='textBlock'>
                    <span className='title'>{item?.title || item?.name} </span>
                    <span className='date'>{dayjs(item?.release_date).format("MMM D, YYYY")}</span>

                  </div>

                </div>
              )
            })}

          </div>
        ) : (
          <div className='loadingSkeleton'>
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}

          </div>
        )}

      </ContentWrapper>

    </div>
  )
}

export default Carousel
