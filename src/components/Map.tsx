import React, { useEffect } from 'react';

const Map = () => {
    function initMap(){
        let map: naver.maps.Map;
        const center: naver.maps.LatLng = new naver.maps.LatLng(37.3595704, 127.105399);

        map = new naver.maps.Map('map', {
            center: center,
            zoom: 16
        });
    }

    useEffect(() => {
      initMap()
    
    }, [])
    
  return (
    <div id='map' style={{width:'100vw',height:'100vh'}}></div>
  )
}

export default Map