import { useState,useEffect,useContext } from "react";
import { WishContext } from "../../context/WishContext";
import { SearchContext } from "../../context/SearchContext";
import { Link } from "react-router-dom";
import './Movie.css'
import { fetchAll } from "../../context/useFetch"



export default function Movie(){
    //유저정보 불러오기
    const{wishMovies3} = useContext(WishContext);
    //영화 장르 id정보 불러오기
    const{genreMap} = useContext(SearchContext);
    //영화 전체 DB 불러오기
    const [movies, setMovies] = useState([]);
    //현재고른 카테고리의 체크표시를 위한 변수
    const[checked, setChecked] = useState(null);
    //현재 보여지는 리스트
    const[list, setList] = useState([]);
    //카테고리 선택값
    const[inputVal, setInputVal] = useState('ALL');
    //검색창 입력값
    const[searchInput, setSearchInput] = useState('');
    //검색창 입력받았을때 뜨는 리스트
    const[searchResult, setSearchResult] = useState([]);
    //검색창 입력여부
    const[searchClick, setSearchClick] = useState(false);


    useEffect(() => {
        fetchAll()
        .then((data) => {
            setMovies(data);
            setList(data);
        })
        .catch((err) => {
            console.error("전체 영화 불러오기 실패:", err);
        });
    }, []);
    console.log(movies);
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

    //현재 선택된 카테고리에 체크 표시를 위한 함수
    const checkHandler = (key) =>{
        setChecked(key);
    }

    const listSort = (value) =>{
        let copyData = [];
       //만약 카테고리를 선택하지 않았다면(전체선택)에는 전체데이터를 복사
        if(inputVal === null || inputVal === undefined || inputVal === '' || inputVal === 'all'){
            copyData = [...movies];
        }else{
        //만약 선택했다면 현재 리스트 데이터를 복사
            copyData = [...list];
        }
        //복사한 데이터를 (최신순or평점순)으로 정렬
        
        if(value==='release_date'){
            if(copyData.filter(movie => movie.release_date).length > 0){
                const copySort = copyData.sort((a,b)=> new Date(b.release_date) - new Date(a.release_date));
                return setList(copySort);
            }else{
                const copySort = copyData.sort((a,b)=> new Date(b.first_air_date) - new Date(a.first_air_date));
                return setList(copySort);
            }            
        } 
        if(value==='vote_average'){
            const copySort = copyData.sort((a,b)=> b.vote_average - a.vote_average);
            return setList(copySort);
        }
    }

    const searchChange = (val) =>{
        const array=[];
        setChecked(null);
        setSearchClick(false);
        setSearchResult(array);
        setSearchInput(''); 

        setInputVal(val);

        const copyData = [...movies];
        //인풋select에 선택된 값이 all이 아닐경우 해당 값과 동일한 data 카테고리로 필터링
        if(val !== 'ALL'){
            const filtering = copyData.filter((item)=>(item.genre_ids?.includes(Number(val)) || item.origin_country?.includes(val.toUpperCase())));
            setList(filtering);
        }else{
            setList(copyData);
        }

         
    }

    const searching = () =>{
        const copyData = [...movies];

        if(searchInput.replace(/\s+/g, '') === ''){
            alert('검색어를 입력하세요.');
            return;
        }
        const keyword = searchInput.trim().toLowerCase();

        const filtering = copyData.filter((item)=>(item.name?.replace(/\s+/g, '').toLowerCase().includes(keyword)||item.title?.replace(/\s+/g, '').toLowerCase().includes(keyword)));

        
        setSearchClick(true);

        if(filtering.length > 0){
            return setSearchResult(filtering);
        }else{
            const array = [];
            return setSearchResult(array);
        }

    }
    console.log(searchResult);

    return(
        <div className="main-container">
            <div className="category">
                <div className="btns">
                    <label htmlFor="list-view">장르별</label>
                    <select name="list-view" id="list-view" onChange={(e)=>searchChange(e.target.value)} value={inputVal}>
                        <option value="ALL">전체</option>
                        <option value="28">액션</option>
                        <option value="12">모험</option>
                        <option value="16">애니메이션</option>
                        <option value="35">코미디</option>
                        <option value="80">범죄</option>
                        <option value="99">다큐멘터리</option>
                        <option value="18">드라마</option>
                        <option value="10751">가족</option>
                        <option value="14">판타지</option>
                        <option value="36">역사</option>
                        <option value="27">공포</option>
                        <option value="10402">음악</option>
                        <option value="9648">미스터리</option>
                        <option value="10749">로맨스</option>
                        <option value="878">SF</option>
                        <option value="10770">TV영화</option>
                        <option value="53">스릴러</option>
                        <option value="10752">전쟁</option>
                        <option value="37">서부</option>
                    </select>

                    <label htmlFor="country">나라별</label>
                    <select name="country" id="country" onChange={(e)=>searchChange(e.target.value)} value={inputVal}>
                        <option value="ALL">전체</option>
                        <option value="us">미국</option>
                        <option value="kr">한국</option>
                        <option value="cn">중국</option>
                        <option value="jp">일본</option>
                    </select>                    
                    
                    <button type="button" onClick={()=>{listSort('release_date');checkHandler(1);}}>{checked === 1 ? '✔️' : null}최신순</button>
                    <button type="button" onClick={()=>{listSort('vote_average');checkHandler(2);}}>{checked === 2 ? '✔️' : null}평점순</button>
                    <form onSubmit={(e)=>{e.preventDefault();searching();}}>
                        <input type="text" onChange={(e)=>setSearchInput(e.target.value)} value={searchInput} placeholder="제목을 입력하세요" />
                        <button type="submit">검색</button>
                    </form>
                </div>
            </div>
            
            <div className="main-contents">
                <div className="content-wrap">
                    {/* 검색을 안했을때 전체영화 */}
                    {searchClick === false && (searchResult === null || searchResult === undefined || searchResult.length === 0) ?
                        <>
                        <h4>전체영화</h4>
                            <ul>
                                {list.map((item,index)=>(
                                    <li key={index}>
                                        <Link to={`/detail/${item.id}`} style={{textDecoration:'none'}}>
                                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.title}/>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            
                        </>
                    :
                    //검색했을때 검색결과 출력
                        <>
                            <h4>검색결과</h4>
                            <p>{searchResult.length === 0 ? '검색결과가 없습니다.' : `총 ${searchResult.length}개의 결과가 있습니다.`}</p>
                            {/* 검색결과 없으면 추천작품(평점순) 있으면 결과리스트 노출 */}
                            {searchResult.length === 0 ? <h4>추천작품</h4> : null}
                            <ul>
                                {searchResult.length === 0 ?                                    
                                    vote.slice(0,12).map((item,index)=>(
                                        <li key={index}>
                                            <Link to={`/detail/${item.id}`} style={{textDecoration:'none'}}>
                                                <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.title}/>
                                            </Link>
                                        </li>
                                    ))
                                :
                                    searchResult.map((item,index)=>(
                                        <li key={index}>
                                            <Link to={`/detail/${item.id}`} style={{textDecoration:'none'}}>
                                                <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.title}/>
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </>
                    }
                </div>                  
            </div>
        </div>
    )
}