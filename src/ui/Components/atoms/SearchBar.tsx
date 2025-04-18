import React, { useEffect, useState } from "react";
import "../../css/control-bar.css";

/**
 * Search bar component with debounced input
 * @param onSearch - Callback that fires with search query after debounce delay
 */
type SearchBarProps = {
    onSearch: (query: string) => void;
};

/**
 * Interactive search input that:
 * - Automatically triggers search after 300ms delay
 * - Cleans up pending searches when unmounted
 * - Trims whitespace from search queries
 */
export default function SearchBar({ onSearch }: SearchBarProps) {
    const [inputValue, setValue] = useState<string>('');

    // Debounce search input with 300ms delay
    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(inputValue.trim());
        }, 300);

        return () => clearTimeout(timer);
    }, [inputValue, onSearch]);

    return (
        <div className="search-container">
            <input
                id="search-bar"
                className="search-bar"
                type="text"
                value={inputValue}
                placeholder="Search tasks..."
                onChange={(e) => setValue(e.target.value)}
                aria-label="Search tasks"
            />
        </div>
    );
}