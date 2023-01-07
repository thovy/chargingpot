import React, { useEffect, useState } from 'react'
import GetCurrentLocation from './GetCurrentLocation'
import Map from './Map'

const PostList = () => {

  // 충전소 정보 가져올 url 만들기
  const kepcoKey = process.env.REACT_APP_OPENAPI_KEPCO_API_KEY
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(10)
  const [searchWord, setSearchWord] = useState<string>('');

  // 충전소 목록 변수에 넣어 출력 준비
  const [potData, setPotData] = useState<any>()

  var url = '/api/EvInfoServiceV2/v1/getEvSearchList'
  url += "?serviceKey=" + kepcoKey
  url += "&page=" + page
  url += "&perPage=" + perPage
  url += "&cond%5Baddr%3A%3ALIKE%5D=" + searchWord

  // 충전소 정보 가져오기
  async function getPotsList(){
    const list:any = await fetch(url, {method:'GET'})
    return list.json()
  }

  // 충전소 정보 파싱하기
  async function parsedList(){
    const parsedList = await getPotsList();
    console.log(parsedList.data);
    setPotData(parsedList.data)
  }

  return (
    <>
      <Map />
      <input
        onChange={
          (e: React.ChangeEvent<HTMLInputElement>)=>{
            const value:any = e.target.value            
            setSearchWord(value)
          }}
        style={{
          position:"absolute",
          top:"20px",
          left:"20px"
        }}
      >
      </input>
      <button
        onClick={()=>parsedList()}
        style={{
          position:"absolute",
          top:"20px",
          right:"20px"
        }}
      >
        충전소 검색
      </button>
    </>
  )
}

export default PostList