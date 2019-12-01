import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Card from '../UI/Card';
import './Search.css';

interface SearchProps {
  onFilterChange(filter: string): void;
}

// Re-renders when only props change
const Search: React.FC<SearchProps> = React.memo(props => {
  const { onFilterChange } = props;
  const [filter, setFilter] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Filter the results only after the user has stopped typing
      if (filter === (inputRef.current && inputRef.current.value)) {
        props.onFilterChange(filter);
      }
      console.log('SETTIMEOUT');
    }, 500);
    /* When you return something from a useEffect(), it has to be a function.
        Cleanup function. Runs right before the next call of this useEffect.
        Subscriptions should be canceled if new ones are being set.  */
    // There will be always only one timer
    return (): void => {
      clearInterval(timer);
      console.log('CLEANUP');
    };
  }, [filter, onFilterChange]);
  /* When the parent component re-renders, the function passed as a prop also changes
    Therefore useEffect is triggered and the filter is applied with the re-render*/

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
            ref={inputRef}
            onChange={(e): void => {
              setFilter(e.target.value);
            }}
          />
        </div>
      </Card>
    </section>
  );
});

Search.propTypes = {
  onFilterChange: PropTypes.func.isRequired
};

export default Search;
