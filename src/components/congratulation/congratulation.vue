<template>
  <!--pic-->
  <el-dialog width="745px" :visible.sync="showOFF" v-cloak>
    <div style="overflow: hidden">
      <div class="imgDiv left">
        <img class="imgCom" src="../../../static/image002.png" alt="恭喜中标">
      </div>
      <div v-show="showOFF" class="congratulation left" v-cloak>
        <p class="up-title color57bc80">亲爱的用户，恭贺！</p>
        <p class="up-title1" v-text="DB.companyName"></p>
        <p class="up-com-p">招标项目编号：{{ DB.number }}</p>
        <p class="up-com-p">项目金额：{{ DB.amount }}</p>
        <p class="up-com-p">开标日期：{{ DB.bidDate }}</p>
        <p class="up-com-p addCSSover">招标内容：{{ DB.content }}</p>
        <div class="updateTipBtn" @click="lookBtn(DB.id)">查看</div>
      </div>
    </div>
  </el-dialog>
  <!--pic-->
</template>

<script>
  import axios from 'axios'
  import { mapActions,mapGetters } from 'vuex'
  export default {
    name: 'congratulation',
    data () {
      return {
        showOFF:false,
        DB:{
          number: "",
          amount: "",
          noticeName:"",
          companyName: "",
          bidDate: "",
          id: "",
          content: "",
        },
      }
    },
    //定义这个sweiper对象
    computed: {
      ...mapGetters([
          'getUserDB',
          'getAPIState',
      ]),
    },
    mounted () {
      var self = this;
      var isLogin = window.localStorage.getItem('userDB');
      if(isLogin){
        self.userDB = JSON.parse(isLogin);
        self.updateClick();
      }else{
        self.showOFF = false;
      }
    },
    methods: {
      ...mapActions([
          'updateNavListIndex'
      ]),
      mouseleaveBtn:function(){
        this.cssOFF = false;
      },
      lookBtn:function(){
        this.showOFF = false;
        this.$router.push({path:'/tender'})
      },
      updateClick:function(){
        var self = this;
        axios.post(self.getAPIState+'pushNoticeSucceed', JSON.stringify({userId:self.userDB.userId}))
          .then(function (obj) {
            var obj = obj.data.data;
            if(obj.result == '0'){
              if( typeof(obj.noticeSucceed.length) == "undefined" || obj.noticeSucceed.length == 0 ){
                self.showOFF = false;
              }else{
                self.DB = obj.noticeSucceed[0];
              }
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
  .congratulation {
    z-index: 2001;
    padding: 0 20px;
    box-sizing: border-box;
    background: #fff;
    width: 320px;
    height: 320px;
  }
  .color57bc80{
    color: #57bc80;
  }
  .up-title {
    margin-bottom: 10px;
    text-align: left;
    font-size: 18px;
  }
  .up-title1 {
    color: #333;
    font-size: 16px;
  }
  .up-com-p {
    margin-top: 15px;
    color: #999;
    font-size: 14px;
  }
  .updateTip span {
    color: #00bffe;
    font-size: 20px;
  }
  .updateTipBtn {
    transition: .5s;
    cursor: pointer;
    margin-top: 30px;
    font-size: 14px;
    color: #999;
    line-height: 30px;
    text-align: center;
    border: 2px solid #999;
    border-radius: 50px;
    width: 76px;
    height: 30px;
  }
  .updateTipBtn:hover {
    color: #00bffe;
    border-color: #00bffe;
  }
  .addCSSover {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .imgDiv {
    width: 320px;
    height: 320px;
  }
</style>

