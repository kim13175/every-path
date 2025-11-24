import { CONSTANT, ERROR } from '#src/Constant';
import Route from '#src/Services/Route';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import Legend from './Legend';

const ChangeScale = ({center, zoom}) => {
    const map = useMap();

    useEffect(() => {
        if (center) { 
            map.setView(center, zoom);
        }
    }, [center, zoom, map]);

    return null;
}

const CustomMap = ({from, to}) => {
    const [routeInfo, setRouteInfo] = useState(null);
    const [zoom, setZoom] = useState(12);
    const [center, setCenter] = useState(CONSTANT.REPULIC_OF_KOREA_BUSAN);
    /* 지번 주소와 도로명 주소 중 도로명 주소 사용 */ 
    const fromRoad = from?.road_address;
    const toRoad = to?.road_address;
    const fromCoord = fromRoad?.x && fromRoad?.y ? [fromRoad.y, fromRoad.x] : null;
    const toCoord = toRoad?.x && toRoad?.y ? [toRoad.y, toRoad.x] : null;

    useEffect(() => {
        if (fromRoad?.x && fromRoad?.y && !toRoad?.x) {
            setCenter([fromRoad.y, fromRoad.x]);
        } else if (toRoad?.x && toRoad?.y) {
            setCenter([toRoad.y, toRoad.x]);
        }
    }, [fromRoad?.x, fromRoad?.y, toRoad?.x, toRoad?.y]);

    useEffect(() => {
        if (routeInfo?.distance && fromCoord && toCoord) {
            const midPoint = [
                (parseFloat(fromCoord[0]) + parseFloat(toCoord[0])) / 2,
                (parseFloat(fromCoord[1]) + parseFloat(toCoord[1])) / 2
            ];
            setCenter(midPoint);

            const zoomRate = routeInfo.distance / 100;
            if (zoomRate < 1) {
                setZoom(10 + Math.floor(zoomRate));
            } else {
                setZoom(10 - Math.floor(zoomRate));
            }
        }
    }, [routeInfo]);

    const handleSubmit = async () => {
        if (!fromCoord || !toCoord) {
            alert(ERROR.INCORRECT_ORIGIN_OR_DESTINATION);
            return;
        }
        try {
            const result = await Route.getDistance(fromCoord, toCoord);
            setRouteInfo(result);
        } catch (error) {
            throw new Error(ERROR.INCORRECT_ORIGIN_OR_DESTINATION);
        }
    }

    return (
        <div className="h-120 relative flex flex-col justify-center items-center mx-8 px-24">
            <button
                className="w-full m-4 p-4 bg-blue-400 font-bold text-white rounded-lg hover:bg-blue-600 hover-effect" 
                type="submit" 
                onClick={handleSubmit}>
                위치 찾기
            </button>
            <MapContainer 
                center={center} 
                zoom={zoom} 
                scrollWheelZoom={true}
                style={{ height: "500px", width: "100%" }}
            >
                <ChangeScale
                    center={center}
                    zoom={zoom}
                />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {from && (
                    <Marker position={fromCoord} >
                        <Popup>
                            {fromRoad.building_name ? 
                                fromRoad.address_name + " " + fromRoad.building_name : fromRoad.address_name}
                        </Popup>
                    </Marker>
                )}
                {to && (
                    <Marker position={toCoord} >
                        <Popup>
                            {toRoad.building_name ? 
                                toRoad.address_name + " " + toRoad.building_name : toRoad.address_name}
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
            {routeInfo && (
                <div className="absolute right-5 top-25 z-3000">
                    <Legend distance={routeInfo.distance} duration={routeInfo.duration} />
                </div>
            )}
        </div>
    )
}

export default CustomMap;