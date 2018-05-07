<template>
  <!--pic-->
  <div class="matchList">
    <div class="forMatch" v-for="(item,index) in matchList">
      <p @click="matchClick(item.id,1)" class="matchTitle left">
        <span v-text="item.name"></span>
      </p>
      <div class="btnTips left">
        <span>
          <el-button v-if="item.infoType == '1'" type="danger" size="mini" round v-text="item.infoTypeMinName"></el-button>
          <el-button v-else-if="item.infoType == '2'" type="success" size="mini" round v-text="item.infoTypeMinName"></el-button>
          <el-button v-else-if="item.infoType == '3'" type="warning" size="mini" round v-text="item.infoTypeMinName"></el-button>
        </span>
        <span>
          <el-button @click="proAreaClick(item.industry)" type="primary" size="mini" round v-text="item.industryName"></el-button>
        </span>
      </div>
      <p class="searchAll right" @click="searchAll(item.name)">搜全网</p>
      <p class="content" v-text="item.content"></p>
      <div class="nav-bottom">
        <span class="nav-bottom-L left">来自：{{ item.sourceName }}</span>
        <span class="nav-bottom-L left addLeft20px" v-text="item.releaseDate"></span>
        <a :href="item.sourceUrl" target="_blank"><span class="nav-bottom-L right"><el-button size="mini" round>详情</el-button></span></a>
      </div>
    </div>
  </div>
  <!--pic-->
</template>

<script>
  import axios from 'axios'
  import { mapActions,mapGetters } from 'vuex'
  export default {
    props:{
      matchList:'',
      checkOFF:'',
    },
    name: 'matchList',
    data () {
      return {
        collectionAPI:{
          type:'0',
          userId:'',
          total:'0',
          count:'20',
        },
      }
    },
    //定义这个sweiper对象
    computed: {
      ...mapGetters([
          'getUserDB',
          'getAPIState',
          'getIsLogin'
      ]),
    },
    mounted () {
        this.collectionAPI.userId = this.getUserDB.userId;
    },
    methods: {
      ...mapActions([
          'updateMatchList',
          'updateShowDrawOFF',
      ]),
      searchAll:function(value){
          var url = 'http://www.baidu.com/s?wd=' + value;
          window.open(url);
      },
      matchClick:function(id,type){
        var self = this;
        if(self.getIsLogin){
          this.recordHistory(id,type,this.getUserDB.userId);
          this.updateMatchList({id:id,userId:this.getUserDB.userId});
        }else{
          self.updateShowDrawOFF(true);
        }
      },
    },
    components:{
      axios,
    }
  }
</script>

<style>
  .matchList {
    text-align: center;
    background: #fff;
  }
  .forMatch {
    border-bottom: 2px solid #f5f5f5;
    padding-top: 30px;
    margin: 0 auto;
    overflow: hidden;
    width: 1158px;
  }
  .matchTitle {
    cursor: pointer;
    font-size: 18px;
  }
  .matchTitle:hover {
    color: #00bffe;
  }
  .searchAll {
    cursor: pointer;
    color: #999;
    font-size: 14px;
  }
  .searchAll:hover {
    color: #00bffe;
  }
  .content {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: 14px;
    line-height: 30px;
    padding-top: 30px;
    width: 1158px;
  }
  .btnTips {
    margin-left: 20px;
  }
  .nav-bottom-L {
    padding-top: 30px;
    padding-bottom: 30px;
    font-size: 14px;
    color: #999;
  }
  .addLeft20px {
    margin-left: 20px;
  }
  .nav-bottom-L .el-button {
    width: 60px;
    height: 26px;
  }
  .tabList {
    background: #f0f5f7;
    height: 40px;
    width: 100%;
  }
  .tabList-nav {
    overflow: hidden;
    margin: 0 auto;
    width: 1200px;
  }
  .tabList-nav li {
    cursor: pointer;
    line-height: 40px;
    float: left;
    text-align: center;
    font-size: 16px;
    color: #999;
    width: 120px;
    height: 40px;
  }
  .edit {
    margin-left: 15px;
    line-height: 40px;
    display: inline-block;
    cursor: pointer;
    font-size: 14px;
    color: #999;
  }
  .edit:hover {
    color: #00bffe;
  }
  .tip-com {
    font-size: 14px;
    color: #999;
  }
</style>

