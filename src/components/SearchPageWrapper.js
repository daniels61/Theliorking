import React from 'react';
import { useLocation } from 'react-router-dom';
import SearchPage from './SearchPage';

function SearchPageWrapper() {
  const location = useLocation();
  const { searchTerm } = location.state;

  return (
    <SearchPage searchTerm={ searchTerm } />
  );
}

export default SearchPageWrapper;
