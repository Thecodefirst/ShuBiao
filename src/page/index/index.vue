<template>
  <div id="index">
    <el-carousel height="440px" :interval="5000">
      <el-carousel-item>
        <img src="../../../static/banner01.jpg" alt="banner01">
      </el-carousel-item>
      <el-carousel-item>
        <img src="../../../static/banner02.jpg" alt="banner02">
      </el-carousel-item>
      <el-carousel-item>
        <img src="../../../static/banner03.jpg" alt="banner03">
        <button @click="companyCheck" class="companyCheck">认证企业</button>
      </el-carousel-item>
    </el-carousel>
    <div class="picList">
      <div class="picList1200px">
        <li>
          <span>
            <img class="imgCom" src="../../../static/stopwatch.png" alt="毫秒查询">
          </span>
          <span class="textPicList">
            <p>毫秒查询</p>
            <p>节省更多时间</p>
          </span>
        </li>
        <li class="borderLF">
          <span>
            <img class="imgCom" src="../../../static/data.png" alt="数据全面">
          </span>
          <span class="textPicList">
            <p>数据全面</p>
            <p>提供更多数据</p>
          </span>
        </li>
        <li>
          <span>
            <img class="imgCom" src="../../../static/accurate.png" alt="精确匹配">
          </span>
          <span class="textPicList">
            <p>精确匹配</p>
            <p>命中目标信息</p>
          </span>
        </li>
      </div>
    </div>
    <!--<div style="width: 100%;height: 10px;background: #f0f5f7"></div>
    <div style="width: 100%;height: 10px;background: #fff"></div>-->
    <div class="second">
      <!--最新发布-->
      <div class="second-title">
        <div class="title-border">
          <p class="title-top title-com">最新发布</p>
          <p class="title-bottom title-com">Latest release</p>
        </div>
      </div>
      <div class="second-value">
        <li class="second-tip">
          <span class="tip-com  left">项目名称</span>
          <span class="tip-com second-area right">所在地</span>
        </li>
        <li class="second-dataList" v-for="(item,index) in getIndexData">
          <el-tooltip :content="item.name" placement="top" effect="light">
            <a href="#" @click="goHallOptions(item.id,0)" class="dataList-value left" v-text="item.name"></a>
          </el-tooltip>
          <span class="dataList-time left" v-text="item.releaseDate"></span>
          <p class="dataList-area right"><span style="display: inline-block;width: 112px;" v-text="item.province"></span></p>
          <div class="right">
              <span v-if="!item.infoTypeMinName == ''">
                <span @click="resultObj(item.infoType,item.infoTypeMin)" v-if="item.infoType == '1'">
                  <el-button type="danger" size="mini" round v-text="item.infoTypeMinName"></el-button>
                </span>
                <span @click="resultObj(item.infoType,item.infoTypeMin)" v-else-if="item.infoType == '2'">
                  <el-button type="success" size="mini" round v-text="item.infoTypeMinName"></el-button>
                </span>
                <span @click="resultObj(item.infoType,item.infoTypeMin)" v-else-if="item.infoType == '3'">
                  <el-button type="warning" size="mini" round v-text="item.infoTypeMinName"></el-button>
                </span>
              </span>
              <span>
                <span class="btn2baaec">
                  <el-button @click="proAreaClick1(item.industry)" v-if="!item.industryName == '' " type="primary" size="mini" round v-text="item.industryName"></el-button>
                </span>
              </span>
          </div>
        </li>
        <li class="more">
          <a @click="resultObj('','')" href="#" class="more-font">+ 查看更多</a>
        </li>
      </div>
      <!--最新发布-->
      <!--招标大厅-->
      <div class="second-title">
        <div class="title-border">
          <p class="title-top title-com">招标大厅</p>
          <p class="title-bottom title-com">Bidding Hall</p>
        </div>
      </div>
      <div class="tabList">
        <div class="tabList-nav">
          <li :class='{ tabListActive : index == lastMove }' v-for="(item,index) in tabListBH" v-text="item.name" @click="tabListClick(item.index,index)"></li>
        </div>
      </div>
      <div v-if="lastMove == '0'" class="second-value">
        <li class="second-tip">
          <span class="tip-com left">项目名称</span>
          <span class="tip-com com-end-time right">投标截止时间</span>
          <span class="tip-com second-area right">所在地</span>
        </li>
        <li class="second-dataList" v-for="(item,index) in getIndexTableList">
          <el-tooltip :content="item.name" placement="top" effect="light">
            <a href="#" @click="goHallOptions(item.id,0)" class="dataList-value left" v-text="item.name"></a>
          </el-tooltip>
          <span class="dataList-time left" v-text="item.releaseDate"></span>
          <p class="dataList-end-time right" v-if="item.bidDate == '已结束'"><span style="color: #00bffe" v-text="item.bidDate"></span></p>
          <p class="dataList-end-time right" v-else-if="item.bidDate == ''"><span style="color: #333">未知</span></p>
          <p class="dataList-end-time right" v-else>还剩<span style="color: #00bffe" v-text="item.bidDate"></span>天</p>
          <p class="dataList-area right"><span style="display: inline-block;width: 112px;" v-text="item.province"></span></p>
          <div class="right">
            <span v-if="!item.infoTypeMinName==''">
              <el-button @click="resultObj(item.infoType,item.infoTypeMin)" v-if="item.infoType == '1'" type="danger" size="mini" round v-text="item.infoTypeMinName"></el-button>
              <el-button @click="resultObj(item.infoType,item.infoTypeMin)" v-else-if="item.infoType == '2'" type="success" size="mini" round v-text="item.infoTypeMinName"></el-button>
              <el-button @click="resultObj(item.infoType,item.infoTypeMin)" v-else-if="item.infoType == '3'" type="warning" size="mini" round v-text="item.infoTypeMinName"></el-button>
            </span>
            <span>
              <el-button @click="proAreaClick1(item.industry)" v-if="!item.industryName==''" type="primary" size="mini" round v-text="item.industryName"></el-button>
              <!--<el-button type="primary" size="mini" round v-text="item.businessTypeName"></el-button>-->
            </span>
          </div>
        </li>
        <li class="more">
          <a @click="resultObj('','')" href="#" class="more-font">+ 查看更多</a>
        </li>
      </div>
      <div v-else class="second-value">
        <li class="second-tip">
          <span class="tip-com left">项目名称</span>
          <span class="tip-com com-end-time right">发布时间</span>
          <span class="tip-com second-area right">所在地</span>
        </li>
        <li class="second-dataList" v-for="(item,index) in getIndexTableList">
          <el-tooltip :content="item.name" placement="top" effect="light">
            <a href="#" @click="goHallOptions(item.id,0)" class="dataList-value left" v-text="item.name"></a>
          </el-tooltip>
          <span class="dataList-end-time right" v-text="item.releaseDate"></span>
          <p class="dataList-area right"><span style="display: inline-block;width: 112px;" v-text="item.province"></span></p>
          <div class="right">
            <span v-if="!item.infoTypeMinName==''">
              <span @click="resultObj(item.infoType,item.infoTypeMin)" class="btnff6600" v-if="item.infoType == '1'">
                <el-button type="danger" size="mini" round v-text="item.infoTypeMinName"></el-button>
              </span>
              <span @click="resultObj(item.infoType,item.infoTypeMin)" class="btn37b66a" v-else-if="item.infoType == '2'">
                <el-button type="success" size="mini" round v-text="item.infoTypeMinName"></el-button>
              </span>
              <span @click="resultObj(item.infoType,item.infoTypeMin)" class="btnff9c00" v-else-if="item.infoType == '3'">
                <el-button type="warning" size="mini" round v-text="item.infoTypeMinName"></el-button>
              </span>
            </span>
            <span>
                <span class="btn2baaec">
                  <el-button @click="proAreaClick1(item.industry)" v-if="!item.industryName==''" type="primary" size="mini" round v-text="item.industryName"></el-button>
                </span>
              <!--<el-button type="primary" size="mini" round v-text="item.businessTypeName"></el-button>-->
              </span>
          </div>
        </li>
        <li class="more">
          <a @click="resultObj('','')" href="#" class="more-font">+ 查看更多</a>
        </li>
      </div>
      <!--招标大厅-->
      <!--政策解读-->
      <div class="second-title">
        <div class="title-border">
          <p class="title-top title-com">政策解读</p>
          <p class="title-bottom title-com">Policy interpretation</p>
        </div>
      </div>
      <div class="tabList">
        <div class="tabList-nav">
          <li :class='{ tabListActive : index == lastMovePI }' v-for="(item,index) in tabListPI" v-text="item.name" @click="tabListClickPI(item.index,index)"></li>
        </div>
      </div>
      <div class="second-value">
        <li class="second-tip">
          <span class="tip-com left">项目名称</span>
          <span class="tip-com second-area right">来源</span>
        </li>
        <li class="second-dataList" v-for="(item,index) in getIndexTableListPI">
          <el-tooltip :content="item.name" placement="top" effect="light">
            <a href="#" @click="matchClick(item.id,1)" class="dataList-value left" v-text="item.name"></a>
          </el-tooltip>
          <span class="dataList-time left" v-text="item.releaseDate"></span>
          <el-tooltip :content="item.sourceName" placement="top" effect="light">
            <p class="dataList-area addCSSover right" v-text="item.sourceName"></p>
          </el-tooltip>
        </li>
        <li class="more">
          <a @click="resultObj1()" href="#" class="more-font">+ 查看更多</a>
        </li>
      </div>
      <!--政策解读-->
    </div>
    <!--广告位-->
    <div class="AdPositionId">
      <div class="AdPositionId-div">
        <a href="http://www.ugschool.cn" target="view_window"><img src="../../../static/home_footer_banner.jpg" alt="优格实战学院"></a>
      </div>
    </div>
    <!--广告位-->
  </div>
</template>

<script>
  import axios from 'axios'
  import searchList from '../../components/searchList/searchList.vue'
  import { mapActions,mapGetters } from 'vuex'
  export default {
    name: 'index',
    data () {
      return {
        lastMove:0,
        lastMovePI:0,
        noticeList:[],
        noticeHallList:[],
        policyList:[],
        tabListBH:[
          {
            name:'招标公告',
            index:'2',
          },
          {
            name:'招标结果',
            index:'3',
          },
          {
            name:'招标信用信息',
            index:'4',
          },
          {
            name:'拟建项目',
            index:'1',
          },
        ],
        tabListPI:[
          {
            name:'政策法规',
            index:'1',
          },
          {
            name:'专家观点',
            index:'2',
          },
          {
            name:'行情分析',
            index:'3',
          },
          {
            name:'行业新闻',
            index:'0',
          },
        ],
        tabListActive:'tabListActive',
      }
    },
    //定义这个sweiper对象
    computed: {
      ...mapGetters([
          'getIsLogin',
          'getAPIState',
          'getUserDB',
          'getSeachObject',
          'getIndexData',
          'getIndexTableList',
          'getIndexTableListPI'
      ]),
    },
    mounted () {
      this.updateNavListIndex(1);
      var isLoginState = window.localStorage.getItem('userDB');
      if(isLoginState){
        this.update_UserDB(JSON.parse(isLoginState));
        this.update_IsLogin(true);
      }
      this.initData();
      this.tabListClick('2',0);
      this.tabListClickPI('1',0);
      this.update_Search(true);
    },
    methods: {
      ...mapActions([
          'update_Search',
          'updateNoticeInfo',
          'updateMatchList',
          'updateShowDrawOFF',
          'updateSearchObject',
          'update_UserDB',
          'updateNavListIndex',
          'update_IsLogin',
          'updatePolicyObject',
          'updateIndexData',
          'updateIndexTableList',
          'updateIndexTableListPI',
          'updatePersonalDB'
      ]),
      companyCheck:function(){
        if(this.getIsLogin){
          this.updatePersonalDB({userId:this.getUserDB.userId});
        }else{
          this.updateShowDrawOFF(true);
        }
      },
      /*标签click*/
      resultObj:function(infoType,infoTypeMin){
        this.updateSearchObject({infoType:infoType,infoTypeMin:infoTypeMin});
        this.$router.push({path:'/search'})
      },
      /*标签click*/
      resultObj1:function(){
        this.updateNavListIndex(4);
        this.$router.push({path:'/policy'})
      },
      /*最新发布*/
      initData:function(){
        this.updateIndexData({total:'0', count:'7', userId:this.getUserDB.userId,});
      },
      /*招标大厅*/
      tabListClick:function(index,num){
        this.lastMove = num;
        this.updateIndexTableList({total:'0', count:'7', infoType:index, userId:this.getUserDB.userId,});
      },
      /*政策解读*/
      tabListClickPI:function(index,num){
        var self = this;
        this.lastMovePI = num;
        this.updateIndexTableListPI({total:'0', count:'7', type:index,userId:this.getUserDB.userId,});
      },
      /*政策解读-路由跳转*/
      matchClick:function(id,type){
        var self = this;
        if(self.getIsLogin){
          this.recordHistory(id,type,this.getUserDB.userId);
          this.updateMatchList({id:id,userId:this.getUserDB.userId});
        }else{
          self.updateShowDrawOFF(true);
        }
      },
      /*span标签点击-政策*/
      proAreaClick1:function(val){
        this.updateSearchObject({total:'0',industry:val});
        this.$router.push({path:'/search'})
      },
      /*路由-招标详情*/
      goHallOptions:function(id,type){
        var self = this;
        if(self.getIsLogin){
          this.recordHistory(id,type,self.getUserDB.userId);
          this.updateNoticeInfo({id:id,userId:self.getUserDB.userId});
        }else{
          self.updateShowDrawOFF(true);
        }
      },
    },
    components:{
      axios,
      searchList
    }
  }
</script>

<style scoped>
  .com-end-time {
    text-align: center;
    width: 84px;
  }
  .second-title {
    background: #f0f5f7;
    width: 100%;
    height: 114px;
  }
  .title-com {
    text-align: center;
    margin: 0 auto;
    padding: 0 20px;
    background: #f0f5f7;
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
    text-align: center;
    width: 112px;
  }
  .dataList-area {
    text-align: center;
    color: #333;
    font-size: 14px;
    width: 112px;
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
  .tipPush {
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
  .tabListActive {
    background: #fff;
    color: #333 !important;
    border-top: 2px solid #00bffe;
  }
  .picList {
    padding: 30px 0;
    text-align: center;
    background: #ffffff;
    width: 100%;
  }
  .picList li {
    width: 400px;
    height: 84px;
  }
  .picList1200px {
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
    width: 1200px;
  }
  .picList1200px span {
    vertical-align: middle;
    display: inline-block;
  }
  .textPicList p {
    margin-left: 10px;
  }
  .textPicList p:first-child {
    font-weight: 500;
    font-size: 21px;
    color: #00bffe;
  }
  .textPicList p:last-child {
    font-size: 14px;
    color: #999;
  }
  .borderLF {
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
  }
  .AdPositionId {
    padding-top: 30px;
    padding-bottom: 50px;
    background: #f0f5f7;
    text-align: center;
    width: 100%;
  }
  .AdPositionId-div {
    font-size: 20px;
    line-height: 80px;
    cursor: pointer;
    margin: 0 auto;
    width: 1200px;
    height: 80px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .companyCheck {
    top: 200px;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    transition: .5s;
    color: #fff;
    font-size: 16px;
    border: 2px solid #fff;
    border-radius: 50px;
    background: rgba(0,0,0,0);
    position: absolute;
    width: 200px;
    height: 50px;
  }
  .companyCheck:hover {
    background: rgba(0,0,0,.2);
  }
</style>

