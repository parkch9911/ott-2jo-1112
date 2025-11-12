const V4_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTJkZDljZGMxZDZkOTdmMzdmOTM2M2I1YjQ2Y2Q5ZSIsIm5iZiI6MTc2MjczNzIzNS4wNDYwMDAyLCJzdWIiOiI2OTExM2M1M2EwN2VkOTNmMDdkZDIxYmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.p2iccSA5DomqKuUUIDJeSLiWkyPRMANa6G3avvEk8HE";

export const endpoints = {
  // 영화
  moviePopular: `movie/popular?api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTJkZDljZGMxZDZkOTdmMzdmOTM2M2I1YjQ2Y2Q5ZSIsIm5iZiI6MTc2MjczNzIzNS4wNDYwMDAyLCJzdWIiOiI2OTExM2M1M2EwN2VkOTNmMDdkZDIxYmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.p2iccSA5DomqKuUUIDJeSLiWkyPRMANa6G3avvEk8HE&language=ko-KR&page=1`,
  movieNowPlaying: `movie/now_playing?api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTJkZDljZGMxZDZkOTdmMzdmOTM2M2I1YjQ2Y2Q5ZSIsIm5iZiI6MTc2MjczNzIzNS4wNDYwMDAyLCJzdWIiOiI2OTExM2M1M2EwN2VkOTNmMDdkZDIxYmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.p2iccSA5DomqKuUUIDJeSLiWkyPRMANa6G3avvEk8HE&language=ko-KR&page=1`,
  movieUpcoming: `movie/upcoming?api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTJkZDljZGMxZDZkOTdmMzdmOTM2M2I1YjQ2Y2Q5ZSIsIm5iZiI6MTc2MjczNzIzNS4wNDYwMDAyLCJzdWIiOiI2OTExM2M1M2EwN2VkOTNmMDdkZDIxYmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.p2iccSA5DomqKuUUIDJeSLiWkyPRMANa6G3avvEk8HE&language=ko-KR&page=1`,
  movieKorea: `discover/movie?api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTJkZDljZGMxZDZkOTdmMzdmOTM2M2I1YjQ2Y2Q5ZSIsIm5iZiI6MTc2MjczNzIzNS4wNDYwMDAyLCJzdWIiOiI2OTExM2M1M2EwN2VkOTNmMDdkZDIxYmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.p2iccSA5DomqKuUUIDJeSLiWkyPRMANa6G3avvEk8HE&with_original_language=ko&language=ko-KR&page=2`,
  movieJapan: `discover/movie?api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTJkZDljZGMxZDZkOTdmMzdmOTM2M2I1YjQ2Y2Q5ZSIsIm5iZiI6MTc2MjczNzIzNS4wNDYwMDAyLCJzdWIiOiI2OTExM2M1M2EwN2VkOTNmMDdkZDIxYmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.p2iccSA5DomqKuUUIDJeSLiWkyPRMANa6G3avvEk8HE&with_original_language=ja&language=ko-KR&page=1`,
  movieAdult: `discover/movie?api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTJkZDljZGMxZDZkOTdmMzdmOTM2M2I1YjQ2Y2Q5ZSIsIm5iZiI6MTc2MjczNzIzNS4wNDYwMDAyLCJzdWIiOiI2OTExM2M1M2EwN2VkOTNmMDdkZDIxYmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.p2iccSA5DomqKuUUIDJeSLiWkyPRMANa6G3avvEk8HE&include_adult=true&language=ko-KR&page=1`,
  movieAnime: `discover/movie?api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTJkZDljZGMxZDZkOTdmMzdmOTM2M2I1YjQ2Y2Q5ZSIsIm5iZiI6MTc2MjczNzIzNS4wNDYwMDAyLCJzdWIiOiI2OTExM2M1M2EwN2VkOTNmMDdkZDIxYmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.p2iccSA5DomqKuUUIDJeSLiWkyPRMANa6G3avvEk8HE&with_genres=16&language=ko-KR&page=1`,

  // TV
  tvTopRated: `tv/top_rated?api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTJkZDljZGMxZDZkOTdmMzdmOTM2M2I1YjQ2Y2Q5ZSIsIm5iZiI6MTc2MjczNzIzNS4wNDYwMDAyLCJzdWIiOiI2OTExM2M1M2EwN2VkOTNmMDdkZDIxYmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.p2iccSA5DomqKuUUIDJeSLiWkyPRMANa6G3avvEk8HE&language=ko-KR&page=1`,
  tvOnTheAir: `tv/on_the_air?api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTJkZDljZGMxZDZkOTdmMzdmOTM2M2I1YjQ2Y2Q5ZSIsIm5iZiI6MTc2MjczNzIzNS4wNDYwMDAyLCJzdWIiOiI2OTExM2M1M2EwN2VkOTNmMDdkZDIxYmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.p2iccSA5DomqKuUUIDJeSLiWkyPRMANa6G3avvEk8HE&language=ko-KR&page=1`,
  tvUpcoming: `discover/tv?api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTJkZDljZGMxZDZkOTdmMzdmOTM2M2I1YjQ2Y2Q5ZSIsIm5iZiI6MTc2MjczNzIzNS4wNDYwMDAyLCJzdWIiOiI2OTExM2M1M2EwN2VkOTNmMDdkZDIxYmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.p2iccSA5DomqKuUUIDJeSLiWkyPRMANa6G3avvEk8HE&language=ko-KR&first_air_date.gte=2025-11-11&page=1`,
  tvAiringToday: `tv/airing_today?api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTJkZDljZGMxZDZkOTdmMzdmOTM2M2I1YjQ2Y2Q5ZSIsIm5iZiI6MTc2MjczNzIzNS4wNDYwMDAyLCJzdWIiOiI2OTExM2M1M2EwN2VkOTNmMDdkZDIxYmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.p2iccSA5DomqKuUUIDJeSLiWkyPRMANa6G3avvEk8HE&language=ko-KR&page=1`,
  tvKorea: `discover/tv?api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTJkZDljZGMxZDZkOTdmMzdmOTM2M2I1YjQ2Y2Q5ZSIsIm5iZiI6MTc2MjczNzIzNS4wNDYwMDAyLCJzdWIiOiI2OTExM2M1M2EwN2VkOTNmMDdkZDIxYmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.p2iccSA5DomqKuUUIDJeSLiWkyPRMANa6G3avvEk8HE&language=ko‑KR&with_origin_country=KR&sort_by=first_air_date.desc&page=2`,
  tvJapan: `discover/tv?api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTJkZDljZGMxZDZkOTdmMzdmOTM2M2I1YjQ2Y2Q5ZSIsIm5iZiI6MTc2MjczNzIzNS4wNDYwMDAyLCJzdWIiOiI2OTExM2M1M2EwN2VkOTNmMDdkZDIxYmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.p2iccSA5DomqKuUUIDJeSLiWkyPRMANa6G3avvEk8HE&with_original_language=ja&language=ko-KR&page=1`,
  tvAdult: `discover/tv?api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTJkZDljZGMxZDZkOTdmMzdmOTM2M2I1YjQ2Y2Q5ZSIsIm5iZiI6MTc2MjczNzIzNS4wNDYwMDAyLCJzdWIiOiI2OTExM2M1M2EwN2VkOTNmMDdkZDIxYmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.p2iccSA5DomqKuUUIDJeSLiWkyPRMANa6G3avvEk8HE&include_adult=true&language=ko-KR&page=1`,
  tvAnime: `discover/tv?api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTJkZDljZGMxZDZkOTdmMzdmOTM2M2I1YjQ2Y2Q5ZSIsIm5iZiI6MTc2MjczNzIzNS4wNDYwMDAyLCJzdWIiOiI2OTExM2M1M2EwN2VkOTNmMDdkZDIxYmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.p2iccSA5DomqKuUUIDJeSLiWkyPRMANa6G3avvEk8HE&with_genres=16&language=ko-KR&page=1`
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
