import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { searchMovies, fetchGenres } from '../api/movies';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import logo from '../img/logo.png';

const HomePage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genres, setGenres] = useState([]);

  const { pageNumber } = useParams();
  const navigate = useNavigate();

  const handleSearch = async (page = currentPage) => {
    setError('');
    if (!query) return;
    setLoading(true);

    try {
      const data = await searchMovies(query, selectedGenre, page);
      setMovies(data.results);
      setTotalItems(data.total_results);
      setSearchInitiated(true);

      if (data.results.length === 0) {
        setError('Aucun film n’a été trouvé.');
      }
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
      setError('Problème de connexion à l’API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const num = Number(pageNumber) || 1;
    setCurrentPage(num);
    handleSearch(num);
  }, [pageNumber, query, selectedGenre]);

  const paginate = (pageNumber) => {
    navigate(`/page/${pageNumber}`);
  };

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const fetchedGenres = await fetchGenres();
        setGenres(fetchedGenres);
      } catch (error) {
        console.error("Erreur lors du chargement des genres :", error);
      }
    };

    loadGenres();
  }, []);

  // Grouper les films par 3
  const groupedMovies = [];
  for (let i = 0; i < movies.length; i += 3) {
    groupedMovies.push(movies.slice(i, i + 3));
  }

  return (
    <div className={`${!searchInitiated ? 'vh-100 container' : ''}`}>
      <div className="d-flex flex-column justify-content-center pt-5 align-items-center">
        <img src={logo} alt="Logo" style={{ maxWidth: '180px', maxHeight: '180px' }} />
        <SearchBar query={query} genres={genres} setSelectedGenre={setSelectedGenre} setQuery={setQuery} handleSearch={(e) => { e.preventDefault(); handleSearch(1); }} searchInitiated={searchInitiated} />
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
          <Pagination itemsPerPage={20} totalItems={totalItems} paginate={paginate} currentPage={currentPage} />
        )}
      </div>
    </div>
  );
};

export default HomePage;