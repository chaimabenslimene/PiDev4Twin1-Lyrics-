import React, { useState, useEffect } from 'react';
import About from './About';

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
      <section id="home">
        <div className="container">
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
                <div className="col-ms-8 mt-5">
                  <h1 className="display-4 fw-bolder mb-4 text-center">{trends.length} Trends</h1>
                  <ul className="list-group">
                    {trends.map(trend => (
                      <li className="list-group-item" key={trend._id}>
                        {trend.title}: {trend.content}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      <About />
    </div>
  );
}

export default Home;
