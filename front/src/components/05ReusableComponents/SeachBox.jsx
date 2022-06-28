import React from 'react';

const SearchBox = ({ value, onSearch, placeholder }) => {
  return (
    <input
      id="searchBox"
      type="text"
      className="form-control my-3"
      placeholder={placeholder}
      value={value}
      onChange={onSearch}
    />
  );
}

export default SearchBox;
