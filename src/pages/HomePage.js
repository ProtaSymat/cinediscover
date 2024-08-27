import React, { useState } from 'react';
import { searchMovies } from '../api/movies';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import logo from '../img/logo.png';

const HomePage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [loading, setLoading] = useState(false); // Ajout d'un état pour le chargement
  const [error, setError] = useState(''); // Ajout d'un état pour gérer les erreurs
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;

  const handleSearch = async (event) => {
    event.preventDefault();
    setError(''); // Réinitialiser l'erreur à chaque nouvelle recherche
    if (!query) return;
    setLoading(true); // Indiquer que la recherche est en cours
    try {
      const results = await searchMovies(query);
      setMovies(results);
      setSearchInitiated(true);
      if (results.length === 0) { // Gérer le cas où aucun film n'est trouvé
        setError('Aucun film n’a été trouvé.');
      }
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
      setError('Problème de connexion à l’API.'); // Définir un message d'erreur
    } finally {
      setLoading(false); // Indiquer que la recherche est terminée
    }
  };

  const indexOfLastMovie = currentPage * resultsPerPage;
  const indexOfFirstMovie = indexOfLastMovie - resultsPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Groupe les films par trois
  const groupedMovies = [];
  for (let i = 0; i < currentMovies.length; i += 3) {
    groupedMovies.push(currentMovies.slice(i, i + 3));
  }

  return (
    <div className={`${!searchInitiated ? 'vh-100 container' : ''}`}>
      <div className="d-flex flex-column justify-content-center pt-5 align-items-center">
        <img src={logo} alt="Logo" style={{ maxWidth: '180px', maxHeight: '180px' }} />
        <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} searchInitiated={searchInitiated} />
        {loading && <p className="text-white">Chargement...</p>}
        {error && <p className="text-white">{error}</p>}
      </div>
      <div className={`text-center d-flex flex-column justify-content-center align-items-center pt-5`}>
        {!loading && !error && groupedMovies.map((group, index) => (
          <div className="row d-flex flex-wrap justify-content-center w-100 container" key={index}>
            {group.map(movie => (
              <div className="col-md-4 mb-4" key={movie.id}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        ))}
        {!loading && movies.length > 0 && (
          <Pagination itemsPerPage={resultsPerPage} totalItems={movies.length} paginate={paginate} currentPage={currentPage} />
        )}
      </div>
    </div>
  );
};

export default HomePage;