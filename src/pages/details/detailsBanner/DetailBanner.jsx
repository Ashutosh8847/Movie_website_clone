import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
// import { UseSelector } from 'react-redux'
import { useSelector } from "react-redux";
import dayjs from 'dayjs'
import './style.scss'

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import Img from '../../../components/lazyloadImage/img';
import posterFallback from '../../../assets/no-poster.png'
import CircleRating from '../../../components/circleRating/CircleRating';
import Generes from '../../../components/generes/Generes';
import useFetch from '../../../hooks/useFetch'
import { PlayIcon } from '../PlayBtn';
import VideoPopup from '../../../components/videoPopup/VideoPopup';




const DetailBanner = ({ video, crew }) => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`)
  const { url } = useSelector((state) => state.home)

  const [show, setShow] = useState(false);
  const[videoId ,  setVideoId]= useState(null)

  const _geners = data?.genres?.map((g) => g.id);

  const director = crew?.filter((f) => f.job === "Director")
  const writers = crew?.filter((f) => f.job === "Screenplay" || f.job === "Story" || f.job ===
    "Associate Producer" || f.job === "Writer")

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };
  return (
    <div className='detailsBanner'>
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className='backdrop-img'>
                <Img src={url.backdrop + data.backdrop_path} />
              </div>
              <div className='opacity-layer'></div>
              <ContentWrapper>
                <div className='content'>
                  <div className='left'>
                    {data.poster_path ? (
                      <Img className="posterImg" 
                      src={url.backdrop + data.poster_path} />
                    ) : (
                      <Img className="posterImg"
                       src={posterFallback} />
                    )}

                  </div>
                  <div className='right'>
                    <div className='title'>
                      {`${data.name || data.title} (${dayjs(data?.release_date).format("YYYY")})`}
                    </div>
                    <div className='subtitle'>
                      {data.tagline}

                    </div>
                    <Generes data={_geners} />
                    <div className='row'>
                      <CircleRating rating={data.vote_average?.toFixed(1)} />
                      <div className='playbtn' onClick={() => {
                        setShow(true)
                        setVideoId(video.key)
                       }}>
                        <PlayIcon />

                        <span className='text'>Watch Trailer</span>
                      </div>

                    </div>
                    <div className='overview'>
                      <span className='heading'>Overview:</span>
                      <div className='description'>
                        {data.overview}
                      </div>

                    </div>
                    <div className="info">
                      {data.status && (
                        <div className="infoItem">
                          <span className="text bold">
                            Status:{" "}
                          </span>
                          <span className="text">
                            {data.status}
                          </span>
                        </div>

                      )}
                      {data.release_date && (
                        <div className="infoItem">
                          <span className="text bold">
                            Released Date:{" "}
                          </span>
                          <span className="text">
                            {dayjs(data.release_date).format("MMM D, YYYY")}
                          </span>
                        </div>

                      )}
                      {data.status && (
                        <div className="infoItem">
                          <span className="text bold">
                            Runtime:{" "}
                          </span>
                          <span className="text">
                            {toHoursAndMinutes(data.runtime)}
                          </span>
                        </div>

                      )}
                    </div>
                    {director?.length > 0 && (
                      <div className='info'>
                        <span className='text bold'>
                          Directors:{" "}
                        </span>
                        <span className='text'>
                          {director?.map((d, i) => (
                            <span key={i}>{d.name}
                              {director.length - 1 !== i && ", "}
                            </span>

                          ))}
                        </span>
                      </div>
                    )}
                    {writers?.length > 0 && (
                      <div className='info'>
                        <span className='text bold'>
                          Writers:{" "}
                        </span>
                        <span className='text'>
                          {writers?.map((w, i) => (
                            <span key={i}>{w.name}
                              {writers.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                    {data?.created_by?.length > 0 && (
                      <div className='info'>
                        <span className='text bold'>
                          Creator:{" "}
                        </span>
                        <span className='text'>
                          {data?.created_by?.map((c, i) => (
                            <span key={i}>{c.name}
                              {data?.created_by?.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <VideoPopup 
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
                />
              </ContentWrapper>
            </React.Fragment>


          )}
        </>

      ) : (
        <div className='detailsBannerSkeleton'>
          <ContentWrapper>
            <div className='left skeleton'></div>
            <div className='right '>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )
      }

    </div >
  )
}

export default DetailBanner
