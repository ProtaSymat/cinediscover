import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails, fetchMovieReviews } from '../api/movies';
import { Link } from 'react-router-dom';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const details = await fetchMovieDetails(id);
        const reviews = await fetchMovieReviews(id);
        setMovieDetails(details);
        setReviews(reviews);
      } catch (error) {
        console.error("Erreur lors du chargement des données du film :", error);
      }
    };

    loadData();
  }, [id]);

  if (!movieDetails) return <div>Loading movie details...</div>;

  return (
    <div className="container py-5 bg-dark">
      <div className="mb-3">
      <Link to="/" className="btn btn-light">Revenir à l'accueil</Link>
    </div>
      <div className="row pb-5">
        <div className="col-md-8 text-white pb-5">
          <h1>{movieDetails.title}</h1>
          <p>{movieDetails.overview}</p>
          <h3>Avis</h3>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index}>
                <h5>{review.author}</h5>
                <p>{review.content}</p>
              </div>
            ))
          ) : (
            <p>Pas d'avis disponible :(</p>
          )}
        </div>
        <div className="col-md-4 pb-5">
          <img src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt={movieDetails.title} className="img-fluid" />
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;