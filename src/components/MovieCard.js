import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import nophoto from '../img/nophoto.png';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const imageUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : nophoto;
  
  const description = movie.overview ? (movie.overview.length > 130 ? movie.overview.substring(0, 127) + '...' : movie.overview) : "Pas de description pour ce film.";

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="my-3" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <Card>
        <Card.Img
          className="object-fit-cover w-100"
          style={{ height: '700px', width: '400px', objectFit: 'cover' }}
          variant="top"
          src={imageUrl}
          onError={(e) => e.target.src = nophoto}
        />
        <Card.Body className="text-start">
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MovieCard;