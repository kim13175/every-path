import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { REPUBLIC_OF_KOREA_POSITION } from '../../Constant';

const CustomMap = () => {
    return (
        <div className="flex justify-center items-center">
            <MapContainer 
                center={REPUBLIC_OF_KOREA_POSITION} 
                zoom={8} 
                scrollWheelZoom={true}
                style={{ height: "500px", width: "80%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>
    )
}

export default CustomMap;