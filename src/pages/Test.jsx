import { useState } from "react";
import { useEffect } from "react";
import { fetchAll } from "../context/useFetch";
import { useContext } from "react";
import { WishContext } from "../context/WishContext";
import { LoginContext } from "../context/LoginContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Test(){

const navi=useNavigate();
const {wishMovies1,wishMovies2,wishMovies3}=useContext(WishContext)
const {user1,user2,user3}=useContext(LoginContext)
//빈 배열 만들고 담는다. 
    const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetchAll()
      .then((data) => {
        setMovies(data);
      })
      .catch((err) => {
        console.error("전체 영화 불러오기 실패:", err);
      });
  }, []);

    return(

        <>
          {user1?<h1>박찬하 님의 찜 목록</h1>
          :
          user2?<h1>김성중 님의 찜 목록</h1>
          :
          user3?<h1>신동현 님의 찜 목록</h1>
        :null}
          {(user1?wishMovies1:user2?wishMovies2:user3?wishMovies3:[]).map((item)=>(
            <div key={item.id}>
              <Link to={`/detail/${item.id}`}><img src={`https://image.tmdb.org/t/p/w300${item.backdrop_path}`}/></Link>
            </div>
            ))}
          <button onClick={()=>navi(-1)}>뒤로가기</button>
        </>
    )
}