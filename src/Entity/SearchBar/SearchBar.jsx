import { useState } from "react";

const SearchBar = ({place, onSearch}) => {
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
                placeholder="검색하고 싶은 지역을 입력하세요."
                value={searchPlace}
                onChange={handleSearch} 
            />
        </div>
    )
}

export default SearchBar;