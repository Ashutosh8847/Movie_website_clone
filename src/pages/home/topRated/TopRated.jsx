import React, {useState, useEffect} from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'
import Explore from '../../explore/Explore'
import { useNavigate } from 'react-router-dom'
import { fetchDataFromApi } from "../../../utils/api";
import Spinner from '../../../components/spinner/Spinner';
import MovieCard from '../../../components/movieCard/MovieCard';


const TopRated = () => {
  const [ endpoint, setEndPoint]= useState("movie")
  const [pageNum, setPageNum] = useState(1)
  const {data, loading} = useFetch(`/${endpoint}/top_rated?page=${pageNum}`)


 
  const [load, setLoading] = useState(false)
  const [data1, setData] = useState(null)
  // const [viewAllClicked, setViewAllClicked] = useState(false);


    const onTabChange = (tab)=>{
      setEndPoint(tab === "Movies"? "movie": "tv" )

    } 




   
  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/${endpoint}/top_rated?page=${pageNum}`).then(
      (res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  };
  const fetchNextPageData = () => {
    console.log("**************8api heated*************")
    fetchDataFromApi(`/${endpoint}/top_rated?page=${pageNum}`).then(
      (res) => {
        if (data1.results) {
          setData({
            ...data1, results: [...data1?.results, ...res?.results]
          })
        } else {
          setData(res)
        }
        setPageNum((prev) => prev + 1);

      }
    );

  }


  
  console.log("****************the method is run*************")
  useEffect(() => {
    setPageNum(0);
    fetchInitialData()
    console.log("**********88888going to this api condition**************")
  }, [ endpoint]);


  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className='carouselTitle'>Top Rated</span>
            <SwitchTabs data={["Movies","TV Shows"]} onTabChange={onTabChange}/>
            <button type="button" className="btn btn-primary" onClick={fetchNextPageData} style={{borderRadius:"20px", 
        width:"150px", 
        backgroundColor:"orange", 
        border:"none", 
        color:"black", 
        fontWeight:"600" ,
        }}>View All </button>
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading}  endpoint={endpoint}/>
      
    </div>
  )
}

export default TopRated
