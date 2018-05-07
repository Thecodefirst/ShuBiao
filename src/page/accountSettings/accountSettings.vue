<template>
  <div class="accountSettings">
    <div class="Certification-title">
      <p>账号设置</p>
      <p>Account settings</p>
    </div>
    <div class="accont-value">
      <li>
        <span class="accont-L left">邮箱</span>
        <p class="left" v-text="accountDB.email"></p>
      </li>
      <li>
        <span class="accont-L left">手机</span>
        <p class="left" v-text="accountDB.telephone"></p>
      </li>
      <li>
        <span class="accont-L left">修改密码</span>
        <router-link to="/personalCenter/updatePassword"><el-button>修改密码</el-button></router-link>
      </li>
    </div>
    <div class="aptitude">
      <!--v-text="item"-->
      <p class="aptitude-tips">请选择推送方式</p>
      <el-checkbox-group v-model="checkListTS" @change="checkListTSClick">
        <p><el-checkbox label="0">邮箱提醒</el-checkbox></p>
        <!--<p><el-checkbox label="1">短信提醒</el-checkbox></p>-->
      </el-checkbox-group>
    </div>
    <div class="aptitude">
      <!--v-text="item"-->
      <p class="aptitude-tips">请选择推送时间</p>
      <el-radio-group v-model="checkedTime" :disabled="checkedTimeOFF">
        <p><el-radio  :label="0">实时推送</el-radio></p>
        <p><el-radio  :label="1">每日推送</el-radio></p>
        <p><el-radio  :label="2">自定义推送</el-radio></p>
      </el-radio-group>
      <p><el-time-picker
        :disabled="ONOFF"
        is-range
        format='HH:mm'
        v-model="valueTime"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        placeholder="选择时间范围">
      </el-time-picker></p>
    </div>
    <div class="update-company">
      <el-button type="primary" @click="submitClick">提交</el-button>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import axios from 'axios'
  import { mapActions,mapGetters } from 'vuex'
  export default {
    name: 'accountSettings',
    data () {
      return {
        checkedTimeOFF:false,
        accountDB:'',
        valueTime:'',
        checkListTS:[],
        checkedTime:'',
      }
    },
    //定义这个sweiper对象
    computed: {
      ...mapGetters([
          'getAPIState',
          'getSearch',
          'getIsLogin',
          'getPersonalDB',
          'getUserDB'
      ]),
      ONOFF(){
          if(this.checkedTime == 0){
              return true;
          }else if(this.checkedTime == 1){
            return true;
          }else{
            return false;
          }
      }
    },
    mounted () {
      var isLoginState = window.localStorage.getItem('userDB');
      this.update_UserDB(JSON.parse(isLoginState));
      this.initDB();
    },
    methods: {
      ...mapActions([
          'update_Search',
          'update_UserDB'
      ]),
      checkListTSClick:function(){
        var self = this;
        if(self.accountDB.email == ''){
          if(self.checkListTS[0] == '0' || self.checkListTS[1] == '0'){
            self.open('请先补充邮箱');
            self.checkListTS = [];
            return false;
          }
        }
        if(this.checkListTS.length > 1){
          this.checkedTimeOFF = false;
        }else{
          self.checkedTime = '';
          self.valueTime = [];
          this.checkedTimeOFF = true;
        }
      },
      initDB:function(){
        var strs= new Array(); //定义一数组
        var self = this;
        axios.post(this.getAPIState+'accountSetting',JSON.stringify({userId:this.getUserDB.userId}))
          .then(function (obj) {
            var obj = obj.data.data;
            if(obj.result == '0'){
              self.accountDB = obj.infoSetting[0];
              self.checkListTS=obj.infoSetting[0].way.split("|");
              self.checkedTime=JSON.parse(obj.infoSetting[0].dateType);
              self.valueTime = [
                  self.moment(self.moment().format('YYYY-MM-DD')+" "+obj.infoSetting[0].dateStart).utc()._d,
                  self.moment(self.moment().format('YYYY-MM-DD')+" "+obj.infoSetting[0].dateStop).utc()._d
              ];
            }
          }).catch(function (error) {
        });
      },
      open:function(msg){
        this.$message(msg);
      },
      submitClick:function(){
        var self = this;
        if(self.checkedTime == '2'){
            if(self.valueTime == null){
              self.$message({
                showClose: true,
                message: "请选择开始与结束时间",
                type: 'success'
              });
                return false;
            }
        };
        var data = {
          id:self.accountDB.pushId,
          companyId:self.getUserDB.userId,
          way:self.arrayString(self.checkListTS),
          dateType:self.checkedTime,
          dateStart:self.moment(self.valueTime[0]).format('HH:mm'),
          dateStop:self.moment(self.valueTime[1]).format('HH:mm'),
        }
        axios.post(this.getAPIState+'pushSetting',JSON.stringify(data))
          .then(function (obj) {
            var obj = obj.data.data;
            if(obj.result == '0'){
              self.initDB();
              self.$message({
                showClose: true,
                message: "账号设置修改成功",
                type: 'success'
              });
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
  .accountSettings {
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
  .accont-value li {
    overflow: hidden;
    font-size: 16px;
    line-height: 40px;
    margin-bottom: 10px;
  }
  .accont-L {
    width: 100px;
  }
  .aptitude {
    border-top: 1px solid #dfdfdf;
    box-sizing: border-box;
  }
  .aptitude p {
    padding-bottom: 20px;
  }
  .aptitude-tips {
    padding-top: 40px;
    font-size: 16px;
    color: #333;
  }
  .update-company {
    text-align: center;
    margin-top: 60px;
  }
  .el-button--primary:focus, .el-button--primary:hover {
    background: #66b1ff;
    border-color: #66b1ff;
    color: #fff;
  }
  .el-button--primary {
    background: #00bffe;
    border-color: #00bffe;
    width: 340px;
    height: 50px;
  }
</style>

