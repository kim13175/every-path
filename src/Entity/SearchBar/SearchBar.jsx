import { useState, useEffect, useRef } from "react";
import Location from "../../Services/Location.js";

const SearchBar = ({ placeholder, place, onSearch }) => {
    const locationService = useRef(new Location()).current;

    const [searchPlace, setSearchPlace] = useState(place || "");
    const [searchAddress, setSearchAddress] = useState("")
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [loading, setLoading] = useState(false);
    const [completeSearch, setCompleteSearch] = useState(false)
    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (searchPlace.length < 2) {
            setShowSuggestions(false);
            setSuggestions([]);
            return;
        }
        /* 검색어 디바운싱 */
        const delayTimer = setTimeout(async () => {
            setLoading(true);
            try {
                const results = await locationService.searchPlaces(searchPlace);
                setSuggestions(results.slice(0, 5)); 
                setShowSuggestions(results.length > 0);
            } catch (error) {
                console.error('검색 실패:', error);
                setSuggestions([]);
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => clearTimeout(delayTimer);
    }, [searchPlace]);

    const handleInputChange = (e) => {
        setSearchPlace(e.target.value); 
        setCompleteSearch(false); 
        setSelectedIndex(-1);
    };

    const handleSelectSuggestion = (suggestion) => {
        setSearchPlace(suggestion.place_name);
        setSearchAddress(suggestion.address_name);
        setShowSuggestions(false);
        setSuggestions([]);
    };

    const handleSearchSubmit = () => {
        if (!searchAddress) {
            alert("장소를 선택해주세요!");
            return;
        }
        onSearch(searchAddress);
        setShowSuggestions(false);
        setCompleteSearch(true);
    };

    return (
        <div className="relative w-full" ref={wrapperRef}>
            <div className="w-full outline-0 border rounded-lg focus:border-blue-400">
                <input
                    className="w-105 p-4 outline-0" 
                    placeholder={placeholder}
                    value={searchPlace}
                    onChange={handleInputChange}
                />
                <div className="absolute top-2 right-2 flex justify-end">
                    <button 
                        className="flex justify-center w-18 p-2 bg-blue-400 text-white font-bold rounded-lg hover:bg-blue-600 hover-effect"
                        onClick={handleSearchSubmit}
                        disabled={completeSearch}
                    >
                        {completeSearch ? "완료" : "설정"}
                    </button>
                </div>
            </div>

            {loading && (
                <div className="absolute z-3000 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 p-3 text-center text-gray-500">
                    검색 중...
                </div>
            )}

            {showSuggestions && !loading && suggestions.length > 0 && (
                <ul className="absolute z-3000 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={suggestion.id}
                            className={`p-3 cursor-pointer hover:bg-blue-50 border-b last:border-b-0 transition-colors ${
                                index === selectedIndex ? 'bg-blue-100' : ''
                            }`}
                            onClick={() => handleSelectSuggestion(suggestion)}
                        >
                            <div className="font-semibold text-sm">
                                {suggestion.place_name}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                                {suggestion.address_name}
                            </div>
                            {suggestion.category_name && (
                                <div className="text-xs text-gray-400 mt-0.5">
                                    {suggestion.category_name}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            {showSuggestions && !loading && suggestions.length === 0 && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 p-3 text-center text-gray-500">
                    검색 결과가 없습니다
                </div>
            )}
        </div>
    );
};

export default SearchBar;