import { CONSTANT } from '#src/Constant';
import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const CustomMap = ({from, to}) => {
    const [zoom, setZoom] = useState(12)
    /* 지번 주소와 도로명 주소 중 도로명 주소 사용 */ 
    const fromRoad = from?.road_address;
    const toRoad = to?.road_address;

    return (
        <div className="flex justify-center items-center m-8">
            <MapContainer 
                center={CONSTANT.REPULIC_OF_KOREA} 
                zoom={zoom} 
                scrollWheelZoom={true}
                style={{ height: "500px", width: "80%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {from && (
                    <Marker position={[fromRoad.y, fromRoad.x]} >
                        <Popup>
                            {fromRoad.building_name ? 
                                fromRoad.address_name + " " + fromRoad.building_name : fromRoad.address_name}
                        </Popup>
                    </Marker>
                )}
                {to && (
                    <Marker position={[toRoad.y, toRoad.x]} >
                        <Popup>
                            {toRoad.building_name ? 
                                toRoad.address_name + " " + toRoad.building_name : toRoad.address_name}
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    )
}

export default CustomMap;