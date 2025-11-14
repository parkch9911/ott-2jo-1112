const V4_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTJkZDljZGMxZDZkOTdmMzdmOTM2M2I1YjQ2Y2Q5ZSIsIm5iZiI6MTc2MjczNzIzNS4wNDYwMDAyLCJzdWIiOiI2OTExM2M1M2EwN2VkOTNmMDdkZDIxYmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.p2iccSA5DomqKuUUIDJeSLiWkyPRMANa6G3avvEk8HE";

export const endpoints = {
  // 영화
  moviePopular: `movie/popular?api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTJkZDljZGMxZDZkOTdmMzdmOTM2M2I1YjQ2Y2Q5ZSIsIm5iZiI6MTc2MjczNzIzNS4wNDYwMDAyLCJzdWIiOiI2OTExM2M1M2EwN2VkOTNmMDdkZDIxYmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.p2iccSA5DomqKuUUIDJeSLiWkyPRMANa6G3avvEk8HE&language=ko-KR&page=1`,
  movieNowPlaying: `movie/now_playing?api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTJkZDljZGMxZDZkOTdmMzdmOTM2M2I1YjQ2Y2Q5ZSIsIm5iZiI6MTc2MjczNzIzNS4wNDYwMDAyLCJzdWIiOiI2OTExM2M1M2EwN2VkOTNmMDdkZDIxYmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.p2iccSA5DomqKuUUIDJeSLiWkyPRMANa6G3avvEk8HE&language=ko-KR&page=2`,
  movieUpcoming: `movie/upcoming?api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTJkZDljZGMxZDZkOTdmMzdmOTM2M2I1YjQ2Y2Q5ZSIsIm5iZiI6MTc2MjczNzIzNS4wNDYwMDAyLCJzdWIiOiI2OTExM2M1M2EwN2VkOTNmMDdkZDIxYmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.p2iccSA5DomqKuUUIDJeSLiWkyPRMANa6G3avvEk8HE&language=ko-KR&page=1`,
  movieKorea: `discover/movie
?api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTJkZDljZGMxZDZkOTdmMzdmOTM2M2I1YjQ2Y2Q5ZSIsIm5iZiI6MTc2MjczNzIzNS4wNDYwMDAyLCJzdWIiOiI2OTExM2M1M2EwN2VkOTNmMDdkZDIxYmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.p2iccSA5DomqKuUUIDJeSLiWkyPRMANa6G3avvEk8HE
&include_adult=false
&with_original_language=ko
&language=ko-KR
&certification_country=KR
&certification.lte=15
&sort_by=popularity.desc
&page=1`,
  movieJapan: `discover/movie?api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTJkZDljZGMxZDZkOTdmMzdmOTM2M2I1YjQ2Y2Q5ZSIsIm5iZiI6MTc2MjczNzIzNS4wNDYwMDAyLCJzdWIiOiI2OTExM2M1M2EwN2VkOTNmMDdkZDIxYmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.p2iccSA5DomqKuUUIDJeSLiWkyPRMANa6G3avvEk8HE&include_adult=false&with_original_language=ja&language=ko-KR&page=1`,
  movieAdult: `discover/movie?api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTJkZDljZGMxZDZkOTdmMzdmOTM2M2I1YjQ2Y2Q5ZSIsIm5iZiI6MTc2MjczNzIzNS4wNDYwMDAyLCJzdWIiOiI2OTExM2M1M2EwN2VkOTNmMDdkZDIxYmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.p2iccSA5DomqKuUUIDJeSLiWkyPRMANa6G3avvEk8HE&include_adult=true&language=ko-KR&page=3`,
  movieAnime: `discover/movie?api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTJkZDljZGMxZDZkOTdmMzdmOTM2M2I1YjQ2Y2Q5ZSIsIm5iZiI6MTc2MjczNzIzNS4wNDYwMDAyLCJzdWIiOiI2OTExM2M1M2EwN2VkOTNmMDdkZDIxYmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.p2iccSA5DomqKuUUIDJeSLiWkyPRMANa6G3avvEk8HE&with_genres=16&language=ko-KR&page=1`,

  // TV
  tvTopRated: `tv/top_rated?api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTJkZDljZGMxZDZkOTdmMzdmOTM2M2I1YjQ2Y2Q5ZSIsIm5iZiI6MTc2MjczNzIzNS4wNDYwMDAyLCJzdWIiOiI2OTExM2M1M2EwN2VkOTNmMDdkZDIxYmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.p2iccSA5DomqKuUUIDJeSLiWkyPRMANa6G3avvEk8HE&language=ko-KR&page=1`,
  tvOnTheAir: `tv/on_the_air?api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTJkZDljZGMxZDZkOTdmMzdmOTM2M2I1YjQ2Y2Q5ZSIsIm5iZiI6MTc2MjczNzIzNS4wNDYwMDAyLCJzdWIiOiI2OTExM2M1M2EwN2VkOTNmMDdkZDIxYmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.p2iccSA5DomqKuUUIDJeSLiWkyPRMANa6G3avvEk8HE&language=ko-KR&page=1`,
  tvUpcoming: `discover/tv?api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTJkZDljZGMxZDZkOTdmMzdmOTM2M2I1YjQ2Y2Q5ZSIsIm5iZiI6MTc2MjczNzIzNS4wNDYwMDAyLCJzdWIiOiI2OTExM2M1M2EwN2VkOTNmMDdkZDIxYmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.p2iccSA5DomqKuUUIDJeSLiWkyPRMANa6G3avvEk8HE&language=ko-KR&first_air_date.gte=2025-11-11&page=1`,
  tvAiringToday: `tv/airing_today?api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTJkZDljZGMxZDZkOTdmMzdmOTM2M2I1YjQ2Y2Q5ZSIsIm5iZiI6MTc2MjczNzIzNS4wNDYwMDAyLCJzdWIiOiI2OTExM2M1M2EwN2VkOTNmMDdkZDIxYmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.p2iccSA5DomqKuUUIDJeSLiWkyPRMANa6G3avvEk8HE&language=ko-KR&page=1`,
  tvKorea: `discover/tv?api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTJkZDljZGMxZDZkOTdmMzdmOTM2M2I1YjQ2Y2Q5ZSIsIm5iZiI6MTc2MjczNzIzNS4wNDYwMDAyLCJzdWIiOiI2OTExM2M1M2EwN2VkOTNmMDdkZDIxYmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.p2iccSA5DomqKuUUIDJeSLiWkyPRMANa6G3avvEk8HE&with_original_language=ko&language=ko-KR&page=3`,
  tvJapan: `discover/tv?api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTJkZDljZGMxZDZkOTdmMzdmOTM2M2I1YjQ2Y2Q5ZSIsIm5iZiI6MTc2MjczNzIzNS4wNDYwMDAyLCJzdWIiOiI2OTExM2M1M2EwN2VkOTNmMDdkZDIxYmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.p2iccSA5DomqKuUUIDJeSLiWkyPRMANa6G3avvEk8HE&with_original_language=ja&language=ko-KR&page=1`,
  tvAdult: `discover/tv?api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTJkZDljZGMxZDZkOTdmMzdmOTM2M2I1YjQ2Y2Q5ZSIsIm5iZiI6MTc2MjczNzIzNS4wNDYwMDAyLCJzdWIiOiI2OTExM2M1M2EwN2VkOTNmMDdkZDIxYmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.p2iccSA5DomqKuUUIDJeSLiWkyPRMANa6G3avvEk8HE&include_adult=true&language=ko-KR&page=3`,
  tvAnime: `discover/tv?api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTJkZDljZGMxZDZkOTdmMzdmOTM2M2I1YjQ2Y2Q5ZSIsIm5iZiI6MTc2MjczNzIzNS4wNDYwMDAyLCJzdWIiOiI2OTExM2M1M2EwN2VkOTNmMDdkZDIxYmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.p2iccSA5DomqKuUUIDJeSLiWkyPRMANa6G3avvEk8HE&with_genres=16&language=ko-KR&page=2`
};


// 단일 엔드포인트 fetch
export function fetchTarget(endpoint) {
  return fetch(`https://api.themoviedb.org/3/${endpoint}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${V4_TOKEN}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const results = data.results || [];

        //backdrop_path 또는 poster_path 중 하나라도 없으면 제외
        return results.filter(
          (item) => item.backdrop_path && item.poster_path &&  item.id !== 1231813 && item.id !== 278635 && item.id !== 1374686 && item.id !== 257161 && item.id !== 105660 && item.id !== 1015552 && item.id !== 1355783 && item.id !== 293530 && item.id !== 784755 && item.id !== 1215106 && item.id !== 1523160
      );}
  )
    .catch((err) => {
      console.error(`TMDB fetch error [${endpoint}]:`, err);
      return [];
    });
}

// 모든 엔드포인트 fetch + 중복 제거
export function fetchAll() {
  const promises = Object.entries(endpoints).map(([key, endpoint]) =>
    fetchTarget(endpoint).then((results) =>
      results.map((item) => ({
        ...item,
        isAdult: key === "movieAdult" || key === "tvAdult", // 성인 플래그
      }))
    )
  );

  return Promise.all(promises).then((resultsArray) => {
    const allData = resultsArray.flat();
    console.log(allData)
    // 중복 제거
    const seenIds = new Set();
    return allData.filter((item) => {
      if (seenIds.has(item.id)) return false;
      seenIds.add(item.id);
      return true;
    });

  });
}
// 성인 컨텐츠 성인 인증 필요
// movieAdult  tvAdult 엔드포인트 가져올 시
// img