<template>
  <!--pic-->
  <div class="comHelf-pic">
    <img class="imgCom" :src="getBannerCP.urlPic" alt="轮播图">
    <div class="comHelf-pic-1024">
      <p class="right">{{ getBannerCP.chinese }}<span>&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;{{ getBannerCP.english }}</span></p>
    </div>
  </div>
  <!--pic-->
</template>

<script>
  import axios from 'axios'
  import { mapActions,mapGetters } from 'vuex'
  export default {
    props:{
      banner:'',
    },
    name: 'comHelf-pic',
    data () {
      return {

      }
    },
    //定义这个sweiper对象
    computed: {
      ...mapGetters([
          'getBannerList',
          'getBannerCP'
      ]),
    },
    mounted () {

    },
    metheds: {
      ...mapActions([

      ]),
    },
    components:{
      axios,
    }
  }
</script>

<style>
  .comHelf-pic {
    position: relative;
    width: 100%;
    height: 174px;
  }
  .comHelf-pic img {
    position: absolute;
  }
  .comHelf-pic-1024 {
    overflow: hidden;
    position: relative;
    margin: 0 auto;
    width: 1024px;
    height: 174px;
  }
  .comHelf-pic p {
    position: absolute;
    bottom: 30px;
    right: 40px;
    display: inline-block;
    color: #fff;
    font-size: 24px;
  }
  .comHelf-pic span {
    display: inline-block;
    color: #fff;
    font-size: 14px;
  }
</style>

