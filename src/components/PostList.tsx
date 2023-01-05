import React, { useEffect, useState } from 'react'
import GetCurrentLocation from './GetCurrentLocation'
import Map from './Map'

const PostList = () => {

    const currentLoca = GetCurrentLocation()

    const [location, setLocation] = useState<any>(currentLoca)

    // useEffect(() => {
    //   setLocation(()=>GetCurrentLocation())
    // }, [location])
    
    function goCurrentLoca(){

      setLocation({
        ...location,
        lat: currentLoca.lat,
        lng: currentLoca.lng
      });

    }

  return (
    <>
      <Map props={location} />
      <button
        onClick={()=>goCurrentLoca()}
        style={{
          position:"absolute",
          bottom:"20px",
          right:"20px",
        }}
      >다시 현재 위치로</button>
    </>
  )
}

export default PostList