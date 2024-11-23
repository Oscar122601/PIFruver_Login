import React, { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    window.location.href = 'http://localhost:5175/'; // Redirige al enlace deseado
  }, []);

  return null; // No muestra nada porque redirige automáticamente
};

export default Home;
