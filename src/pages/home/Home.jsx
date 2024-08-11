import React from 'react'
import "./style.scss"
import HeroBanner from './heroBanner/HeroBanner'
import Trending from './trending/Trending'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import Popular from './popular/Popular'
import TopRated from './topRated/TopRated'
import UpComming from './upComming/UpComming'
import NowPlaying from './nowPlaying/NowPlaying'





const Home = () => {
  return (
    <div >
     
      <HeroBanner/>
      {/* <UpComming/> */}
      <NowPlaying/>
      <Trending/>
      <Popular/>
      <TopRated/>
      <div style={{height:"5px"}}></div>
    </div>
  )
}

export default Home

