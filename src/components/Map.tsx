import React, { useEffect, useState, useMemo } from 'react';
import GetCurrentLocation from './GetCurrentLocation';

const Map = () => {

    var mapOptions:any;
    var map:any;

    
    function initMap(){

        mapOptions={
            center: null
        }

        console.log("1");
        mapOptions = {
            center: new naver.maps.LatLng(37.3595714, 127.105399),
            zoom: 16
        };
        console.log("2");
        map = new naver.maps.Map('map', mapOptions);
        console.log("3");
    }
    
    function currentLoca(){
        var currentLoca:{lat:number, lng:number} = {lat: 37.483034,
            lng: 126.902435
        }
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(success, error);
          }
    
          function success(position:any){
            currentLoca = {
                lat:position.coords.latitude,
                lng:position.coords.longitude
            }
          }
    
          function error(){
            currentLoca = {
              // 현재 위치의 좌표를 찾지 못하면
              // 우리집 좌표로
                lat: 37.483034,
                lng: 126.902435
            }
            console.log("현재 위치 확인 실패, 위치 추적이 허용되어 있는지 확인해주세요.");
          }
        map.setCenter(new naver.maps.LatLng(currentLoca.lat, currentLoca.lng))
    }

    useEffect(() => {
      initMap()
    }, [])

  return (
    <>
        <div id="map" style={{width:'100vw',height:'100vh'}}></div>
        <button
            onClick={()=>{
                currentLoca()
            }}
            style={{
                position:"absolute",
                bottom:"20px",
                right:"20px"
            }}
        >위치 이동</button>
    </>
  )
}

export default Map