import React, { useState, useEffect } from 'react';
import FloatingImages from './FloatingImages';
import popcornImg from '../img/popcorn.png';

const MultipleFloatingImages = () => {
  const [popcorns, setPopcorns] = useState([]);

  useEffect(() => {
    const initialPopcorns = Array.from({ length: 5 }, () => ({
      id: Math.random(),
    }));
    setPopcorns(initialPopcorns);
  }, []);

  const replacePopcorn = (id) => {
    setPopcorns(current => current.map(popcorn =>
      popcorn.id === id ? { id: Math.random() } : popcorn
    ));
  };

  return (
    <div>
      {popcorns.map(popcorn => (
        <FloatingImages
          key={popcorn.id}
          src={popcornImg}
          onExitScreen={() => replacePopcorn(popcorn.id)}
        />
      ))}
    </div>
  );
};

export default MultipleFloatingImages;