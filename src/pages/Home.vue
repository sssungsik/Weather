<template>
   <div class="wrap">
    <div class="container">
      <MainView />

    </div>
   </div>
  </template>
  
  <script>
  import MainView from "../components/MainView.vue";

  export default { components: {MainView}};
  </script>
  
  <style lang="scss" scoped>
  @import "../scss/main.scss";

  .warp {
    @include center;
    width: 100%;
    height: 100vh;
    font-size: 16px;

    .container {
      @include center-sb;
      width: 55%;
      height: 90%;
      max-width: 1920px;
      max-height: 1354px;
    }
  }
  </style>