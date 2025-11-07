import { useState } from "react";

const SearchBar = ({place, onSearch, placeholder}) => {
    const [searchPlace, setSearchPlace] = useState(place);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchPlace(value);
        onSearch(value);
    }

    return (
        <div className="mx-36 border">
            <input
                className="flex w-full black outline-0 p-4" 
                placeholder={placeholder}
                value={searchPlace}
                onChange={handleSearch} 
            />
        </div>
    )
}

export default SearchBar;