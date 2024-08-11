import React from 'react'
import useFetch from "../../../hooks/useFetch"
import Carousel from '../../../components/carousel/Carousel'

const Recomendation = ({mediaType , id }) => {

    const {data, loading, error } = useFetch(`/${mediaType}/ ${id}/recommendations`)

    // const title  = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies"

  return (
<Carousel 
     title="Recommendations"
     data={data?.results}
     loading={loading}
     endpoint={mediaType}
     
     />
  )
}

export default Recomendation
