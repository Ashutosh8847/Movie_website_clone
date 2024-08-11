import React from 'react'
import { useState, useEffect } from 'react'
// import { UseSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component';

import "./style.scss"
import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper"


import noResults from "../../assets/no-results.png"
import Spinner from '../../components/spinner/Spinner';
import MovieCard from '../../components/movieCard/MovieCard';

const SearchResult = () => {

  const [data, setData] = useState(null)
  const [pageNum, setPageNum] = useState(1)
  const [loading, setLoading] = useState(false)
  const { query } = useParams()


  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res);
        setPageNum((prev) => prev + 1); 
        setLoading(false);
      }
    );
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data.results) {
          setData({
            ...data, results: [...data?.results, ...res.results]
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
    setPageNum(1);
    fetchInitialData()
    console.log("**********88888going to this api condition**************")
  }, [query]);

  return (
    <div className='searchResultsPage'>
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
            <div className='pageTitle'>
              {`search ${data ?.total_results > 1 ? "results" : "result"} of '${query}'`}
            </div>
            <InfiniteScroll
            className='content'
            dataLength={data?.results?.length || []}
            next={fetchNextPageData}
            hasMore={pageNum <= data?.total_pages}
            loader={<Spinner/>}      
            >
              {data?.results.map((item , index)=>{
                if(item.media_type === "preson")
                return(
              <h1>NOt Available</h1>);
                return (
                  <MovieCard key={index} data={item} fromSerach={true} />
                )
              })}
            </InfiniteScroll>
            </>

          ) : (
              <span className = 'noResultsFound' style={{color:"white", fontSize:"50px" , 
              display:"flex", alignItems:"center", justifyContent:"center", marginTop:"10%"}}>
              Sorry! Results Not Found.
              </span>
      )}
    </ContentWrapper>
  )
}
     
    </div >
  )
}

export default SearchResult
