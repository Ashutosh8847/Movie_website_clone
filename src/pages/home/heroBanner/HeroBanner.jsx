import { useState, useEffect } from 'react'
import "./style.scss"
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import { useSelector } from 'react-redux'
import Img from '../../../components/lazyloadImage/img'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SearchResult from '../../searchResult/serachResult'


const HeroBanner = () => {
  const [background, setBackground] = useState("")
  const [query, setQuery] = useState("")
  const navigate = useNavigate()
  const { url } = useSelector((state) => state.home)

  const { data, loading } = useFetch("/movie/upcoming")
  useEffect(() => {
    const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path
    setBackground(bg)

  }, [data])

  const searchQueryHandler = (event) => {
    if (event?.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);

    }

  };

  const handleButtonClick = (event) => {
    if ({searchPressed} && query.length > 0) {
      navigate(`/search/${query}`);

    }

  };

  const searchPressed = () =>{
    handleButtonClick()

  }




  return (
    <div className='heroBanner'>
      {!loading && <div className='backdrop-img'>
        <Img src={background} />
      </div>}
      <div className='opacity-layer'></div>

      <ContentWrapper>
        <div className='heroBannerContent'>
          <span className='title text-uppercase text-center'><b>welcome</b></span><br />
          <span className='subTitle'>Millions of Movies, TV Shows  and People to discover and Explore now </span>
          <div className='searchInput'>
            <input type='text' placeholder='Search for a Movie or TV Shows...' onKeyUp={searchQueryHandler} onChange={(e) => setQuery(e.target.value)}/>
            
            <button onClick={searchPressed} >Search </button>

          </div>
        </div>


      </ContentWrapper>

    </div>
  )
}

export default HeroBanner
