import { useQuery } from '@tanstack/react-query';
import { useState } from 'react'
import './App.module.css'

import { fetchMovies } from '../../services/movieService.ts';
import type { Movie } from '../../types/movie.ts';
import { Toaster, toast } from 'react-hot-toast';

import SearchBar from '../SearchBar/SearchBar.tsx';
import MovieGrid from '../MovieGrid/MovieGrid.tsx';
import Loader from '../Loader/Loader.tsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

//const myKey = import.meta.env.VITE_TMDB_TOKEN;

const toastConfig = {
  style: {
    borderRadius: '10px',
    background: '#fff',
    color: '#000',
  },
};


function App() {
  //const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState<string>('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);// для модалки
 // const [isLoading, setisLoading] = useState<boolean>(false);
  //const [isEr, setisEr] = useState<boolean>(false);

  


  const { data: movies = [], error, isLoading, isError } = useQuery({
  queryKey: ['movies', query],
  queryFn: () => fetchMovies(query).then((data) => {
    if (!data.length) {
      toast.error('No movies found for your request.', { ...toastConfig });
    }
    
    return data; // 🌟 ОБЯЗАТЕЛЬНО ДОБАВЬТЕ ЭТУ СТРОКУ!
  }),
  enabled: !!query.trim(),
});


  /*
  useEffect(() => {

    if (!query.trim()) return;

    
    // Викликаємо функцію із сервісу
    fetchMovies(query)
      .then((data) => {
        console.log("Успішно отримано типізовані дані:", data);
        setisLoading(false);
        if (!data.length)
          toast.error('No movies found for your request.', { ...toastConfig });
        setMovies(data);
      })
      .catch((err) => {
        setisLoading(false);
        setisEr(true);
        console.error("Помилка при отриманні фільмів:", err);
      });
  }, [query]);
  
  */

  const handleSubmit = (searchQuery: string) => {

    //setisEr(false); 
    //setMovies([]);
    //setisLoading(true);
    
    setQuery(searchQuery); 
  };

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie); 
  
  };
   
/*************************************************** */
  return (
    <div className='app'>
      <Toaster position="top-center" reverseOrder={false} />
      <SearchBar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {!isLoading && !isError && <MovieGrid onSelect={handleSelect} movies={movies} />}
      {selectedMovie && (
      <MovieModal 
        movie={selectedMovie} 
        onClose={() => setSelectedMovie(null)} 
      />
    )}
    </div>
  )
}

export default App
