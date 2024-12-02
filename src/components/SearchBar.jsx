//SearchBar.jsx
import PropTypes from "prop-types";
import "./SearchBar.scss";

const SearchBar = ({ placeholder, onSearch }) => {
  return (
    <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
      <img
        src="/assets/icons/search-24px.svg"
        alt="Search"
        className="search-bar__icon"
      />
      <input
        type="search"
        placeholder={placeholder || "Search"}
        aria-label="Search"
        className="search-bar__input"
        onChange={(e) => onSearch(e.target.value)} // Call onSearch when input changes
      />
    </form>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  onSearch: PropTypes.func.isRequired, // Ensure onSearch is passed and is a function
};

export default SearchBar;
