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
  const [positions, setPositions] = useState({}); // 카테고리별 translateX 값
  const listRefs = useRef({});

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

  // 🔹 슬라이드 이동 함수
  const slide = (category, direction) => {
    const list = listRefs.current[category];
    if (!list) return;

    const card = list.querySelector(".recommandcard");
    const cardWidth = card?.offsetWidth || 200;
    const gap = 15;
    const move = (cardWidth + gap) * 8; // 8개 단위 이동

    setPositions((prev) => {
      const current = prev[category] || 0;
      const maxMove =
        (data[category]?.length || 0) * (cardWidth + gap) - list.offsetWidth;
      let next =
        direction === "right" ? current - move : current + move;

      // 범위 제한 (좌우 끝 멈춤)
      if (next > 0) next = 0;
      if (Math.abs(next) > maxMove) next = -maxMove;

      return { ...prev, [category]: next };
    });
  };

  return (
    <div className="recommand-wrap">
      {categories.map((c) => (
        <div key={c.name} className="recommandresult-wrap">
          <p className="recommandresult-head">{c.name}</p>
          <div className="recommand-btn recommandleft-arrow" onClick={() => slide(c.name, "left")}></div>
          <div className="recommandslider-container">
            

            <div className="recommandresult-outer">
              <div
                className="recommandresult-lists"
                ref={(el) => (listRefs.current[c.name] = el)}
                style={{
                  transform: `translateX(${positions[c.name] || 0}px)`,
                }}
              >
                {data[c.name]?.map((item) => (
                  <Link
                    to={`/detail/${item.id}`}
                    key={item.id}
                    className="recommandcard"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                      alt={item.title || item.name}
                      className="recommandposter"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="recommand-btn recommandright-arrow" onClick={() => slide(c.name, "right")}></div>
        </div>
      ))}
    </div>
  );
}
