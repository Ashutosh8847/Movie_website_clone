import { useEffect } from 'react'
import './App.css'
import { fetchDataFromApi } from './utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration } from './store/homeSlice'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getGeneras } from './store/homeSlice'
import Home from './pages/home/Home'
import Explore from './pages/explore/Explore'
import Details from './pages/details/Details'
import PageNotFound from './pages/404/PageNotFound'
import SearchResult from "./pages/searchResult/SerachResult";
import Headers from './components/headers/Headers'
import Footer from './components/Footer/Footer'

function App() {
  const dispatch = useDispatch()
  const { url } = useSelector((state) => state.home)
  console.log(url)
  // const [count, setCount] = useState(0)
  // useEffect(() => {
  //   apiTesting();
  // }, []);


  // const apiTesting = () => {
  //   fetchDataFromApi("/movie/popular").then((res) => {
  //     console.log(res)
  //     dispatch(getApiConfiguration(res))


  //   })
  // }

  useEffect(() => {
    fetchApiConfig();
    genersCall();
    // apiTesting();
  }, []);

  const fetchApiConfig = () => {

    fetchDataFromApi("/configuration").then((res) => {
      console.log(res)
      const url = {
        backdrop: res?.images?.secure_base_url + "original",
        poster: res?.images?.secure_base_url + "original",
        profile: res?.images.secure_base_url + "original",

      };
      dispatch(getApiConfiguration(url));


    });

  };
  const genersCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGeneres = {}


    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    })

    const data = await Promise.all(promises);
    console.log(data);
    data.map(({ genres }) => {
      return genres.map((item) => allGeneres[item.id] = item)

    })
    console.log(allGeneres)
    dispatch(getGeneras(allGeneres))




  }





  return (
    <>
      <div>
        <BrowserRouter>
          <Headers />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/explore/:mediaType" element={<Explore />} />
            {/* <Route exact path="/:mediaType/:id" element={<Detalis />} /> */}
            <Route path="/:mediaType/:id" element={<Details />} />
            <Route path="/search/:query" element={<SearchResult />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>

    </>
  )
}

export default App
