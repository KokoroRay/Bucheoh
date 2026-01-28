import { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import styles from './SearchBox.module.css';

interface SearchBoxProps {
    placeholder?: string;
    onSearch?: (query: string) => void;
}

export const SearchBox = ({ 
    placeholder = "Tìm kiếm sản phẩm, bài viết...", 
    onSearch 
}: SearchBoxProps) => {
    const [query, setQuery] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim() && onSearch) {
            onSearch(query.trim());
        }
    };

    const handleClear = () => {
        setQuery('');
        setIsExpanded(false);
    };

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
        if (isExpanded) {
            setQuery('');
        }
    };

    return (
        <div className={`${styles.searchBox} ${isExpanded ? styles.expanded : ''}`}>
            <button 
                type="button"
                className={styles.searchToggle}
                onClick={handleToggle}
                aria-label="Toggle search"
            >
                <FaSearch />
            </button>

            {isExpanded && (
                <form onSubmit={handleSubmit} className={styles.searchForm}>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={placeholder}
                        className={styles.searchInput}
                        autoFocus
                    />
                    {query && (
                        <button 
                            type="button"
                            onClick={handleClear}
                            className={styles.clearButton}
                            aria-label="Clear search"
                        >
                            <FaTimes />
                        </button>
                    )}
                    <button type="submit" className={styles.submitButton}>
                        <FaSearch />
                    </button>
                </form>
            )}
        </div>
    );
};