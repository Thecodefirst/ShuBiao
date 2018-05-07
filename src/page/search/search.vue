<template>
  <div id="search"
       element-loading-text="拼命加载中"
       v-loading.fullscreen.lock="fullscreenLoading">
    <!--<el-popover
      ref="popover4"
      placement="bottom-start"
      width="711"
      trigger="click">
      <div class="areaList">
        <div class="areaLeft left">
          <li @click="selectAddress('')">全国</li>
          <li @click="selectAddress('rmcs')">热门城市</li>
          <li @click="selectAddress(JSON.stringify(item.id))" v-for="(item,index) in province" v-text="item.name"></li>
        </div>
        <div class="areaRight left">
          <div style="padding-left: 10px;box-sizing: border-box;margin-bottom: 20px" v-for="(item,index) in areaChildList">
            <p @click="childAreaClick(item.name,'')" v-text="item.name"></p>
            <div class="areaRight-Child">
              <li @click="childAreaClick(item.name,item1.name)" v-for="(item1,index) in item.child" v-text="item1.name"></li>
            </div>
          </div>
        </div>
      </div>
    </el-popover>-->
    <!--搜索-->
    <div class="tabSearch">
      <p>
        <span :class=" searchOFF == true ? 'fontColorB':'' " @click="searchClick(true)">高级搜索</span>
        <span :class=" searchOFF == false ? 'fontColorB':'' " @click="searchClick(false)" >中标企业搜索</span>
      </p>
      <el-input
        v-if="searchOFF"
        @keyup.enter.native="enterSearch"
        placeholder="招标信息"
        v-model="searchObject.search">
        <i slot="suffix" @click="enterSearch" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-input
        v-else
        @keyup.enter.native="companySearch"
        placeholder="中标企业搜索"
        v-model="searchCompany.search">
        <i slot="suffix" @click="companySearch" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>
    <div v-if="searchOFF">
      <!--搜索条件-->
      <div class="searchTags">
        <p class="searchTitle">搜索信息</p>
        <div class="searchNav">
          <p>发布时间 :</p>
          <div class="overFlow left w873px">
            <li @click="addTimeClick(item.value,index)" :class="{activityClass:index==addTimeIndex}" class="searchNavList left" v-for="(item,index) in addTime" v-text="item.name"></li>
          </div>
        </div>
        <div class="searchNav searchArea">
          <p>项目地区 :</p>
          <div class="overFlow left w873px">
            <li @click="selectAddress('','adus')"
                :class="{activityClass:'adus'==proAreaIndex}"
                class="searchNavList left" v-text="'全国'"></li>
            <div :class="{activityClass:index==proAreaIndex}"
                class="searchNavList left" v-for="(item,index) in province">
              <el-popover
                placement="right"
                width="500"
                trigger="click"
                content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                <div class="areaRight left">
                  <div style="padding-left: 10px;box-sizing: border-box;margin-bottom: 20px" v-for="(item,index) in areaChildList">
                    <p @click="childAreaClick(item.name,'')" v-text="item.name"></p>
                    <div class="areaRight-Child">
                      <li @click="childAreaClick(item.name,item1.name)" v-for="(item1,index) in item.child" v-text="item1.name"></li>
                    </div>
                  </div>
                </div>
                <span
                  @click="selectAddress(JSON.stringify(item.id),index)"
                  slot="reference"
                  v-text="item.name"></span>
              </el-popover>
            </div>
            <!--<div class="input-areaList">
              <el-input size="mini" v-model="areaListCom" suffix-icon="el-icon-arrow-down" v-popover:popover4 placeholder="请输入内容"></el-input>
            </div>-->
          </div>
        </div>
        <div class="searchNav">
          <p>类型 :</p>
          <div class="overFlow left w873px">
            <li @click="moldListClick(item.infoType,item.index,index)" :class="{activityClass:item.infoType==getSeachObject.infoType}" class="searchNavList left" v-for="(item,index) in moldList" v-text="item.infoTypeName"></li>
          </div>
        </div>
        <div class="searchNav">
          <p>行业 :</p>
          <div class="overFlow left w873px">
            <li class="searchNavList left">
              <el-select v-model="selectBusiness" placeholder="选择行业" @change="selectChange">
                <el-option
                  key="全部行业"
                  label="全部行业"
                  value="">
                </el-option>
                <el-option
                  v-for="item in selectList"
                  :key="item.name"
                  :label="item.nickname"
                  :value="item.id">
                </el-option>
              </el-select>
              <!--<el-select v-if="selectBusiness !== '' " v-model="selectChildBusiness" placeholder="选择行业" @change="selectChildChange">
                <el-option
                  v-for="item in selectChildList"
                  :key="item.name"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>-->
            </li>
          </div>
        </div>
      </div>
      <!--标题-->
      <p class="searchTips">最新招标信息</p>
      <!--搜索结果组件-->
      <div class="second-value">
        <li class="second-tip">
          <span class="tip-com left">项目名称</span>
          <span class="tip-com com-end-time right">投标截止时间</span>
          <span class="tip-com second-area marginRight54px right">所在地</span>
        </li>
        <li @mouseover="searchEnter(index)" class="second-dataList" :class='{ colorGrice : index == mouseIndex }' v-for="(item,index) in searchResult">
          <el-tooltip :content="item.name" placement="top" effect="light">
            <a href="#" @click="goHallOptions(item.id,0)" class="dataList-value left" v-text="item.name"></a>
          </el-tooltip>
          <span class="dataList-time left" v-text="item.releaseDate"></span>
          <p class="dataList-end-time right" v-if="item.bidDate == '已结束'"><span style="color: #00bffe" v-text="item.bidDate"></span></p>
          <p class="dataList-end-time right" v-else-if="item.bidDate == ''"><span style="color: #333">未知</span></p>
          <p class="dataList-end-time right" v-else>还剩<span style="color: #00bffe" v-text="item.bidDate"></span>天</p>
          <p class="dataList-area marginRight54px right"><span style="display: inline-block;width: 112px;" v-text="item.province"></span></p>
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
              <el-button @click="proAreaClick1(item.industry)" v-if="!item.industryName == ''" type="primary" size="mini" round v-text="item.industryName"></el-button>
            </span>
          </span>
          </div>
        </li>
      </div>
    </div>
    <div v-else class="w1200px">
      <p class="searchTips">中标企业</p>
      <div class="related">
        <li>
          <p class="left">企业名称</p>
          <p class="color999 right">发布时间</p>
        </li>
        <li @mouseover="searchEnter(index)" :class='{ colorGrice : index == mouseIndex }' class="relatedValue" v-for="(item,index) in searchResult">
          <p @click="routerLinkedCompany(item.companyId,item.companyName)" class="left" v-text="item.companyName"></p>
          <p class="color999 right" v-text="item.createDate"></p>
        </li>
      </div>
    </div>
    <!--搜索分页-->
    <div class="searchPage">
      <el-pagination
        @current-change="handleSizeChange"
        layout="prev, pager, next"
        :page-size='20'
        :current-page.sync="currentPageIndex"
        :total="totleLength">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import { mapActions,mapGetters } from 'vuex'
  export default {
    name: 'search',
    data () {
      return {
        areaList:'',
        currentPageIndex:1,
        fullscreenLoading:false,
        addTimeIndex:'',
        proAreaIndex:'adus',
        activityClass:'activityClass',
        searchOFF:true,
        selectBusiness:'',
        selectChildBusiness:'',
        selectList:[],
        selectChildList:[],
        totleLength:0,
        searchValue:'',
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
        proArea:[],
        moldList:[],
        searchResult:[],
        searchObject:{
          total:'0',
          count:'20',
          search:'',
          time:'',
          adderss:'',
          infoType:'',
          infoTypeMin:'',
          industry:'',
          industryMin:'',
          userId:'',
        },
        searchCompany:{
          total:'0',
          count:'20',
          search:'',
        },
        itemIndex:'0',
        province:'',
        areaChildList:'',
        aeraA:'',
        aeraB:'',
        aeraC:'',

        mouseIndex:'',
        colorGrice:'colorGrice',

        areaInit: [
           {name:'北京市'},
           {name:'上海市'},
           {name:'广州市'},
           {name:'深圳市'},
           {name:'天津市'},
           {name:'成都市'},
           {name:'苏州市'},
           {name:'杭州市'},
           {name:'重庆市'},
           {name:'武汉市'},
           {name:'沈阳市'},
           {name:'大连市'},
           {name:'南京市'},
           {name:'长沙市'},
           {name:'郑州市'},
           {name:'青岛市'},
           {name:'西安市'},
           {name:'无锡市'},
           {name:'济南市'},
           {name:'宁波市'},
           {name:'佛山市'},
           {name:'长春市'},
           {name:'福州市'},
           {name:'烟台市'},
        ]
      }
    },
    //定义这个sweiper对象
    computed: {
      ...mapGetters([
          'getAPIState',
          'getSearch',
          'getIsLogin',
          'getUserDB',
          'getSeachObject'
      ]),
      areaListCom:function(){
         return this.aeraA + this.aeraB + this.aeraC;
      }
    },
    mounted () {
      this.updateNavListIndex(3);
      this.update_Search(false);
      this.searchObject.search = this.getSeachObject.search;
      this.searchObject.userId = this.getUserDB.userId;
      this.init_selectAddress('');
      var self = this;
      /*初始化行业查询*/
      axios.post(this.getAPIState+'searchScreening').then(function (obj) {
          var obj = obj.data.data;
          if(obj.result == '0'){
            self.moldList = obj.infoTypeList;
            self.selectList = obj.businessList;
            //self.selectChange();
          }
        }).catch(function (error) {
      });
      self.searchBtn();
    },
    methods: {
      ...mapActions([
        'update_Search',
        'update_UserDB',
        'updateNoticeInfo',
        'updateShowDrawOFF',
        'updateSearchObject',
        'updatePolicyObject',
        'updateCompanyDynamics',
        'updateNavListIndex'
      ]),
      proAreaClick1:function(val){
        this.updateSearchObject({total:'0',industry:val});
        this.searchBtn();
        this.requestPro();
      },
      /*企业动态*/
      routerLinkedCompany:function(id,name){
        var self = this;
        if(self.getIsLogin){
          sessionStorage.setItem('companyOptionsAPI',JSON.stringify({name:name,id:id}))
          this.updateCompanyDynamics({ id:id,total:'0',count:'20' })
        }else{
          self.updateShowDrawOFF(true);
        }
      },
      /**/
      childAreaClick:function(city,county){
        this.updateSearchObject({total:'0',city:city,county:county});
        this.aeraB = city;
        this.aeraC = county;
        this.currentPageIndex = 0;
        //this.searchBtn();
//        this.requestPro();
      },
      /*鼠标事件*/
      searchEnter:function(index){
        this.mouseIndex = index;
      },
      /*初始化地址*/
      init_selectAddress:function(id){
        var self = this;
        axios.post(self.getAPIState+'selectAddress', JSON.stringify({id:id}))
          .then(function (obj) {
            var obj = obj.data.data;
            if(obj.result == '0'){
                self.currentPageIndex = 1;
                self.province = obj.areaList;
                self.aeraA = '全国';
                self.aeraB = '';
                self.aeraC = '';
            }
          }).catch(function (error) {
        });
      },
      /*地址-列表*/
      selectAddress:function(id,index){
        var self = this;
        axios.post(self.getAPIState+'selectAddress', JSON.stringify({id:id}))
          .then(function (obj) {
              var obj = obj.data.data;
              if(obj.result == '0'){
                if(id == '') {
                  self.province = obj.areaList;
                  self.aeraA = '全国';
                  self.aeraB = '';
                  self.aeraC = '';
                  self.updateSearchObject({total: '0', address: "", city: "", county: ""});
                }else{
                  self.areaChildList = obj.areaList[0].child;
                  self.updateSearchObject({total:'0',address:obj.areaList[0].fullName,city:"",county:""});
                  self.aeraA = obj.areaList[0].fullName;
                  self.aeraB = '';
                  self.aeraC = '';
                }
                self.currentPageIndex = 1;
                self.proAreaIndex = index;
                self.searchBtn();
              }
          }).catch(function (error) {
        });
      },
      /*标签点击搜索*/
      resultObj:function(infoType,infoTypeMin){
        this.updateSearchObject({total:'0',infoType:infoType,infoTypeMin:infoTypeMin});
        this.currentPageIndex = 1;
        this.searchBtn();
        //this.requestPro();
      },
      /*发布时间查询    */
      addTimeClick:function(val,index){
        this.updateSearchObject({total:'0',time:val});
        this.currentPageIndex = 1;
        this.addTimeIndex = index;
        this.searchBtn();
        //this.requestPro();
      },
      /*项目地区查询*/
      /*proAreaClick:function(val,index){
        this.updateSearchObject({total:'0',address:val});
        this.currentPageIndex = 1;
        this.proAreaIndex = index;
        this.searchBtn();
        //this.requestPro();
      },*/
      /*类型查询*/
      moldListClick:function(val,itemIndex,index){
        if(val == '0'){
          this.updateSearchObject({total:'0',infoType:val,infoTypeMin:'',industry:''});
        }else{
          this.updateSearchObject({total:'0',infoType:val,infoTypeMin:'',});
        }
        this.itemIndex = itemIndex,
        this.currentPageIndex = 1;
        this.searchBtn();
        //this.requestPro();
      },
      /*招标-高级搜索*/
      enterSearch:function(){
        this.updateSearchObject({search:this.searchObject.search});
        this.currentPageIndex = 1;
        this.searchBtn();
      },
      /*com-search*/
      searchBtn:function(){
        var self = this;
        self.fullscreenLoading = true;
        axios.post(self.getAPIState+'searchNoticeList', JSON.stringify(self.getSeachObject))
          .then(function (obj) {
            var obj = obj.data.data;
            if(obj.result == '0'){
              self.searchResult = obj.searchList;
              self.fullscreenLoading = false;
              self.requestPro();
            }
          }).catch(function (error) {
        });
      },
      /*请求分页*/
      requestPro:function(){
        var self = this;
        axios.post(self.getAPIState+'searchNoticeCount', JSON.stringify(self.getSeachObject))
          .then(function (obj) {
            var obj = obj.data.data;
            if(obj.result == '0'){
              self.totleLength = obj.counts;
              self.fullscreenLoading = false;
            }
          }).catch(function (error) {
        });
      },
      /*分页*/
      handleSizeChange(val) {
          var self = this;
          window.scrollTo(0,0);
          if(self.searchOFF){
            this.updateSearchObject({total:JSON.stringify((val - 1) * 20)});
            this.searchBtn();
          }else{
            this.searchCompany.total = JSON.stringify((val - 1) * 20);
            this.companySearch();
          }
      },
      /*添加子行业*/
      selectChange:function(){
        var self = this;
        if(self.selectBusiness == ''){
          this.updateSearchObject({infoTypeMin:''});
        }
        axios.post(self.getAPIState+'childBusiness', JSON.stringify({id:self.selectBusiness}))
          .then(function (obj) {
            var obj = obj.data.data;
            if(obj.result == '0'){
              self.updateSearchObject({infoTypeMin:'',industry:self.selectBusiness});
              self.selectChildBusiness = '';
              self.selectChildList = obj.businessList;
              self.searchBtn();
              self.requestPro();
            }else{
              self.updateSearchObject({infoTypeMin:'',industry:''});
              self.selectChildBusiness = '';
              self.selectChildList = [];
              self.searchBtn();
              self.requestPro();
            }
          }).catch(function (error) {
        });
      },
      /*子行业选择*/
      selectChildChange:function(){
        this.updateSearchObject({infoTypeMin:this.selectChildBusiness});
        this.searchBtn();
        this.requestPro();
      },
      /*切换搜索*/
      searchClick:function(OFF){
        var self = this;
        self.fullscreenLoading = true;
        self.searchOFF = OFF;
        if(OFF){
          self.updateSearchObject({
            total:'0',
            count:'20',
            search:'',
            time:'',
            adderss:'',
            infoType:'',
            infoTypeMin:'',
            industry:'',
            industryMin:'',
            userId:'',
          });
          self.searchBtn();
        }else{
            self.searchCompany = {
            total:'0',
              count:'20',
              search:'',
            },
            self.companySearch();
        }
      },
      /*中标企业搜索*/
      companySearch:function(){
        var self = this;
        axios.post(self.getAPIState+'searchCompany', JSON.stringify(self.searchCompany))
          .then(function (obj) {
            var obj = obj.data.data;
            if(obj.result == '0'){
              self.searchResult = obj.searchList;
              self.totleLength = obj.counts;
              self.fullscreenLoading = false;
            }
          }).catch(function (error) {
        });
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
    },
    components:{
      axios,
    }
  }
</script>

<style scoped>
  #search {
    background-color: #f0f5f7;
  }
  .tabSearch {
    margin: 0 auto;
    padding-top: 30px;
    padding-bottom: 30px;
    width: 340px;
  }
  .tabSearch p {
    cursor: pointer;
    font-size: 14px;
    color: #999;
    margin-bottom: 10px;
  }
  .tabSearch p span:hover {
    color: #00bffe;
  }
  .tabSearch span:nth-child(1){
    margin-left: 12px;
  }
  .tabSearch span:nth-child(2){
    margin-left: 24px;
  }
  .searchTags {
    margin: 0 auto;
    padding: 30px 20px;
    box-sizing: border-box;
    background: #fff;
    width: 1200px;
  }
  .searchTitle {
    font-size: 16px;
  }
  .searchNav {
    overflow: hidden;
    margin-top: 30px;
  }
  .searchNav p {
    float: left;
    color: #999;
    font-size: 15px;
    width: 70px;
  }
  .searchTags .searchNavList {
    cursor: pointer;
    font-size: 15px;
    margin-left: 25px;
    margin-bottom: 20px;
    color: #333;
  }
  .searchTags .searchNavList:hover{
    color: #00bffe;
  }
  .w873px {
    width: 1000px;
  }
  .searchTips {
    margin: 30px auto 20px;
    padding-left: 10px;
    box-sizing: border-box;
    border-left: 3px solid #00bffe;
    font-size: 18px;
    color: #333;
    width: 1200px;
  }
  .searchPage {
    margin-top: 40px;
    padding-bottom: 65px;
    text-align: center;
  }
  .policyTitle {
    color: #333;
    font-size: 24px;
    padding-top: 30px;
    padding-bottom: 20px;
  }
  .related {
    background: #fff;
  }
  .related li {
    transition: .5s;
    overflow: hidden;
    font-size: 16px;
    color: #333;
    margin: 0 auto;
    padding: 20px;
    border-bottom: 1px dashed #ddd;
    width: 1200px;
    box-sizing: border-box;
  }
  .related li:last-child {
    border-bottom: none;
  }
  .related .relatedValue:hover {
    cursor: pointer;
    color: #00bffe;
  }
  .color999 {
    color: #999;
  }
  .w1200px {
    margin: 0 auto;
    width: 1200px;
  }
  .fontColorB {
    transition: .5s;
    font-size: 16px;
    color: #00bffe;
  }

  /**
  /
   */
  /*颜色集合*/
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
    transition: .5s;
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
    line-height: 26px;
  }
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
  .second-dataList a:hover {
    color: #00bffe;
  }
  .areaList {
    overflow: hidden;
    background: #ffffff;
    width: 711px;
    height: 234px;
  }
  .input-areaList {
    margin-left: 23px;
    width: 200px;
  }
  /*areaList*/
  .areaLeft {
    overflow-y: scroll;
    border-right: 1px solid #ddd;
    width: 132px;
    height: 234px;
  }
  /*::-webkit-scrollbar{
    display:none;
  }*/
  .areaLeft li {
    color: #333;
    font-size: 14px;
    margin-bottom: 15px;
  }
  .areaLeft li:hover {
    cursor: pointer;
    color: #00bffe;
  }
  .areaRight {
    font-size: 14px;
    color: #333;
    overflow-y: scroll;
    height: 234px;
    width: 540px;
  }
  .areaRight p:hover {
    cursor: pointer;
    color: #00bffe;
  }
  .areaRight-Child {
    overflow: hidden;
    position: relative;
  }
  .areaRight-Child li {
    margin-left: 10px;
    margin-bottom: 10px;
    float: left;
  }
  .areaRight-Child li:hover {
    cursor: pointer;
    color: #00bffe;
  }
  .areaRight p {
    color: #999;
    margin-bottom: 10px;
  }
  /*areaList*/
</style>

