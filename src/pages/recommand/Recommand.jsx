import { useState, useEffect, useRef } from "react";
import { fetchTarget, endpoints } from "../../context/useFetch";
import { Link } from "react-router-dom";
import "./Recommand.css";

export default function Recommand() {
  const categories = [
    { name: "현재 상영 시리즈", endpoint: endpoints.tvOnTheAir },
    { name: "현재 상영 영화", endpoint: endpoints.movieNowPlaying },
    { name: "방영 예정 시리즈", endpoint: endpoints.tvUpcoming },
    { name: "상영 예정 영화", endpoint: endpoints.movieUpcoming },
    { name: "한국 드라마", endpoint: endpoints.tvKorea },
    { name: "한국 영화", endpoint: endpoints.movieKorea },
  ];

  const [data, setData] = useState({});
  const listRefs = useRef({}); // 각 카테고리 리스트 DOM 참조

  useEffect(() => {
    Promise.all(
      categories.map((c) =>
        fetchTarget(c.endpoint).then((res) => [c.name, res])
      )
    )
      .then((results) => {
        const obj = Object.fromEntries(results);
        setData(obj);
      })
      .catch((err) => console.error(err));
  }, []);


  return (
    <div className="recommand-wrap">
      {categories.map((c) => (
        <div key={c.name} className="recommandresult-wrap">
          <p className="recommandresult-head">{c.name}</p>
          <div className="recommandslider-container">
            <button
              className="recommandslide-btn left"
            >
              ‹
            </button>
            <div
              className="recommandresult-lists"
            >
              {data[c.name]?.map((item) => (
                <Link to={`/detail/${item.id}`} key={item.id} className="recommandcard">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title || item.name}
                    className="recommandposter"
                  />
                </Link>
              ))}
            </div>
            <button
              className="recommandslide-btn right"
            >
              ›
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
