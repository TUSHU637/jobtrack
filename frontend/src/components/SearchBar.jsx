import '../styles/ComponentStyle/searchbar.css'
const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-bar">
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by role or company..."
        aria-label="Search applications by role or company"
      />
    </div>
  )
}

export default SearchBar