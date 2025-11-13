import { useState,useEffect,useContext } from "react";
import { WishContext } from "../../context/WishContext";
import { Link } from "react-router-dom";
import './Home.css'
import { fetchAll } from "../../context/useFetch"
import { LoginContext } from "../../context/LoginContext";



export default function Home(){
    //유저정보 불러오기
    const{wishMovies1,wishMovies2,wishMovies3} = useContext(WishContext);
    const{user1,user2,user3} = useContext(LoginContext);
    //영화 전체 DB 불러오기
    const [movies, setMovies] = useState([]);

    //메인배너 정보 불러오기
    const mainBanner = [...movies].filter(movie => movie.id === 219080 || movie.id === 30984 || movie.id === 1175942 || movie.id === 803796 || movie.id === 1376434);

    useEffect(() => {
        fetchAll()
        .then((data) => {
            setMovies(data);
            setCurrent2(0);
        })
        .catch((err) => {
            console.error("전체 영화 불러오기 실패:", err);
        });
    }, []);
    
    const today = new Date();
    //인기작
    const popular = [...movies].sort((a,b)=> b.popularity - a.popularity);
    //현재상영작
    const now = [...movies].filter(movie => new Date(movie.release_date) <= today) // 오늘 이전 영화만
                    .sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    //높은 평점순
    const vote = [...movies].sort((a,b)=> b.vote_average - a.vote_average);

    //헐리웃 영화
    const us = [...movies].filter(movie => Array.isArray(movie.origin_country) && movie.origin_country.includes("US"))
                .sort((a,b)=> new Date(b.release_date) - new Date(a.release_date));

    //내가 찜한 영화
    const jjim = user1? [...wishMovies1] : user2? [...wishMovies2] : user3? [...wishMovies3] : []

    //애니메이션
    const ani = [...movies].filter(movie => movie.genre_ids?.includes(16)) // 오늘 이후 영화만
                    .sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    //한국영화
    const kor = [...movies].filter(movie => Array.isArray(movie.origin_country) && movie.origin_country.includes("KR"))
                .sort((a,b)=> new Date(b.release_date) - new Date(a.release_date));

    const show = [popular, now, vote, us, jjim, ani, kor];


    //슬라이드 인덱스
    const[current, setCurrent] = useState([0,0,0,0,0,0,0,0,0]);
    //메인배너 슬라이드 인덱스
    const[current2, setCurrent2] = useState(0);

    // 좌측버튼 클릭시
    const leftClick = (i)=>{ 
        const copy = [...current];
        
        if(copy[i] === 0){
            copy[i] === 0;
        }else{
            copy[i] = copy[i] - 1;
        }
        setCurrent(copy);
    }

    // 우측버튼 클릭시
    const rightClick = (i)=>{
        const copy = [...current];
        
        if(copy[i] === 2){
            copy[i] === 2;
        }else{
            copy[i] = copy[i] + 1;
        }
        setCurrent(copy);
        
    }

    // 메인배너(좌측버튼 클릭시)
    const leftBnClick = ()=>{ 
        let copy = current2;
        
        if(copy === 0){
            copy === 0;
        }else{
            copy = copy - 1;
        }
        setCurrent2(copy);
    }

    // 메인배너(우측버튼 클릭시)
    const rightBnClick = ()=>{
        let copy = current2;
        
        if(copy === mainBanner.length-1){
            copy === mainBanner.length-1;
        }else{
            copy = copy + 1;
        }
        setCurrent2(copy);
        
    }
    console.log(movies);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent2(current2 => (current2 + 1) % mainBanner.length);
        }, 5000);

        return () => clearInterval(interval);
    }); 


    return(
        <div className="main-container">
            <div className="banner">
                <div className="main-banner">
                    {mainBanner.map((item,index)=>(
                        <div className="info-wrap" key={index} style={{transform: `translateX(-${(current2 * 100)}%)`, backgroundImage:`url(https://image.tmdb.org/t/p/original//${item.backdrop_path}.jpg)`}}>
                            <div className="info-wrap2">
                                <h2>{item.title || item.name}</h2>
                                <p>{item.overview}</p>
                                <Link to={`/detail/${item.id}`}>
                                    <button className="play"  type="button">재생하기</button>
                                </Link>
                                <Link to={`/detail/${item.id}`}>
                                    <button className="info" type="button">상세정보</button>
                                </Link>
                            </div>
                            <div className="main-info bg-color"></div>
                        </div>
                    ))}
                </div>
                <div className="left-arrow" onClick={leftBnClick}></div>
                <div className="right-arrow" onClick={rightBnClick}></div>
            </div>

            {show.map((mov,index)=>( index <= 4  ? (
                <div className="main-contents" key={index}>
                    {mov.length !== 0 ?(
                        <div className="contents-wrap">
                            <h4>{mov==popular ? '인기작 TOP 20' : mov==now ? '현재 상영작' : mov==vote ? '높은 평점순' : mov==us ? '헐리웃 영화' : mov==jjim ? '내가 찜한 영화' : ''}</h4>
                            {/* 30%씩 슬라이드 이동 */}
                            <ul style={{transform: mov == popular || mov==now ? `translateX(-${(current[index] * 100)/3.33}%)` : `translateX(-${(current[index] * 100)/2.67}%)`  }} className={mov == popular || mov==now ? 'popul' : ''}>
                                {mov.slice(0,20).map((item,i)=> item.length !== 0 ?(
                                    <li key={item.id}>
                                        <Link to={`/detail/${item.id}`} style={{textDecoration:'none'}}>
                                            {mov==popular ? <span className="popNum">{i+1}</span> : ''}
                                            {mov==popular ||  mov==now ? (<img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.title} className={mov == popular ? 'popimg' : ''}/>)
                                            : (<img src={`https://image.tmdb.org/t/p/w300${item.backdrop_path}`} alt={item.title} />)}         
                                        </Link>
                                        {/* {item.release_date}{item.vote_average}{item.origin_country} */}
                                    </li>
                                ): null)}
                            </ul>
                            <div className="left-arrow" onClick={()=>leftClick(index)}></div>
                            <div className="right-arrow" onClick={()=>rightClick(index)}></div>
                        </div>
                    ):null}                  
                </div>
            ):(
                <div className="main-contents contents2" key={index}>
                    <div className="contents-wrap">
                        <h4>{mov==ani ? '애니메이션' : mov==kor ? '한국영화' : ''}</h4>
                        {/* 30%씩 슬라이드 이동 */}
                        <ul>
                            {mov.slice(0,3).map((item,index)=>(
                                <li key={item.id}>
                                    <Link to={`/detail/${item.id}`}>
                                        <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.title} />
                                    </Link>
                                    {/* {item.release_date}{item.vote_average}{item.origin_country} */}
                                </li>
                            ))}
                            <div className="left-arrow" onClick={()=>leftClick(index)}></div>
                            <div className="right-arrow" onClick={()=>rightClick(index)}></div>
                        </ul>
                    </div>                  
                </div>
            )))}                
        </div>
    )
}