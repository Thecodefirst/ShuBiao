<template>
  <div id="noticeInfo"
     element-loading-text="拼命加载中"
     v-loading.fullscreen.lock="getFullscreenLoading">
    <!--alert-代写标书-->
    <div class="alert-noticeInfo">
      <el-dialog
        :title="dialogVisibleText"
        :visible.sync="dialogVisible"
        width="30%">
        <p class="alert-com-p">服务暂未开通，感谢您的关注</p>
        <p class="alert-com-p">详情可联系客服，客服电话：<span>0431-81854515</span></p>
      </el-dialog>
    </div>
    <!--标题-->
    <p class="headerLine">
      <span class="height20px"></span>
      <span  v-text="getNoticeDB.noticeInfo[0].name"></span>
    </p>
    <!--标题-->
    <div class="w1024px">
      <div :class=" onoff ? w734px : w910px " class="left">
        <div class="notic-title">
          <span class="noticPic left">
            <img class="imgCom" src="../../assets/img/time.png" alt="时间">
          </span>
          <span v-if=" getNoticeDB.noticeInfo[0].bidDate == '已结束' " class="noticTitleText left">
            <span class="buleText">{{  getNoticeDB.noticeInfo[0].bidDate }}</span>
          </span>
          <span v-else-if=" getNoticeDB.noticeInfo[0].bidDate == '' " class="noticTitleText left">
            <span class="buleText">未知</span>
          </span>
          <span v-else class="noticTitleText left">
            距离交标书还有<span class="buleText">{{  getNoticeDB.noticeInfo[0].bidDate }}天</span>
            时间
          </span>
          <div class="collect">
            <span class="collectPic">
              <vue-star animate="animated rubberBand" color="#F05654">
                <img @click="collectPro" slot="icon" class="imgCom" :src=" getNoticeDB.collect ? star_blue : star_gray " alt="收藏">
              </vue-star>
            </span>
            <span :class=" getNoticeDB.collect ? collectTextHover : '' " class="collectText right" v-text="getNoticeDB.collectText"></span>
          </div>
        </div>
        <div class="notic-btn-List">
          <li v-show="getNoticeDB.noticeInfo[0].province !== ''" class="colorff6500"><el-button type="warning" round size="mini" v-text="getNoticeDB.noticeInfo[0].province"></el-button></li>
          <li>
            <el-button @click="resultObject(getNoticeDB.noticeInfo[0].infoType,getNoticeDB.noticeInfo[0].infoTypeMin)" v-if="getNoticeDB.noticeInfo[0].infoType == '1'" type="danger" size="mini" round v-text="getNoticeDB.noticeInfo[0].infoTypeMinName"></el-button>
            <el-button @click="resultObject(getNoticeDB.noticeInfo[0].infoType,getNoticeDB.noticeInfo[0].infoTypeMin)" v-else-if="getNoticeDB.noticeInfo[0].infoType == '2'" type="success" size="mini" round v-text="getNoticeDB.noticeInfo[0].infoTypeMinName"></el-button>
            <el-button @click="resultObject(getNoticeDB.noticeInfo[0].infoType,getNoticeDB.noticeInfo[0].infoTypeMin)" v-else-if="getNoticeDB.noticeInfo[0].infoType == '3'" type="warning" size="mini" round v-text="getNoticeDB.noticeInfo[0].infoTypeMinName"></el-button>
          </li>
          <li>
            <el-button @click="proAreaClick1(getNoticeDB.noticeInfo[0].industry)" type="primary" size="mini" round v-text="getNoticeDB.noticeInfo[0].industryName"></el-button>
          </li>
          <li class="releaseDate" v-text="getNoticeDB.noticeInfo[0].releaseDate"></li>
          <p class="clickNum right">
            <span v-if="getNoticeDB.clickNum > 50" class="hotImg">
              <img class="imgCom" src="../../../static/hot1.png" alt="">
            </span>
            <span style="color: #909399">浏览次数：{{getNoticeDB.clickNum}}</span>
          </p>
        </div>
        <div class="titleList">
          <li v-show="getNoticeDB.noticeInfo[0].code !== ''" class="pad-TB-20px">招标编码：{{ getNoticeDB.noticeInfo[0].code }}</li>
          <li v-show="getNoticeDB.noticeInfo[0].name !== ''" class="pad-TB-20px">招标名称：{{ getNoticeDB.noticeInfo[0].name }}</li>
          <li v-show="getNoticeDB.noticeInfo[0].contactsName !== ''" class="pad-TB-20px">采购联系人：{{ getNoticeDB.noticeInfo[0].contactsName }}</li>
          <li v-show="getNoticeDB.noticeInfo[0].contactsPhone !== ''" class="pad-TB-20px">采购联系人电话：{{ getNoticeDB.noticeInfo[0].contactsPhone }}</li>
          <!--<li v-show="getNoticeDB.noticeInfo[0].contactsName !== ''">采购联系人传真号：{{ getNoticeDB.noticeInfo[0].contactsName }}</li>
          <li v-show="getNoticeDB.noticeInfo[0].contactsName !== ''">采购联系人Email：{{ getNoticeDB.noticeInfo[0].contactsName }}</li>-->
        </div>
        <div style="width: 100%;overflow: hidden" class="headerLine font20px">
          <span class="height20px"></span>
          <span>公告概要</span>
          <button v-show="!getNoticeDB.noticeInfo[0].content == ''" class="lookOptions" @click="openLookOptions">查看公告详情</button>
        </div>
        <div class="textValue">
          <div class="addBottomText">
            <p class="com-p-textValue">公告信息</p>
            <li v-for="(item,index) in getNoticeIntroduction.noticeList">
              <span v-text="item.name"></span>
              <span v-text="item.value"></span>
            </li>
          </div>
          <div>
          <!--<div style="margin-bottom: 60px">-->
            <p class="com-p-textValue">联系人及联系方式</p>
            <li v-for="(item,index) in getNoticeIntroduction.contactList">
              <span v-text="item.name"></span>
              <span v-text="item.value"></span>
            </li>
          </div>
        </div>
        <div :class=" onoff ? '' : w1200px " class="textBtn">
          <a v-show="getNoticeDB.noticeInfo[0].currentUrl !== ''" :href="getNoticeDB.noticeInfo[0].currentUrl" target="view_window"><li><el-button size="small" round>查看原文</el-button></li></a>
          <a v-show="getNoticeDB.noticeInfo[0].attachmentUrl !== ''" :href="getNoticeDB.noticeInfo[0].attachmentUrl" target="view_window"><li><el-button size="small" round>下载文档</el-button></li></a>
        </div>
        <!--<p v-show="!onoff" class="headerLine2 addBackColor">
          <span class="height20px"></span>
          <span>推荐供应商</span>
        </p>-->
        <!--<div v-show="!onoff" class="searchTags">
          <p class="searchTitle">搜索信息</p>
          <div class="searchNav">
            <p>项目地区 :</p>
            <div class="overFlow left w873px">
              <li @click="proAreaClick('','adus')" :class="{activityClass:'adus'==proAreaIndex}" class="searchNavList left" v-text="'全国'"></li>
              <li @click="proAreaClick(item.name,index)" :class="{activityClass:index==proAreaIndex}" class="searchNavList left" v-for="(item,index) in proArea" v-text="item.name"></li>
            </div>
          </div>
          <div class="searchNav">
            <p >行业 :</p>
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
                <el-select v-if="selectBusiness !== '' " v-model="selectChildBusiness" placeholder="选择行业" @change="selectChildChange">
                  <el-option
                    v-for="item in selectChildList"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </li>
            </div>
          </div>
        </div>-->
        <!--相关企业-->
        <div v-show="!getFirmList.length == '0'" class="headerLine addBackColor">
          <span class="height20px"></span>
          <span>相关企业</span>
        </div>
        <div v-show="!getFirmList.length == '0'" style="overflow: hidden;margin: 0 auto 40px;">
          <div :class=" onoff ? w879px : w1000px ">
            <!--pic-->
            <div class="SED-title">
              <div class="borderBottom" v-for="(item,index) in getFirmList">
                <div style="overflow: hidden">
                  <p class="companyName left" v-text="item.name"></p>
                  <p class="companyBtn right">
                    <!--<router-link to="/businessCard"><el-button type="primary" round>企业名片</el-button></router-link>-->
                    <el-button @click="businessCard(item.firmId)" type="primary" round>企业名片</el-button>
                  </p>
                  <!--<p class="companyBtn1 right">
                    &lt;!&ndash;<router-link to="/businessCard"><el-button type="primary" round>企业名片</el-button></router-link>&ndash;&gt;
                    <el-button type="info" round>联系企业</el-button>
                  </p>-->
                </div>
                <div class="SED-com-div">
                  <li>
                    <span>法人代表</span>：
                    <span v-text="item.legalPerson"></span>
                  </li>
                  <li>
                    <span>注册时间</span>：
                    <span v-text="item.registerDate"></span>
                  </li>
                  <li>
                    <span>注册资本</span>：
                    <span v-text="item.registerCapital"></span>
                  </li>
                </div>
                <div class="SED-com-div">
                  <li>
                    <span>联系电话</span>：
                    <span v-text="item.telephone"></span>
                  </li>
                  <li>
                    <span>邮箱</span>：
                    <span v-text="item.email"></span>
                  </li>
                  <li>
                    <span>公司地址</span>：
                    <el-tooltip :content="item.address" placement="bottom" effect="light">
                      <span v-text="item.address"></span>
                    </el-tooltip>
                  </li>
                </div>
                <div class="SED-com-div add-SED-color">
                  <li v-text="item1" v-for="(item1,index) in item.range"></li>
                </div>
              </div>
            </div>
            <!--pic-->
          </div>
        </div>
        <!--相关企业-->
        <!--<div style="width: 1200px;background: #f0f5f7;height: 20px;width: 100%;"></div>-->
        <!--相关文章-->
        <div v-show="!getNoticeDB.noticeList.length == '0'" class="otherList">
          <li v-if="onoff" class="searchTips SEDw879"><span style="color: #333" v-text="getNoticeDB.noticeInfo[0].purchasingOrg"></span>的其他信息</li>
          <li v-else class="searchTips SEDw879">相关文章</li>
          <div class="SEDw879 addBottom">
            <li class="second-dataList" v-for="(item,index) in getNoticeDB.noticeList">
              <el-tooltip :content="item.name" placement="top" effect="light">
                <a style="cursor: pointer" @click="goHallOptions(item.id,0)" class="dataList-value left" v-text="item.name"></a>
              </el-tooltip>
              <span class="dataList-time left" v-text="item.releaseDate"></span>
              <p class="dataList-area marginRight54px right" v-text="item.province"></p>
              <div class="btnTips right">
                <span v-if="!item.infoTypeMinName == '' ">
                  <span @click="resultObject(item.infoType,item.infoTypeMin)" class="btnff6600" v-if="item.infoType == '1'">
                    <el-button type="danger" size="mini" round v-text="item.infoTypeMinName"></el-button>
                  </span>
                  <span @click="resultObject(item.infoType,item.infoTypeMin)" class="btn37b66a" v-else-if="item.infoType == '2'">
                    <el-button type="success" size="mini" round v-text="item.infoTypeMinName"></el-button>
                  </span>
                  <span @click="resultObject(item.infoType,item.infoTypeMin)" class="btnff9c00" v-else-if="item.infoType == '3'">
                    <el-button  type="warning" size="mini" round v-text="item.infoTypeMinName"></el-button>
                  </span>
                </span>
                <span>
                  <span @click="proAreaClick1(item.industry)" class="btn2baaec">
                    <el-button v-if="!item.industryName == ''" type="primary" size="mini" round v-text="item.industryName"></el-button>
                  </span>
                  <!--<el-button type="primary" size="mini" round v-text="item.businessTypeName"></el-button>-->
                </span>
              </div>
            </li>
          </div>
        </div>
        <!--相关文章-->
      </div>
      <div v-show="onoff" class="right">
        <!--查看分析报告 1-12开会隐藏-->
        <!--<p class="lookBtn">
          &lt;!&ndash;analysis&ndash;&gt;
          <el-button icon="el-icon-tickets"  @click="lookReport(getNoticeInfo.noticeInfo[0].id)" size="small" round>查看分析报告</el-button>
        </p>-->
        <articl :dataList="articlList" :noticeOptionId="$route.query.id" :linked="linkedP"></articl>
        <p style="height: 10px;"></p>
        <articl :dataList="articlList1" :noticeOptionId="$route.query.id" :linked="linkedP"></articl>
        <div class="othersService">
          <li>其他服务</li>
          <li>
            <span class="othersServicePic">
              <img class="imgCom" :src="bidinPic" alt="代写标书">
            </span>
            <span class="othersText" @click="dialogVisibleClick('代写标书')">代写标书</span>
          </li>
          <li>
            <span class="othersServicePic">
              <img class="imgCom" :src="justicePic" alt="法务咨询">
            </span>
            <span class="othersText" @click="dialogVisibleClick('法务咨询')">法务咨询</span>
          </li>
        </div>
        <!--招募供应商 1-12开会隐藏-->
        <!--<div class="rsService">
          <p class="rsServiceTip">招募供应商</p>
          <div class="recruitingSuppliers">
            <li v-for="(item,index) in rsDB">
              <p class="rs-p" v-text="item.name"></p>
              <p class="rs-p2">报名截止时间：{{ item.time }}</p>
            </li>
          </div>
        </div>-->
        <div class="advertising">
          <a href="http://www.ugschool.cn" target="view_window"><img class="imgCom" src="../../../static/details_banner02.jpg" alt="优格实战学院"></a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import bidinGgray from '../../assets/img/biding-document_gray.png'
  import bidinBlue from '../../assets/img/biding-document_blue.png'
  import justiceGray from '../../assets/img/justice_gray.png'
  import justiceBlue from '../../assets/img/justice_blue.png'
  import articl from '../../components/articl/articl.vue'
  import searchList from '../../components/searchList/searchList.vue'
  import star_gray from '../../assets/img/star_gray.png'
  import star_blue from '../../assets/img/star_blue.png'
  import { mapActions,mapGetters } from 'vuex'
  export default {
    name: 'noticeInfo',
    data () {
      return {
        fullscreenLoading:false,
        dialogVisibleText:'',
        userDB:'',
        DB:'',
        SEDw879:'SEDw879',
        SEDw1000:'SEDw1000',
        w879px:'w879px',
        w1000px:'w1000px',
        proArea:[],
        selectList:[],
        selectChildList:[],
        selectBusiness:'',
        selectChildBusiness:'',
        proAreaIndex:'adus',
        searchObject:{
          total:'0',
          count:'20',
          search:'',
          time:'',
          adderss:'',
          infoType:'',
          infoTypeMin:'',
          industry:'',
          userId:'',
        },
        searchOFF:true,
        linkedP:'/policy',
        dialogVisible:false,
        collectText:'收藏',
        star_gray:star_gray,
        star_blue:star_blue,
        collectTextHover:'collectTextHover',
        w734px:'w734px',
        w910px:'w910px',
        w1200px:'w1200px',
        bidinPic:bidinGgray,
        justicePic:justiceGray,
        articlList:[
          {
            name:'相关政策法规',
            value:'1'
          },
          {
            name:'行业新闻',
            value:'0'
          },
        ],
        articlList1:[
          {
            name:'专家观点',
            value:'2'
          },
          {
            name:'行情分析',
            value:'3'
          },
        ],
        collect:false,
        searchResult:'',
        rsDB:[
          {
            name:'龙蟒百丽连集团股份有限公司对绿化管理绿化管理绿化管理',
            time:'2017-12-30',
          },
          {
            name:'东阿县南湖行知学校绿化工程',
            time:'2017-12-20',
          },
          {
            name:'龙蟒百丽连集团股份有限公司对绿化管理绿化管理绿化管理',
            time:'2017-12-30',
          },
          {
            name:'东阿县南湖行知学校绿化工程',
            time:'2017-12-20',
          },
          {
            name:'龙蟒百丽连集团股份有限公司对绿化管理绿化管理绿化管理',
            time:'2017-12-30',
          },
          {
            name:'东阿县南湖行知学校绿化工程',
            time:'2017-12-20',
          },
          {
            name:'龙蟒百丽连集团股份有限公司对绿化管理绿化管理绿化管理',
            time:'2017-12-30',
          },

        ],
        apiDB:{
          id:'',
          userId:'',
        },
      }
    },
    //定义这个sweiper对象
    computed: {
      ...mapGetters([
          'getAPIState',
          'getUserDB',
          'getIsLogin',
          'getNoticeDB',
          'getFullscreenLoading',
          'getFirmList',
          'getNoticeIntroduction'
      ]),
      onoff(){
        if(this.getNoticeDB.noticeInfo[0].infoType == '3'){
          return false;
        }else{
          return true;
        }
      },
    },
    mounted () {
      var self = this;
      window.addEventListener('scroll', function(){
        if(self.$route.path == '/noticeInfo'){
          self.updateNoticeTitle(window.scrollY > 120);
        }else{
          self.updateNoticeTitle(false);
        }
      });
      self.updateFullscreenLoading(true);
      var isLoginState = window.localStorage.getItem('userDB');
      if(isLoginState) {
        this.update_UserDB(JSON.parse(isLoginState));
        this.userDB = JSON.parse(isLoginState);
      }else if(this.getIsLogin){
        this.userDB = this.getUserDB;
        this.update_IsLogin(true);
        this.updateShowDrawOFF(false);
      }else{
        this.openMessage('warning','请先登录');
        this.update_IsLogin(false);
        this.updateShowDrawOFF(true);
        this.$router.push({path:'/index'});
        return false;
      }
      if(this.$route.query.id !== null && this.$route.query.userId !== null){
        if(this.$route.query.userId == this.userDB.userId){
            this.apiDB = {id:this.$route.query.id,userId:this.$route.query.userId};
            /**/
            this.updateNoticeDB(this.apiDB);
            /*初始化行业查询*/
            //self.initSearchScreening();
            /*初始化公告概要*/
            self.updateNoticeIntroduction({noticeId:self.$route.query.id});
            /*相关企业*/
            self.updateFirmList({id:self.$route.query.id});
            /*收藏初始化*/
            /**/
        }else{
          self.openMessage('warning','当前登录用户与推送用户不符，请重新登录');
          self.$router.push({path:'/index'});
        }
      }
    },
    methods: {
      ...mapActions([
          'updateNoticeInfo',
          'updateLookReport',
          'updateSearchObject',
          'updateCompanyOptions',
          'update_IsLogin',
          'updateShowDrawOFF',
          'update_UserDB',
          'updateNoticeDB',
          'updatePolicyObject',
          'updateFullscreenLoading',
          'updateNoticeTitle',
          'updateFirmList',
          'updateNoticeIntroduction'
      ]),
      /*span标签点击-政策*/
      proAreaClick1:function(val){
        this.updateSearchObject({total:'0',industry:val});
        this.$router.push({path:'/search'})
      },
      /*alert*/
      dialogVisibleClick:function(value){
          this.dialogVisibleText = value;
          this.dialogVisible = true;
      },
      /*打开公告详情*/
      openLookOptions:function(){
        var self = this;
        self.$alert('<div class="alertCSS">'+self.getNoticeDB.noticeInfo[0].content+'</div>', '', {
          dangerouslyUseHTMLString: true,
          closeOnClickModal:true,
          closeOnPressEscape:true,
        });
      },
      /*初始化行业查询*/
      initSearchScreening:function(){
        var self = this;
        /*初始化行业查询*/
        axios.post(this.getAPIState+'searchScreening')
          .then(function (obj) {
            var obj = obj.data.data;
            if(obj.result == '0'){
              self.proArea = obj.areaList;
              self.moldList = obj.infoTypeList;
              self.selectList = obj.businessList;
              self.selectChange();
            }
          }).catch(function (error) {
        });
      },
      /*标签click*/
      resultObject:function(infoType,infoTypeMin){
        this.updateSearchObject({infoType:infoType,infoTypeMin:infoTypeMin});
        this.$router.push({path:'/search'})
      },
      /*收藏*/
      collectPro:function(){
        var self = this;
        var data = {
          type:'0',
          userId:self.getUserDB.userId,
          id:self.getNoticeDB.noticeInfo[0].id
        }
        axios.post(self.getAPIState+'addCollect', JSON.stringify(data))
          .then(function (obj) {
            var obj = obj.data.data;
              if(obj.result == '0'){
                self.updateNoticeDB({id:self.getNoticeDB.noticeInfo[0].id,userId:self.getUserDB.userId});
              }
          }).catch(function (error) {
        });
      },
      /*分析报告*/
      lookReport:function(id){
        this.updateLookReport({userId:this.getUserDB.userId,id:id});
      },
      /*项目地区查询*/
      proAreaClick:function(val,index){
        this.proAreaIndex = index;
        this.searchObject.address = val;
      },
      /*添加子行业*/
      selectChange:function(){
        var self = this;
        if(self.selectBusiness == ''){
          self.searchObject.infoTypeMin = '';
        }
        axios.post(self.getAPIState+'childBusiness', JSON.stringify({id:self.selectBusiness}))
          .then(function (obj) {
            var obj = obj.data.data;
            if(obj.result == '0'){
              self.searchObject.infoTypeMin = '';
              self.selectChildBusiness = '';
              self.searchObject.industry = self.selectBusiness;
              self.selectChildList = obj.businessList;
            }else{
              self.searchObject.infoTypeMin = '';
              self.selectChildBusiness = '';
              self.searchObject.industry = '';
              self.selectChildList = [];
            }
          }).catch(function (error) {
        });
      },
      /*子行业选择*/
      selectChildChange:function(){
        this.searchObject.infoTypeMin = this.selectChildBusiness;
      },
      /*路由-招标详情*/
      goHallOptions:function(id,type){
        var self = this;
        self.recordHistory(id,type,this.getUserDB.userId);
        self.updateNoticeInfo({id:id,userId:this.getUserDB.userId});
        self.updateNoticeDB({id:id,userId:this.getUserDB.userId});
        self.updateNoticeIntroduction({id:id});
        self.updateFirmList({id:id});
      },
      /*跳转企业名片*/
      businessCard:function(id){
        this.updateCompanyOptions({ firmId:id });
      },
      /*message*/
      openMessage:function(state,value){
        this.$message({
          showClose: true,
          message: value,
          type: state
        });
      },
    },
    components:{
      axios,
      articl,
      searchList,
    }
  }
</script>

<style scoped>
  #noticeInfo {
    background: #f0f5f7;
  }
  .addBackColor {
    padding:20px 0 !important;
    background: #f0f5f7;
  }
  .w734px {
    width: 910px;
  }
  .w879px {
    float: left;
    box-sizing: border-box;
    padding: 20px;
    margin: 20px auto 0;
    background: #fff;
    width: 910px;
  }
  .w910px {
    overflow: hidden;
    background: #fff;
    width: 1200px;
  }
  .w1000px {
    box-sizing: border-box;
    padding: 20px;
    margin: 20px auto 0;
    background: #fff;
    width: 1200px;
  }
  .SEDw879 {
    background: #ffffff;
    float: left;
    width: 910px !important;
  }
  .SEDw1000 {
    background: #ffffff;
    float: left;
    width: 1000px !important;
  }
  .w1024px {
    overflow: hidden;
    margin: 0 auto;
    padding-bottom: 60px;
    width: 1200px;
  }
  /*border-left: 4px solid #00bffe;*/
  .headerLine {
    box-sizing: border-box;
    font-size: 22px;
    font-weight: 600;
    font-synthesis: style;
    line-height: 32px;
    color: #1a1a1a;

    /*font-size: 24px;*/
    /*color: #333;*/
    margin: 0 auto;
    padding: 30px 0;
    width: 1200px;
  }
  .headerLine2 {
    box-sizing: border-box;
    font-size: 18px;
    color: #333;
    margin: 0 auto;
    padding: 20px 0;
    width: 1200px;
  }
  .headerLine2 span {
    vertical-align: middle;
    display: inline-block;
    line-height: 24px;
    height: 24px;
  }
  .height20px {
    display: inline-block;
    border-left: 4px solid #00bffe;
    margin-right: 17px;
    height: 20px;
  }
  .headerLine span {
    vertical-align: middle;
  }
  .noticPic {
    vertical-align: middle;
    margin-top: 4px;
    display: inline-block;
    width: 18px;
    height: 18px;
  }
  .notic-title {
    position: relative;
    overflow: hidden;
    padding: 20px;
  }
  .buleText {
    font-size: 18px;
    display: inline-block;
    color: #ed5541!important;
  }
  .noticTitleText {
    display: inline-block;
    margin-left: 10px;
    font-size: 14px;
    color: #999;
  }
  .collect {
    position: relative;
    right: 10px;
    cursor: pointer;
    display: inline-block;
    position: absolute;
  }
  .collectPic {
    left: -67px;
    top: -39px;
    position: absolute;
    display: inline-block;
    width: 100px;
    height: 100px;
  }
  .collectText {
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    color: #999;
  }
  /*7d85c6*/
  .collectTextHover {
    color: #00bffe !important;
  }
  .notic-btn-List {
    overflow: hidden;
    box-sizing: border-box;
    padding: 0 20px 20px;
  }
  .notic-btn-List li {
    margin-right: 6px;
    float: left;
  }
  .releaseDate {
    line-height: 28px;
    font-size: 14px;
    color: #999;
  }
  .rightBtn {
    float: right !important;
    margin-right: 0 !important;
  }
  .titleList {
    box-sizing: border-box;
    border-bottom: 1px solid #f5f5f5;
    border-top: 1px solid #f5f5f5;
    padding: 20px;
    overflow: hidden;
    width: 910px;
  }
  .titleList li {
    overflow: hidden;
    margin-right: 10px;
    text-overflow:ellipsis;
    white-space: nowrap;
    font-size: 14px;
    color: #333;
    float: left;
    width: 420px;
  }
  .pad-TB-20px {
    padding-bottom: 20px;
  }
  .font20px {
    padding-top: 20px !important;
    padding-bottom: 20px !important;
    font-size: 20px;
  }
  .textValue {
    box-sizing: border-box;
    padding: 0 20px;
    font-size: 14px;
    color: #333;
    line-height: 36px;
  }
  .textBtn {
    background: #f0f5f7;
    padding-top: 20px;
    padding-bottom: 20px;
    /*margin: 0 auto;*/
    width: 910px;
    overflow: hidden;
  }
  .textBtn li {
    margin-right: 10px;
    float: left;
  }
  .textBtn .el-button {
    font-size: 14px;
    width: 120px;
    height: 36px;
  }
  .otherList {
    overflow: hidden;
    margin: 0 auto;
    width: 1200px;
  }
  .searchTips {
    background: #fff;
    border-bottom: 1px solid #f5f5f5;
    line-height: 57px;
    font-size: 18px;
    color: #999;
    height: 57px;
  }
  .rsService {
    text-align: center;
    font-size: 16px;
    margin-top: 10px;
    background: #ffffff;
    width: 280px;
  }
  .rsServiceTip {
    font-size: 16px;
    border-bottom: 1px solid #ddd;
    padding: 20px;
  }
  .recruitingSuppliers {
    text-align: left;
    font-size: 14px;
  }
  .recruitingSuppliers li {
    border-bottom: 1px dashed #ddd;
    padding: 30px 20px;
  }
  .rs-p {
    cursor: pointer;
    font-size: 16px;
    color: #333;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .rs-p:hover {
    color: #00bffe;
  }
  .rs-p2 {
    margin-top: 10px;
    color: #999;
  }
  .othersService {
    text-align: center;
    font-size: 16px;
    color: #999;
    margin-top: 10px;
    background: #ffffff;
    width: 280px;
  }
  .othersService li {
    cursor: pointer;
    border-bottom: 2px solid #f5f5f5;
    padding: 20px;
  }
  .othersServicePic {
    vertical-align: middle;
    display: inline-block;
    width: 20px;
    height: 20px;
  }
  .othersText {
    vertical-align: middle;
  }
  .othersService li:first-child {
    color: #333;
  }
  .lookBtn {
    margin-bottom: 10px;
  }
  .lookBtn .el-button {
    border-color: #00bffe;
    color: #00bffe;
    font-size: 16px;
    border-radius: 50px;
    width: 280px;
    height: 60px;
  }
  .w1200px {
    width: 1200px;
  }
  .alert-com-p {
    margin-bottom: 10px;
    text-align: center;
    color: #999;
    font-size: 16px;
  }
  .alert-com-p span {
    color: #00bffe;
  }

  /**/
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
    font-size: 14px;
    width: 70px;
  }
  .searchTags .searchNavList {
    cursor: pointer;
    font-size: 14px;
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
  .searchPage {
    margin-top: 40px;
    padding-bottom: 65px;
    text-align: center;
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



  /*

  */
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
  .addBottom {
    margin-bottom: 20px;
  }
  .advertising {
    cursor: pointer;
    color: #333;
    font-size: 16px;
    text-align: center;
    line-height:400px;
    margin-top: 10px;
    width: 280px;
    height: 400px;
  }
  .recruitingSuppliers li:last-child {
    border-bottom: none;
  }
  .com-p-textValue {
    color: #00bffe;
    font-size: 14px;
  }
  .addBottomText {
    margin-bottom: 20px;
    border-bottom: 1px solid #ddd;
  }
  .textValue li span {
    line-height: 50px;
    vertical-align: middle;
    color: #333;
    font-size: 14px;
  }
  .textValue li span:first-child {
    display: inline-block;
    width: 150px;
  }
  .textValue li span:last-child {
    display: inline-block;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    width: 600px;
  }
  .textValue div {
    padding-left: 10px;
  }
  .lookOptions {
    margin-right: 20px;
    float: right;
    color: #fff;
    background: #2baaec;
    border-radius: 50px;
    display: inline-block;
    width: 100px;
    height: 25px;
  }

  .SED {
    box-sizing: border-box;
    padding: 30px 20px;
    background: #fff;
    width: 910px;
  }
  .SED-title {
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    box-sizing: border-box;
  }
  .companyName {
    font-size: 18px;
    color: #333;
  }
  .companyBtn {
    margin-left: 5px;
  }
  .companyBtn .el-button {
    border-color: #00bffe;
    background: #00bffe;
    padding: 0;
    width: 84px;
    height: 26px;
  }
  .companyBtn1 .el-button {
    padding: 0;
    width: 84px;
    height: 26px;
  }
  .SED-com-div {
    margin-top: 12px;
    overflow: hidden;
    font-size: 14px;
    color: #999;
  }
  .SED-com-div li {
    float: left;
  }
  .SED-com-div li span:first-child {
    vertical-align: middle;
    display: inline-block;
    width: 60px;
  }
  .SED-com-div li span:last-child {
    vertical-align: middle;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    display: inline-block;
    width: 200px;
  }
  .add-SED-color {
    color: #00bffe !important;
  }
  .add-SED-color li {
    border-right: 1px solid #00bffe;
    box-sizing: border-box;
    padding: 0 20px;
    color: #00bffe !important;
  }
  .add-SED-color li:first-child {
    padding-left: 0;
  }
  .add-SED-color li:last-child {
    border-right: none;
  }
  .borderBottom {
    padding-top: 30px;
    padding-bottom: 30px;
    border-bottom: 1px solid #dfdfdf;
  }
  .SED-title .borderBottom:first-child {
    padding-top: 0;
  }
  .SED-title .borderBottom:last-child {
    border-bottom: none;
  }
  .searchTips {
    box-sizing: border-box;
    padding-left: 20px;
  }
  .notic-title,.notic-btn-List,.titleList,.textValue {
    background: #fff;
  }
  .clickNum {
    font-size: 14px;
  }
  .hotImg {
    width: 45px;
    height: 26px;
  }
  .clickNum span {
    display: inline-block;
    vertical-align: middle;
  }
</style>

