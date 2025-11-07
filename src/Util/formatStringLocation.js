export const formatStringLocation = async (location) => {
    const KAKAO_API_KEY = process.env.KAKAO_API_KEY;

    try {
        const response = await fetch(
            `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`,
            {
                headers: {
                    Authorization: `KakaoAK ${KAKAO_API_KEY}`
                }
            }
        );

        return response;
        
    } catch (error) {
        console.log("위치 변환에 실패하였습니다.");
        return null;
    }
}