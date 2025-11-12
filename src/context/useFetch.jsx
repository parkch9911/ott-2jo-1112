const V4_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTJkZDljZGMxZDZkOTdmMzdmOTM2M2I1YjQ2Y2Q5ZSIsIm5iZiI6MTc2MjczNzIzNS4wNDYwMDAyLCJzdWIiOiI2OTExM2M1M2EwN2VkOTNmMDdkZDIxYmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.p2iccSA5DomqKuUUIDJeSLiWkyPRMANa6G3avvEk8HE";

export const endpoints = {
  moviePopular: "movie/popular",
  movieNowPlaying: "movie/now_playing",
  movieUpcoming: "movie/upcoming",
  movieKorea: "discover/movie?with_original_language=ko",
  movieJapan: "discover/movie?with_original_language=ja",
  movieAdult: "discover/movie?include_adult=true",
  movieAnime: "discover/movie?with_genres=16",
  tvTopRated: "tv/top_rated",
  tvOnTheAir: "tv/on_the_air",
  tvUpcoming: "discover/tv?language=ko-KR&first_air_date.gte=2025-11-11&page=1",
  tvAiringToday: "tv/airing_today",
  tvKorea:  "discover/tv?with_original_language=ko",
  tvJapan:  "discover/tv?with_original_language=ja",
  tvAdult:  "discover/tv?include_adult=true",
  tvAnime:  "discover/tv?with_genres=16",
};

// 단일 엔드포인트 fetch
export function fetchTarget(endpoint) {
  return fetch(`https://api.themoviedb.org/3/${endpoint}?language=ko-KR`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${V4_TOKEN}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data.results || [])
    .catch((err) => {
      console.error(`TMDB fetch error [${endpoint}]:`, err);
      return [];
    });
}

// 모든 엔드포인트 fetch + 중복 제거
export function fetchAll() {
  const promises = Object.values(endpoints).map((endpoint) =>
    fetchTarget(endpoint)
  );

  return Promise.all(promises).then((resultsArray) => {
    const allData = resultsArray.flat();

    const seenIds = new Set();
    return allData.filter((item) => {
      if (seenIds.has(item.id)) return false;
      seenIds.add(item.id);
      return true;
    });
  });
}
