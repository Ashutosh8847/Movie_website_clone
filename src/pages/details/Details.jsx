import React from 'react'
import "./style.scss"
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import DetailBanner from './detailsBanner/DetailBanner'
import Cast from './cast/Cast'
import VideoSection from './videoSection/VideoSection'
import Similar from './carousels/Similar'
import Recomendation from './carousels/Recomendation'




const Details = () => {
  const {mediaType, id} = useParams();
  const {data, loading} = useFetch(`/${mediaType}/${id}/videos`)
  const {data:credits, loading:creditsLoading} = useFetch(`/${mediaType}/${id}/credits`)


  const videoResult = data?.results[0];
  const crewData = credits?.crew;

  return (
    <div >
      {/* <DetailBanner video={data?.results[0]} crew={credits?.crew}/> */}
      <DetailBanner video={videoResult} crew={crewData} />    
      <Cast data={credits?.cast} loading={creditsLoading}/>
      <VideoSection data={data} loading={loading}/>
      <Similar mediaType={mediaType} id={id}/>
      <Recomendation mediaType={mediaType} id={id}   />

    
      
    </div>
  )
}

export default Details