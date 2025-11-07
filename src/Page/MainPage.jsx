import { useState } from "react";
import CustomMap from "../Entity/Map/CustomMap";
import SearchBar from "../Entity/SearchBar/SearchBar";

export const MainPage = () => {
    const [fromRegion, setFromRegion] = useState("");
    const [toRegion, setToRegion] = useState("");

    return (
        <>
            <div className="bg-gray-600 p-4 mb-12">
                <h2>Every path</h2>
            </div>
            <div className="flex flex-col mb-4">
                <SearchBar 
                    placeholder={"출발지를 입력하세요."}
                    place={fromRegion}
                    onSearch={setFromRegion} 
                />
                <SearchBar 
                    placeholder={"도착지를 입력하세요."} 
                    place={toRegion}
                    onSearch={setToRegion}
                />
            </div>
            <CustomMap />
        </>
    );
}

export default MainPage;