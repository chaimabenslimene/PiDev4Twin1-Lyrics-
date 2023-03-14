import React  from "react";
import About from "./About";

const Home = () =>{
    return (
        <div>
            <section id="home">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-ms-8 mt-5"> 
                       <h1 className="display-4 fw-bolder mb-4 text-center">Feels the Fresh Business Prespective </h1>
                       <p className="lead text-center fs-4 mb-5"> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi odit dolorum,
                        necessitatibus dignissimos reprehenderit dicta id rem. Exercitationem soluta ipsam necessitatibus aliquid totam recusandae a
                         alias optio eum quas, corrupti ducimus cupiditate aut adipisci eos tempora 
                       quam similique nemo quo, vel dicta blanditiis. Esse magnam laudantium officiis et sed quis?</p>
                        </div>

                        <div className="buttons d-flex justify-content-center">
                                <a to="/contact" className="btn btn-light me-4 rounded-pill px-4 py-2">taktak</a>
                                <a to="/service" className="btn btn-outline-light rounded-pill px-4 py-2">Our Services</a>
                            </div>
                    </div>

                </div>
            </section>
            <About/>
        </div>
    )
}

export default Home;