<template>
  <!--pic-->
  <div class="second-value">
    <li v-if="navOFF" class="second-tip">
      <span class="tip-com left">项目名称</span>
      <span class="tip-com com-end-time right">投标截止时间</span>
      <span class="tip-com second-area marginRight54px right">所在地</span>
    </li>
    <li class="second-dataList" v-for="(item,index) in searchResult">
      <el-tooltip :content="item.name" placement="top" effect="light">
        <a href="#" @click="goHallOptions(item.id,0)" class="dataList-value left" v-text="item.name"></a>
      </el-tooltip>
      <span class="dataList-time left" v-text="item.releaseDate"></span>
      <p class="dataList-end-time right" v-if="item.bidDate == '已结束'"><span style="color: #00bffe" v-text="item.bidDate"></span></p>
      <p class="dataList-end-time right" v-else-if="item.bidDate == ''"><span style="color: #333">未知</span></p>
      <p class="dataList-end-time right" v-else>还剩<span style="color: #00bffe" v-text="item.bidDate"></span>天</p>
      <p class="dataList-area marginRight54px right" v-text="item.province"></p>
      <div class="btnTips right">
          <span v-if="!item.infoTypeMinName == '' ">
            <span @click="resultObj(item.infoType,item.infoTypeMin)" class="btnff6600" v-if="item.infoType == '1'">
              <el-button type="danger" size="mini" round v-text="item.infoTypeMinName"></el-button>
            </span>
            <span @click="resultObj(item.infoType,item.infoTypeMin)" class="btn37b66a" v-else-if="item.infoType == '2'">
              <el-button type="success" size="mini" round v-text="item.infoTypeMinName"></el-button>
            </span>
            <span @click="resultObj(item.infoType,item.infoTypeMin)" class="btnff9c00" v-else-if="item.infoType == '3'">
              <el-button  type="warning" size="mini" round v-text="item.infoTypeMinName"></el-button>
            </span>
          </span>
          <span>
            <span class="btn2baaec">
              <el-button @click="proAreaClick1(item.industry)"  v-if="!item.industryName == ''" type="primary" size="mini" round v-text="item.industryName"></el-button>
            </span>
      <!--<el-button type="primary" size="mini" round v-text="item.businessTypeName"></el-button>-->
          </span>
      </div>
    </li>
  </div>
  <!--pic-->
</template>

<script>
  import axios from 'axios'
  import { mapActions,mapGetters } from 'vuex'
  export default {
    props:{
      searchResult:'',
      navOFF:true,
    },
    name: 'second-value-pic',
    data () {
      return {

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

    },
    methods: {
      ...mapActions([
        'update_UserDB',
        'updateNoticeInfo',
        'updateShowDrawOFF',
        'updateNavListIndex',
        'updateSearchObject',
        'updatePolicyObject'
      ]),
      /*span标签点击-政策*/
      proAreaClick1:function(val){
        this.updateSearchObject({total:'0',industry:val});
        this.$router.push({path:'/search'})
      },
      /*路由-招标详情*/
      goHallOptions:function(id,type){
        var self = this;
        if(self.getIsLogin){
          this.recordHistory(id,type,this.getUserDB.userId);
          this.updateNoticeInfo({id:id,userId:this.getUserDB.userId});
        }else{
          self.updateShowDrawOFF(true);
        }
      },
      /*标签click*/
      resultObj:function(infoType,infoTypeMin){
        this.updateNavListIndex(3);
        this.updateSearchObject({infoType:infoType,infoTypeMin:infoTypeMin});
        this.$router.push({path:'/search'})
      },
    },
    components:{
      axios,
    }
  }
</script>

<style>
  /*颜色集合*/
/*  .btnff9c00 .el-button--warning{
    background: #ff9c00;
    border-color: #ff9c00;
  }
  .btn37b66a .el-button--success{
    background: #37b66a;
    border-color: #37b66a;
  }
  .btn2baaec .el-button--primary{
    background: #2baaec;
    border-color: #2baaec;
  }
  .btnff6600 .el-button--danger{
    background: #ff6600;
    border-color: #ff6600;
  }*/
  .second-title {
    background: #f5f5f5;
    width: 100%;
    height: 114px;
  }
  .title-com {
    text-align: center;
    margin: 0 auto;
    padding: 0 20px;
    background: #f5f5f5;
    width: max-content;
  }
  .title-border {
    margin: 0 auto;
    padding-top: 34px;
    border-bottom: 1px solid #00bffe;
    width: 290px;
    height: 42px;
  }
  .title-top {
    font-size: 24px;
    color: #333;
  }
  .title-bottom {
    font-size: 14px;
    color: #999;
  }
  .second-value {
    background: #fff;
    margin: 0 auto;
    width: 1200px;
  }
  .second-value li {
    border-bottom: 1px dashed  #eee;
  }
  .second-tip {
    padding: 20px;
    overflow: hidden;
    border-bottom: 1px solid #ddd !important;
  }
  .tip-com {
    font-size: 14px;
    color: #999;
  }
  .second-dataList {
    overflow: hidden;
    padding: 20px;
  }
  .second-value li:last-child {
    border: none !important;
  }
  .more {
    padding: 20px;
    text-align: center;
  }
  .more-font {
    color: #00bffe;
    font-size: 14px;
    cursor: pointer;
  }
  .dataList-value {
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    font-size: 16px;
    color: #333;
    line-height: 28px;
    width: 494px;
  }
  .dataList-value:hover {
    color: #00bffe;
  }
  .dataList-time {
    margin-left: 20px;
    line-height: 28px;
    display: inline-block;
    font-size: 14px;
    color: #999;
  }
  .second-area {
    width: 42px;
  }
  .dataList-area {
    text-align: center;
    color: #333;
    font-size: 14px;
    width: 42px;
  }
  .dataList-end-time {
    text-align: center;
    font-size: 14px;
    color: #999;
    width: 84px;
  }
  .second-end-time {
    width: 84px;
  }
  .marginRight54px {
    margin-right: 54px;
  }
/*  .tipPush {
    border-top: 4px solid #00bffe;
    background: #fff;
    right: 12px;
    bottom: 8px;
    position: fixed;
    width: 320px;
    height: 300px;
  }
  .tipPush-title {
    font-size: 18px;
    color: #00bffe;
  }
  .tabList {
    background: #f5f5f5;
    height: 40px;
    width: 100%;
  }
  .tabList-nav {
    overflow: hidden;
    margin: 0 auto;
    width: 1024px;
  }*/
  .tabList-nav li {
    line-height: 40px;
    float: left;
    text-align: center;
    font-size: 16px;
    color: #999;
    width: 120px;
    height: 40px;
  }
  .tabListActive {
    background: #fff;
    color: #333;
    border-top: 2px solid #00bffe;
  }
  .btnTips {

  }
</style>

