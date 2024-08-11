import React, {useState} from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'


const UpComming = () => {
  const [ endpoint, setEndPoint]= useState("movie")
  const apiEndpoint = `/${endpoint === "movie" ? "movie/now_playing" : "tv/on_the_air"}`;
//   const {data, loading} = useFetch(`/${endpoint}/upcoming`)
const {data, loading} = useFetch(apiEndpoint)


    const onTabChange = (tab)=>{
      setEndPoint(tab === "Movies"? "movie": "tv" )

    } 
  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className='carouselTitle'>Up Comming</span>
            <SwitchTabs data={["Movies","TV Shows"]} onTabChange={onTabChange}/>
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading}/>
      
    </div>
  )
}

export default UpComming
