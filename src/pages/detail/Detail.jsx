import { Link } from "react-router-dom";
import './detail.css'
import { fetchAll } from "../../context/useFetch"
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { LoginContext } from "../../context/LoginContext";
import { useContext } from "react";
import { WishContext } from "../../context/WishContext";
import { useNavigate } from "react-router-dom";

export default function Detail(){

const navi=useNavigate();

const {user1,user2,user3}=useContext(LoginContext)
const {addwish1,isinwish1,removewish1,
        addwish2,isinwish2,removewish2,
        addwish3,isinwish3,removewish3} =useContext(WishContext)

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

  const{id} = useParams()
// 전에는 JSON에서 보내온 전체의 배열 중 find를 썼는데 이번엔 fetchAll 이용해서 아이디 일치하는거 찾아야함
const item = movies.find((item)=>item.id === Number(id))

    return(

        <>
        {item &&
            <div className="detail-wrap">
                <div className="moviezone">
                    <div className="movie-box">
                        <img  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                              alt={item.title || item.name}/>
                        <div className="movie-box-top">
                            <h2>{item.title || item.name}</h2>
                            {user1?
                            <button className="wishbtn" onClick={()=>{isinwish1(item.id)?removewish1(item.id):addwish1(item)}}>{isinwish1(item.id)?'❤️':'🤍'}</button>
                            :user2?
                            <button className="wishbtn" onClick={()=>{isinwish2(item.id)?removewish2(item.id):addwish2(item)}}>{isinwish2(item.id)?'❤️':'🤍'}</button>
                            :user3?
                            <button className="wishbtn" onClick={()=>{isinwish3(item.id)?removewish3(item.id):addwish3(item)}}>{isinwish3(item.id)?'❤️':'🤍'}</button>
                            :null}
                            
                        </div>
                        <div className="movie-box-middle">
                            <p><i class="fa-solid fa-star"></i>{item.vote_average}({item.vote_count}) (영화장르)개봉일자 : {item.release_date}</p>
                        </div>
                        <button type="button" className="playMovie">재생하기</button>
                    </div>
                    <div className="movie-detail">
                        <p>시놉시스</p>
                        <span>{item.overview}</span>
                        <hr/>
                        <p>장르</p>
                        <span>해당 영화 장르 출력예정</span>
                    </div>
                    <button className="backBtn" onClick={()=>navi(-1)}>뒤로가기</button>
                </div>
                <div className="another-movie">
                    <p>다른 작품</p>
                    {/* 맵 돌려서 넣어야겟지 */}
                    <ul>
                        <li>
                                 
                        </li>
                    </ul>
                </div>
            </div>}

        </>

    )

}