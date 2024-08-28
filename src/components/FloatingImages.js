import React, { useRef, useEffect } from 'react';

const FloatingImages = ({ src, onClick, onExitScreen }) => {
  const imgRef = useRef(null);
  
  useEffect(() => {
    const img = imgRef.current;

    let x = Math.random() < 0.5 ? -100 : 1920 + Math.random() * 100; // Commence à gauche ou à droite de l'écran 1920px
    let y = Math.random() * (1080 + 100); // Commence en dehors de la hauteur 1080px

    const speed = 0.5;
    const angle = Math.random() * 2 * Math.PI;
    let dx = Math.cos(angle) * speed;
    let dy = Math.sin(angle) * speed;
    const scale = 0.5 + Math.random();
    const rotation = Math.random() * 360;

    const updatePosition = () => {
      x += dx;
      y += dy;

      img.style.transform = `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotation}deg)`;

      if (y > 11000 || x > 20000) {
        onExitScreen && onExitScreen();
        return;
      }
      requestAnimationFrame(updatePosition);
    };

    updatePosition();
    const timer = setTimeout(() => {
      onExitScreen && onExitScreen();
    }, 15000);

    return () => clearTimeout(timer);
  }, [onExitScreen]);

  return (
    <img ref={imgRef} src={src} alt="Floating" onClick={onClick} className="floating" />
  );
};

export default FloatingImages;