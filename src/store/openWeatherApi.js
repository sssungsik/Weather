import axios from "axios";

export default {
    // namespaced : 하나의 store에서 모듈화하여 사용될 수 있음을 명시
    namespaced: true,

    // state : 실제 사용 데이터
    state: {
        position: {
            lat : 37.5683,
            lon : 126.9778,
        },
        cityName: '서울',
        currentWeather: {
            currentTemp: 0,
            currentHumidity: 0,
            currentWindSpeed: 0,
            currentFeelsLike: 0,
            currentSunrise: 0,
            currentSunset: 0,
            currentVisibility: 0,
            currentWeatherDescription: '',
        },
        hourlyWeather: [],
        images: [],
    },

    // getters : 계산된 상태의 데이터를 만드는 속성, computed와 비슷한 속성
    getters: {},

    // mutations : 변이 메서드
    mutations: {
        SET_LATLON(state, payload) {
            state.position.lat = payload.Ma;
            state.position.lon = payload.La;
        },


        SET_CITYNAME(state, payload) {
            state.cityName = payload;
        },
        SET_CURRENT_WEATHER(state, payload) {
            state.currentWeather.currentTemp = Math.round(payload.main.temp); // 현재온도
            state.currentWeather.currentHumidity = payload.main.humidity; // 습도
            state.currentWeather.currentWindSpeed = payload.wind.speed; // 풍속
            state.currentWeather.currentFeelsLike = Math.round(payload.main.feels_like); // 체감온도
            state.currentWeather.currentSunrise = payload.sys.sunrise; // 일출시간
            state.currentWeather.currentSunset = payload.sys.sunset; // 일몰시간
            state.currentWeather.currentVisibility = payload.visibility; // 가시거리
            state.currentWeather.currentWeatherDescription = payload.weather[0].description;
        },
        SET_TIMELY_WEATHER(state, payload) {
            state.hourlyWeather = payload;
        },
        SET_IMAGEPATH(state, payload) {
            state.images = payload;
        },
    },

    // actions : 특정 데이터 수정 불가, 비동기
    actions: {
        async FETCH_OPENWEATHER_API(context) {
            const API_KEY = "af8c41e25c969684fe185616913d4a3d";
            let initialLat = context.state.position.lat;
            let initialLon = context.state.position.lon;
    
            try {
                const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${initialLat}&lon=${initialLon}&lang=kr&units=metric&appid=${API_KEY}`);
            
                console.log("!!!!!!!!!!!!!!!!!!성공!!!!!!!!!!!");
                
                console.log(res);
                
                
         
                context.commit('SET_CURRENT_WEATHER', res.data); // 조회하는 현재시간에 대한 날씨데이터
         

            } catch (error) {
                console.log("!!!!!!!!!!!!!!!!!!에러!!!!!!!!!!!");
                console.log(error);
                
            }
            try {
                const res2 = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${initialLat}&lon=${initialLon}&lang=kr&units=metric&appid=${API_KEY}`);
                const images = new Array();
                console.log("!!!!!!!!!!!!!!!!!!성공!!!!!!!!!!!");
                
                console.log(res2);
                
               
               
                for (let i = 0; i<40; i++) {
                    const weatherIcon = res2.data.list[i].weather[0].icon;
                    images[i] = require(`../assets/img/${weatherIcon}.png`).default;
                    
                }

                context.commit('SET_IMAGEPATH', images);
                context.commit('SET_TIMELY_WEATHER', res2.data.list); // 시간대별 날씨데이터

            } catch (error) {
                console.log("!!!!!!!!!!!!!!!!!!에러!!!!!!!!!!!");
                console.log(error);
            }
        },
    },

};