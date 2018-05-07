<template>
  <div class="accountSettings">
    <p class="headerLine">
      <span class="height20px"></span>
      <span v-text="getLookReport.noticeInfo[0].name"></span>
    </p>
    <div class="w1200px">
      <p class="analy-title">招标信息分析报告</p>
      <div class="analy-math">投资人资格平均分：{{ getLookReport.noticeInfo[0].totalScore }}分</div>
      <div class="company-analy">
        <div class="com-program">
          <span class="com-program-title left">企业资质：</span>
          <div style="overflow: hidden;height: 44px;width: 650px;position: relative">
            <li class="line-analy left">
              <p v-bind:style='{ width:zz}' :style="" class="line-analying"></p>
            </li>
            <span v-bind:style='{ left:zz}' class="circle-myself">{{ this.getLookReport.noticeInfo[0].qualificationScore }}%</span>
          </div>
          <div class="cpmpany-analy-text" v-text="this.getLookReport.noticeInfo[0].qualification"></div>
        </div>
      </div>
      <div class="company-analy">
        <div class="com-program">
          <span class="com-program-title left">中标记录：</span>
          <div style="overflow: hidden;height: 44px;width: 650px;position: relative">
            <li class="line-analy left">
              <p v-bind:style='{ width:zb}' :style="" class="line-analying"></p>
            </li>
            <span v-bind:style='{ left:zb}' class="circle-myself">{{ this.getLookReport.noticeInfo[0].succeedScore }}%</span>
          </div>
          <div class="cpmpany-analy-text"></div>
        </div>
      </div>
      <div class="company-analy">
        <div class="com-program">
          <span class="com-program-title left">注册资本：</span>
          <div style="overflow: hidden;height: 44px;width: 650px;position: relative">
            <li class="line-analy left">
              <p v-bind:style='{ width:zc}' :style="" class="line-analying"></p>
            </li>
            <span v-bind:style='{ left:zc}' class="circle-myself">{{ this.getLookReport.noticeInfo[0].registerCapitalScore }}%</span>
          </div>
          <div class="cpmpany-analy-text">
          </div>
        </div>
      </div>
      <div class="company-analy">
        <div class="com-program">
          <span class="com-program-title left">成立时间：</span>
          <div style="overflow: hidden;height: 44px;width: 650px;position: relative">
            <li class="line-analy left">
              <p v-bind:style='{ width:cl}' :style="" class="line-analying"></p>
            </li>
            <span v-bind:style='{ left:cl}' class="circle-myself">{{ this.getLookReport.noticeInfo[0].startDateScore }}%</span>
          </div>
          <div class="cpmpany-analy-text">
          </div>
        </div>
      </div>
      <div class="company-analy">
        <div class="com-program">
          <span class="com-program-title left">所在地区：</span>
          <div style="overflow: hidden;height: 44px;width: 650px;position: relative">
            <li class="line-analy left">
              <p v-bind:style='{ width:sz}' :style="" class="line-analying"></p>
            </li>
            <span v-bind:style='{ left:sz}' class="circle-myself">{{ this.getLookReport.noticeInfo[0].provinceScore }}%</span>
          </div>
          <div class="cpmpany-analy-text">
          </div>
        </div>
      </div>
      <div class="company-analy">
        <div class="com-program">
          <span class="com-program-title left">所属行业：</span>
          <div style="overflow: hidden;height: 44px;width: 650px;position: relative">
            <li class="line-analy left">
              <p v-bind:style='{ width:ss}' :style="" class="line-analying"></p>
            </li>
            <span v-bind:style='{ left:ss}' class="circle-myself">{{ this.getLookReport.noticeInfo[0].industryScore }}%</span>
          </div>
          <div class="cpmpany-analy-text">
          </div>
        </div>
      </div>
    </div>
    <div class="headerLine2">
      <span class="height20px"></span>
      <span>推荐供应商</span>
      <p class="right">
        <el-select v-model="match" placeholder="排序由高到低">
          <el-option key="按成立时间" label="按成立时间" value="按成立时间"></el-option>
          <el-option key="按资质评分" label="按资质评分" value="按资质评分"></el-option>
          <el-option key="按注册资本" label="按注册资本" value="按注册资本"></el-option>
        </el-select>
      </p>
    </div>
    <div class="sedADD">
      <SED></SED>
    </div>
  </div>
</template>s

<script>
  import axios from 'axios'
  import SED from '../../components/SED/SED.vue'
  import { mapActions,mapGetters } from 'vuex'
  export default {
    name: 'analysis',
    data () {
      return {
        match:'',
        leftNum:'',
        programNum:10,
        programming:0,
        marginLeftNum:400,
      }
    },
    //定义这个sweiper对象
    computed: {
      ...mapGetters([
          'getAPIState',
          'getUserDB',
          'getLookReport'
      ]),
      first(){
        return 80 / 100 * 400 + "px";
      },
      /*企业资质*/
      zz(){
        return this.getLookReport.noticeInfo[0].qualificationScore  / 100 * 400 + "px";
      },
      /*中标记录*/
      zb(){
        return this.getLookReport.noticeInfo[0].succeedScore  / 100 * 400 + "px";
      },
      /*注册资本*/
      zc(){
        return this.getLookReport.noticeInfo[0].registerCapitalScore  / 100 * 400 + "px";
      },
      /*成立时间*/
      cl(){
        return this.getLookReport.noticeInfo[0].startDateScore  / 100 * 400 + "px";
      },
      /*所在地区*/
      sz(){
        return this.getLookReport.noticeInfo[0].provinceScore  / 100 * 400 + "px";
      },
      /*所属行业*/
      ss(){
        return this.getLookReport.noticeInfo[0].industryScore  / 100 * 400 + "px";
      },
    },
    mounted () {
        console.log(this.getLookReport.noticeInfo[0]);
    },
    methods: {
      ...mapActions([
          'update_Search',
          'update_UserDB'
      ]),
    },
    components:{
      axios,
      SED
    }
  }
</script>

<style scoped>
  .accountSettings {
    padding-bottom: 40px;
    background: #f0f5f7;
  }
  /*border-left: 4px solid #00bffe;*/
  .headerLine {
    box-sizing: border-box;
    font-size: 24px;
    color: #333;
    margin: 0 auto;
    padding: 30px 0;
    width: 1200px;
  }
  .height20px {
    display: inline-block;
    border-left: 4px solid #00bffe;
    margin-right: 17px;
    height: 20px;
  }
  .w1200px {
    text-align: center;
    margin: 0 auto;
    background: #fff;
    width: 1200px;
  }
  .analy-title {
    padding: 40px 0;
    text-align: center;
    color: #333;
    font-size: 18px;
  }
  .analy-math {
    padding: 0 50px;
    margin: 0 auto;
    font-size: 16px;
    color: #fff;
    line-height: 40px;
    display: inline-block;
    background: url("../../../static/presentation_bg.png") no-repeat center;
    background-size:100% 99.9%;
  }
  .company-analy {
    border-top: 1px solid #ddd;
    margin: 20px auto 0;
    width: 1120px;
  }
  .com-program {
    padding: 20px 0;
    overflow: hidden;
  }
  .com-program-title {
    text-align: left;
    line-height: 40px;
    font-size: 16px;
    color: #333;
    display: inline-block;
    width: 100px;
  }
  .com-circle {
   /* -webkit-transition: all 2s cubic-bezier(0, 0, 0.18, 0.97);
    -o-transition:  all 2s cubic-bezier(0, 0, 0.18, 0.97);
    transition:  all 2s cubic-bezier(0, 0, 0.18, 0.97);*/
    position: absolute;
    overflow: hidden;
    width: 40px;
    height: 40px;
  }
  .line-analy {
    background: #ddd;
    position: relative;
    margin-top: 20px;
    margin-left: 20px;
    width: 400px;
    height: 2px;
  }
  .circle-myself {
    transition: .5s;
    color: #00bffe;
    line-height: 36px;
    left: 0px;
    top: 0;
    background: #fff;
    position: absolute;
    display: inline-block;
    border: 2px solid #00bffe;
    border-radius: 50%;
    width: 36px;
    height: 36px;
  }
  .line-analying {
    transition: .5s;
    width: 0px;
    height: 2px;
    background: #00bffe;
    position: absolute;
  }
  .com-circle .el-progress--circle {
    background: #fff;
  }
  .cpmpany-analy-text {
    text-align: left;
    font-size: 14px;
    color: #333;
    line-height: 36px;
    margin-left: 100px;
    width: 1020px;
  }
  .sedADD {
    width: 1200px;
    padding: 20px;
    background: #fff;
    margin: 0 auto;
    box-sizing: border-box
  }
  .headerLine2 {
    overflow: hidden;
    box-sizing: border-box;
    font-size: 18px;
    color: #333;
    margin: 0 auto;
    padding: 20px 0;
    width: 1200px;
  }
  .headerLine2 span {
    margin-top: 8px;
    vertical-align: middle;
    display: inline-block;
    line-height: 24px;
    height: 24px;
  }
</style>

