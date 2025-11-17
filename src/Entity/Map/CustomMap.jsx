import { CONSTANT } from '#src/Constant';
import { useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

const CustomMap = ({from, to}) => {
    const [zoom, setZoom] = useState(12)

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
                    <Marker position={from} >
                        출발지
                    </Marker>
                )}
                {to && (
                    <Marker position={to} >
                        도착지
                    </Marker>
                )}
            </MapContainer>
        </div>
    )
}

export default CustomMap;