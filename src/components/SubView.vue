<template>
    <div :class="['rightContainer', feelingClass]">
        <div id="cityNameBox">
            <div class="cityName">
                <p>{{ cityName }}</p>
                <p>{{ currentTime}}</p>
            </div>
        </div>
        <div id="contentsBox">
            <div class="buttonBox">
                <div class="buttonBackground">
                    <button class="forecast">날씨</button>
                    <button class="airquality">정보</button>
                </div>
            </div>
            <div class="weatherBox">
                <div class="airCondition">
                    <p>{{feeling}}</p>
                </div>
                <div class="detail">
                    <div class="title">
                        <p>{{advisor}}</p>
                    </div>
                    <div class="data" v-for="(detailData, index) in subWeather" :key="index">
                        <div class="dataName">
                            <p></p>
                            <p> {{ detailData.name}}</p>
                        </div>
                        <div class="dataValue">
                            <p> {{ detailData.value}}
                                <span></span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <Map />
        <nav>
            <i class="bi bi-house"></i>
            <i class="bi bi-search"></i>
            <i class="bi bi-list-ul"></i>
            <i class="bi bi-gear"></i>
        </nav>
    </div>
</template>

<script>
import Map from "../components/Map.vue";
import { computed, onMounted, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

export default {
    components : {
        Map,
    },
    setup() {
        let currentTime = dayjs().format("YYYY. MM. DD. ddd");  // 현재 시간
        let cityName = ref(""); // 도시 이름
        let feeling  = ref("");
        let advisor = ref("");
        let subWeather = ref([]);

        // 타임스탬프 변환
        const Unix_timestamp = (dt) => {
            let date = new Date(dt * 1000);
            let hour = date.getHours().toString().padStart(2, "0");
            return hour.substring(-2) + "시";
        }

        // OpenWeather 호출
        const store = useStore();
        const fetchOpenWeatherApi = async () => {
            try {
                await store.dispatch("openWeatherApi/FETCH_OPENWEATHER_API");
                const { currentFeelsLike, currentSunrise, currentSunset, currentVisibility } = store.state.openWeatherApi.currentWeather;
                

                let cName = store.state.openWeatherApi.cityName; // 도시이름
                let cFeel = computed(() => {
                    return currentFeelsLike;
                }); // 초기 체감온도 데이터
                let cSunrise = computed(() => {
                    return currentSunrise;
                }); // 일출시간 데이터
                let cSunset = computed(() => {
                    return currentSunset;
                }); // 일몰시간 데이터
                let cSight = computed(() => {
                    return currentVisibility;
                }); // 가시거리 데이터

                // 체감온도 
                if (cFeel.value > 30 ) feeling.value = "매우 더움";
                if (cFeel.value <= 30 ) feeling.value = "더움";
                if (cFeel.value <= 25 ) feeling.value = "포근함";
                if (cFeel.value <= 20 ) feeling.value = "시원함";
                if (cFeel.value <= 15 ) feeling.value = "쌀쌀함";
                if (cFeel.value <= 10 ) feeling.value = "추움";
                if (cFeel.value <= 0 ) feeling.value = "매우 추움";
                // 기온별 옷차림
                if (cFeel.value >= 28 ) advisor.value = "민소매, 반팔, 반바지를 추천드려요.";
                if (cFeel.value <= 27 ) advisor.value = "반팔, 얇은 셔츠, 면바지를 추천드려요.";
                if (cFeel.value <= 22 ) advisor.value = "얇은 가디건, 긴팔, 긴바지를 추천드려요.";
                if (cFeel.value <= 19 ) advisor.value = "얇은 니트, 맨투맨, 가디건을 추천드려요.";
                if (cFeel.value <= 16 ) advisor.value = "자켓, 가디건, 야상, 스타킹을 추천드려요.";
                if (cFeel.value <= 11 ) advisor.value = "자켓, 트렌치코트, 야상, 니트를 추천드려요.";
                if (cFeel.value <= 8 ) advisor.value = "코트, 가죽자켓, 히트텍, 니트를 추천드려요.";
                if (cFeel.value <= 4 ) advisor.value = "패딩, 두꺼운 코트, 목도리를 추천드려요.";

                const tempPoints = [0,10,15,20,25,30];
                const lavels = ["매우 추움","추움", "쌀쌀함","시원함","포근함","더움","매우 더움"];

                // let index = 0;
                // for (const point of tempPoints) {
                //     if(cFeel <= point) break;
                //     index ++;
                // }
                // feeling.value = lavels[index]
 
                // v-for 사용
                let proceedData = [
                    {name : "일출시간", value : Unix_timestamp(cSunrise.value)},
                    {name : "일몰시간", value : Unix_timestamp(cSunset.value)},
                    {name : "가시거리", value : cSight.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "미터"}, // 소수점 정규표현식
                ];

                cityName.value = cName;
                subWeather.value = proceedData;
                
            } catch (error) {}

       
    
        };
        const feelingClass = computed(() => {
            switch (feeling.value) {
                case "매우 더움":
                    return "hot-background";
                case "더움":
                    return "warm-background";
                case "포근함":
                    return "mild-background";
                case "시원함":
                    return "cool-background";
                case "쌀쌀함":
                    return "chilly-background";
                case "추움":
                    return "cold-background";
                case "매우 추움":
                    return "very-cold-background";
                default:
                    return "";
            }
        });
        
        // 함수 호출
        watchEffect(async () => {
            await fetchOpenWeatherApi();
        });



        onMounted(() => {
            fetchOpenWeatherApi();
        });
        return {
            currentTime,
            cityName,
            subWeather,
            feeling,
            advisor,
            feelingClass,
        }
    }
};
</script>

<style lang="scss" scoped>
    @import "../scss/main.scss";

    .rightContainer {
    // width: 40%;
    // height: 100%;
    width: 324px;
    min-width: 324px;
    height: 700px;
    border-radius: 50px;
    background: linear-gradient(#cb0000, #0e1239);
    box-shadow: 5px 5px 10px gray;
    transition: background-color 0.5s ease;
    &.hot-background {
        background: linear-gradient(#cb0000, #0e1239);
    }
    &.warm-background {
        background: linear-gradient(#ff4500, #0e1239);
    }
    &.mild-background {
        background: linear-gradient(#ff8c00, #0e1239);
    }
    &.cool-background {
        background: linear-gradient(#1e90ff, #0e1239);
    }
    &.chilly-background {
        background: linear-gradient(#00bfff, #0e1239);
    }
    &.cold-background {
        background: linear-gradient(#4682b4, #0e1239);
    }
    &.very-cold-background {
        background: linear-gradient(#1c1c1c, #0e1239);
    }

        #cityNameBox {
            width: 100%;
            height: 10%;

            .cityName {
                @include c-center;
                width: 100%;
                height: 100%;

                p {
                    color: white;
                    font-family: 'Pretendard-Regular', sans-serif;
                    line-height: 2.5;
                    text-align: center;

                    &:first-child {
                        width: 241px;
                        height: 33px;
                        font-size: 1.35rem;
                    }
                    &:last-child {
                        width: 160px;
                        height: 19px;
                        font-size: 0.9rem;
                        font-weight: 100;
                    }
                }
            }
        }

        #contentsBox {
            width: 100%;
            height: calc(45% - 16px);
            margin-top: 16px;

            .buttonBox {
                @include center;
                width: 100%;
                height: 20%;

                .buttonBackground {
                    width: 224px;
                    height: 35px;
                    background-color: rgba(0,0,0,.5);
                    border-radius: 10px;
                    display: flex;

                    button {
                        width: 112px;
                        height: 35px;
                        border: 0;
                        border-radius: 7.5px;
                        outline: 0;
                        cursor: pointer;
                        &.forecast {
                            background-color: transparent;
                            color: rgba(255, 255, 255, .5);
                        }
                        &.airquality {
                            background-color: #0889ff;
                            color: white;
                        }
                    }
                }
            }
            .weatherBox {
                width: 100%;
                height: 80%;

                .airCondition {
                    @include center;
                    width: 100%;
                    height: 35%;

                    p {
                        text-align: center;
                        font-size: 2.25rem;
                        font-weight: 500;
                        font-family: 'Pretendard-Regular', sans-serif;
                        color: #fff;
                    }
                }
                .detail {
                    width: 100%;
                    height: 65%;

                    .title {
                        @include center;
                        width: 100%;
                        height: 25%;
                        color: white;

                        p {
                            font-family: 'Pretendard-Regular', sans-serif;
                        }
                    }
                    .data {
                        display: flex;
                        width: 100%;
                        height: 27.5%;
                        // background-color: rgb(187, 127, 255);

                        .dataName {
                            display: flex;
                            align-items: center;
                            width: 50%;
                            height: 100%;
                            font-family: 'Pretendard-Regular', sans-serif;

                            p {
                                &:first-child {
                                    display: block;
                                    width: 10px;
                                    height: 10px;
                                    border-radius: 50%;
                                    background-color: #ffde23;
                                    margin-left: 50px;
                                }
                                &:last-child {
                                    margin-left: 10px;
                                    color: white;
                                    font-weight: 300;
                                    font-size: 0.9rem;
                                }
                            }
                        }
                        .dataValue {
                            display: flex;
                            align-items: center;
                            justify-content: right;
                            width: 50%;
                            height: 100%;
                            font-family: 'Pretendard-Regular', sans-serif;

                            p {
                                color: white;
                                font-weight: 300;
                                margin-right: 50px;

                                span {
                                    font-weight: 600;
                                }
                            }
                        }
                    }
                }
            }
        }

        nav {
            @include center-sb;
            width: calc(100% - 100px);
            height: 10%;
            padding: 0 50px;

            i {
                color: rgb(255, 255, 255);
                font-size: 1.15rem;
                cursor: pointer;
                transition: all 0.2s ease;

                &:hover {
                    color: #799ed0;
                }
            }
        }
    }
</style>