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
import { SearchContext } from "../../context/SearchContext";
import hd from '../../assets/img/hd.png'

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

    //랜덤으로 추천콘텐츠뜨게
    //오른쪽 랜덤나오는거 빈값두고 
    // 랜덤아이템에 복사본 10개 잘라서 넣기. 그리고 랜덤에 들어갈거는 movies가 로드될때만  
    const [shuffle,setShuffle]=useState([])
        useEffect(()=>{
        const getRandomItem = [...movies].sort(() => Math.random() - 0.5);
        const random10 = getRandomItem.slice(0, 10); // 앞에서 10개만 추출
        setShuffle(random10)},[movies]);

    //새로고침
    const reload =()=>{
        const reloadshuffle = [...movies].sort(() => Math.random() - 0.5);
        const reloading = reloadshuffle.slice(0, 10);
        setShuffle(reloading)
    }
    
  const{id} = useParams()
// 전에는 JSON에서 보내온 전체의 배열 중 find를 썼는데 이번엔 fetchAll 이용해서 아이디 일치하는거 찾아야함
const item = movies.find((item)=>item.id === Number(id))

const {genreMap}=useContext(SearchContext)

    return(
        <>
        {item &&
            <div className="detail-wrap">
                <div className="moviezone">
                    <div className="movie-box">
                        <div className="movie-image-box">
                            <img  src={`https://image.tmdb.org/t/p/original//${item.backdrop_path}`}
                                alt={item.title || item.name}/>
                        </div>
                        <div className="movie-box-top">
                            <h2 className="detail-title">{item.title || item.name}</h2>
                            <div className="wishaddzone">
                                {user1?
                                <button className="wishbtn" onClick={()=>{isinwish1(item.id)?removewish1(item.id):addwish1(item)}}>{isinwish1(item.id)?<i className="fa-solid fa-check"></i>:<i className="fa-solid fa-plus"></i>}</button>
                                :user2?
                                <button className="wishbtn" onClick={()=>{isinwish2(item.id)?removewish2(item.id):addwish2(item)}}>{isinwish2(item.id)?<i className="fa-solid fa-check"></i>:<i className="fa-solid fa-plus"></i>}</button>
                                :user3?
                                <button className="wishbtn" onClick={()=>{isinwish3(item.id)?removewish3(item.id):addwish3(item)}}>{isinwish3(item.id)?<i className="fa-solid fa-check"></i>:<i className="fa-solid fa-plus"></i>}</button>
                                :null}
                                <p className="wishbtn-text">찜한 콘텐츠</p>
                            </div>
                        </div>
                        <div className="movie-box-middle">
                            <div>
                                <p className="middle-vote"><i className="fa-solid fa-star"></i> {(item.vote_average).toFixed(1)} <em>({item.vote_count})</em></p>
                                <div className="hdline">
                                    <span className="middle-open">개봉일자 : {item.first_air_date || item.release_date}</span>
                                    <img src={hd} alt="HD"/>
                                </div>
                            </div>
                            <button type="button" className="playMovie">▶︎ 재생하기</button>
                        </div>
                    </div>
                    <div className="movie-detail">
                        <p className="detail-1">시놉시스</p>
                        {item.overview?<span className="detail-1-con">{item.overview}</span>:<span className="detail-1-con">시놉시스가 등록되지 않았습니다.</span>}
                        <hr/>
                        <p className="detail-2">장르</p>
                        <span className="detail-2-con"> 
                            {item.genre_ids
                            .map(id => genreMap[id])
                            .filter(Boolean) // genreMap에 없는 id는 제외
                            .join(", ")}
                        </span>
                    </div>
                    <div className="detail-backBtn-box">
                        <Link className="homeBtn" to='/home' onClick={()=>window.scrollTo(0,0)}>홈으로 이동</Link>
                        <button className="backBtn" onClick={()=>{navi(-1);window.scrollTo(0,0)}}>뒤로가기</button>  
                    </div>
                </div>
                <div className="another-movie">
                    <p>추천 콘텐츠</p>
                    <button className="reload" onClick={reload}><i class="fa-solid fa-arrow-rotate-right"></i></button>
                    {/* 맵 돌려서 넣어야겟지 */}
                    <ul className="detail-right-ul">
                        {shuffle.map((item)=>(
                        <li key={item.id} className="detail-right-li">
                            <Link to={`/detail/${item.id}`}>
                                <img src={`https://image.tmdb.org/t/p/original//${item.backdrop_path}`}></img>
                                <p className="detail-right-title">{item.title || item.name}</p>
                            </Link>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>}

        </>

    )

}