import CustomMap from "../Entity/Map/CustomMap";
import SearchBar from "../Entity/SearchBar/SearchBar";

export const MainPage = () => {
    return (
        <>
            <div className="bg-gray-600 p-4 mb-12">
                <h2>Every path</h2>
            </div>
            <div className="flex flex-col gap-4">
                <SearchBar />
                <SearchBar />
                <CustomMap />
            </div>
        </>
    );
}

export default MainPage;