import React, { useEffect, useState, useMemo } from 'react';
import GetCurrentLocation from './GetCurrentLocation';

const Map = (props:any) => {

    let map:any;
    const mapOptions = {
        zoom: 18,
        scaleControl:false,
        mapDataControl:false,
        disableKineticPan:false,
        tileTransition:false
    };
    var marker:any;
    // 검색된 충전소 정보를 api 에서 받기
    const potData:any = props.data

    function initMap(){
        map = new naver.maps.Map('map', mapOptions);
        currentLoca()
    }
    
    function currentLoca(){        
        var currentLoca:{lat:number, lng:number} = {
            lat: 37.483034,
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
            initMap()
            map.setCenter(new naver.maps.LatLng(potData[0].lat, potData[0].longi))
            potData.map((data:any, index:number)=>{
                marker = new naver.maps.Marker({
                    position:new naver.maps.LatLng(data.lat, data.longi),
                    map: map,
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

    const [isListOpen, setIsListOpen] = useState<boolean>(true)

  return (
    <>
        <div id="map" style={{width:'100vw',height:'100vh'}}></div>
        <div
            style={{
                position:"absolute",
                bottom:"0px",
                left:"4vw",
            }}
        >
            <div
            >
            <div
                onClick={()=>{
                    currentLoca()
                }}
                style={{
                    cursor:"pointer",
                    fontSize:"50px",
                    display:"flex",
                    // justifyContent:"end",
                    // marginRight:"60px"
                }}
            >🧭</div>
            {isListOpen && potData?
                <div
                    onClick={()=>setIsListOpen(!isListOpen)}
                    style={{ fontSize:"25px", cursor:"pointer"}}
                >
                🔽
                </div>
                :<div
                    onClick={()=>setIsListOpen(!isListOpen)}
                    style={{ fontSize:"25px", cursor:"pointer"}}
                >
                🔼
                </div>
            }
            {potData && isListOpen ?
                <div
                    style={{
                        maxHeight:"40vh",
                        overflow:"auto",
                        width:"90vw",
                        maxWidth:"700px",
                        backgroundColor:"white",
                        borderRadius:"20px",
                    }}
                >
                    {potData.map((data:any,index:number)=>(
                        <div id='potContainer'
                            style={{
                                cursor:"pointer",
                                display:"flex",
                                margin:"7px",
                                backgroundColor:"white",
                                borderBottom:"2px solid black"
                            }}
                            
                            onClick={()=>goPot(data)}
                        >
                            <div
                                style={{
                                    width:"80px",
                                    paddingRight:"4px",
                                    borderRight:"1px solid gray",
                                    display:"flex",
                                    justifyContent:"end"
                                }}
                            >
                                {data.cpStat == "1" ?
                                <div>충전가능💚</div>
                                :data.cpStat == "2"?
                                <div>충전중💙</div>
                                :data.cpStat == "3"?
                                <div>고장🖤</div>
                                :data.cpStat == "4"?
                                <div>통신장애💔</div>
                                :<div>통신미연결💔</div>
                                }
                            </div>
                            <div
                                id='addrContainer'
                                style={{
                                    display:'inline',
                                    paddingLeft:"5px"
                                }}
                            >
                                <div
                                    id='callName'
                                    style={{
                                        fontSize:"15px",
                                        fontWeight:"bold",
                                        display:"flex"
                                    }}
                                >
                                    {data.csNm}
                                </div>
                                <div
                                    id="addr"
                                    style={{
                                        position:"relative",
                                        color:"gray",
                                        display:"flex"
                                    }}
                                >
                                    {data.addr}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                :<div
                    style={{
                        bottom:"0px",
                        // left:"20px",
                        maxHeight:"40vh",
                        overflow:"auto",
                        width:"100vw",
                        backgroundColor:"white",
                        fontSize:"15px",
                        fontWeight:"bold",
                        padding:"10px 0px 10px 0px",

                    }}
                >목록을 열어보세요</div>
            }
            </div>
        </div>
    </>
  )
}

export default Map