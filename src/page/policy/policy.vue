<template>
  <div class="policy">
    <div class="w1024">
      <div style="overflow: hidden;">
        <li class="policyL left">搜索信息</li>
        <li class="policyR right">
          <el-input
            @keyup.enter.native="searchBtn"
            placeholder="政策信息"
            v-model="searchObject.search">
            <i slot="suffix" @click="searchBtn" class="el-input__icon el-icon-search"></i>
          </el-input>
        </li>
      </div>
      <!--搜索条件-->
      <div class="policySearchList">
        <div class="searchNav">
          <p>信息类型 :</p>
          <div class="overFlow left w873px">
            <li @click="proAreaClick('','')" :class="{activityClass:'adus'==getpolicyObjectAdd}" class="searchNavList left" v-text="'不限'"></li>
            <li @click="proAreaClick(item.industry)" :class="{activityClass:index==getpolicyObjectAdd}" class="searchNavList left" v-for="(item,index) in proArea" v-text="item.industryName"></li>
          </div>
        </div>
        <div class="searchNav">
          <p>发布时间 :</p>
          <div class="overFlow left w873px">
            <li @click="addTimeClick(item.value,index)" :class="{activityClass:index==addTimeIndex}" class="searchNavList left" v-for="(item,index) in addTime" v-text="item.name"></li>
          </div>
        </div>
      </div>
      <div class="policyTips">
        <p class="searchTips left">政策法规<span class="numText"></span></p>
        <!--<p class="match right">-->
          <!--<el-select v-model="match" placeholder="请选择">-->
            <!--<el-option key="20%" label="20%" value="20%"></el-option>-->
            <!--<el-option key="50%" label="50%" value="50%"></el-option>-->
            <!--<el-option key="80%" label="80%" value="80%"></el-option>-->
          <!--</el-select>-->
        <!--</p>-->
      </div>
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
          <el-button @click="proAreaClick1(item.industry)" type="primary" size="mini" round v-text="item.industryName"></el-button>
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
      <!--分页-->
      <div class="searchPage">
        <el-pagination
          @current-change="handleSizeChange"
          :current-page.sync="currentPageIndex"
          layout="prev, pager, next"
          :page-size='20'
          :total="counts">
        </el-pagination>
      </div>
      <!--分页-->
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapActions,mapGetters } from 'vuex'
  import matchList from '../../components/matchList/matchList.vue'
  export default {
    name: 'policy',
    data () {
      return {
        currentPageIndex:1,
        stringText:"",
        addTimeIndex:'',
        match:'',
        counts:0,
        matchList:'',
        proArea:[],
        addTime:[
          {
            name:'不限',
            value:'',
          },
          {
            name:'今天',
            value:'0',
          },
          {
            name:'近一周',
            value:'7',
          },
          {
            name:'近一个月',
            value:'30',
          },
          {
            name:'近一年',
            value:'365',
          },
        ],
        searchObject:{
          total:'0',
          count:'20',
          search:'',
          time:'',
          policyType:'',
          infoType:'',
          infoTypeMin:'',
          industry:'',
          userId:'',
        },
        search:'',
      }
    },
    //定义这个sweiper对象
    computed: {
      ...mapGetters([
        'getAPIState',
        'getUserDB',
        'getpolicyObject',
        'getpolicyObjectAdd',
        'getIsLogin'
      ]),
    },
    mounted () {
      this.updateNavListIndex(4);
      this.update_Search(false);
      var self = this;
      this.searchObject.userId = this.getUserDB.userId;
      /*初始化行业查询*/
      axios.post(self.getAPIState+'industryList')
        .then(function (obj) {
          var obj = obj.data.data;
          if(obj.result == '0'){
              self.proArea = obj.industryList;
          }
        }).catch(function (error) {
      });
      /*初始化查询*/
      this.searchBtn();
    },
    methods: {
      ...mapActions([
        'update_Search',
        'updatePolicyObject',
        'updateMatchList',
        'updateShowDrawOFF',
        'updateNavListIndex'
      ]),
      searchBtn:function(){
        var self = this;
        self.updatePolicyObject({search:self.searchObject.search})
        axios.post(self.getAPIState+'searchPolicyList', JSON.stringify(self.getpolicyObject))
          .then(function (obj) {
            var obj = obj.data.data;
            if(obj.result == '0'){
                self.matchList = obj.searchPolicyList;
                self.counts = obj.counts;
            }
          }).catch(function (error) {
        });
      },
      /*发布时间查询    */
      addTimeClick:function(val,index){
        this.addTimeIndex = index;
        this.updatePolicyObject({total:'0',time:val});
        this.currentPageIndex = 1;
        this.searchBtn();
      },
      /*信息类型查询*/
      proAreaClick:function(val,val1){
        this.updatePolicyObject({total:'0',policyType:val,industry:val1});
        this.currentPageIndex = 1;
        this.searchBtn();
      },
      proAreaClick1:function(val){
        this.updatePolicyObject({total:'0',industry:val})
        this.currentPageIndex = 1;
        this.searchBtn();
      },
      handleSizeChange:function(val) {
        window.scrollTo(0,0);
        this.updatePolicyObject({total:JSON.stringify((val - 1) * 20)})
        this.searchBtn();
      },
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
      matchList,
    }
  }
</script>

<style scoped>
  .policy {
    background: #f0f5f7;
  }
  .w1024 {
    margin: 0 auto;
    width: 1200px;
  }
  .policyL {
    padding-top: 30px;
    padding-bottom: 20px;
    font-size: 24px;
    color: #333;
  }
  .policyR {
    padding-top: 30px;
    padding-bottom: 20px;
  }
  .policySearchList {
    margin: 0 auto;
    padding: 30px 20px;
    box-sizing: border-box;
    background: #fff;
    width: 1200px;
  }
  .searchNav {
    overflow: hidden;
  }
  .searchNav p {
    float: left;
    color: #999;
    font-size: 14px;
    width: 70px;
  }
  .policySearchList .searchNav:first-child {
    margin-bottom: 30px;
  }
  .policySearchList .searchNavList {
    cursor: pointer;
    font-size: 14px;
    margin-left: 25px;
    color: #333;
  }
  .policySearchList .searchNavList:hover{
    color: #00bffe;
  }
  .w873px {
    width: 873px;
  }
  .searchTips {
    margin: 30px auto 20px;
    padding-left: 10px;
    box-sizing: border-box;
    border-left: 3px solid #00bffe;
    font-size: 18px;
    color: #333;
  }
  .searchPage {
    margin-top: 40px;
    padding-bottom: 65px;
    text-align: center;
  }
  .numText {
    font-size: 14px;
    color: #999;
  }
  .policyTips {
    overflow: hidden;
  }
  .match {
    padding-top: 30px;
    padding-bottom: 20px;
  }
  /*


  */
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

