import React, { useMemo, useState } from 'react'
import Map from './Map'

const PostList = () => {

  // 충전소 정보 가져올 url 만들기
  const kepcoKey = "oOtY7WWyc0r%2BWYXqOah0zUjW6ThBCpqt0CRhcu0QnytDMVgcTQ2XlLj%2FzRUKUGhYbyudzRrF7UxtRSkoZ8fnMw%3D%3D"
  const [page, setPage] = useState<number>(1)
  // 최대갯수 3106개니까 3150개정도 검색되게 하면 되겠다
  const [perPage, setPerPage] = useState<number>(200)
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
    // console.log(parsedList.data);
    setPotData(parsedList.data)
  }

  return (
    <>
      <Map
        data={potData}
      />
      <input
        onChange={
          (e: React.ChangeEvent<HTMLInputElement>)=>{
            const value:any = e.target.value            
            setSearchWord(value)
          }}
        style={{
          position:"absolute",
          top:"20px",
          left:"1.3vw",
          fontSize:"36px",
          fontWeight:'bold',
          width:"92.5vw",
          borderRadius:"20px",
          border:"lightgray 1px solid",
          padding:"7px 0px 7px 20px"
        }}
      />
      <div
        onClick={()=>parsedList()}
        style={{
          cursor:"pointer",
          position:"absolute",
          top:"18px",
          right:"2.3vw",
          fontSize:"40px",
          // backgroundColor:"white"
        }}
      >
        🔍
      </div>
    </>
  )
}

export default PostList
