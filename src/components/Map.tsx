import React, { useEffect, useState, useMemo } from 'react';

const Map = (props:any) => {

    let mapOptions:any;
    let map:any;
    var marker:any;
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
        // 검색어를 잘못입력한다던가 해서
        // potData 가 존재하나 length 가 0이면
        // map 이 그려지지 못하고 에러가 발생
        if(potData && potData.length > 0){
            // map 을 다시 그려주지 않으면
            // map 이 undefined 가 나와서 다시 그려줘야함. 그냥 그릴 순 없으니 검색 시
            // 목록 첫번째 항목의 위치로 가도록.
            // map 이 왜 undefined 가 나올까?
            map = new naver.maps.Map('map')
            map.setCenter(new naver.maps.LatLng(potData[0].lat, potData[0].longi))
                        
            potData.map((data:any, index:number)=>{
                marker = new naver.maps.Marker({
                    position:new naver.maps.LatLng(data.lat, data.longi),
                    map: map
                })
            })
        }
    }

    function goPot(props:any){
        map.setCenter(new naver.maps.LatLng(props.lat, props.longi))
    }

    useEffect(() => {
      initMap()
    //   markingPots()
    }, [])

    useMemo(()=>{
        markingPots()
    },[potData])

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
                            onClick={()=>goPot(data)}
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
        </div>
    </>
  )
}

export default Map