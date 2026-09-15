import css from './MovieModal.module.css';
import type { Movie } from '../../types/movie.ts';
import { useEffect } from 'react';
import { createPortal } from "react-dom";

interface MovieModalProps {
    movie: Movie | null;
    onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
    

    useEffect(() => {

        document.body.style.overflow = 'hidden';

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    if (!movie) return null;

    return createPortal(
        <div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick}>
            <div className={css.modal} onClick={(e) => e.stopPropagation()}>
                <button className={css.closeButton} onClick={onClose} aria-label="Close modal">
                    &times;
                </button>
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                    alt={movie.title}
                    className={css.image}
                />
                <div className={css.content}>
                    <h2>{movie.title}</h2>
                    <p>{movie.overview}</p>
                    <p>
                        <strong>Release Date:</strong> {movie.release_date}
                    </p>
                    <p>
                        <strong>Rating:</strong> {movie.vote_average}
                    </p>
                </div>
            </div>
        </div>,
        document.body

    );
};

export default MovieModal;