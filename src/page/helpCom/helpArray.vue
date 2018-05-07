
<template>
  <div id="helpArray">
    <bannerPic :banner="getBannerCP"></bannerPic>
    <router-view></router-view>
  </div>
</template>

<script>
  import axios from 'axios'
  import bannerPic from '../../components/bannerPic/bannerPic.vue'
  import { mapActions,mapGetters } from 'vuex'
  export default {
    name: 'helpArray',
    data () {
      return {
      }
    },
    //定义这个sweiper对象
    computed: {
      ...mapGetters([
          'getBannerCP',
          'getAPIState'
      ]),
    },
    mounted () {
      this.updateBanner({
          chinese:'常见问题',
          english:'Common problem',
          urlPic:'./qyhl/problem_bg.jpg',
      });
    },
    methods: {
      ...mapActions([
          'updateBanner'
      ]),
    },
    components:{
      axios,
      bannerPic
    }
  }
</script>

<style scoped>
  .second {
    padding-top: 20px;
    text-align: center;
    background: #f5f5f5;
    width: 100%;
  }
  .second-1024 {
    text-align: left;
    box-sizing: border-box;
    padding: 20px 40px;
    background: #fff;
    margin: 0 auto;
    width: 1200px;
    height: 579px;
  }
  .second-1024 li:hover {
    color: #00bffe;
  }
  .second-1024 li {
    cursor: pointer;
    text-align: left;
    line-height: 53px;
    border-bottom: 1px dashed #ddd;
    font-size: 16px;
    color: #333;
  }
  .second-1024 a:last-child li {
    border: none;
  }
  .el-pagination {
    padding: 40px 60px;
  }
  .second .el-dialog, .el-pager li {
    background: none;
  }
  /*second*/
  /*详情*/
  .help-nav {
    margin: 20px auto;
    width: 1024px;
    background: #f5f5f5;
  }
  .el-breadcrumb__inner, .el-breadcrumb__inner a{
    font-size: 16px;
    font-weight: 400;
    color: #999999;
  }
  .help-nav .el-breadcrumb__item {
    font-size: 16px;
    color: #333;
  }
  .getBackCom {
    width: 1024px;
    overflow: hidden;
    margin: 20px auto 0;
    padding-bottom: 60px;
  }
  .getBackCom .el-button {
    margin-right: 41px;
    float: right;
    padding: 10px 23px;
    font-size: 14px;
    background: #f5f5f5;
    width: 80px;
    height: 36px;
  }
</style>

