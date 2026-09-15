import styles from './SearchBar.module.css';
import { toast } from 'react-hot-toast';

const toastConfig = {
  style: {
    borderRadius: '10px',
    background: '#fff',
    color: '#000',
  },
};

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar = ({ onSubmit }: SearchBarProps) => { 
   const handleFormAction = (formData: FormData) => {
    const searchQuery = formData.get("query") as string;

    if (!searchQuery || !searchQuery.trim()) {
      toast.error('Please enter your search query.', { ...toastConfig });
      return; 
    }
    onSubmit(searchQuery.trim());
  };
 
    return (
        <header className={styles.header}>
 <div className={styles.container}>
 <a
   className={styles.link}
   href="https://www.themoviedb.org/"
   target="_blank"
   rel="noopener noreferrer"
  >
   Powered by TMDB
  </a>
  <form className={styles.form} action={handleFormAction}>
   <input
    className={styles.input}
    type="text"
   name="query"
   autoComplete="off"
    placeholder="Search movies..."
   autoFocus
   />
   <button className={styles.button} type="submit">
    Search
   </button>
  </form>
 </div>
</header>


    );
}

export default SearchBar