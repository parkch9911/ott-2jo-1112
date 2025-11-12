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
  const [searchResults, setSearchResults] = useState([]); // 검색 결과
  const [recommendList, setRecommendList] = useState([]); // 추천 컨텐츠
  const [resultH2, setResultH2] = useState(""); // 추천 컨텐츠 제목

  // 카테고리 버튼 정의
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

  // Header에서 searchText 바뀌면 allData fetch
  useEffect(() => {
    if (searchText) fetchAllEndpoints();
  }, [searchText]);

  // 검색 처리
  const handleSearch = () => {
    const keyword = inputValue.trim();
    if (!keyword) return;

    setSearchText(keyword);
    setInputValue("");

    const titleResults = allData.filter(m =>
      (m.title || m.name || "").toLowerCase().includes(keyword.toLowerCase())
    );

    const genreResults = allData.filter(m =>
      m.genre_ids?.some(id =>
        (genreMap[id] || "").toLowerCase().includes(keyword.toLowerCase())
      )
    );

    const combined = [...titleResults, ...genreResults.filter(m => !titleResults.includes(m))];
    setSearchResults(combined);
  };

  const handleKeyDown = e => {
    if (e.key === "Enter") handleSearch();
  };

  // 카테고리 클릭
  const handleCategoryClick = (endpoint, name) => {
    setSearchText("");
    setResultH2(name);
    fetchTarget(endpoint)
      .then(data => setRecommendList(data))
      .catch(err => console.error("카테고리 fetch 실패:", err));
  };

  // 장르 클릭
  const handleGenreClick = name => {
    setSearchText(name);
    const genreResults = allData.filter(m =>
      m.genre_ids?.some(id => (genreMap[id] || "") === name)
    );
    setSearchResults(genreResults);
  };

  // 초기 랜덤 추천: 검색어 없을 시
  useEffect(() => {
    if (!searchText) {
      const randomIndex = Math.floor(Math.random() * categories.length);
      const randomCategory = categories[randomIndex];

      fetchTarget(randomCategory.endpoint)
        .then(data => {
          setRecommendList(data);
          setResultH2(`추천 컨텐츠 - ${randomCategory.name}`);
        })
        .catch(err => console.error("랜덤 콘텐츠 불러오기 실패:", err));
    }
  }, []); // 빈 배열: 초기 렌더링 시 1회 실행

  return (
    <>
      {/* 검색 + 카테고리 + 장르 */}
      <div className="search-wrap">
        <div className="inputandBtn">
          <input
            className="inputbox"
            type="text"
            placeholder="제목, 장르 검색"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="input-btn" onClick={handleSearch}>검색</button>
        </div>

        <div className="category-wrap">
          {categories.map(cat => (
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

      {/* 결과 + 추천 컨텐츠 */}
      <div className="result-wrap">
        {/* 검색 결과 */}
        {searchText && (
          <div className="search-results">
            {searchResults.length > 0 ? (
              <>
                <h1 className="result-head">검색 결과 - {searchText}</h1>
                <div className="result-lists">
                  {searchResults.map(item => (
                    <Link to={`/detail/${item.id}`} key={item.id}>
                      <img
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        alt={item.title || item.name}
                        width="200"
                      />
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h1 className="result-head">검색 결과가 없습니다.</h1>
              </>
            )}
          </div>
        )}

        {/* 추천 컨텐츠 */}
        <div className="recommend-wrap">
          <h1 className="result-head">{resultH2 || "추천 컨텐츠"}</h1>
          <div className="result-lists">
            {recommendList.map(item => (
              <Link to={`/detail/${item.id}`} key={item.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title || item.name}
                  width="200"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
