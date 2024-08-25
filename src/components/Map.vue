<template>
  <div id="mapContainer">
    <div id="map"></div>
  </div>
</template>

<script>
import MapPositions from "../assets/map-positions.json";
export default {
    data (){
        return {};
    },
    mounted() {
    if (window.kakao && window.kakao.maps) {
        this.initMap();
    } else {
        const script = document.createElement('script');
        /* global kakao */
        script.onload = () => kakao.maps.load(this.initMap);
        script.src = "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=94c69d7349db7d6292bf5b0c398bbadf";
        document.head.appendChild(script);
        }
    },
    methods: {
        initMap(){
            const mapContainer = document.getElementById('map'), // 지도를 표시할 div
        mapOption = {
          center: new kakao.maps.LatLng(37.73035, 127.967487), // 지도의 중심좌표
          level: 13, // 지도의 확대 레벨
        };

    const map = new kakao.maps.Map(mapContainer, mapOption);
    const positions = MapPositions.map((pos) => ({
        latlng: new kakao.maps.LatLng(...pos.latlng),
        cityName: pos.cityName,
    }));

        // 마커 생성
        positions.forEach((pos) => {
            const marker = new kakao.maps.Marker({
                position: pos.latlng, // 마커 위치
            });

            // 마커 지도 위 표시
            marker.setMap(map);

            // 마커 클릭 이벤트
            kakao.maps.event.addListener(marker, "click", () => {
                
                this.$store.commit('openWeatherApi/SET_CITYNAME', pos.cityName);
                this.$store.commit('openWeatherApi/SET_LATLON', marker.getPosition());
                this.$store.dispatch("openWeatherApi/FETCH_OPENWEATHER_API");
            });
            
        })
     },
    },
};
</script>

<style lang="scss" scoped>
@import "../scss/main.scss";
#mapContainer {
    @include center;
    width: 100%;
    height: 35%;
    #map {
        width: 80%;
        height: 90%;
        border-radius: 10px;
    }


}

</style>