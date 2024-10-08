import React from 'react'
import "./style.scss"
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import Select from 'react-select'


import useFetch from '../../hooks/useFetch'
import { fetchDataFromApi } from '../../utils/api'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import MovieCard from '../../components/movieCard/MovieCard'
import Spinner from '../../components/spinner/Spinner'


let filters = {};

const sortByData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity ascending" },
  { value: "vote_average.asc", label: "Rating ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "primary_release_date.desc", label: "Release Date Descending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
]


const Explore = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [genre, setGenere] = useState(null);
  const [sortby, setSortBy] = useState(null);
  const { mediaType } = useParams();


  // const { data: genresData } = useFetch(`/genre/${mediaType}/list`);
  const { data: genresData } = useFetch(`/genre/${mediaType}/list`);


  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/discover/${mediaType}`, filters).then(
      (res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/discover/${mediaType}?page=${pageNum}`, filters).then(
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

  useEffect(() => {
    filters = {}
    setData(null)
    setPageNum(1)
    setGenere(null)
    setSortBy(null)
    fetchInitialData()
  }, [mediaType])

  const onChange = (selectedItems, action) => {
    if (action.name === "sortby") {
      console.log("**************going to this sort by condition  condition*****************")
      setSortBy(selectedItems);
      if (action.action !== "clear") {
        filters.sort_by = selectedItems.value;
      } else {
        delete filters.sort_by;
      }
    }

    if (action.name === "genres") {
      setGenere(selectedItems);
      console.log("**************going to this Condition*********** ")
      if (action.action !== "clear") {
        let genreId = selectedItems.map((g) => g.id);
        genreId = JSON.stringify(genreId).slice(1, -1);
        filters.with_genres = genreId;
      } else {
        delete filters.with_genres;
      }
    } 
    setPageNum(1)
    fetchInitialData()
  }

  return (
    <div className='explorePage'>
      <ContentWrapper>
        <div className='pageHeader'>
          <div className='pageTitle'>
            {mediaType === "tv" ? "Explore Tv shows" : "Explore Movies"}

          </div>
          <div className='filters'>
            <Select
              isMulti
              name="genres"
              value={genre}
              closeMenuOnSelect={false}
              options={genresData?.genres}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              onChange={onChange}
              placeholder="Select genres"
              className="react-select-container genresDD"
              classNamePrefix="react-select"
            />
            <Select
              name="sortby"
              value={sortby}
              options={sortByData}
              onChange={onChange}
              isClearable={true}
              placeholder="sort By"
              className="react-select-container sortbyDD"
              classNamePrefix="react-select"
            />
          </div>
        </div>

        {loading && <Spinner initial={true} />}

        {!loading && (
          <>
            {data?.results?.length > 0 ? (
              <>
                <InfiniteScroll
                  className='content'
                  dataLength={data?.results?.length || []}
                  next={fetchNextPageData}
                  hasMore={pageNum <= data?.total_pages}
                  loader={<Spinner />}
                >
                  {data?.results.map((item, index) => {
                    if (item.media_type === "preson")
                      return (
                        <h1>NOt Available</h1>);
                    return (
                      <MovieCard key={index} data={item} mediaType={mediaType} />
                    )
                  })}
                </InfiniteScroll>
              </>

            ) : (
              <span className='noResultsFound' style={{
                color: "white", fontSize: "50px",
                display: "flex", alignItems: "center", justifyContent: "center", marginTop: "10%"
              }}>
                Sorry! Results Not Found.
              </span>
            )}
          </>
        )}

      </ContentWrapper>

    </div>
  )
}

export default Explore
