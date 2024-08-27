const API_URL = "https://api.themoviedb.org/3/search/movie";
const API_DETAILURL = "https://api.themoviedb.org/3/";
const API_KEY = process.env.REACT_APP_API_KEY;

export const searchMovies = async (query) => {
  try {
    const response = await fetch(`${API_URL}?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Erreur réseau');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Erreur lors de la recherche de films :", error);
    throw error;
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const url = `${API_DETAILURL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    console.log("URL de requête fetchMovieDetails:", url); // Vérifier l'URL construite
    const response = await fetch(url);
    console.log("Réponse fetchMovieDetails:", response); // Examiner l'objet de réponse
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log("Données fetchMovieDetails:", data); // Examiner les données reçues
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