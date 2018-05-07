<template>
  <div class="second">
    <!--气泡-->
    <a @click="personalCenter">
      <div class="tipPopers">
        完成企业认证可以使推送数据更精准O(∩_∩)O快去认证吧
      </div>
    </a>
    <!--招标订阅-->
    <div class="second-title-tender">
      <div class="title-border">
        <p class="title-top title-com">招标订阅</p>
        <p class="title-bottom title-com">Bidding and subscribing</p>
      </div>
    </div>
    <!--招标订阅btn-list-->
    <div class="tender-btnNav">
      <li class="left"><button :class='{ tenderActivity : 1 == tenderIndex }' class="tender-com-btn" @click="updateTS">更新推送</button></li>
      <div class="margin20px left" @mouseenter="show3 = true" @mouseleave="show3 = false">
        <button class="tender-com-btn" @click="" :class='{tenderActivity : 2 == tenderIndex || 3 == tenderIndex }' round>我的收藏</button>
        <div class="myCollection left" style="position: absolute" @mouseenter="show3 = true" @mouseleave="show3 = false">
          <el-collapse-transition>
            <div style="overflow: hidden;text-align: center" v-show="show3">
              <li><button :class='{ tenderActivity : 2 == tenderIndex }' class="tender-com-btn" round @click="collectionZB">招标信息</button></li>
              <li><button :class='{ tenderActivity : 3 == tenderIndex }' class="tender-com-btn" round @click="collectionZC">政策解读</button></li>
            </div>
          </el-collapse-transition>
        </div>
      </div>
      <li class="left"><button :class='{ tenderActivity : 4 == tenderIndex }' class="tender-com-btn" round @click="concerned">已关注企业</button></li>
    </div>
    <!--更新推送-->
    <div v-show="tabNavNum == 1"
         element-loading-text="拼命加载中"
         v-loading.fullscreen.lock="fullscreenLoading">
      <div class="tabList">
        <div class="tabList-nav">
          <li v-show="!collectionOFF" :class='{ tabListActive : index == lastMove }' v-for="(item,index) in tabListBH" v-text="item.name" @click="tabListClick(item.index,index)"></li>
        </div>
      </div>
      <!--列表-招标公告-->
      <div v-if="lastMove == '0'" class="second-value">
        <div v-if="noticeHallList.length == '0'" class="noDBClass">
          <span style="width: 300px;height: 300px;display: inline-block">
            <img class="imgCom" src="../../assets/img/nodb.png" alt="数据暂时为空">
          </span>
        </div>
        <div v-else>
          <!--列表-tab切换及编辑操作按钮-->
          <li class="second-tip">
          <span class="tip-com left" v-show="!editOFF">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"></el-checkbox>
          </span>
            <span class="tip-com left">项目名称</span>
            <span class="tip-com com-end-time right">投标截止时间</span>
            <span class="tip-com second-area marginRight54px right">所在地</span>
          </li>
          <el-checkbox-group v-model="checkList" @change="handleCheckedChange">
            <li class="second-dataList" v-for="(item,index) in noticeHallList">
            <span v-show="!editOFF" class="left">
              <el-checkbox :label="item.id" :key="item.id"></el-checkbox>
            </span>
            <el-tooltip :content="item.name" placement="top" effect="light">
              <a href="#" @click="goHallOptions(item.id,0)" class="dataList-value left" v-text="item.name"></a>
            </el-tooltip>
            <span class="dataList-time left" v-text="item.releaseDate"></span>
            <p class="dataList-end-time right" v-if="item.bidDate == '已结束'"><span style="color: #00bffe" v-text="item.bidDate"></span></p>
              <p class="dataList-end-time right" v-else-if="item.bidDate == ''"><span style="color: #333">未知</span></p>
            <p class="dataList-end-time right" v-else>还剩<span style="color: #00bffe" v-text="item.bidDate"></span>天</p>
            <p class="dataList-area marginRight54px right" v-text="item.province"></p>
            <div class="btnTips right">
              <span @click="resultObj(item.infoType,item.infoTypeMin)" class="btnff6600" v-if="item.infoType == '1'">
                <el-button type="danger" size="mini" round v-text="item.infoTypeMinName"></el-button>
              </span>
              <span @click="resultObj(item.infoType,item.infoTypeMin)" class="btn37b66a" v-else-if="item.infoType == '2'">
                <el-button type="success" size="mini" round v-text="item.infoTypeMinName"></el-button>
              </span>
              <span @click="resultObj(item.infoType,item.infoTypeMin)" class="btnff9c00" v-else-if="item.infoType == '3'">
                <el-button type="warning" size="mini" round v-text="item.infoTypeMinName"></el-button>
              </span>
              <span @click="proAreaClick1(item.industry)" class="btn2baaec" style="margin-left: 5px">
                <el-button type="primary" size="mini" round v-text="item.industryName"></el-button>
              </span>
              <!--<el-button type="primary" size="mini" round v-text="item.businessTypeName"></el-button>-->
              </div>
            </li>
          </el-checkbox-group>
          <div class="more">
            <a @click="resultObj('','')" href="#" class="more-font">+ 查看更多</a>
          </div>
        </div>
      </div>
      <!--列表-招标其他-->
      <div v-else class="second-value">
        <div v-if="noticeHallList.length == '0'" class="noDBClass">
          <span style="width: 300px;height: 300px;display: inline-block">
            <img class="imgCom" src="../../assets/img/nodb.png" alt="数据暂时为空">
          </span>
        </div>
        <div v-else>
          <li class="second-tip">
            <span class="tip-com left">项目名称</span>
            <span class="tip-com second-area right">所在地</span>
          </li>
          <li class="second-dataList" v-for="(item,index) in noticeHallList">
            <el-tooltip :content="item.name" placement="top" effect="light">
              <a href="#" @click="goHallOptions(item.id,0)" class="dataList-value left" v-text="item.name"></a>
            </el-tooltip>
            <span class="dataList-time left" v-text="item.releaseDate"></span>
            <p class="dataList-area right" v-text="item.province"></p>
            <div class="btnTips right">
            <span @click="resultObj(item.infoType,item.infoTypeMin)" class="btnff6600" v-if="item.infoType == '1'">
              <el-button type="danger" size="mini" round v-text="item.infoTypeMinName"></el-button>
            </span>
            <span @click="resultObj(item.infoType,item.infoTypeMin)" class="btn37b66a" v-else-if="item.infoType == '2'">
              <el-button type="success" size="mini" round v-text="item.infoTypeMinName"></el-button>
            </span>
            <span @click="resultObj(item.infoType,item.infoTypeMin)" class="btnff9c00" v-else-if="item.infoType == '3'">
              <el-button type="warning" size="mini" round v-text="item.infoTypeMinName"></el-button>
            </span>
            <span @click="proAreaClick1(item.industry)" class="btn2baaec" v-show="item.industryName !== ''" style="margin-left: 5px">
              <el-button type="primary" size="mini" round v-text="item.industryName"></el-button>
            </span>
              <!--<el-button type="primary" size="mini" round v-text="item.businessTypeName"></el-button>-->
            </div>
          </li>
          <div class="more">
            <a @click="resultObj('','')" href="#" class="more-font">+ 查看更多</a>
          </div>
        </div>
      </div>
    </div>
    <!--收藏-招标订阅-->
    <div v-show="tabNavNum == 4">
      <div v-show="!noticeHallList2.length == '0'" class="tabList">
        <div class="tabList-nav">
          <span v-show="collectionOFF">
                <span v-if="editOFF" class="edit right" @click="editOFF = false">编辑</span>
                <span v-else class="edit right">
                  <span class="edit" @click="deleteNotice">删除</span>
                  <span class="edit" @click="editOFF = true">取消</span>
                </span>
              </span>
        </div>
      </div>
      <div v-if="lastMove == '0'" class="second-value">
        <div v-if="noticeHallList2.length == '0'" class="noDBClass">
          <span style="width: 300px;height: 300px;display: inline-block">
            <img class="imgCom" src="../../assets/img/nodb.png" alt="数据暂时为空">
          </span>
        </div>
        <div v-else>
          <!--列表-tab切换及编辑操作按钮-->
          <li class="second-tip">
          <span class="tip-com left" v-show="!editOFF">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"></el-checkbox>
          </span>
            <span class="tip-com left">项目名称</span>
            <span class="tip-com com-end-time right">投标截止时间</span>
            <span class="tip-com second-area marginRight54px right">所在地</span>
          </li>
          <el-checkbox-group v-model="checkList" @change="handleCheckedChange">
            <li class="second-dataList" v-for="(item,index) in noticeHallList2">
          <span v-show="!editOFF" class="left">
            <el-checkbox :label="item.id" :key="item.id"></el-checkbox>
          </span>
              <el-tooltip :content="item.name" placement="top" effect="light">
                <a href="#" @click="goHallOptions(item.id,0)" class="dataList-value left" v-text="item.name"></a>
              </el-tooltip>
              <span class="dataList-time left" v-text="item.releaseDate"></span>
              <p class="dataList-end-time right" v-if="item.bidDate == '已结束'"><span style="color: #00bffe" v-text="item.bidDate"></span></p>
              <p class="dataList-end-time right" v-else-if="item.bidDate == ''"><span style="color: #333">未知</span></p>
              <p class="dataList-end-time right" v-else>还剩<span style="color: #00bffe" v-text="item.bidDate"></span>天</p>
              <p class="dataList-area marginRight54px right" v-text="item.province"></p>
              <div class="btnTips right">
              <span @click="resultObj(item.infoType,item.infoTypeMin)" v-if="item.infoType == '1'">
                <el-button type="danger" size="mini" round v-text="item.infoTypeMinName"></el-button>
              </span>
              <span @click="resultObj(item.infoType,item.infoTypeMin)" v-else-if="item.infoType == '2'">
                <el-button type="success" size="mini" round v-text="item.infoTypeMinName"></el-button>
              </span>
              <span @click="resultObj(item.infoType,item.infoTypeMin)" v-else-if="item.infoType == '3'">
                <el-button type="warning" size="mini" round v-text="item.infoTypeMinName"></el-button>
              </span>
              <span @click="proAreaClick1(item.industry)" style="margin-left: 5px">
                <el-button type="primary" size="mini" round v-text="item.industryName"></el-button>
              </span>
                <!--<el-button type="primary" size="mini" round v-text="item.businessTypeName"></el-button>-->
              </div>
            </li>
          </el-checkbox-group>
          <div class="more">
            <a @click="resultObj('','')" href="#" class="more-font">+ 查看更多</a>
          </div>
        </div>
      </div>
    </div>
    <!--收藏-政策解读-->
    <div class="div1024px" v-show="tabNavNum == 2">
      <div v-if="noticeHallList2.length == '0'" class="noDBClass">
        <span style="width: 300px;height: 300px;display: inline-block">
          <img class="imgCom" src="../../assets/img/nodb.png" alt="数据暂时为空">
        </span>
      </div>
      <div v-else class="matchList">
          <div class="tabList">
            <div class="tabList-nav">
            <span class="tip-com left" v-show="!editOFF">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"></el-checkbox>
            </span>
              <span v-show="collectionOFF">
              <span v-if="editOFF" class="edit right" @click="editOFF = false">编辑</span>
              <span v-else class="edit right">
                <span class="edit" @click="deleteNotice">删除</span>
                <span class="edit" @click="editOFF = true">取消</span>
              </span>
            </span>
          </div>
          <el-checkbox-group v-model="checkList" @change="handleCheckedChange">
            <div class="forMatch" v-for="(item,index) in noticeHallList2">
              <span v-show="!editOFF" class="matchListGroup left">
                <el-checkbox :label="item.id" :key="item.id"></el-checkbox>
              </span>
              <p @click="matchClick(item.id)" class="matchTitle left">
                <span v-text="item.name"></span>
              </p>
              <div class="btnTips left">
                <span>
                  <el-button v-if="item.infoTypeMin == '1'" type="danger" size="mini" round v-text="item.infoTypeMinName"></el-button>
                  <el-button v-else-if="item.infoTypeMin == '2'" type="success" size="mini" round v-text="item.infoTypeMinName"></el-button>
                  <el-button v-else-if="item.infoTypeMin == '3'" type="warning" size="mini" round v-text="item.infoTypeMinName"></el-button>
                </span>
                <span>
                  <el-button @click="proAreaClick1ZC(item.industry)" type="primary" size="mini" round v-text="item.industryName"></el-button>
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
          </el-checkbox-group>
          <div class="more">
            <a @click="resultObjPolice('','')" href="#" class="more-font">+ 查看更多</a>
          </div>
        </div>
      </div>
    </div>
    <!--已关注企业-->
    <div class="div1024px tenderInputUpdate" v-show="tabNavNum == 3">
      <div style="overflow: hidden">
        <p class="companyName left">企业名称</p>
        <span class="searchCompany right">
          <el-select v-model="value6"
                     filterable
                     remote
                     :remote-method="pleaseChoose"
                     :loading="loadOFF"
                     placeholder="请选择">
            <el-option
              v-for="(item,index) in cities"
              :key="item.name"
              :label="item.name"
              :value="item.id">
              <span style="float: left" v-text="item.name"></span>
              <span class="comSearchSpan" v-show=" item.status  == '' || item.status == '1' " @click="companyFollow(item.id,index)">关注</span>
              <span class="comSearchSpan" v-show=" item.status  == '0' " @click="companyFollow(item.id,index)">取消关注</span>
            </el-option>
          </el-select>
        </span>
      </div>
      <div v-if="noticeHallList1.length == '0'" class="noDBClass">
          <span style="width: 300px;height: 300px;display: inline-block">
            <img class="imgCom" src="../../assets/img/nodb.png" alt="数据暂时为空">
          </span>
      </div>
      <div v-else class="companyNameList">
        <li v-for="(item,index) in noticeHallList1">
          <p class="comCursor left" @click="routerLinkedCompany(item.id,item.name)" v-text="item.name"></p>
          <p class="comCursor right" @click="companyFollowList(item.id,index)">取消关注</p>
        </li>
      </div>
    </div>
    <!--招标订阅分页-单用-->
    <div class="searchPage">
      <el-pagination
        @current-change="handleSizeChange"
        layout="prev, pager, next"
        :page-size='20'
        :current-page.sync="currentPageIndex"
        :total="totleLength">
      </el-pagination>
    </div>
    <p v-show="!collectionOFF" class="cuttingLine"><span>浏览历史</span></p>
    <searchList v-show="!collectionOFF" :navOFF="false" :searchResult="searchResult"></searchList>
  </div>
</template>

<script>
  import axios from 'axios'
  import searchList from '../../components/searchList/searchList.vue'
  import matchList from '../../components/matchList/matchList.vue'
  import { mapActions,mapGetters } from 'vuex'
  export default {
    name: 'tender',
    data () {
      return {
        fullscreenLoading:false,
        tenderIndex:1,
        tenderActivity:'tenderActivity',
        currentPageIndex:1,
        programNum:0,
        loadOFF:false,
        checkIdList:[],
        checkAll: false,
        isIndeterminate:true,
        checkList:[],
        collectionOFF:false,
        editOFF:true,
        show3:false,
        searchResult:'',
        tabIndex:'2',
        lastMove:0,
        totleLength:0,
        noticeList:[],
        noticeHallList:[],
        tabListBH:[
          {
            name:'招标公告',
            index:'2',
          },
          {
            name:'拟建项目',
            index:'1',
          },
          {
            name:'招标结果',
            index:'3',
          },
          {
            name:'招标信用信息',
            index:'4',
          },
        ],
        tabListActive:'tabListActive',
        tenderAPI:{
          totla:'0',
          count:'20',
          infoType:'1',
        },
        collectionAPI:{
          type:'0',
          userId:'',
          total:'0',
          count:'20',
        },
        tabNavNum:1,
        matchList:'',
        cities: [],
        value6: '',
        myFollowDBAPI:{
          total:'0',
          count:'20',
          userId:'',
        },
        searchFB:'',/*搜索副本*/
        UpdatePushAPI:{
          total:'0',
          count:'20',
          infoType:'',
          userId:'',
        },
        noticeHallList1:[],
        noticeHallList2:[],
      }
    },
    //定义这个sweiper对象
    computed: {
      ...mapGetters([
        'getAPIState',
        'getUserDB',
        'getIsLogin'
      ]),
    },
    mounted () {
      this.updateNavListIndex(2);
      var isLoginState = window.localStorage.getItem('userDB');
      if(isLoginState){
        this.update_UserDB(JSON.parse(isLoginState));
        var self = this;
        this.collectionAPI.userId = this.getUserDB.userId;
        this.myFollowDBAPI.userId = this.getUserDB.userId;
        this.UpdatePushAPI.userId = this.getUserDB.userId;
        this.tabListClick(this.tabIndex,0);
        axios.post(self.getAPIState+'historyList',JSON.stringify({userId:self.getUserDB.userId}))
          .then(function(obj){
            var obj = obj.data.data;
            if(obj.result =='0' ){
              self.searchResult = obj.historyList;
            }
          })
      }else{
        this.updateShowDrawOFF(true);
        this.$router.push({path:'/index'})
      }
    },
    methods: {
      ...mapActions([
          'update_UserDB',
          'update_Search',
          'updateNoticeInfo',
          'updateCompanyDynamics',
          'updateSearchObject',
          'updatePersonalDB',
          'updateNavListIndex',
          'updatePolicyObject',
          'updateMatchList',
          'updateShowDrawOFF'
      ]),
      matchClick:function(id,type){
        var self = this;
        self.updateNavListIndex(4);
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
      proAreaClick1ZC:function(val){
        this.updatePolicyObject({total:'0',industry:val});
        this.$router.push({path:'/policy'})
      },
      /*查看更多*/
      resultObj:function(infoType,infoTypeMin){
        this.updateSearchObject({infoType:infoType,infoTypeMin:infoTypeMin});
        this.$router.push({path:'/search'})
      },
      /*查看更多-政策*/
      resultObjPolice:function(infoType,infoTypeMin){
        this.$router.push({path:'/policy'})
      },
      /*添加取消关注企业*/
      companyFollow:function(id,index){
        var self = this;
        var data = {
            userId:self.getUserDB.userId,
            id:id,
        }
        axios.post(self.getAPIState+'addFollow',JSON.stringify(data))
          .then(function(obj){
            var obj = obj.data.data;
            if(obj.result =='0' ){
              self.cities[index].status = obj.status;
              self.concernedList();
            }
          })
      },
      /*添加关注企业*/
      companyFollowList:function(id,index){
        var self = this;
        var data = {
          userId:self.getUserDB.userId,
          id:id,
        }
        axios.post(self.getAPIState+'addFollow',JSON.stringify(data))
          .then(function(obj){
            var obj = obj.data.data;
            if(obj.result =='0' ){
              self.searchClickFB();
              self.concernedList();
            }
          })
      },
      /*企业搜索结果*/
      searchClickFB:function(){
        var self = this;
        if(self.searchFB==''){
          return false;
        }
        var data = {
          search:self.searchFB,
          userId:self.getUserDB.userId,
        };
        axios.post(self.getAPIState+'companyToFollow', JSON.stringify(data))
          .then(function (obj) {
            var obj = obj.data.data;
            if(obj.result == '0'){
              self.cities = obj.companyList;
              self.loadOFF = false;
            }
          }).catch(function (error) {
        });
      },
      /*搜索查询*/
      pleaseChoose:function(query){
        var self = this;
        if(query==''){
            return false;
        }
        self.searchFB = query;
        var data = {
          search:query,
          userId:self.getUserDB.userId,
        };
        axios.post(self.getAPIState+'companyToFollow', JSON.stringify(data))
          .then(function (obj) {
            var obj = obj.data.data;
            if(obj.result == '0'){
                self.cities = obj.companyList;
                self.loadOFF = false;
            }
          }).catch(function (error) {
        });
      },
      /*删除*/
      deleteNotice:function(){
        var self = this;
        var arrayString = '';
        var notice = this.checkList;
        for(var i=0;i<notice.length;i++){
          arrayString += notice[i] + '|';
        }
        var data = {
          type:'0',
          userId:self.getUserDB.userId,
          id:arrayString
        }
        axios.post(self.getAPIState+'addCollect', JSON.stringify(data))
          .then(function (obj) {
            var obj = obj.data.data;
            if(obj.result == '0'){
              self.collectionTab();
            }
          }).catch(function (error) {
        });
      },
      /*分页*/
      handleSizeChange(val) {
        window.scrollTo(0,0);
        var self = this;
        if(self.programNum == 0){
          /*更新推送*/
          this.UpdatePushAPI.total = JSON.stringify((val - 1) * 20);
          this.noticeClick();
        }else if(self.programNum == 1){
          /*我的收藏-招标订阅*/
          this.collectionAPI.total = JSON.stringify((val - 1) * 20);
          this.collectionTab();
        }else if(self.programNum == 2){
          /*我的收藏-政策解读*/
          this.collectionAPI.total = JSON.stringify((val - 1) * 20);
          this.collectionTab();
        }else if(self.programNum == 3){
          /*已关注企业*/
          self.myFollowDBAPI.total = JSON.stringify((val - 1) * 20);
          self.concernedList();
        }
      },
      /*分页重置*/
      initCurrent:function(currentPage){
        return 1;
      },
      /*招标大厅*/
      noticeClick:function(){
        var self = this;
        this.fullscreenLoading = true;
        axios.post(self.getAPIState+'subscribeNoticeList', JSON.stringify(self.UpdatePushAPI))
          .then(function (obj) {
            var obj = obj.data.data;
            if(obj.result == '0'){
              self.noticeHallList = obj.noticeHallList;
              self.totleLength = obj.counts;
              self.fullscreenLoading = false;
            }
          }).catch(function (error) {
        });
      },
      /*招标大厅初始化*/
      tabListClick:function(index,num){
        this.currentPageIndex = 1;
        this.fullscreenLoading = true;
        this.tabIndex = index;
        this.lastMove = num;
        var self = this;
        self.UpdatePushAPI.total = '0';
        self.UpdatePushAPI.infoType = index;
        axios.post(self.getAPIState+'subscribeNoticeList', JSON.stringify(self.UpdatePushAPI))
          .then(function (obj) {
            var obj = obj.data.data;
            if(obj.result == '0'){
              self.noticeHallList = obj.noticeHallList;
              self.totleLength = obj.counts;
              self.fullscreenLoading = false;
            }
          }).catch(function (error) {
        });
      },
      /*路由-招标详情*/
      goHallOptions:function(id,type){
        this.recordHistory(id,type,this.getUserDB.userId);
        this.updateNoticeInfo({id:id,userId:this.getUserDB.userId});
      },
      /*更新推送*/
      updateTS:function(){
        this.tenderIndex = 1;
        this.programNum = 0;
        this.noticeHallList = [];
        this.totleLength = 0;
        this.editOFF = true;
        this.tabNavNum = 1;
        this.collectionOFF = false;
        this.tabListClick(this.tabIndex,0);
      },
      /*收藏Tab*/
      collectionTab:function(){
        var self = this;
        axios.post(self.getAPIState+'myCollect', JSON.stringify(self.collectionAPI))
          .then(function (obj) {
            var obj = obj.data.data;
            if(obj.result == '0'){
              self.checkIdList = [];
              self.checkList = [];
              self.checkAll = false;
              self.noticeHallList2 = obj.myCollectList;
              self.totleLength = obj.counts;
              for(let i=0;i < self.noticeHallList2.length;i++){
                self.checkIdList.push(self.noticeHallList2[i].id);
              }
            }
          }).catch(function (error) {
        });
      },
      /*收藏-政策解读*/
      collectionZC:function(){
        this.tenderIndex = 3;
        this.programNum = 2;
        this.noticeHallList = [];
        this.totleLength = 0;
        this.checkList = [],
        this.editOFF = true;
        this.collectionAPI.type = '1';
        this.collectionOFF = true;
        this.tabNavNum = 2;
        this.collectionTab();
      },
      /*收藏-招标信息*/
      collectionZB:function(){
        this.lastMove = 0;
        this.tenderIndex = 2;
        this.programNum = 1;
        this.noticeHallList = [];
        this.totleLength = 0;
        this.checkList = [],
        this.editOFF = true;
        this.collectionAPI.type = '0';
        this.collectionOFF = true;
        this.tabNavNum = 4;
        this.collectionTab();
      },
      /*已关注企业*/
      concerned:function(){
        this.tenderIndex = 4;
        this.programNum = 3;
        this.noticeHallList = [];
        this.totleLength = 0;
        this.checkList = [],
        this.editOFF = true;
        this.collectionOFF = true;
        this.tabNavNum = 3;
        this.concernedList();
      },
      /*已关注企业列表*/
      concernedList:function(){
        var self = this;
        axios.post(self.getAPIState+'myFollow', JSON.stringify(self.myFollowDBAPI))
          .then(function (obj) {
            var obj = obj.data.data;
            if(obj.result == '0'){
              self.noticeHallList1 = obj.myFollowList;
              self.totleLength = obj.counts;
            }
          }).catch(function (error) {
        });
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
      /*多选*/
      handleCheckAllChange:function(val){
        this.checkList = val ? this.checkIdList : [];
        this.isIndeterminate = false;
      },
      /*分页*/
      handleCheckedChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.checkIdList.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkIdList.length;
      },
      /*搜全网*/
      searchAll:function(value){
        var url = 'http://www.baidu.com/s?wd=' + value;
        window.open(url);
      },
      /*企业认证*/
      personalCenter:function(){
        this.updatePersonalDB({userId:this.getUserDB.userId});
      },
    },
    components:{
      axios,
      searchList,
      matchList
    }
  }
</script>

<style scoped>
  .second {
    padding-bottom: 56px;
    text-align: center;
    background: #f0f5f7;
  }
  .second-title-tender {
    /*background: #f0f5f7;*/
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
    text-align: left;
    background: #fff;
    margin: 0 auto;
    width: 1200px;
  }
  .second-value li {
    border-bottom: 1px dashed  #eee;
  }
  .second-dataList li:last-child {
    border: none !important;
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
    margin-left: 5px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    font-size: 16px;
    color: #333;
    line-height: 28px;
    width: 450px;
  }
  .dataList-value:hover {
    color: #00bffe;
  }
  .dataList-time {
    text-align: center;
    margin-left: 20px;
    line-height: 28px;
    display: inline-block;
    font-size: 14px;
    color: #999;
    width: 90px;
  }
  .second-area {
    text-align: center;
    width: 67px;
  }
  .dataList-area {
    text-align: center;
    color: #333;
    line-height: 28px;
    font-size: 14px;
    width: 67px;
  }
  .dataList-end-time {
    text-align: center;
    font-size: 14px;
    color: #999;
    width: 84px;
  }
  .marginRight54px {
    margin-right: 54px;
  }
  .tabList {
    width: 100%;
  }
  .tabList-nav {
    /*background: #f0f5f7;*/
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
    color: #333;
    border-top: 2px solid #00bffe;
  }
  .searchPage {
    text-align: center;
    padding-top: 40px;
    padding-bottom: 60px;
  }
  .tender-btnNav {
    margin: 0 auto;
    display: inline-block;
    overflow: hidden;
    padding:0 0 40px 0;
  }
  .cuttingLine {
    margin: 0 auto 30px;
    border-bottom: 1px dashed #ddd;
    width: 1200px;
    height: 10px;
  }
  .cuttingLine span {
    line-height: 20px;
    background: #f0f5f7;
    font-size: 16px;
    color: #999;
    display: inline-block;
    width: 100px;
  }
  .margin20px {
    margin-left: 10px;
    margin-right: 10px;
  }
  .myCollection {
    text-align: center;
  }
  .myCollection li {
    margin: 5px auto 0;
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
  .second-dataList .el-checkbox {
    padding-top: 3px;
  }
  .el-checkbox {
    margin-right: 5px;
  }
  .div1024px {
    overflow: hidden;
    background: #fff;
    margin: 0 auto;
    width: 1200px;
  }
  .companyName {
    padding: 25px 20px;
    font-size: 16px;
    color: #999;
  }
  .searchCompany {
    margin-top: 17px;
    margin-right: 20px;
    display: inline-block;
    width: 340px;
    height: 36px;
  }
  .companyNameList {
    color: #333;
    padding: 0 20px;
    border-top: 2px solid #f0f5f7;
  }
  .companyNameList li {
    border-bottom: 1px dashed #f0f5f7;
    font-size: 16px;
    line-height: 60px;
    overflow: hidden;
  }
  .companyNameList p:last-child {
    font-size: 14px;
  }
  /**/
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
  .searchCompany .el-select-dropdown__item {
    cursor: none;
  }
  .comSearchSpan {
    float: right;
    color: #8492a6;
    font-size: 13px;
    cursor: pointer;
  }
  .comSearchSpan:hover {
    color: #00bffe;
  }
  .comCursor {
    cursor: pointer
  }
  .comCursor:hover {
    color: #00bffe;
  }
  .tender-com-btn {
    transition: .5s;
    border-radius: 50px;
    border: 2px solid #999;
    color: #999;
    font-size: 16px;
    background: rgba(0,0,0,0);
    width: 120px;
    height: 40px;
  }
  .tender-com-btn:hover {
    border-color: #00bffe;
    color: #00bffe;
  }
  .tenderActivity {
    border-color: #00bffe;
    color: #00bffe;
  }
  .tipPopers {
    cursor: pointer;
    box-sizing: border-box;
    padding: 30px;
    text-align: left;
    line-height: 20px;
    font-size: 14px;
    left: 20px;
    top: 50%;
    background-size: 100%;
    position: fixed;
    width: 300px;
    height: 120px;
    background: url("../../../static/sidebar.png") no-repeat;
  }
</style>

