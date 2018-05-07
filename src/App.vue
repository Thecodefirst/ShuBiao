<template>
  <div id="app">
    <!--二维码-->
    <!--<happy-new-year></happy-new-year>-->
    <el-popover
      ref="popover2"
      placement="left"
      width="150"
      trigger="hover">
      <p style="width: 150px;text-align: center;color: #8590a6;">关注公众号有惊喜呦</p>
      <div style="width: 150px;height: 150px;">
        <img class="imgCom" src="../static/ewm.png" alt="二维码">
      </div>
    </el-popover>
    <!--二维码-->
    <!--gif-->
   <!-- <div style="position: fixed;top: 520px;left: 30px;">
      <img class="imgCom" src="../static/active2.gif" alt="GIF动图">
    </div>-->
    <!--gif-->
    <!--loadingBar-->
    <!--返回顶部-->
    <div class="goBackTop">
        <li @click="dialogFormVisible = true" class="feedback">
          <img class="imgCom" src="../static/feedback1.png" alt="">
        </li>
        <li v-popover:popover2 style="width: 40px;height: 40px;">
          <img class="imgCom" src="../static/ewm4.png" alt="二维码smile">
        </li>
        <li class="goBackTopLast">
          <span @click="goBack" style="display: inline-block;width: 30px;height: 20px;margin: 10px 5px">
            <img class="imgCom" src="../static/goBack4.png" alt="返回顶部">
          </span>
        </li>
      </div>
    <!--商业合作alert-->
    <div class="alert-noticeInfo">
      <el-dialog
        title="商业合作"
        :visible.sync="dialogVisible"
        width="30%">
        <!--<p class="alert-com-p">服务暂未开通，感谢您的关注</p>-->
        <p class="alert-com-p">详情可联系客服，客服电话：<span>0431-81854515</span></p>
      </el-dialog>
    </div>
    <!--更新提醒-->
    <congratulation></congratulation>
    <updateTip></updateTip>
    <!--更新提醒-->
    <!--意见反馈-->
    <el-dialog title="意见反馈" :visible.sync="dialogFormVisible" width="690px" :center="true">
      <div class="suggest">
        <el-input
          resize="none"
          type="textarea"
          :maxlength="150"
          :rows="11"
          placeholder="输入您的意见，不超过150字"
          v-model="textarea">
        </el-input>
      </div>
      <div class="name_tel">
        <li class="left"><el-input v-model="nameValue" placeholder="您的姓名"></el-input></li>
        <li class="right"><el-input v-model="tel" placeholder="您的联系电话"></el-input></li>
      </div>
      <div slot="footer" class="addBtnSubmit dialog-footer">
        <el-button type="primary" @click="submitSuggest">提 交</el-button>
      </div>
    </el-dialog>
    <!--意见反馈-->
    <!--login-->
    <div v-show="getShowDrawOFF" @click="showAlert" class="shade" v-cloak></div>
    <div v-show="getShowDrawOFF" class="alert-login" v-cloak>
      <div v-if="forgetNum == 0">
        <div class="alert-nav">
          <li :class='{ alertActive : alertTabNum == 0 }' @click="alertTab(0)">注册</li>
          <li style="width: 111px">|</li>
          <li :class='{ alertActive : alertTabNum == 1 }' @click="alertTab(1)">登录</li>
        </div>
        <div v-if="alertTabNum == 0">
          <div class="inputValue">
            <li>
              <el-input v-on:blur="checkOnly" v-model="companyName" placeholder="营业执照企业全称（必填）"></el-input>
            </li>
            <li>
              <el-input v-model="contacts" placeholder="联系人姓名（必填）"></el-input>
            </li>
            <li>
              <el-input v-on:blur="checkOnly" v-model="telephone" placeholder="联系人手机号（必填）"></el-input>
            </li>
            <li class="mesCode">
              <span>
                  <el-input v-model="code" placeholder="短信验证码"></el-input>
              </span>
              <span>
                  <el-button
                    type="primary"
                    :class='{ coloraaa : getCodeOFF == true }'
                    v-bind:disabled="getCodeOFF"
                    @click="getCode(60,0,0)"
                    v-text="getCodeValue"></el-button>
              </span>
            </li>
            <li>
              <el-input v-model="password" type="password" :maxlength="16" :minlength="6" placeholder="设置登录密码（6-16位字母数字组合）"></el-input>
            </li>
          </div>
          <p class="checked-input">
            <el-checkbox v-model="checked">我已阅读并接受</el-checkbox>
            <span class="compact left">《用户协议》</span>
          </p>
          <div class="submitBtn">
            <el-button type="primary" @click="registerCom">注册</el-button>
          </div>
        </div>
        <div v-else-if="alertTabNum == 1">
          <div class="inputValue">
            <li>
              <el-input v-model="loginUser" placeholder="联系人手机号/邮箱（必填）"></el-input>
            </li>
            <li>
              <el-input
                @keyup.enter.native="loginClick"
                v-model="loginPwd"
                :maxlength="16"
                :minlength="6"
                type="password"
                placeholder="登录密码（6-16位字母数字组合）"></el-input>
            </li>
          </div>
          <p class="checked-input">
            <el-checkbox v-model="checkedLogin">一个月内自动登录</el-checkbox>
            <span class="compact coloraaa right" @click="forgetPwd(1)">忘记密码？</span>
          </p>
          <div class="submitBtn">
            <el-button type="primary" @click="loginClick">登录</el-button>
          </div>
        </div>
      </div>
      <div v-else-if="forgetNum == 1">
        <p class="getBack">找回密码</p>
        <div class="alert-nav marginTop40">
          <li :class='{ alertActive : alertTabNum == 0 }' @click="alertTab(0)">手机找回</li>
          <li style="width: 111px">|</li>
          <li :class='{ alertActive : alertTabNum == 1 }' @click="alertTab(1)">邮箱找回</li>
        </div>
        <div v-if="alertTabNum == 0">
          <div class="inputValue">
            <li>
              <el-input v-model="telephone" placeholder="联系人手机号（必填）"></el-input>
            </li>
            <li class="mesCode">
              <span>
                  <el-input v-model="code" placeholder="短信验证码"></el-input>
              </span>
              <span>
                  <el-button
                    type="primary"
                    :class='{ coloraaa : getCodeOFF == true }'
                    v-bind:disabled="getCodeOFF"
                    @click="getCode(60,0,3)"
                    v-text="getCodeValue"></el-button>
              </span>
            </li>
            <li>
              <el-input
                @keyup.enter.native="submitGetBack"
                :maxlength="16"
                :minlength="6"
                v-model="newPassword"
                placeholder="设置登录密码（6-16位字母数字组合）"></el-input>
            </li>
          </div>
          <p class="forgetTips">若通过上述方式仍无法找回账号密码，请您直接联系客服人员：400-0806-660</p>
          <div class="submitBtn">
            <el-button type="primary" @click="submitGetBack">提交</el-button>
          </div>
          <p class="goRegister" @click="forgetPwd(0)">登录</p>
        </div>
        <div v-if="alertTabNum == 1">
          <div class="inputValue">
            <li>
              <el-input v-model="email" placeholder="联系人邮箱（必填）"></el-input>
            </li>
            <li class="mesCode">
              <span>
                  <el-input v-model="fogetEmailCode" placeholder="邮箱验证码"></el-input>
              </span>
              <span>
                  <el-button
                    type="primary"
                    :class='{ coloraaa : getCodeOFF == true }'
                    v-bind:disabled="getCodeOFF"
                    @click="getCode(60,1,3)"
                    v-text="getCodeValue"></el-button>
              </span>
            </li>
            <li>
              <el-input
                @keyup.enter.native="submitGetBackEmail"
                :maxlength="16"
                :minlength="6"
                v-model="newPassword"
                placeholder="设置登录密码（6-16位字母数字组合）"></el-input>
            </li>
          </div>
          <p class="forgetTips">若通过上述方式仍无法找回账号密码，请您直接联系客服人员：400-0806-660</p>
          <div class="submitBtn">
            <el-button type="primary" @click="submitGetBackEmail">提交</el-button>
          </div>
          <p class="goRegister" @click="forgetPwd(0)">返回登录</p>
        </div>
      </div>
    </div>
    <!--login-->
    <div class="animation">
      <!--折叠
      <div class="front-view">
        <div @click.native="testNewYear" id="corner-flash" style="display: block;">
          <object type="application/x-shockwave-flash" data="../static/a2a272dd72e3347f.swf" width="110" height="95">
            <param name="wmode" value="transparent"/>
            <param name="flashvars" value="ad_pic=../static/t01736d38a5472b1d3f.png&link_url=http://s.click.taobao.com/t?e=m%3D2%26s%3DoEAEoXd5pYAcQipKwQzePCperVdZeJviK7Vc7tFgwiFRAdhuF14FMXmOYE2Co4f9J1gyddu7kN%2BOdGbj4fHCJybw1cQKV5PprmKIW3j38r78vekcD5j4y6UuZxIcp9pfUIgVEmFmgnbDX0%2BHH2IEVaX4VWt66S4EJPwiig1bxLP9BvYCQR6XAr%2BKQ71wHNCAqP8YyUoZZlq4cXg3ii9waXPs9Sj9Qli1np4c65at3FeX3cwyLTlAhj2l4PysJx%2FP"/>
            <param name="allowScriptAccess" value="always"/>
          </object>
        </div>
      </div>
      折叠-->
      <div :class=" getNoticeTitle ? 'animationDel' : 'animationAdd' " class="t-w1024">
        <div class="logo left">
          <router-link to="/index"><img class="imgCom" src="./assets/img/logo.png" alt="LOGO"></router-link>
        </div>
        <div class="slogon left">
          <router-link to="/index"><img class="imgCom" src="../static/slogon.png" alt="你的专属管家slogon"></router-link>
        </div>
        <div v-if="getIsLogin" class="userDB right" v-cloak>
          <el-popover
            ref="popover1"
            placement="top"
            trigger="hover">
            <div class="userDB-nav-list">
              <li @click="personalCenter"><a href="#">个人中心</a></li>
              <li><router-link to="/tender">更新提醒</router-link></li>
              <li><a href="#" @click="Logout">退出登录</a></li>
            </div>
          </el-popover>
          <p style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;width: 150px;" v-text="userDB.userName" v-popover:popover1></p>
        </div>
        <div v-else @click="showAlert" @mouseenter="minEnter" @mouseleave="minLeave" class="personal right">
          <img class="imgCom" :src="minPic" alt="个人中心">
        </div>
        <div v-show="getSearch" class="search right">
          <el-input
            placeholder="招标信息"
            @keyup.enter.native="searchBtn"
            v-model="search">
            <i slot="suffix" @click="searchBtn" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="navList right">
          <li :class='{ activityNavList : 1 == getNavListIndex }' @click="navClick(1)">首页</li>
          <li :class='{ activityNavList : 2 == getNavListIndex }' @click="navClick(2)">招标订阅</li>
          <li :class='{ activityNavList : 3 == getNavListIndex }' @click="navClick(3)">招标搜索</li>
          <li :class='{ activityNavList : 4 == getNavListIndex }' @click="navClick(4)">政策解读</li>
        </div>
      </div>
      <div class="t-w1024">
        <p class="notice-title" v-text="getNoticeDB.noticeInfo[0].name"></p>
        <div class="collect right">
          <el-button
            @click="collectPro"
            size="medium"
            :type=" getNoticeDB.collect ? 'success' : 'primary' "
            v-text=" getNoticeDB.collect ? '已收藏' : '收藏该条' "
          ></el-button>
        </div>
      </div>
    </div>
    <!--router-view-->
    <div style="padding-top: 80px">
      <router-view></router-view>
    </div>
    <!--router-view-->
    <!--footer-->
    <div class="footer">
      <div class="footer-w1024px">
        <div class="left">
          <p class="footerPic">
            <img class="imgCom" src="../static/ewm.png" alt="二维码底部">
          </p>
          <p class="footerTip">关注微信实时推送</p>
        </div>
        <div class="footerTel left">
          <li>客服电话</li>
          <li class="footerTelText">400-808-8595</li>
          <li>服务时间：9:00~17:00</li>
        </div>
        <div class="right">
          <li class="footer-linked">
            <!--<router-link to="/bottomCenter/Products">商业合作</router-link>-->
            <!--????????????-->
            <a style="cursor: pointer;" @click=" dialogVisible = true">商业合作</a>
            <!--<router-link to="/bottomCenter/Products">产品介绍</router-link>-->
            <router-link to="/bottomCenter/contactUs">联系我们</router-link>
            <router-link to="/bottomCenter/LegalNotices">法律声明</router-link>
            <router-link to="/bottomCenter/serviceRegulation">服务条例</router-link>
            <router-link to="/helpArray/helpOptions">常见问题</router-link>
            <a href="#" @click="dialogFormVisible = true">意见反馈</a>-->
          </li>
          <li class="footerCompany">
            <p><span style="color: #fff"></span>“标”新立异，你的专“属”管家</p>
          </li>
          <a href="http://www.miitbeian.gov.cn" target="_blank"><li class="footerLast">吉ICP备17001651号</li></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import mine_blue from './assets/img/mine_blue.png'
import mine_gray from './assets/img/mine_gray.png'
import logo from './assets/img/logo.png'
import updateTip from './components/updateTip/updateTip.vue'
import congratulation from './components/congratulation/congratulation.vue'
import { mapActions,mapGetters } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
      dialogVisible:false,
      betaOFF:false,
      activityNavList:'activityNavList',
      nameValue:'',
      tel:'',
      textarea:'',
      dialogFormVisible:false,
      userDB:{
        userId:'',
        userName:'',
      },
      isLogin:false,
      coloraaa:'coloraaa',
      checked:true,
      alertActive:'alertActive',
      minPic:mine_gray,
      search:'',
      /*注册*/
      companyName:'',
      contacts:'',
      telephone:'',
      email:'',
      code:'',
      password:'',
      /*注册*/
      alertTabNum:1,
      /*登录*/
      loginUser:'',
      loginPwd:'',
      checkedLogin:true,
      /*登录*/
      forgetNum:0,
      /*注册验证码*/
      getCodeOFF:false,
      getCodeValue:'获取验证码',
      /*注册验证码*/
      /*密码找回*/
      fotgetTel:'',
      forgetEmail:'',
      fogetEmailCode:'',
      newPassword:'',
      /*密码找回*/
      /*验证开关*/
      checkOFF:false,
      /*验证开关*/
      urlSwitch:true,
      /*滚动条*/
      scrolled:false,
      scrollTopValue:'0',
    }
  },
  computed: {
    ...mapGetters([
        'getNoticeTitle',
        'getAPIState',
        'getSearch',
        'getIsLogin',
        'getNavListIndex',
        'getShowDrawOFF',
        'getNoticeDB'
    ]),
  },
  mounted() {
    var isLoginState = window.localStorage.getItem('userDB');
    if(isLoginState) {
      this.isLogin = true;
      this.update_UserDB(JSON.parse(isLoginState));
      this.userDB = JSON.parse(isLoginState);
      var userpwd = JSON.parse(window.localStorage.getItem('userpwd'));
      this.loginUser = userpwd.account,
      this.loginPwd = userpwd.password,
      this.loginClick();
    }else{
      this.isLogin = false;
    }
    this.update_IsLogin(this.isLogin);
  },
  methods:{
    ...mapActions([
        'update_Search',
        'update_IsLogin',
        'update_UserDB',
        'updatePersonalDB',
        'updateNavListIndex',
        'updateShowDrawOFF',
        'updateURLTABS',
        'updateIndexData',
        'updateIndexTableList',
        'updateIndexTableListPI',
        'updateNoticeDB',
        'updateSearchObject'
    ]),
    testNewYear:function(){
      alert(11);
      this.betaOFF != this.betaOFF;
    },
    /*收藏*/
    collectPro:function(){
      var self = this;
      var data = {
        type:'0',
        userId:self.userDB.userId,
        id:self.getNoticeDB.noticeInfo[0].id
      }
      axios.post(self.getAPIState+'addCollect', JSON.stringify(data))
        .then(function (obj) {
          var obj = obj.data.data;
          if(obj.result == '0'){
            self.updateNoticeDB({id:self.getNoticeDB.noticeInfo[0].id,userId:self.userDB.userId});
          }
        }).catch(function (error) {
      });
    },
    juanjiao_click:function(){
      document.getElementById('ad000000001').click();
    },
    goBack:function(){
      var self = this;
      var timer;
      timer=setInterval(function(){
        var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
        var ispeed=Math.floor(-scrollTop/6);
        self.scrollTopValue = scrollTop;
        if(scrollTop==0){
          clearInterval(timer);
        }
        document.documentElement.scrollTop=document.body.scrollTop=scrollTop+ispeed;
      },20)
    },
    navClick:function(index){
      var self = this;
      self.updateSearchObject({total: '0', address: "", city: "", county: ""});
      switch(index)
      {
        case 1:
          this.updateNavListIndex(index);
          self.$router.push({path:'/index'})
          break;
        case 2:
          if(self.getIsLogin){
            this.updateNavListIndex(index);
            self.$router.push({path:'/tender'})
          }else{
            self.updateShowDrawOFF(true);
          }
          break;
        case 3:
          this.updateNavListIndex(index);
          self.$router.push({path:'/search'})
          break;
        case 4:
          this.updateNavListIndex(index);
          self.$router.push({path:'/policy'})
          break;
        default:
      }
    },

    searchBtn:function(){
      this.updateSearchObject({search:this.search});
      this.$router.push({path:'/search'});
    },

    minEnter:function(){
      this.minPic = mine_blue;
    },

    minLeave:function(){
      this.minPic = mine_gray;
    },

    alertTab:function(num){
      this.newPassword = '';
      this.companyName = '';
      this.contacts = '';
      this.telephone = '';
      this.code = '';
      this.password = '';
      this.loginUser = '';
      this.loginPwd = '';
      this.alertTabNum = num;
    },

    forgetPwd:function(num){
      this.forgetNum = num;
      this.alertTabNum = 1;
    },
    /*API开关*/
    /*urlClick(){
      var urlON="http://192.168.51.72:8080/f/";//线下接口地址
      var urlOFF="http://shubiao.71hulian.com/f/";//线上接口地址
      this.urlSwitch == true ?  this.updateURLTABS(urlOFF) : this.updateURLTABS(urlON);
      this.Logout();
    },*/
    /*弹窗*/
    showAlert:function(){
      this.updateShowDrawOFF(!this.getShowDrawOFF);
    },
    /*获取验证码*/
    getCode:function(num,type,kind){
      var self = this;
      var data = {
        telephone:self.telephone,
        email:self.email,
        type:JSON.stringify(type),
        kind:JSON.stringify(kind),
      };
      axios.post(self.getAPIState+'sendMsgCode', JSON.stringify(data))
        .then(function (obj) {
            var obj = obj.data;
            if( obj.data.result == '0'){
              self.openMessage('success','验证码发送成功');
              self.getCodeOFF = true;
              for (var i = 0; i <= num; i++) {
                setTimeout((function (i) {
                  return function () {
                    self.getCodeValue = num - i + 's';
                    if (i === num) {
                      self.getCodeValue = '重新发送';
                      self.getCodeOFF = false;
                    }
                  }
                })(i), 1000 * i);
              };
            }else{
              self.openMessage('error',obj.msg);
            }
        }).catch(function (error) {
      });
    },
    /*注册*/
    registerCom:function(){
      var self = this;
      var patternPhone = /^1[3|4|5|7|8][0-9]\d{8}$/;
      if(self.companyName == ''){
        self.openMessage('warning','营业执照不能为空');
        return false;
      }
      if(self.contacts == '') {
        self.openMessage('warning','联系人姓名不能为空');
        return false;
      }
      if(self.telephone == ''){
        self.openMessage('warning','联系人手机号不能为空');
        return false;
      }
      if(!patternPhone.test(self.telephone)){
        self.openMessage('warning','手机号格式不正确');
        return false;
      }
      if(self.code ==''){
        self.openMessage('warning','验证码不能为空');
        return false;
      }
      if(self.password == ''){
        self.openMessage('warning','密码不能为空');
        return false;
      }
      if(!(self.password.length > 5 && self.password.length < 17)){
        self.openMessage('warning','密码长度在6-16位');
        return false;
      }
      self.checkOnly();
      if(!self.checkOFF){
        return false;
      }
      if(!self.checked){
        self.openMessage('warning','请勾选用户协议');
        return false;
      }
      var data = {
        companyName:self.companyName,
        contacts:self.contacts,
        telephone:self.telephone,
        code:self.code,
        password:self.password,
      };
      axios.post(self.getAPIState+'userRegister', JSON.stringify(data))
        .then(function (obj) {
          var obj = obj.data;
          if(obj.data.result == '0'){
            window.localStorage.setItem('userDB',JSON.stringify(obj.data));
            self.openMessage('success','注册成功');
            self.updateShowDrawOFF(false);
            self.userDB = obj.data;
            self.updateIndexData({total:'0', count:'7', userId:obj.data.userId,});
            self.updateIndexTableList({total:'0', count:'7', infoType:'2', userId:obj.data.userId});
            self.update_UserDB(obj.data);
            self.update_IsLogin(true);
          }else{
            self.openMessage('error',obj.msg);
          }
        }).catch(function (error) {
      });
    },
    /*登录*/
    loginClick:function(){
      var self = this;
      if(self.loginUser == ''){
        self.openMessage('warning','用户名不能为空');
        return false;
      }else if(self.loginPwd == '') {
        self.openMessage('warning', '密码不能为空');
        return false;
      }else if(!(self.loginPwd.length > 5 && self.loginPwd.length < 17)){
        self.openMessage('warning','密码长度在6-16位');
        return false;
      }else{
        var data = {
          account:self.loginUser,
          password:self.loginPwd,
        };
        axios.post(self.getAPIState+'userLogin', JSON.stringify(data))
          .then(function (obj) {
            var obj = obj.data;
            if(obj.data.result == '0'){
              self.updateShowDrawOFF(false);
              self.userDB = obj.data;
              self.update_UserDB(obj.data);
              self.update_IsLogin(true);
              if(self.checkedLogin){
                window.localStorage.setItem('userDB',JSON.stringify(obj.data));
                window.localStorage.setItem('userpwd',JSON.stringify(data));
              }
              self.updateIndexTableList({total:'0', count:'7', infoType:'2', userId:self.userDB.userId,});
              self.updateIndexData({total:'0', count:'7', userId:self.userDB.userId,});
              self.updateIndexTableListPI({total:'0', count:'7', type:'1',});
            }else{
              self.openMessage('warning',obj.msg);
              self.Logout();
            }
          }).catch(function (error) {
        });
      }
    },
    /*密码找回-邮箱*/
    submitGetBackEmail:function(){
      var self = this;
      var emailTest = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if(self.email == ''){
        self.openMessage('warning','邮箱不能为空');
        return false;
      }else if(!emailTest.test(self.email)) {
        self.openMessage('warning','邮箱格式不正确');
        return false;
      }else if(self.fogetEmailCode == ''){
        self.openMessage('warning','验证码不能为空');
        return false;
      }else if(self.newPassword == ''){
        self.openMessage('warning','新密码不能为空');
        return false;
      }else if(!(self.newPassword.length > 5 && self.newPassword.length < 17)){
        self.openMessage('warning','密码长度在6-16位');
        return false;
      }else{
        var data = {
          account:self.email,
          password:self.newPassword,
          code:self.fogetEmailCode,
        };
        axios.post(self.getAPIState+'updatePassword', JSON.stringify(data))
          .then(function (obj) {
            var obj = obj.data;
            if(obj.data.result == '0'){
              self.forgetNum = 0;
              self.alertTabNum = 1;
            }else{
              self.openMessage('error',obj.msg);
            }
          }).catch(function (error) {
        });
      }
    },
    /*密码找回-手机*/
    submitGetBack:function(){
      var self = this;
      var patternPhone = /^1[3|4|5|7|8][0-9]\d{8}$/;
      if(self.telephone == ''){
        self.openMessage('warning','手机号不能为空');
        return false;
      }else if(!patternPhone.test(self.telephone)) {
        self.openMessage('warning','手机号码格式不正确');
        return false;
      }else if(self.code == ''){
        self.openMessage('warning','验证码不能为空');
        return false;
      }else if(self.newPassword == '') {
        self.openMessage('warning', '新密码不能为空');
        return false;
      }else if(!(self.newPassword.length > 5 && self.newPassword.length < 17)){
        self.openMessage('warning','密码长度在6-16位');
        return false;
      }else{
        var data = {
          account:self.telephone,
          password:self.newPassword,
          code:self.code,
        };
        axios.post(self.getAPIState+'updatePassword', JSON.stringify(data))
          .then(function (obj) {
            var obj = obj.data;
            if(obj.data.result == '0'){
              self.forgetNum = 0;
              self.alertTabNum = 1;
            }else{
              self.openMessage('error',obj.msg);
            }
          }).catch(function (error) {
        });
      }
    },
    /*唯一性校验*/
    checkOnly:function(){
      var self = this;
      var data = {
        companyName:self.companyName,
        telephone:self.telephone,
        email:self.email,
      };
      axios.post(self.getAPIState+'checkOnly', JSON.stringify(data))
        .then(function (obj) {
          var obj = obj.data;
          if(obj.data.result == '1'){
            self.openMessage('error',obj.msg);
            self.checkOFF = false;
          }else{
            self.checkOFF = true;
          }
        }).catch(function (error) {
      });
    },
    /*退出登录*/
    Logout:function(){
      var self = this;
      self.userDB = {
        userName:'',
        userId:'',
      };
      self.update_IsLogin(false);
      self.update_UserDB(self.userDB);
      sessionStorage.setItem("userDB",'');
      window.localStorage.setItem('userDB','');
      window.localStorage.setItem('userpwd','');
      self.updateIndexTableList({total:'0', count:'7', infoType:'2', userId:''});
      self.updateIndexData({total:'0', count:'7', userId:''});
      self.updateIndexTableListPI({total:'0', count:'7', type:'1',});
      this.$router.push({path:'/index'})
    },
    /*提交建议*/
    submitSuggest:function(){
      var self = this;
      var data = {
        name:self.nameValue,
        telephone:self.tel,
        content:self.textarea,
      };
      axios.post(self.getAPIState+'feedback', JSON.stringify(data))
        .then(function (obj) {
          var obj = obj.data.data;
          if(obj.result == '0'){
            self.openMessage('success','感谢您的提交');
            self.dialogFormVisible = false;
          }
        }).catch(function (error) {
      });
    },
    /*个人中心*/
    personalCenter:function(){
      this.updatePersonalDB({userId:this.userDB.userId});
    },
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
    updateTip,
    congratulation,
  }
}
</script>

<style scoped>
  .suggest {
    margin: 0 auto;
    height: 240px;
    width: 610px;
  }
  .name_tel {
    margin: 10px auto 0;
    overflow: hidden;
    width: 610px;
  }
  .name_tel li {
    width: 300px;
    height: 50px;
  }
  .addBtnSubmit .el-button {
    font-size: 16px;
    border-color: #00bffe;
    background: #00bffe;
    width: 340px;
    height: 50px;
  }
  .addBtnSubmit p {
    margin-top: 5px;
    font-size: 16px;
    color: #aaa;
  }
  .slogon {
    overflow: hidden;
    margin-top: 23px;
    margin-left: 10px;
    width: 134px;
    height: 37px;
  }
  .userDB-nav-list {
    height: 115px;
  }
  .userDB-nav-list a {
    color: #333;
  }
  .userDB-nav-list li {
    list-style: disc;
    text-align: center;
  }
  .userDB-nav-list li:hover,a:hover {
    color: #00bffe;
  }
  .userDB-nav-list a {
    font-size: 14px;
    line-height: 36px;
    display: inline-block;
    margin: 0 auto;
  }
  .goBackTop {
    padding: 5px;
    box-sizing: border-box;
    position: fixed;
    right: 50px;
    bottom: 50px;
    width: 40px;
  }
  .goBackTop li {
    margin-bottom: 15px;
    cursor: pointer;
    border-radius: 2px;
    transition: .5s;
   /* width: 40px;
    height: 40px;*/
  }
  .feedback {
    width: 45px;
    height: 45px;
  }
  .goBackTopLast {
    width: 40px;
    height: 40px;
    border: 1px solid #d3d3d3;
    border-radius: 5px;
    background: #fff;
  }
  .goBackTopLast:hover {
    background: #d3d3d3;
  }
  .title  {
    text-align: center;
    background: #fff;
    width: 100%;
    height: 80px;
  }
  .title1 {
    color: #ffffff;
    z-index: 2018;
    top: -80px;
    transform:translateY(80px);
    position: fixed;
    text-align: center;
    background: #1e2b40;
    width: 100%;
    height: 80px;
  }
  .animation {
    overflow: hidden;
    z-index: 1999;
    position: fixed;
    box-shadow:0px 0px 8px 0px #aaa;
    background:#fff;
    margin: 0 auto;
    width: 100%;
    height: 80px;
  }
  .animationDel {
    margin-top: -80px !important;
  }
  .animationAdd {
    margin-top: 0 !important;
  }
  .notice-title {
    font-size: 22px;
    font-weight: 600;
    font-synthesis: style;
    color: #1a1a1a;
    display: inline-block;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    line-height: 80px;
    font-size: 24px;
    width: 800px;
  }
  .collect {
    margin-top: 22px;
    margin-right: 0;
  }
  /*
titleNav
*/
  .t-w1024 {
    overflow: hidden;
    -webkit-transition:.3s;
    -o-transition:.3s;
    transition:.3s;
    margin: 0 auto;
    width: 1200px;
    height: 80px;
  }
  /*
      titleNav
  */
  /*
  LOGO
  */
  .logo {
    border-right: 1px solid #ddd;
    padding-right: 10px;
    margin-top: 19px;
    width: 120px;
    height: 42px;
  }
  /*
  LOGO
  */
  /*
  navList
  */
  .navList {
    display: inline-block;
    overflow: hidden;
    font-size: 16px;

    line-height: 80px;
  }
  .title .navList {
    color: #999;
  }
  .title .navList {
    color: #fff;
  }
  .navList li {
    transition: .5s;
    color: #848493;
    font-size: 16px;
    margin-right: 50px;
    float: left;
  }
  .title .navList li {
    color: #999;
  }
  .title1 .navList li {
    color: #fff;
  }
  .navList li:hover {
    font-size: 18px !important;
    cursor: pointer;
    color: #00bffe !important;
  }
  .activityNavList {
    font-weight: 500;
    font-size: 18px !important;
    color: #00bffe !important;
  }
  /*
  navList
  */
  .userDB {
    cursor: pointer;
    margin-top: 22px;
    margin-left: 20px;
    line-height: 36px;
    font-size: 16px;
    height: 36px;
  }
  .title userDB {
    color: #333;
  }
  .title1 userDB {
    color: #fff;
  }
  a {
    color: #fff;
  }
  .footerPic {
    margin: 0 auto;
    width: 100px;
    height: 100px;
  }
  .footerTip {
    margin-top: 10px;
    color: #4f617f;
    font-size: 12px;
  }
  .footerTel {
    margin-top: 16px;
    margin-left: 40px;
  }
  .footerTel li:first-child,.footerTel li:last-child {
    font-size: 14px;
    color: #4f617f;
  }
  .footerTelText {
    font-size: 24px;
    color: #fff;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .footer-linked {
    margin-right: -40px;
  }
  .footer-linked a {
    padding: 0 20px;
    transition: .5s;
    box-sizing: border-box;
    border-right: 2px solid #fff;
    display: inline-block;
    font-size: 14px;
    height: 12px;
    line-height: 12px;
  }
  .footer-linked a:last-child {
    border: none;
  }
  .footer_linked a:hover {
    color: #93afd2;
  }
  .footerCompany {
    margin-top: 50px;
    color: #4f617f;
    text-align: right;
    font-size: 14px;
  }
  .footerLast {
    color: #fff;
    font-size: 14px;
    margin-top: 15px;
    text-align: right;
  }
</style>
