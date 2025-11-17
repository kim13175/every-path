import { useEffect, useRef, useState } from "react";
import CustomMap from "../Entity/Map/CustomMap";
import SearchBar from "../Entity/SearchBar/SearchBar";
import Location from "../Services/Location.js"; 

export const MainPage = () => {
    const [fromRegion, setFromRegion] = useState("");
    const [toRegion, setToRegion] = useState("");
    const [fromCoords, setFromCoords] = useState(null);
    const [toCoords, setToCoords] = useState(null);
    const [loading, setLoading] = useState(false);

    const locationService = useRef(new Location()).current;

    useEffect(() => {
        const fetchCoordinates = async () => {
            try {
                if (fromRegion) {
                    const fromResult = await locationService.getCoordinate(fromRegion);
                    setFromCoords(fromResult);
                }
                if (toRegion) {
                    const toResult = await locationService.getCoordinate(toRegion);
                    setToCoords(toResult);
                }
            } catch (err) {
                console.error("좌표 변환 실패:", err);
            } finally {
                setLoading(false);
            }
        };
        
        if (fromRegion || toRegion) {
            fetchCoordinates();
        }
    }, [fromRegion, toRegion]);

    useEffect(() => {
        console.log(fromCoords)
        console.log(toCoords)
    }, [fromCoords, toCoords])

    return (
        <>
            <div className="bg-gray-600 p-4 mb-12">
                <h2>Every path</h2>
            </div>
            <div className="w-full flex flex-row gap-4 px-8">
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

            {loading && <p>좌표를 가져오는 중...</p>}
            <CustomMap 
                from={fromCoords} 
                to={toCoords}
            />
        </>
    );
}

export default MainPage;