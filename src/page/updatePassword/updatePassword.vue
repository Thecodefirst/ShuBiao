<template>
  <div class="updatePassword">
    <div class="Certification-title">
      <p>修改密码</p>
      <p>Modify password</p>
    </div>
    <div>
      <div class="alert-nav marginTop40">
        <li :class='{ alertActive : alertTabNum == 0 }' @click="alertTab(0)">手机修改</li>
        <li style="width: 111px">|</li>
        <li :class='{ alertActive : alertTabNum == 1 }' @click="alertTab(1)">邮箱修改</li>
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
        <p class="error-tip" v-text="errorText"></p>
        <div class="submitBtn">
          <el-button type="primary" @click="submitGetBack">提交</el-button>
        </div>
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
        <p class="error-tip" v-text="errorText"></p>
        <div class="submitBtn">
          <el-button type="primary" @click="submitGetBackEmail">提交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapActions,mapGetters } from 'vuex'
  export default {
    name: 'updatePassword',
    data () {
      return {
        tel:'',
        errorText:'',
        userDB:{
          userId:'',
          userName:'',
        },
        coloraaa:'coloraaa',
        alertActive:'alertActive',
        /*注册*/
        companyName:'',
        contacts:'',
        telephone:'',
        email:'',
        code:'',
        password:'',
        /*注册*/
        alertTabNum:0,
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
      }
    },
    //定义这个sweiper对象
    computed: {
      ...mapGetters([
          'getAPIState',
          'getSearch',
          'getPersonalDB',
          'getUserDB'
      ]),
    },
    mounted () {

    },
    methods: {
      ...mapActions([
          'update_Search',
          'update_UserDB',
          'update_IsLogin'
      ]),
      alertTab:function(num){
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
        this.alertTabNum = 0;
      },
      /*密码找回-邮箱*/
      submitGetBackEmail:function(){
        var self = this;
        var emailTest = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if(self.email == ''){
          self.errorText = '邮箱不能为空';
          return false;
        }else if(!emailTest.test(self.email)) {
          self.errorText = '邮箱格式不正确';
          return false;
        }else if(self.fogetEmailCode == ''){
          self.errorText = '验证码不能为空';
          return false;
        }else if(self.newPassword == '') {
          self.errorText = '新密码不能为空';
          return false;
        }else if(!(self.newPassword.length > 5 && self.newPassword.length < 17)){
          self.errorText = '密码长度在6-16位';
          return false;
        }else{
          self.errorText = '';
          var data = {
            account:self.email,
            password:self.newPassword,
            code:self.fogetEmailCode,
          };
          axios.post(self.getAPIState+'updatePassword', JSON.stringify(data))
            .then(function (obj) {
              console.log(obj);
              var obj = obj.data;
              if(obj.data.result == '0'){
                var userDB = {
                  userName:'',
                  userId:'',
                };
                self.update_IsLogin(false);
                self.update_UserDB(self.userDB);
                sessionStorage.setItem("userDB",'');
                window.localStorage.setItem('userDB','');
                window.localStorage.setItem('userpwd','');
                self.$router.push({path:'/index'})
              }else{
                self.errorText =  obj.msg;
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
          self.errorText = '手机号不能为空';
          return false;
        }else if(!patternPhone.test(self.telephone)) {
          self.errorText = '手机号码格式不正确';
          return false;
        }else if(self.code == ''){
          self.errorText = '验证码不能为空';
          return false;
        }else if(self.newPassword == '') {
          self.errorText = '新密码不能为空';
          return false;
        }else if(!(self.newPassword.length > 5 && self.newPassword.length < 17)){
          self.errorText = '密码长度在6-16位';
            return false;
        }else{
          self.errorText = '';
          var data = {
            account:self.telephone,
            password:self.newPassword,
            code:self.code,
          };
          axios.post(self.getAPIState+'updatePassword', JSON.stringify(data))
            .then(function (obj) {
              var obj = obj.data;
              if(obj.data.result == '0'){
                var userDB = {
                  userName:'',
                  userId:'',
                };
                self.update_IsLogin(false);
                self.update_UserDB(self.userDB);
                sessionStorage.setItem("userDB",'');
                window.localStorage.setItem('userDB','');
                window.localStorage.setItem('userpwd','');
                self.$router.push({path:'/index'})
              }else{
                self.errorText =  obj.msg;
              }
            }).catch(function (error) {
          });
        }
      },
      /*获取验证码*/
      getCode:function(num,type,kind){
        var self = this;
        self.errorText = '';
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
              self.errorText = '';
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
              self.errorText = obj.msg;
            }
          }).catch(function (error) {
        });
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
              self.errorText = obj.msg;
              self.checkOFF = false;
            }else{
              self.errorText = "";
              self.checkOFF = true;
            }
          }).catch(function (error) {
        });
      },
    },
    components:{
      axios,
    }
  }
</script>

<style scoped>
  .updatePassword {
    text-align: center;
    box-sizing: border-box;
    padding: 40px;
    background: #fff;
    width: 910px;
  }
  .Certification-title {
    padding-bottom: 60px;
    text-align: center;
  }
  .Certification-title p:first-child {
    font-size: 18px;
    color: #333;
  }
  .Certification-title p:last-child {
    font-size: 14px;
    color: #999;
  }
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
  .updatePassword .el-button--primary {
    background: #00bffe;
    border-color: #00bffe;
  }
</style>

