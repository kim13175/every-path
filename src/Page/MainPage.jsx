import { useEffect, useRef, useState } from "react";
import CustomMap from "../Entity/Map/CustomMap";
import SearchBar from "../Entity/SearchBar/SearchBar";
import Location from "../Services/Location.js";

export const MainPage = () => {
    const [fromRegion, setFromRegion] = useState("");
    const [toRegion, setToRegion] = useState("");
    const [fromInfo, setFromInfo] = useState(null);
    const [toInfo, setToInfo] = useState(null);
    const [loading, setLoading] = useState(false);

    const locationService = useRef(new Location()).current;

    useEffect(() => {
        const fetchCoordinates = async () => {
            setLoading(true)
            try {
                if (fromRegion) {
                    const fromResult = await locationService.getCoordinate(fromRegion);
                    setFromInfo(fromResult);
                }
                if (toRegion) {
                    const toResult = await locationService.getCoordinate(toRegion);
                    setToInfo(toResult);
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

    return (
        <>
            <div className="bg-gray-600 p-4 mb-12">
                <h2>Every path</h2>
            </div>
            <div className="w-full flex flex-col gap-4 px-8">
                <p className="text-gray-600">📢 출발지와 도착지를 입력하시면 거리와 소요시간의 지도의 오른쪽 위에 표시됩니다</p>
                <div className="flex flex-row gap-4">
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
            </div>

            {loading && <p>좌표를 가져오는 중...</p>}
            <CustomMap
                from={fromInfo} 
                to={toInfo}
            />
        </>
    );
}

export default MainPage;