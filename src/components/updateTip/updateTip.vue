<template>
  <div>
    <!--pic-->
    <el-dialog width="745px" :visible.sync="showOFF" v-cloak>
      <div class="updateTipAlert">
        <div class="imgDiv left">
          <img class="imgCom" src="../../../static/image001.png" alt="登录">
        </div>
        <div v-show="true" class="updateTip left" v-cloak>
          <p class="up-title color00bffe">尊敬的用户，您好</p>
          <p class="up-com-p">今日我们更新了<span id="totayNum"></span>条招标信息</p>
          <p class="up-com-p">目前，适合您投标的招标公告有<span id="pushNum"></span>条</p>
          <p class="up-com-p">您关注的企业有<span id="followNum"></span>条状态更新</p>
          <p class="up-com-p">您收藏的信息有<span id="collectionNum"></span>条状态更新</p>
          <p class="up-com-p" style="margin-top: 30px">通过我们的计算，</p>
          <p class="up-com-p">有超过<span id="companyNum"></span>家企业可能与您合作</p>
          <p class="up-com-p">属标祝您工作愉快~</p>
          <div class="updateTipBtn" @click="lookBtn">查看</div>
        </div>
      </div>
    </el-dialog>
    <!--pic-->
    <!--春节-->
    <!--happyNewYear-->
   <!-- <div class="happyNewYear">
      <span v-if="showOFF1" @click=" rotateOFF =! rotateOFF  " class="next">
        <img class="imgCom" src="../../../static/next.png" alt="">
      </span>
      <span v-if="showOFF1" @click="closeAlert" class="deleteR">
        <img class="imgCom" src="../../../static/deleteR.png" alt="">
      </span>
      <transition
        enter-active-class="animated tada"
        name="fold">
        <p v-if="showOFF1" class="imgSize" :class=" rotateOFF ? 'rotateY180deg' : 'rotateY0deg' ">
          <img class="imgCom front" src="../../../static/5a6840814deaa_1024.jpg" alt="">
          <img class="imgCom back" src="../../../static/pop_up_back.jpg" alt="">
        </p>
      </transition>
    </div>-->
    <!--happyNewYear-->
    <!--春节-->
  </div>

</template>
<script>
  import axios from 'axios'
  import { mapActions,mapGetters } from 'vuex'
  export default {
    props:{

    },
    name: 'updateTip',
    data () {
      return {
        showOFF:false,
        updateDB:'',
        userDB:'',
        pushNum:0,
        collectionNum:0,
        followNum:0,

        showOFF1:false,
        rotateOFF:'',
      }
    },
    //定义这个sweiper对象
    computed: {
      ...mapGetters([
          'getUserDB',
          'getAPIState',
          'getNavListIndex'
      ]),
    },
    watch: {
      showOFF:function(val){
          this.showOFF1 =! val;
      }
    },
    mounted () {
      var self = this;
      var isLogin = window.localStorage.getItem('userDB');
      if(isLogin){
        if(this.getNavListIndex == '1'){
          self.showOFF = true;
        }
        self.userDB = JSON.parse(isLogin);
        self.updateClick();
      }else{
        self.showOFF = false;
      }
    },
    methods: {
      ...mapActions([
          'updateNavListIndex',
          'updateShowUpdateTip'
      ]),
      closeAlert:function(){
        this.showOFF1 = false;
      },
      rotateYClick:function(){
        this.rotateOFF = true;
      },
      mouseleaveBtn:function(){
        this.cssOFF = false;
      },
      lookBtn:function(){
        this.showOFF = false;
        this.updateNavListIndex(2);
        this.$router.push({path:'/tender'})
      },
      updateClick:function(){
        var self = this;
        var totayNum,pushNum,followNum,collectionNum,companyNum;
        axios.post(self.getAPIState+'pushNoticeUpdate', JSON.stringify({userId:self.userDB.userId}))
          .then(function (obj) {
            var obj = obj.data.data;
            if(obj.result == '0'){
              self.updateDB = obj;
              self.$nextTick(function () {
                totayNum = new CountUp('totayNum', 0, self.updateDB.totayNum, 0, 2.5);
                totayNum.start();
                pushNum = new CountUp('pushNum', 0, self.updateDB.pushNum, 0, 2.5);
                pushNum.start();
                followNum = new CountUp('followNum', 0, self.updateDB.followNum, 0, 2.5);
                followNum.start();
                collectionNum = new CountUp('collectionNum', 0, self.updateDB.collectionNum, 0, 2.5);
                collectionNum.start();
                companyNum = new CountUp('companyNum', 0, self.updateDB.companyNum, 0, 2.5);
                companyNum.start();
              })
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
  [v-cloak] { display: none !important; }
  .updateTipAlert {
    overflow: hidden;
    height: 400px;
  }
  .updateTip {
    z-index: 2000;
    box-sizing: border-box;
    padding: 0 20px;
    background: #fff;
    width: 320px;
    height: 288px;
  }
  .color00bffe{
    color: #00bffe;
  }
  .up-title {
    margin-bottom: 10px;
    text-align: left;
    font-size: 18px;
  }
  .up-com-p {
    margin-top: 15px;
    color: #333;
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
  .imgDiv {
    width: 320px;
    height: 320px;
  }

  /*chunjie*/
  .happyNewYear {
    perspective: 600px;
    transform-style: preserve-3d; /*重要*/
    top: 200px;
    left: 0px;
    right: 0px;
    margin-left:auto;
    margin-right:auto;
    z-index: 2020;
    position: fixed;
    width: 400px;
  }
  .imgSize {
    transform-style: preserve-3d; /*重要*/
    width: 400px;
    height: 550px;
  }
  .deleteR {
    z-index: 2020;
    cursor: pointer;
    top: 10px;
    right: -30px;
    position: absolute;
    display: inline-block;
    width: 20px;
    height: 20px;
  }
  .front {
    transform: rotateY(0deg);
    z-index: 20;
  }
  .back {
    transform: rotateY(-180deg);
    z-index: 10;
  }
  .back,.front {
    position: absolute;
    left: 0;
    top: 0;
    backface-visibility: hidden;  /*重要*/
    width: 100%;
    height: 100%;
  }
  .next {
    z-index: 2020;
    cursor: pointer;
    bottom: 20px;
    left: 20px;
    position: absolute;
    display: inline-block;
    width: 25px;
    height: 25px;
  }
  .rotateY180deg {
    transition: 1s;
    transform: rotateY(180deg);
  }
  .rotateY0deg {
    transition: 1s;
    transform: rotateY(0deg);
  }
  /*donghua*/
  /* .fold-enter-active {
     animation-name: fold-in;
     animation-duration: 1s;
   }*/
  .fold-leave-active {
    animation-name: fold-out;
    animation-duration: 1s;
  }
  /* @keyframes fold-in {
     0% {
       opacity: 0;
       transform:rotateY(0deg);
     }
     100% {
       opacity: 1;
       transform:rotateY(360deg);
     }
   }*/
  @keyframes fold-out {
    0% {
      opacity: 1;
      transform:rotateY(360deg);
    }
    100% {
      opacity: 0;
      transform:rotateY(0deg);
    }
  }
  /*donghua*/
  /*chunjie*/

</style>

