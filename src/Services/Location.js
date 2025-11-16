import { ERROR } from "#src/Constant";

class Location {
    #KAKAO_LOCAL_END_POINT = "https://dapi.kakao.com/v2/local";
    #API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;

    searchPlaces = async (keyword) => {
        if (!keyword || keyword.trim() === "") {
            return [];
        }

        try {
            const url = `${this.#KAKAO_LOCAL_END_POINT}/search/keyword.json?query=${encodeURIComponent(keyword)}`;
            
            const headers = {
                Authorization: `KakaoAK ${this.#API_KEY}`
            };
            
            const response = await fetch(url, { headers });

            if (!response.ok) {
                throw new Error(`${ERROR.REQUSET_FAILURE_API} ${response.status}`);
            }

            const data = await response.json();
            return data.documents || [];

        } catch(error) {
            throw new Error(ERROR.NOT_PLACE_LOCATION)
        }
    };

    getCoordinate = async (location) => {
        try {
            const url = `${this.#KAKAO_LOCAL_END_POINT}/search/address.json?query=${encodeURIComponent(location)}`;
            
            const response = await fetch(url, {
                headers: {
                    Authorization: `KakaoAK ${this.#API_KEY}`
                }
            });

            if (!response.ok) {
                throw new Error(`${ERROR.REQUSET_FAILURE_API} ${response.status}`);
            }

            const data = await response.json();

            if (!data.documents || data.documents.length === 0) {
                throw new Error(ERROR.NOT_FIND_RESULT_INFORMATION);
            }

            return [
                parseFloat(data.documents[0].y),
                parseFloat(data.documents[0].x)
            ];

        } catch(error) {
            throw new Error(ERROR.INCORRECT_STRING_ADDRESS);
        }
    };  
}

export default Location;