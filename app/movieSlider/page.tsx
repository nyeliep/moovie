import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';
import { getUpcomingMovies } from '../utilities/utils';

interface Movie {
  id: number;
  title: string;
  overview: string;
  rating: number;
  poster_path: string;

}

const MovieSlider = () => {
  const [comingMovies, setUpcomingMovies] = useState<Movie[]>([]); // Change the initial state type
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await getUpcomingMovies();
        console.log({ movies });
        setUpcomingMovies(movies.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // prevArrow: <CustomPrevArrow />,
    // nextArrow: <CustomNextArrow />,
  };

  const limit = 20;
  const slicedMovies = comingMovies ? comingMovies.slice(15, limit) : [];

  if (loading) {
    return <h1>Loading movies...</h1>;
  }

  return (
    <div className="slider-container">
      <Slider {...settings} className="container">
        {slicedMovies.length > 0 ? (
          slicedMovies.map((movie) => (
            <Link href={`/movie/${movie.id}`} key={movie.id}>
              <a className="image-link">
                <div
                  key={movie.id}
                  className="image-container bg-cover bg-center relative"
                  style={{
                    backgroundImage: `url(${process.env.REACT_APP_IMAGE_BASE_URL}${movie.poster_path})`,
                  }}
                >
                  <div className="movie-info-overlay absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-70">
                    <h3 className="text-white text-xl font-semibold">{movie.title}</h3>
                    <p className="text-white">{movie.overview}</p>
                    <span className="text-orange">{movie.rating}</span>
                    <div className="buttons-container mt-2">
                      <button className="watch-now-button bg-orange text-white px-2 py-1 rounded cursor-pointer mr-2">
                        Watch Now
                      </button>
                      <button className="add-to-favorites-button bg-blue-500 text-white px-2 py-1 rounded cursor-pointer">
                        Add to Favorites
                      </button>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          ))
        ) : (
          <h1>No movies found</h1>
        )}
      </Slider>
    </div>
  );
};

    const CustomPrevArrow = (props: { onClick: () => void }) => {
        const { onClick } = props;
        return <button className="custom-arrow prev-arrow" onClick={onClick}>&#10094;</button>;
      };

      const CustomNextArrow = (props: { onClick: () => void }) => {
        const { onClick } = props;
        return <button className="custom-arrow next-arrow" onClick={onClick}>&#10095;</button>;
      };

export default MovieSlider;
