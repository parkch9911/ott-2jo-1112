import { useContext, useState, useEffect } from "react";
import { SearchContext } from "../../context/SearchContext.jsx";
import { DataContext } from "../../context/DataContext.jsx";
import { fetchTarget, endpoints } from "../../context/useFetch";
import { Link } from "react-router-dom";
import "./InputPage.css";

export default function InputPage() {
  const { searchText, setSearchText, genreMap } = useContext(SearchContext);
  const { allData, fetchAllEndpoints } = useContext(DataContext);

  const [inputValue, setInputValue] = useState(searchText || "");
  const [searchResults, setSearchResults] = useState([]);
  const [recommendList, setRecommendList] = useState([]);
  const [relatedGenres, setRelatedGenres] = useState([]);
  const [recommendTitle, setRecommendTitle] = useState("");

  const categories = [
    { name: "인기 시리즈", endpoint: endpoints.tvTopRated },
    { name: "인기 영화", endpoint: endpoints.moviePopular },
    { name: "현재 상영 시리즈", endpoint: endpoints.tvOnTheAir },
    { name: "현재 상영 영화", endpoint: endpoints.movieNowPlaying },
    { name: "방영 예정 시리즈", endpoint: endpoints.tvUpcoming },
    { name: "상영 예정 영화", endpoint: endpoints.movieUpcoming },
    { name: "한국 드라마", endpoint: endpoints.tvKorea },
    { name: "한국 영화", endpoint: endpoints.movieKorea },
    { name: "성인 시리즈", endpoint: endpoints.tvAdult },
    { name: "성인 영화", endpoint: endpoints.movieAdult },
  ];

  // 전체 데이터 최초 로드
  useEffect(() => {
    fetchAllEndpoints();
  }, []);

  // 랜덤 추천 콘텐츠 가져오기
  const fetchRandomRecommend = () => {
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    fetchTarget(randomCategory.endpoint)
      .then((data) => {
        // movieAdult / tvAdult 인 경우 isAdult 플래그 자동 적용
        const markedData = data.map((item) => ({
          ...item,
          isAdult:
            randomCategory.name.includes("성인") // 이름 기준 플래그
              ? true
              : false,
        }));
        setRecommendList(markedData);
        setRecommendTitle(`추천 컨텐츠 : ${randomCategory.name}`);
      })
      .catch((err) => console.error("랜덤 추천 fetch 실패:", err));
  };

  useEffect(() => {
    if (!searchText) fetchRandomRecommend();
    const interval = setInterval(() => {
      if (!searchText) fetchRandomRecommend();
    }, 100000);
    return () => clearInterval(interval);
  }, [searchText]);

  // 검색 처리
  const handleSearch = () => {
    const keyword = inputValue.trim();
    if (!keyword) return;

    setSearchText(keyword);
    setInputValue("");

    const titleResults = allData.filter((m) =>
      (m.title || m.name || "").toLowerCase().includes(keyword.toLowerCase())
    );

    const genreResults = allData.filter((m) =>
      m.genre_ids?.some((id) =>
        (genreMap[id] || "").toLowerCase().includes(keyword.toLowerCase())
      )
    );

    const combinedResults = [
      ...titleResults,
      ...genreResults.filter((m) => !titleResults.includes(m)),
    ];

    setSearchResults(combinedResults);

    const genreIdsFromResults = new Set(combinedResults.flatMap((item) => item.genre_ids || []));
    setRelatedGenres(
      Object.entries(genreMap)
        .filter(([id]) => genreIdsFromResults.has(Number(id)))
        .map(([_, name]) => name)
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  // 카테고리 클릭
  const handleCategoryClick = (endpoint, name) => {
    setSearchText("");
    setRelatedGenres([]);
    fetchTarget(endpoint)
      .then((data) => {
        const markedData = data.map((item) => ({
          ...item,
          isAdult: name.includes("성인"),
        }));
        setRecommendList(markedData);
        setRecommendTitle(`추천 컨텐츠 : ${name}`);
      })
      .catch((err) => console.error("카테고리 fetch 실패:", err));
  };

  // 장르 클릭
  const handleGenreClick = (genreName) => {
    const genreEntry = Object.entries(genreMap).find(([_, name]) => name === genreName);
    if (!genreEntry) return;
    const genreId = Number(genreEntry[0]);

    const genreResults = allData.filter((m) => m.genre_ids?.includes(genreId));
    setSearchResults(genreResults);
    setSearchText(genreName);
    setRelatedGenres([]);
  };

  // 이미지 렌더링 함수 (19 오버레이 적용)
  const renderImage = (item) => (
    <div key={item.id}>
      {item.isAdult ? (
      // 성인 콘텐츠면 클릭 시 alert, Link 이동 막기
      <div className="adultOverlayWrap"
      onClick={() => alert("성인 인증이 필요합니다")}>
        <div className="adultOverlay"/>
          <div className="mark19">19</div>
          <span style={{
            position: "absolute",
            backgroundColor:"black",
            width: "100%",
            height:"60px",
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            fontSize: "14px",
            fontWeight: "600",
            textAlign: "center",
            lineHeight:"60px",
            zIndex: 10,
            }}>성인 인증이 필요합니다.
          </span>
          <img
            src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
            alt={item.title || item.name}
            width="200"
            style={{ display: "block", borderRadius: "4px" }}
          />
        </div>
        ) : (
        // 성인 아니면 정상 Link
          <Link to={`/detail/${item.id}`} style={{ textDecoration: "none", position: "relative", display: "inline-block" }}>
            <img
              src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
              alt={item.title || item.name}
              width="200"
              style={{ display: "block", borderRadius: "4px" }}
            />
          </Link>
        )}
    </div>                             
  );

  // 추천 컨텐츠 렌더링
  const renderRecommend = () => (
    <div className="recommend-wrap">
      <p className="result-head">{recommendTitle || "추천 컨텐츠"}</p>
      <div className="result-lists">
        {recommendList.map((item) => renderImage(item))}
      </div>
    </div>
  );

  // 검색 결과 렌더링
  const renderSearchResults = () => {
    if (!searchText) return null;

    if (searchResults.length > 0) {
      return (
        <div className="search-results">
          <p className="result-head">검색 결과</p>
          <p className="movieNum">총 {searchResults.length}개의 결과가 있습니다.</p>
          <div className="result-lists">
            {searchResults.map((item) => renderImage(item))}
          </div>

          {/* 연관 장르별 콘텐츠 */}
          {relatedGenres.map((genreName) => {
            const genreEntry = Object.entries(genreMap).find(([_, name]) => name === genreName);
            if (!genreEntry) return null;
            const genreId = Number(genreEntry[0]);
            const genreItems = allData.filter((m) => m.genre_ids?.includes(genreId));
            if (genreItems.length === 0) return null;

            return (
              <div key={genreName}>
                <p className="result-head">연관 장르 : {genreName}</p>
                <div className="result-lists">
                  {genreItems.map((item) => renderImage(item))}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <>
        <div className="search-results">
          <p className="result-head">검색 결과</p>
          <p className="movieNum">검색결과가 없습니다.</p>
        </div>
        {renderRecommend()}
      </>
    );
  };

  return (
    <>
      <div className="search-wrap">
        <div className="inputandBtn">
          <input
            className="inputbox"
            type="text"
            placeholder="제목, 장르 검색"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="input-btn" onClick={handleSearch}>
            검색
          </button>
        </div>

        <div className="category-wrap">
          {categories.map((cat) => (
            <button
              key={cat.name}
              className="cate-btn"
              onClick={() => handleCategoryClick(cat.endpoint, cat.name)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="genre-wrap">
          {Object.entries(genreMap).map(([id, name]) => (
            <button
              key={id}
              className="cate-btn"
              onClick={() => handleGenreClick(name)}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {renderSearchResults()}
      {!searchText && renderRecommend()}
    </>
  );
}
