<template>
    <div class="leftContainer">
        <div id="cityNameBox">
            <div class="cityName">
                <p>전라북도 순창군</p>
                <p>08월 20일</p>
            </div>
        </div>
        <div id="contentsBox">
            <div class="buttonBox">
                <div class="buttonBackground">
                    <button class="forecast">Forecast</button>
                    <button class="airquality">Air Quality</button>
                </div>
            </div>
            <div class="weatherBox">
                <div class="weatherDegree">
                    <p>32&deg;</p>
                </div>
                <div class="weatherIcon">
                    <img src="../assets/img/sun.png" alt="MainLogo">
                </div>
                <div class="weatherData">
                    <div v-for="Temporary in TemporaryData" :key="Temporary.titie" class="detailData">
                        <p>{{ Temporary.titie }}</p>
                        <p>{{ Temporary.value }}</p>
                    </div>
                </div>
            </div>

        </div>
        <div id="todayWeather">
            <div class="textBox">
                <p>시간대별 날씨 정보</p>
                <P>이번 주 날씨 보기</P>
            </div>
            <div class="timelyWeatherBox">
                <div class="timelyWeather">
                    <div class="icon">
                        <img src="" alt="">
                    </div>
                    <div class="data">
                        <p class="time">2pm</p>
                        <p class="currentDegree">32&deg;</p>
                        <div>
                            <img src="" alt="">
                            <p class="fall">15%</p>
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
export default {
    data() {
        return {
            // 임시 데이터
            TemporaryData:[
                {
                    titie:"습도",
                    value:"88%",
                },
                {
                    titie:"풍속",
                    value:"10m/s",
                },
                {
                    titie:"풍량",
                    value:"WS",
                },
            ]
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../scss/main.scss";

.leftContainer {
    width: 324px;
    height: 700px;
    border-radius: 50px;
    background: linear-gradient(#16455f, #0e1239 );
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
                font-family: "Poppins", sans-serif;
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
                p {
                    font-size: 3.5rem;
                    font-weight: 500;
                    font-family: "Be Vietnam Pro", sans-serif;
                    color: white;
                }
            }
            .weatherIcon {
                @include center;
                width: 100%;
                height: 60%;

                img {
                    width: 168px;
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

                        &:first-child {
                            font-size: 1rem;
                            font-weight: 300;
                            font-family: "Noto Sans KR", sans-serif;
                            color: #799ed0;
                        }
                        &:last-child {
                            font-size: 1rem;
                            font-weight: 200;
                            font-family: "Poppins", sans-serif;
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
            font-family: 'Noto Sans KR', sans-serif;
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
            .timelyWeather {
                display: flex;
                width: 126px;
                height: 70px;
                background-color: #0889ff;
                border-radius: 20px;
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
                        font-family: "Poppins", sans-serif;
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