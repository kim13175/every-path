import { ERROR, MESSAGE } from "#src/Constant";

class Route {
    static #KAKAO_ROUTE_END_POINT = "https://apis-navi.kakaomobility.com/v1/directions";
    static #API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;

    static getDistance = async (from, to) => {

        if (!from || !to) {
            alert(MESSAGE.NOT_REQUEST_INFO)
        } 

        try {
            const url = `${this.#KAKAO_ROUTE_END_POINT}?origin=${from[1]},${from[0]}&destination=${to[1]},${to[0]}&priority=DISTANCE&summary=true`;
            const headers = {
                Authorization: `KakaoAK ${this.#API_KEY}` 
            }

            const response = await fetch(url, { headers });
            if (!response.ok) {
                throw new Error(ERROR.REQUSET_FAILURE_API + response.status)
            }

            const data = await response.json();
            const { distance, duration } = data.routes[0].summary;

            return {
                distance: distance / 1000,
                duration: Math.floor(duration / 60),
                data: data
            };

        } catch(error) {
            throw new Error(ERROR.INCORRECT_ORIGIN_OR_DESTINATION)
        }
    }
}

export default Route;