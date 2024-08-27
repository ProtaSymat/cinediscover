const API_SEARCHURL = "https://api.themoviedb.org/3/search/movie";
const API_DETAILURL = "https://api.themoviedb.org/3/";
const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchGenres = async () => {
  try {
    const response = await fetch(`${API_DETAILURL}genre/movie/list?api_key=${API_KEY}&language=en-US`);
    if (!response.ok) {
      throw new Error('Réponse réseau non ok.');
    }
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error("Erreur lors de la récupération des genres :", error);
    throw error;
  }
};

export const searchMovies = async (query, genre, page = 1) => {
  const url = new URL(API_SEARCHURL);
  url.searchParams.append("api_key", API_KEY);
  url.searchParams.append("query", query);
  url.searchParams.append("language", "en-US");
  url.searchParams.append("page", page);
console.log(url);
  if (genre) {
    url.searchParams.append("with_genres", genre); 
  }

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error('Réponse réseau non ok.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la recherche des films :", error);
    throw error;
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const url = `${API_DETAILURL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des détails du film :", error);
    throw error;
  }
};

export const fetchMovieReviews = async (movieId) => {
  try {
    const response = await fetch(`${API_DETAILURL}movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Erreur lors de la récupération des avis sur le film :", error);
    throw error;
  }
};