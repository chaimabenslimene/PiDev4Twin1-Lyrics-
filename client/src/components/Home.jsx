import React, { useState, useEffect } from 'react';
import About from './About';
import Styles from './styles.module.css';

function Home() {
  const [trends, setTrends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  

  useEffect(() => {
    fetch('/trends')
      .then(response => response.json())
      .then(data => {
        setTrends(data);
        setIsLoading(false);
      })
      .catch(error => {
        setError('Une erreur est survenue lors de la récupération des trends');
        setIsLoading(false);
      });
  }, []);

  

 

  return (
    <div>
     
        <div>
          <div className="row justify-content-center">
            {error && (
              <div className="col-ms-8 mt-5">
                <h1>{error}</h1>
              </div>
            )}

            {isLoading && (
              <div className="col-ms-8 mt-5">
                <h1>Chargement en cours...</h1>
              </div>
            )}

            {!isLoading && !error && (
              <>
                <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/image/profile9.png)`, width: "1500px", height: "400px", backgroundSize: "cover", backgroundPosition: "center" }}>
                  {(() => {
                    const items = [];
                    for (let i = 0; i < trends.length; i++) {
                      const trend = trends[i];
                      items.push(
                        <ul key={trend.id}>
                          <div>
                          <h3 class="title">{trend.title}</h3>
                          <p className="content">{trend.content}</p>
                          </div>
                        </ul>
                      );
                    }
                    return items;
                  })()}
                </div>
              </>
            )}
          </div>
        </div>
      
      
      <About />
    </div>
  );
}

export default Home;