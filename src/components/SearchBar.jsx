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

export default SearchBar;
