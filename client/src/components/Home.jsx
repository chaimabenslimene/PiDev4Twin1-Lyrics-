import React, { useState, useEffect } from 'react';
import About from './About';
import Styles from './styles.module.css';
import bgImage from '../video/imen.mp4';
import "../App.css";
import { useMediaQuery } from 'react-responsive';


function Home() {
  const [trends, setTrends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const isDesktop = useMediaQuery({ minWidth: 1024 });






  return (

    <center>
      <About />
    </center>

  );
}

export default Home;