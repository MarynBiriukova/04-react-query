import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useState } from 'react'
import styles from './App.module.css'

import { fetchMovies } from '../../services/movieService.ts';
import type { Movie } from '../../types/movie.ts';
import { Toaster, toast } from 'react-hot-toast';

import SearchBar from '../SearchBar/SearchBar.tsx';
import MovieGrid from '../MovieGrid/MovieGrid.tsx';
import Loader from '../Loader/Loader.tsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import ReactPaginateModule from 'react-paginate';

import type { ReactPaginateProps } from "react-paginate";
import type { ComponentType } from "react";
type ModuleWithDefault<T> = { default: T };

const toastConfig = {
  style: {
    borderRadius: '10px',
    background: '#fff',
    color: '#000',
  },
};
/****************************************************** */
interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (nextPage: number) => void;
}
/****************************************************** */
const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<ComponentType<ReactPaginateProps>>
).default;


function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      forcePage={currentPage - 1}
      containerClassName={styles.pagination}
      activeClassName={styles.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}
/****************************************************** */

function App() {
  
  const [query, setQuery] = useState<string>('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);// для модалки
  const [currentPage, setCurrentPage] = useState<number>(1);

  
  const { data, isLoading, isError, isSuccess} = useQuery({
  queryKey: ['movies', query, currentPage],
    queryFn: async () => {
      const res = await fetchMovies(query, currentPage);
      if (!res?.results?.length) {
      toast.error('No movies found for your request.', { ...toastConfig });
    }
    
    return res; 
  },
 
    enabled: !!query.trim(),
    placeholderData: keepPreviousData, 
  });
  
  const movies = data?.results || [];
  const totalPages = data?.total_pages ? Math.min(data.total_pages, 500) : 0;


  const handleSubmit = (searchQuery: string) => {
    
    setQuery(searchQuery); 
    setCurrentPage(1);
  };

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie); 
  };
   
/*************************************************** */
  return (
    <div className='app'>
      <Toaster position="top-center" reverseOrder={false} />
      <SearchBar onSubmit={handleSubmit} />
      
      {isSuccess && totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {!isLoading && !isError && movies.length > 0 && <MovieGrid onSelect={handleSelect} movies={movies} />}
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
