import React, { useEffect, useState, useMemo } from 'react';
import GetCurrentLocation from './GetCurrentLocation';

const Map = (props:any) => {

    const propsData = props.props
        
    // 현재 위치 가져오기
    const currentLoca = GetCurrentLocation()

    // 위치 초기화
    const [location, setLocation] = useState<any>(currentLoca)

    // 현재 위치로 가는 함수
    function goCurrentLoca(){
        setLocation({
        ...location,
        lat: currentLoca.lat,
        lng: currentLoca.lng
        });
    }

    // 충전소 클릭 시 지도 옮기기
    function goPotLoca(props:any){
        setLocation({
        ...location,
        lat: props.lat,
        lng: props.longi
        });
    }
    
    // 좌표 확인
    async function checkLoca(){
        console.log("check",location);
        if(location){
            drawMap(location)
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
            zoom: 17,
            // 지도 컨트롤러 삭제
            scaleControl: false,
            logoControl: false,
            mapDataControl: false,
            zoomControl: false,
            mapTypeControl: false,
            disableKineticPan: false
        });

        const marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(props.lat,props.lng),
            map:map
        })
    }

    useEffect(() => {
        checkLoca()
    
    }, [location])
    
  return (
    <>
        {/* 지도 틀 */}
        <div id='map' style={{width:'100vw',height:'100vh'}}></div>
        {/* 충전소 목록 출력 */}
        {propsData ?
        <div
            style={{
            position:"absolute",
            bottom:"20px",
            left:"20px",
            }}
        >
            {propsData.map((pot:any)=>(
            <div
                onClick={()=>goPotLoca(pot)}
            >{pot.addr}</div>
            ))}
        </div>
        :<></>
        }
        {/* 현재 위치로 버튼 */}
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

export default Map