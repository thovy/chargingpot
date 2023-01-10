import React, { useEffect, useState, useMemo } from 'react';

const Map = (props:any) => {

    var mapOptions:any;
    var map:any;
    // 검색된 충전소 정보를 api 에서 받기
    const potData:any = props.data
    
    function initMap(){
        mapOptions = {
            center: new naver.maps.LatLng(37.3595714, 127.105399),
            zoom: 16
        };
        map = new naver.maps.Map('map', mapOptions);        
    }
    
    function currentLoca(){
        // 이렇게 map 을 다시 정의해주지 않으면
        // 다른 버튼을 누른 뒤에 현재 위치로 이동하는 버튼을 누르면 map 이 undefined 가 나옴
        // 그런데 이렇게 새로 정의해주면 맵을 새로 그려서 새 지도를 setMap 으로 옮기는 거임
        // 뭔가 정석적인 방법이 있어야되는데.
        map = new naver.maps.Map('map')
        console.log(map);
        
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

    function markingPots(){
        var marker:any;
        if(potData){
            potData.map((data:any)=>(
                marker = new naver.maps.Marker({
                    position:new naver.maps.LatLng(data.lat, data.longi),
                    map: map
                })
            ))
        }
    }

    useEffect(() => {
      initMap()
    }, [map])

  return (
    <>
        <div id="map" style={{width:'100vw',height:'100vh'}}></div>
        <div
            style={{
                position:"absolute",
                bottom:"20px"
            }}
        >
            <button
                onClick={()=>{
                    currentLoca()
                }}
                style={{
                    // bottom:"20px",
                    right:"20px"
                }}
            >위치 이동</button>
            {potData ?
                <div
                    style={{
                        // bottom:"20px",
                        left:"20px"
                    }}
                >
                    {potData.map((data:any,index:number)=>(
                        <div
                            style={{
                                position:"relative"
                            }}
                        >
                            {data.addr}
                        </div>
                    ))}
                </div>
                :<div
                    // style={{
                    //     bottom:"20px",
                    //     left:"20px"
                    // }}
                >기다려주세요</div>
            }
            <button
                onClick={()=>markingPots()}
            >
                마커버튼
            </button>
        </div>
    </>
  )
}

export default Map