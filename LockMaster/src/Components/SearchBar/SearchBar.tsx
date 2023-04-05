import React, { useEffect, useState } from "react";
import "./SearchBar.css";

interface SearchBarProps<T> {
  data: T[];
  onFilter: (filteredData: T[]) => void;
  searchTerm: string;
  onSearchTermChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filterBy: string[];
  onFilterByChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SearchBar = <T extends Record<string, unknown>>({
  data,
  onFilter,
  searchTerm,
  onSearchTermChange,
  filterBy,
  onFilterByChange,
}: SearchBarProps<T>) => {
  const [selectedFilter, setSelectedFilter] = useState<string>(filterBy[0]);

  useEffect(() => {
    const filteredData = data.filter((item: any) =>
      filterBy.some((field) =>
        item[field].toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    onFilter(filteredData);
  }, [data, filterBy, searchTerm, onFilter]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value);
    onFilterByChange(event);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={onSearchTermChange}
        className="text-bar"
        autoFocus
      />
      filter by: {""}
      <select
        className="select-bar"
        value={selectedFilter}
        onChange={handleFilterChange}
      >
        {filterBy.map((field) => (
          <option className="options" key={field} value={field}>
            {field}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchBar;
