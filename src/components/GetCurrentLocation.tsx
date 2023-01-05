import React, { useEffect, useState } from 'react'

const GetCurrentLocation = () => {

    const [currentLocation, setCurrentLocation] = useState<any>({
      // 현재 위치의 좌표를 찾지 못하면
      // 우리집 좌표로
      lat: 37.483034,
      lng: 126.902435
  })

    useEffect(() => {
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success, error);
      }

      function success(position:any){
        setCurrentLocation({
            lat:position.coords.latitude,
            lng:position.coords.longitude
        })
      }

      function error(){
        setCurrentLocation({
          // 현재 위치의 좌표를 찾지 못하면
          // 우리집 좌표로
            lat: 37.483034,
            lng: 126.902435
        })
        console.log("현재 위치 확인 실패, 위치 추적이 허용되어 있는지 확인해주세요.");
      }

    }, [navigator.geolocation.getCurrentPosition])

  // const currentLocation:any = navigator.geolocation.getCurrentPosition;

  return (
    currentLocation
  )
}

export default GetCurrentLocation