<template>
    <div class="leftContainer">
       
        <div id="cityNameBox">
            <div class="cityName">
                <p>{{ cityName}}</p>
                <p>{{ currentTime }}</p>
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
                <div class="weatherDegree">
                    <p>{{ Math.round(currentTemp)}}&deg;</p>
                    <p>{{ currentWeatherDescription}}</p>
                </div>
                <div></div>
                <div class="weatherIcon">
                    <img :src="images[0]" alt="MainLogo">
                </div>
                <div class="weatherData">
                    <div v-for="temporary in temporaryData" :key="temporary.titie" class="detailData">
                        <p>{{ temporary.title }}</p>
                        <p>{{ temporary.value }}</p>
                    </div>
                </div>
            </div>

        </div>

        <div id="todayWeather">
            <div class="textBox">
                <p>시간대별 일기예보</p>
                <P>3시간 기준</P>
            </div>
            <div class="timelyWeatherBox">
                <div class="timelyWeather" v-for="(temp, index) in arrayTemps" :key="index">
                    <div class="icon">
                        <img :src="images[index]" :alt="`${index}`">
                    </div>
                    <div class="data">
                        <p class="time">{{formatDate(temp.dt_txt) }}</p>
                        <p class="currentDegree">{{Math.round(temp.main.temp)}}&deg;</p>
                        <div>
                            
                            <p class="fall">{{ getWeatherDescription(temp.weather[0].description) }}</p>
                 
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
       
        <nav>
            <i class="bi bi-house"></i>
            <i class="bi bi-search"></i>
            <i class="bi bi-list-ul"></i>
            <i class="bi bi-gear"></i>
        </nav>
    </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");
export default {
    data() {
        return {
            // 현재 시간 출력 dayjs 플러그인
            currentTime : dayjs().format("YYYY. MM. DD. ddd"),
          
        }
    },
    async created() {
        await this.$store.dispatch('openWeatherApi/FETCH_OPENWEATHER_API');
        const { currentTemp, currentHumidity, currentWindSpeed, currentFeelsLike, currentWeatherDescription } = this.$store.state.openWeatherApi.currentWeather;

        this.currentTemp = currentTemp; // 현재시간에 대한 현재온도
        this.temporaryData[0].value = currentHumidity + '%'; // 현재시간에 대한 습도
        this.temporaryData[1].value = currentWindSpeed + 'm/s'; // 현재시간에 대한 풍속
        this.temporaryData[2].value = Math.round(currentFeelsLike) + '도'; // 현재시간에 대한 체감온도
        this.arrayTemps = this.$store.state.openWeatherApi.hourlyWeather;
        this.images = this.$store.state.openWeatherApi.imagePath;
        this.currentWeatherDescription = currentWeatherDescription;
    },
    methods: {
    getWeatherDescription(description) {
      // "약간의 구름이 낀 하늘"을 "구름"으로 변환
      return description === '약간의 구름이 낀 하늘' ? '구름' : description;
    },
    formatDate(value) {
      const date = new Date(value);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hours = date.getHours();
      return `${month}. ${day} ${hours}시`;
        }
    },
    computed: {
        cityName() {
            return this.$store.state.openWeatherApi.cityName;
        },
        currentTemp() {
            const { currentTemp } = this.$store.state.openWeatherApi.currentWeather;
            return currentTemp;
        },
        currentWeatherDescription() {
            const { currentWeatherDescription } = this.$store.state.openWeatherApi.currentWeather;
            return currentWeatherDescription;
        },
        arrayTemps() {
            return this.$store.state.openWeatherApi.hourlyWeather;

        },
        temporaryData() {
            const { currentHumidity, currentWindSpeed, currentFeelsLike } = this.$store.state.openWeatherApi.currentWeather;
            return [
                {
                    title: "습도",
                    value: currentHumidity + "%",
                },
                {
                    title: "풍속",
                    value: currentWindSpeed + "m/s",
                },
                {
                    title: "체감온도",
                    value: Math.round(currentFeelsLike) + "도",
                },
            ];
        },
        images() {
            return this.$store.state.openWeatherApi.images;
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../scss/main.scss";


.leftContainer {
    width: 324px;
    min-width: 324px;
    height: 700px;
    border-radius: 50px;
    background: linear-gradient(#16455f, #0e1239);
    box-shadow: 5px 5px 10px gray;
    

    #cityNameBox {
        width: 100%;
        height: 10%;

        .cityName {
            @include c-center;
            width: 100%;
            height: 100%;

            p {
                color: white;
                font-family: 'Pretendard-Regular';
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
        height: 62.5%;

        .buttonBox {
            @include center;
            width: 100%;
            height: 20%;
            .buttonBackground {
                width: 224px;
                height: 35px;
                background-color: #052137;
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
                        background-color: #0889ff;
                        color: white;
                    }
                    &.airquality {
                        background: transparent;
                        color: #467599;
                    }
                }
            }
        }

        .weatherBox {
            width: 100%;
            height: 80%;

            .weatherDegree {
                @include center;
                width: 100%;
                height: 15%;
                flex-direction: column;
                p {
                    font-size: 3.5rem;
                    font-weight: 500;
                    font-family: 'Pretendard-Regular';
                    color: white;
                    &:first-child {
                        margin-bottom: 9px;
                    }
                    &:last-child {
                        font-size: 0.9rem;
                        font-family: 'Pretendard-Regular';
                    }
                }
            }
            .weatherIcon {
                @include center;
                width: 100%;
                height: 60%;

                img {
                  
                    height: 160px;
                }
            }
            .weatherData {
                display: flex;
                width: 100%;
                height: 25%;

                .detailData {
                    @include c-center;
                    width: 33.33%;
                    height: 100%;

                    &:nth-child(1) {
                        margin-left: 10px;  
                    }
                    &:nth-child(2) {
                        margin-left: 0 -10px;  
                    }
                    &:nth-child(3) {
                        margin-right: 10px;  
                    }
                    p {
                        line-height: 1.5;
                        color: white;
                        font-family: 'Pretendard-Regular';

                        &:first-child {
                            font-size: 1rem;
                            font-weight: 300;
                            color: #799ed0;
                        }
                        &:last-child {
                            font-size: 1rem;
                            font-weight: 200;
                        
                        }
                    }
                }

            }
        }
    }
  
    #todayWeather {
        width: 100%;
        height: 17.5%;
        .textBox {
            @include center-sb;
            width: calc(100% - 70px);
            height: 35%;
            padding: 0 35px;
            font-family: 'Pretendard-Regular', sans-serif;
            p {
                font-weight: 400;
                font-size: 0.8rem;
                color: white;
                text-align: center;
                &:last-child {
                    font-weight: 400;
                    font-size: 0.8rem;
                    color: #0085ff;
                    cursor: pointer;
                    margin-bottom: 2px;
                }
            }
        }

        .timelyWeatherBox {
            display: flex;
            align-items: center;
            width: calc(100% - 70px);
            height: 65%;
            padding: 0 30px;
            overflow: scroll;

            -ms-overflow-style: none;
            scrollbar-width: none;
            &::-webkit-scrollbar {
                display: none;
            }
            .timelyWeather {
                display: flex;
                width: 126px;
                min-width: 126px;
                height: 70px;
                background-color: #0889ff;
                border-radius: 20px;
                margin-left: 15px;
                &:first-child {
                    margin-left: 0;
                }

                .icon {
                    @include center;
                    width: 45%;
                    height: 100%;

                    img {
                        width: 100%;
                    }
                }
                .data {
                    @include c-center-se;
                    width: 55%;
                    height: 100%;
                    p {
                        color: whitesmoke;
                        font-family: 'Pretendard-Regular', sans-serif;
                        text-align: center;

                        &.time {
                            font-size: 0.8rem;
                            font-weight: 200;
                            margin-top: 7.5px;
                        }

                        &.currentDegree {
                            font-size: 1.2rem;
                            margin-top: 7.5px;
                        }
                    }
                    div {
                        @include center;
                        width: 100%;
                        height: 33.33%;
                        img {
                            height: 55%;
                        }
                        .fall {
                            font-size: 0.9rem;
                            margin-top: 1.5px;
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
            color: rgb(255,  255, 255);
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