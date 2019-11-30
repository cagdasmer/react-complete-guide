import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    console.log('Search re-rendered');
    props.onFilterChange(filter);
  }, [filter, onFilterChange]);
  /* When the parent component re-renders, the function passed as a prop also changes
    Therefore useEffect is triggered and the filter is applied with re-render*/

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
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
