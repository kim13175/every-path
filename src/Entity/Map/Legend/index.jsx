const Legend = ({ distance, duration }) => {

    return (
        <div className="opacity-50 bg-gray-300 rounded-lg justify-baseline p-4">
            <p className="mb-2 text-black font-bold">거리 계산</p>
            <div className="flex flex-col gap-2 text-black font-bold">
                <p>거리: {distance} km</p>
                <p>소요시간: {duration} 분</p>
            </div>
        </div>      
    )
}

export default Legend;