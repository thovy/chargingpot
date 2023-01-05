import React, { useEffect, useState } from 'react';

const Map = (props:any) => {

    const propsLoca = props.props
    
    async function checkLoca(){
        console.log("check",propsLoca);
        if(propsLoca){
            drawMap(propsLoca)
        }
        else{
            // 네이버 본사 좌표
            drawMap({lat: 37.3595704, lng:127.105399})
            console.log("좌표가 제대로 입력되지 않았습니다.");
        }
    }

    function drawMap(props:any){
        console.log("draw",props);
        
        let map: naver.maps.Map;
        const center: naver.maps.LatLng = new naver.maps.LatLng(props.lat, props.lng);

        map = new naver.maps.Map('map', {
            center: center,
            zoom: 16
        });
    }

    useEffect(() => {
        checkLoca()
    
    }, [props])
    
  return (
    <div id='map' style={{width:'100vw',height:'100vh'}}></div>
  )
}

export default Map