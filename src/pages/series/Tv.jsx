import { useState, useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import "./Tv.css"; 
import { fetchAll } from "../../context/useFetch"; 
import { LoginContext } from "../../context/LoginContext";
import { WishContext } from "../../context/WishContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Tv() {
  const [tvShows, setTvShows] = useState([]);
  const [checked, setChecked] = useState(null);
  const [list, setList] = useState([]);
  const [inputVal, setInputVal] = useState("ALL");
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchClick, setSearchClick] = useState(false);
  const [title, setTitle] = useState("ALL");
  const [more, setMore] = useState(21);
  const [current, setCurrent] = useState(0);

  // 메인 배너에 쓸 TV 시리즈 ID 지정
  const mainBanner = [...tvShows].filter(
    (tv) =>
      tv.id === 293613 ||
      tv.id === 66732 ||
      tv.id === 255719 ||
      tv.id === 99966 ||
      tv.id === 2190
  );

  useEffect(() => {
    fetchAll()
      .then((data) => {
        const filtered = [...data].filter(
          (tv) => tv.id !== 196902 && tv.id !== 125988 && tv.id !== 100088
        );

        setTvShows(data.filter(
          (item) => item.name && item.id !== 278635 && item.id !== 1374686 && item.id !== 257161 && item.id !== 105660 && item.id !== 1015552 && item.id !== 1355783 && item.id !== 293530 && item.id !== 784755 && item.id !== 1523160))
        setList(filtered);
        setMore(21);
        setCurrent(0);
      })
      .catch((err) => console.error("TV 데이터 불러오기 실패:", err));
  }, []);
  



    const navi=useNavigate();
    const {user1,user2,user3}=useContext(LoginContext);
    const {addwish1,isinwish1,removewish1,
            addwish2,isinwish2,removewish2,
            addwish3,isinwish3,removewish3,wishMovies1,wishMovies2,wishMovies3} =useContext(WishContext);
      


  const vote = [...tvShows].sort((a, b) => b.vote_average - a.vote_average);

  const checkHandler = (key) => {
    setChecked(key);
  };

  const listSort = (value) => {
    let copyData = [];

    if (
      inputVal === null ||
      inputVal === undefined ||
      inputVal === "" ||
      inputVal === "all"
    ) {
      copyData = [...tvShows];
    } else {
      copyData = [...list];
    }

    if (value === "release_date") {
      const copySort1 = [...copyData].sort(
        (a, b) => new Date(b.first_air_date) - new Date(a.first_air_date)
      );
      return setList(copySort1);
    }

    if (value === "vote_average") {
      const copySort = [...copyData].sort(
        (a, b) => b.vote_average - a.vote_average
      );
      return setList(copySort);
    }
  };

  const searchChange = (val) => {
    const array = [];
    setChecked(null);
    setSearchClick(false);
    setSearchResult(array);
    setSearchInput("");
    setMore(21);

    setInputVal(val);
    setTitle(val);

    const copyData = [...tvShows];
    if (val !== "ALL") {
      const filtering = [...copyData].filter(
        (item) =>
          item.genre_ids?.includes(Number(val)) ||
          item.origin_country?.includes(val.toUpperCase())
      );
      setList(filtering);
    } else {
      setList(copyData);
    }
  };

  const searching = () => {
    const copyData = [...tvShows];

    if (searchInput.replace(/\s+/g, "") === "") {
      alert("검색어를 입력하세요.");
      return;
    }

    const keyword = searchInput.trim().toLowerCase();

    const filtering = [...copyData].filter(
      (item) =>
        item.name?.replace(/\s+/g, "").toLowerCase().includes(keyword) ||
        item.original_name?.replace(/\s+/g, "").toLowerCase().includes(keyword)
    );

    setSearchClick(true);
    setMore(21);

    if (filtering.length > 0) {
      return setSearchResult(filtering);
    } else {
      const array = [];
      return setSearchResult(array);
    }
  };

  const leftClick = () => {
    if (current === 0) {
      return setCurrent(0);
    } else {
      return setCurrent(current - 1);
    }
  };

  const rightClick = () => {
    if (current === mainBanner.length - 1) {
      return setCurrent(mainBanner.length - 1);
    } else {
      return setCurrent(current + 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((current) => (current + 1) % mainBanner.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [mainBanner.length]);

  const moreClick = () => {
    let view = more;
    view += view;
    setMore(view);
  };

  return (
    <>
      <div className="main-container">
        {/* 배너 */}
        <div className="banner">
          <div className="main-banner">
            {mainBanner.map((item, index) => (
              <div
                className="info-wrap"
                key={index}
                style={{
                  transform: `translateX(-${current * 100}%)`,
                  backgroundImage: `url(https://image.tmdb.org/t/p/original/${item.backdrop_path}.jpg)`,
                }}
              >
                <div className="info-wrap2">
                  <h2>{item.name}</h2>
                  <p>{item.overview}</p>
                  <Link to={`/detail/${item.id}`}>
                    <button className="play" type="button">
                      재생하기
                    </button>
                  </Link>
                  <Link to={`/detail/${item.id}`}>
                    <button className="info" type="button">
                      상세정보
                    </button>
                  </Link>
                </div>
                <div className="main-info bg-color"></div>
              </div>
            ))}
          </div>
          <div className="left-arrow" onClick={leftClick}></div>
          <div className="right-arrow" onClick={rightClick}></div>
        </div>

        {/* 필터 */}
        <div className="category">
          <div className="btns">
            <div className="btns-left">
              <label htmlFor="list-view">장르별</label>
              <select
                name="list-view"
                id="list-view"
                onChange={(e) => searchChange(e.target.value)}
                value={inputVal}
              >
                <option value="ALL">전체</option>
                <option value="10759">액션 & 모험</option>
                <option value="16">애니메이션</option>
                <option value="35">코미디</option>
                <option value="80">범죄</option>
                <option value="99">다큐멘터리</option>
                <option value="18">드라마</option>
                <option value="10751">가족</option>
                <option value="10762">어린이</option>
                <option value="9648">미스터리</option>
                <option value="10765">SF & 판타지</option>
                <option value="10766">연속극</option>
                <option value="10767">토크쇼</option>
              </select>

              <label htmlFor="country">나라별</label>
              <select
                name="country"
                id="country"
                onChange={(e) => searchChange(e.target.value)}
                value={inputVal}
              >
                <option value="ALL">전체</option>
                <option value="us">미국</option>
                <option value="kr">한국</option>
                <option value="jp">일본</option>
                <option value="gb">영국</option>
              </select>

              <button
                type="button"
                onClick={() => {
                  listSort("release_date");
                  checkHandler(1);
                }}
              >
                <span className="check">
                  {checked === 1 ? <i className="fa-solid fa-check"></i> : null}
                </span>
                최신순
              </button>
              <button
                type="button"
                onClick={() => {
                  listSort("vote_average");
                  checkHandler(2);
                }}
              >
                <span className="check">
                  {checked === 2 ? <i className="fa-solid fa-check"></i> : null}
                </span>
                평점순
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                searching();
              }}
            >
              <input
                type="text"
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
                placeholder="시리즈명을 입력하세요"
              />
              <button type="submit">검색</button>
            </form>
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="main-contents">
          <div className="content-wrap">
            {searchClick === false &&
            (searchResult === null ||
              searchResult === undefined ||
              searchResult.length === 0) ? (
              <>
                <h4>
                  {title === "ALL"
                    ? "전체 시리즈"
                    : title === "10759"
                    ? "액션 & 모험"
                    : title === "16"
                    ? "애니메이션"
                    : title === "35"
                    ? "코미디"
                    : title === "80"
                    ? "범죄"
                    : title === "99"
                    ? "다큐멘터리"
                    : title === "18"
                    ? "드라마"
                    : title === "10751"
                    ? "가족"
                    : title === "10762"
                    ? "어린이"
                    : title === "9648"
                    ? "미스터리"
                    : title === "10765"
                    ? "SF & 판타지"
                    : title === "10766"
                    ? "연속극"
                    : title === "10767"
                    ? "토크쇼"
                    : "전체 시리즈"}
                </h4>
                <p className="movieNum">
                  {list.length === 0 ? "" : `총 ${list.length}개의 시리즈가 있습니다.`}
                </p>
                <ul>
                  {list.slice(0, more).map((item, index) => (
                    <li key={index}>
                      {item.isAdult ? (
                        <div
                          className="adultOverlay"
                          onClick={() => alert("성인 인증이 필요합니다")}
                        >
                          <div className="adultOverlay" />
                          <div className="mark19">19</div>
                          <p className="ment19">성인 인증이 필요합니다.</p>
                          <img
                            src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                            alt={item.name}
                          />
                        </div>
                      ) : (
                        <>
                          <img
                            src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                            alt={item.name}
                          />
                        
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
                  ))}
                </ul>
              </>
            ) : (
              <>
                <h4>검색결과</h4>
                <p className="movieNum">
                  {searchResult.length === 0
                    ? "검색결과가 없습니다."
                    : `총 ${searchResult.length}개의 결과가 있습니다.`}
                </p>
                {searchResult.length === 0 ? <h4>추천 시리즈</h4> : null}
                <ul>
                  {(searchResult.length === 0
                    ? vote.slice(0, 21)
                    : searchResult.slice(0, more)
                  ).map((item, index) => (
                    <li key={index}>
                      {item.isAdult ? (
                        <div
                          className="adultOverlay"
                          onClick={() => alert("성인 인증이 필요합니다")}
                        >
                          <div className="adultOverlay" />
                          <div className="mark19">19</div>
                          <p className="ment19">성인 인증이 필요합니다.</p>
                          <img
                            src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                            alt={item.name}
                          />
                        </div>
                      ) : (
                        <>                       
                          <img
                            src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                            alt={item.name}
                          />
                        
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
                  ))}
                </ul>
              </>
            )}
            {((searchClick ? searchResult.length : list.length) > more) && (
              <div className="more-wrap">
                <button type="button" onClick={moreClick}>
                  더보기
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
