import { useState,useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import './Movie.css'
import { fetchAll } from "../../context/useFetch"
import { LoginContext } from "../../context/LoginContext";
import { WishContext } from "../../context/WishContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


export default function Movie(){    
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
    //제목
    const[title, setTitle] = useState('ALL');
    //더보기 버튼
    const[more, setMore] = useState(21);

    //메인배너 정보 불러오기
    const mainBanner = [...movies].filter(movie => movie.id === 1306525 || movie.id === 1062722 || movie.id === 496243 || movie.id === 1218925 || movie.id === 1242898);

    useEffect(() => {
        fetchAll()
        .then((data) => {
            const data2 = [...data].filter(movie=> movie.id !== 278635 && movie.id !== 1374686 && movie.id !== 257161 && movie.id !== 105660 && movie.id !== 1015552 && movie.id !== 1355783 && movie.id !== 293530 && movie.id !== 784755 && movie.id !== 1523160 && movie.title);
            setMovies(data2);
            setList(data2);
            setMore(21);
            setCurrent(0);
        })
        .catch((err) => {
            console.error("전체 영화 불러오기 실패:", err);
        });
    }, []);


        const{id} = useParams()
    // 전에는 JSON에서 보내온 전체의 배열 중 find를 썼는데 이번엔 fetchAll 이용해서 아이디 일치하는거 찾아야함
    const item = [...movies].find((item)=>item.id === Number(id))

    const navi=useNavigate();
    const {user1,user2,user3}=useContext(LoginContext);
    const {addwish1,isinwish1,removewish1,
            addwish2,isinwish2,removewish2,
            addwish3,isinwish3,removewish3,wishMovies1,wishMovies2,wishMovies3} =useContext(WishContext);
    
    //높은 평점순
    const vote = [...movies].sort((a,b)=> b.vote_average - a.vote_average);

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
            //일단 영화 개봉일 정렬
            const copySort1 = [...copyData].sort((a,b)=> new Date(b.release_date) - new Date(a.release_date));
            //그 다음 방송 시작일 정렬
            const copySort2 = [...copySort1].sort((a,b)=> new Date(b.first_air_date) - new Date(a.first_air_date));
            return setList(copySort2);
        } 
        if(value==='vote_average'){
            const copySort = [...copyData].sort((a,b)=> b.vote_average - a.vote_average);
            return setList(copySort);
        }
    }

    const searchChange = (val) =>{
        const array=[];
        setChecked(null);
        setSearchClick(false);
        setSearchResult(array);
        setSearchInput('');
        setMore(21);

        setInputVal(val);
        setTitle(val);

        const copyData = [...movies];
        //인풋select에 선택된 값이 all이 아닐경우 해당 값과 동일한 data 카테고리로 필터링
        if(val !== 'ALL'){
            const filtering = [...copyData].filter((item)=>(item.genre_ids?.includes(Number(val)) || item.origin_country?.includes(val.toUpperCase())));
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

        const filtering = [...copyData].filter((item)=>(item.name?.replace(/\s+/g, '').toLowerCase().includes(keyword)||item.title?.replace(/\s+/g, '').toLowerCase().includes(keyword)));

        
        setSearchClick(true);
        setMore(21);

        if(filtering.length > 0){
            return setSearchResult(filtering);
        }else{
            const array = [];
            return setSearchResult(array);
        }

    }

    //슬라이드 인덱스
    const[current, setCurrent] = useState(0);

    // 좌측버튼 클릭시
    const leftClick = ()=>{ 
        if(current === 0){
            return setCurrent(0);
        }else{
            return setCurrent(current-1);
        }
    }

    // 우측버튼 클릭시
    const rightClick = ()=>{
        if(current === mainBanner.length-1){
            return setCurrent(mainBanner.length-1);
        }else{
            return setCurrent(current+1);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(current => (current + 1) % mainBanner.length);
        }, 5000);

        return () => clearInterval(interval);
    }); 

    //더보기 버튼클릭시
    const moreClick = () =>{
        let view = more;
        view += view;
        setMore(view);
    }

 
    

    return(
        <>
            <div className="main-container">
                
                <div className="banner">
                    <div className="main-banner">
                        {mainBanner.map((item,index)=>(
                            <div className="info-wrap" key={index} style={{transform: `translateX(-${(current * 100)}%)`, backgroundImage:`url(https://image.tmdb.org/t/p/original//${item.backdrop_path}.jpg)`}}>
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
                    <div className="left-arrow" onClick={leftClick}></div>
                    <div className="right-arrow" onClick={rightClick}></div>
                </div>

                <div className="category">
                    <div className="btns">
                        <div className="btns-left">
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
                            
                            <button type="button" onClick={()=>{listSort('release_date');checkHandler(1);}}><span className="check">{checked === 1 ? <i className="fa-solid fa-check"></i> : null}</span> 최신순</button>
                            <button type="button" onClick={()=>{listSort('vote_average');checkHandler(2);}}><span className="check">{checked === 2 ? <i className="fa-solid fa-check"></i> : null}</span> 평점순</button>
                        </div>
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
                                <h4>{title==='ALL'?'전체영화':title==='28'?'액션':title==='12'?'모험':title==='16'?'애니메이션':title==='35'?'코미디':title==='80'?'범죄':title==='99'?'다큐멘터리':title==='18'?'드라마':title==='10751'?'가족':title==='14'?'판타지':title==='36'?'역사':title==='27'?'공포':title==='10402'?'음악':title==='9648'?'미스터리':title==='10749'?'로맨스':title==='878'?'SF':title==='10770'?'TV영화':title==='53'?'스릴러':title==='10752'?'전쟁':title==='37'?'서부':title==='us'?'미국':title==='kr'?'한국':title==='cn'?'중국':title==='jp'?'일본':'전체영화'}</h4>
                                <p className="movieNum">{list.length === 0 ? '' : `총 ${list.length}개의 영화가 있습니다.`}</p>
                                <ul>
                                    {list.slice(0,more).map((item,index)=>(
                                        <li key={index}>
                                            {item.isAdult ? (
                                                // 성인 콘텐츠면 클릭 시 alert, Link 이동 막기
                                                <div className="adultOverlay"
                                                    onClick={() => alert("성인 인증이 필요합니다")}>
                                                    <div className="adultOverlay"/>
                                                    <div className="mark19">19</div>
                                                    <p
                                                    style={{
                                                        position: "absolute",
                                                        backgroundColor:"black",
                                                        width: "100%",
                                                        height:"60px",
                                                        top: "50%",
                                                        left: "50%",
                                                        transform: "translate(-50%, -50%)",
                                                        color: "white",
                                                        fontSize: "14px",
                                                        fontWeight: "600",
                                                        textAlign: "center",
                                                        lineHeight:"60px",
                                                        zIndex: 10,
                                                    }}
                                                    >
                                                    성인 인증이 필요합니다.
                                                    </p>
                                                    <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.title} />
                                                </div>
                                                ) : (
                                                // 성인 아니면 정상 Link
                                                <>
                                                    <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.title} />
                                                    
                                                    <div className="black">
                                                    <button type="button" onClick={()=>
                                                    {user1?(isinwish1(item.id)?removewish1(item.id):addwish1(item)):user2?(isinwish2(item.id)?removewish2(item.id):addwish2(item))
                                                    :(isinwish3(item.id)?removewish3(item.id):addwish3(item))}}>
                                                        {user1 ? (
                                                            isinwish1(item.id)
                                                            ? <i className="fa-solid fa-check"></i>
                                                            : <i className="fa-solid fa-plus"></i>
                                                        ) : user2 ? (
                                                            isinwish2(item.id)
                                                            ? <i className="fa-solid fa-check"></i>
                                                            : <i className="fa-solid fa-plus"></i>
                                                        ) : user3 ? (
                                                            isinwish3(item.id)
                                                            ? <i className="fa-solid fa-check"></i>
                                                            : <i className="fa-solid fa-plus"></i>
                                                        ) : null}
                                                        <p>찜하기</p>
                                                    </button>
                                                    <Link to={`/detail/${item.id}`}>
                                                        <i className="fa-solid fa-circle-info"></i>
                                                        <p>상세정보</p>
                                                    </Link>
                                                </div>
                                            </>
                                            )}
                                            {/* {item.release_date}{item.vote_average}{item.origin_country} */}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        :
                        //검색했을때 검색결과 출력
                            <>
                                <h4>검색결과</h4>
                                <p className="movieNum">{searchResult.length === 0 ? '검색결과가 없습니다.' : `총 ${searchResult.length}개의 결과가 있습니다.`}</p>
                                {/* 검색결과 없으면 추천작품(평점순) 있으면 결과리스트 노출 */}
                                {searchResult.length === 0 ? <h4>추천작품</h4> : null}
                                <ul>
                                    
                                    {searchResult.length === 0 ?                                    
                                        vote.slice(0,21).map((item,index)=>(
                                            <li key={index}>
                                                {item.isAdult ? (
                                                    // 성인 콘텐츠면 클릭 시 alert, Link 이동 막기
                                                    <div className="adultOverlay"
                                                        onClick={() => alert("성인 인증이 필요합니다")}>
                                                        <div className="adultOverlay"/>
                                                        <div className="mark19">19</div>
                                                        <p
                                                        style={{
                                                            position: "absolute",
                                                            backgroundColor:"black",
                                                            width: "100%",
                                                            height:"60px",
                                                            top: "50%",
                                                            left: "50%",
                                                            transform: "translate(-50%, -50%)",
                                                            color: "white",
                                                            fontSize: "14px",
                                                            fontWeight: "600",
                                                            textAlign: "center",
                                                            lineHeight:"60px",
                                                            zIndex: 10,
                                                        }}
                                                        >
                                                        성인 인증이 필요합니다.
                                                        </p>
                                                        <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.title} />
                                                    </div>
                                                    ) : (
                                                    // 성인 아니면 정상 Link
                                                    <>
                                                        <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.title} />
                                                    
                                                        <div className="black">
                                                            <button type="button" onClick={()=>
                                                            {user1?(isinwish1(item.id)?removewish1(item.id):addwish1(item)):user2?(isinwish2(item.id)?removewish2(item.id):addwish2(item))
                                                            :(isinwish3(item.id)?removewish3(item.id):addwish3(item))}}>
                                                                {user1 ? (
                                                                    isinwish1(item.id)
                                                                    ? <i className="fa-solid fa-check"></i>
                                                                    : <i className="fa-solid fa-plus"></i>
                                                                ) : user2 ? (
                                                                    isinwish2(item.id)
                                                                    ? <i className="fa-solid fa-check"></i>
                                                                    : <i className="fa-solid fa-plus"></i>
                                                                ) : user3 ? (
                                                                    isinwish3(item.id)
                                                                    ? <i className="fa-solid fa-check"></i>
                                                                    : <i className="fa-solid fa-plus"></i>
                                                                ) : null}
                                                                <p>찜하기</p>
                                                            </button>
                                                            <Link to={`/detail/${item.id}`}>
                                                                <i className="fa-solid fa-circle-info"></i>
                                                                <p>상세정보</p>
                                                            </Link>
                                                        </div>
                                                    </>

                                                )}
                                            </li>
                                        ))
                                    :
                                        searchResult.slice(0,more).map((item,index)=>(
                                            <li key={index}>
                                                {item.isAdult ? (
                                                    // 성인 콘텐츠면 클릭 시 alert, Link 이동 막기
                                                    <div className="adultOverlay"
                                                        onClick={() => alert("성인 인증이 필요합니다")}>
                                                        <div className="adultOverlay"/>
                                                        <div className="mark19">19</div>
                                                        <p
                                                        style={{
                                                            position: "absolute",
                                                            backgroundColor:"black",
                                                            width: "100%",
                                                            height:"60px",
                                                            top: "50%",
                                                            left: "50%",
                                                            transform: "translate(-50%, -50%)",
                                                            color: "white",
                                                            fontSize: "14px",
                                                            fontWeight: "600",
                                                            textAlign: "center",
                                                            lineHeight:"60px",
                                                            zIndex: 10,
                                                        }}
                                                        >
                                                        성인 인증이 필요합니다.
                                                        </p>
                                                        <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.title} />
                                                    </div>
                                                    ) : (
                                                    // 성인 아니면 정상 Link
                                                    <>
                                                        <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.title} />
                                                        <div className="black">
                                                            <button type="button" onClick={()=>
                                                            {user1?(isinwish1(item.id)?removewish1(item.id):addwish1(item)):user2?(isinwish2(item.id)?removewish2(item.id):addwish2(item))
                                                            :(isinwish3(item.id)?removewish3(item.id):addwish3(item))}}>
                                                                {user1 ? (
                                                                    isinwish1(item.id)
                                                                    ? <i className="fa-solid fa-check"></i>
                                                                    : <i className="fa-solid fa-plus"></i>
                                                                ) : user2 ? (
                                                                    isinwish2(item.id)
                                                                    ? <i className="fa-solid fa-check"></i>
                                                                    : <i className="fa-solid fa-plus"></i>
                                                                ) : user3 ? (
                                                                    isinwish3(item.id)
                                                                    ? <i className="fa-solid fa-check"></i>
                                                                    : <i className="fa-solid fa-plus"></i>
                                                                ) : null}
                                                                <p>찜하기</p>
                                                            </button>
                                                            <Link to={`/detail/${item.id}`}>
                                                                <i className="fa-solid fa-circle-info"></i>
                                                                <p>상세정보</p>
                                                            </Link>
                                                        </div>

                                                    </>
                                                )}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </>
                        }
                        {((searchClick ? searchResult.length : list.length) > more) && (
                            <div className="more-wrap">
                                <button type="button" onClick={moreClick}>더보기</button>
                            </div>
                        )}                   
                    </div>                  
                </div>
            </div>
        </>
        
    )
}