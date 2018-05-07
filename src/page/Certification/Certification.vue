<template>
  <div class="Certification">
    <el-dialog width="500px" :visible.sync="showOFF" v-cloak>
      <div style="overflow: hidden;height: 400px;">
        <div class="imgDiv">
          <img v-if="getPersonalDB.autoFlag == '1'" class="imgCom" src="../../../static/loading.gif" alt="企业认证加载">
          <img v-else class="imgCom" src="../../../static/enterprise_certification.png" alt="企业已认证">
        </div>
        <p class="tip-p" v-if="getPersonalDB.autoFlag == '1'">亲爱的用户，我们正在为您建立公司档案，需要2~3分钟的时间，请您耐心等待~</p>
        <p class="tip-p" v-else>亲爱的用户，我们已经为您建立了公司档案，如有缺失可到企业认证中修改，修改后会更加精准的为您推送</p>
      </div>
    </el-dialog>
    <div class="Certification-title">
      <p>企业认证</p>
      <p>Enterprise certification</p>
    </div>
    <div class="data-perfection">
      <li>
        <span class="data-p-text left">资料完善情况</span>
        <p class="left">
          <el-rate
            v-model="valueNum"
            disabled
            show-score
            :colors="['#b4bccc','#00bffe','#00bffe']"
            text-color="#00bffe"
            :score-template="valueText">
          </el-rate>
        </p>
        <p class="data-p-tip left">(*完善信息会增加试用期)</p>
      </li>
      <li>
        <span class="data-p-text left">企业全称</span>
        <p class="com-text-data" v-text="getPersonalDB.name"></p>
      </li>
      <li>
        <span class="data-p-text left">法定代表人</span>
        <p class="com-text-data" v-text="getPersonalDB.legalPerson"></p>
      </li>
      <li>
        <span class="data-p-text left">注册资本</span>
        <p class="com-text-data"><span v-text="getPersonalDB.registerCapital"></span>万元</p>
      </li>
      <li>
        <span class="data-p-text left">成立时间</span>
        <p class="com-text-data" v-text="getPersonalDB.startDate"></p>
      </li>
      <li>
        <span class="data-p-text left">经营状态</span>
        <p class="com-text-data" v-text="getPersonalDB.operatingState"></p>
      </li>
      <li>
        <span class="data-p-text left">统一社会信用代码</span>
        <p class="com-text-data" v-text="getPersonalDB.creditCode"></p>
      </li>
      <li>
        <span class="data-p-text left">纳税人识别号</span>
        <p class="com-text-data" v-text="getPersonalDB.taxCode"></p>
      </li>
      <li>
        <span class="data-p-text left">注册号</span>
        <p class="com-text-data" v-text="getPersonalDB.registerCode"></p>
      </li>
      <li>
        <span class="data-p-text left">组织机构代码</span>
        <p class="com-text-data" v-text="getPersonalDB.organizationCode"></p>
      </li>
      <li>
        <span class="data-p-text left">公司类型</span>
        <p class="com-text-data" v-text="getPersonalDB.enterpriseForms"></p>
      </li>
      <li>
        <span class="data-p-text left">企业规模</span>
        <p class="com-text-data" v-text="getPersonalDB.companyScaleLabel"></p>
      </li>
      <li>
        <span class="data-p-text left">营业期限</span>
        <p class="com-text-data">{{getPersonalDB.timeStart}}-{{getPersonalDB.timeStop}}</p>
      </li>
      <li>
        <span class="data-p-text left">登记机关</span>
        <p class="com-text-data" v-text="getPersonalDB.registerUnit"></p>
      </li>
      <li>
        <span class="data-p-text left">核准日期</span>
        <p class="com-text-data" v-text="getPersonalDB.timeApproval"></p>
      </li>
      <li>
        <span class="data-p-text left">英文名</span>
        <p class="com-text-data" v-text="getPersonalDB.nameEnglish"></p>
      </li>
      <li>
        <span class="data-p-text left">曾用名</span>
        <p class="com-text-data" v-text="getPersonalDB.nameUsed"></p>
      </li>
      <li>
        <span class="data-p-text left">所属地区</span>
        <p class="com-text-data" v-text="getPersonalDB.area"></p>
      </li>
      <li>
        <span class="data-p-text left">曾用名</span>
        <p class="com-text-data" v-text="getPersonalDB.nameUsed"></p>
      </li>
      <li>
        <span class="data-p-text left">所在地区</span>
        <p class="com-text-data" v-text="getPersonalDB.area"></p>
      </li>
      <li>
        <span class="data-p-text left">所属行业</span>
        <el-tooltip effect="light" :content="getPersonalDB.industry" placement="top">
          <p class="com-text-data" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;" v-text="getPersonalDB.industry"></p>
        </el-tooltip>
      </li>
      <li>
        <span class="data-p-text left">企业地址</span>
        <p class="com-text-data" v-text="getPersonalDB.address"></p>
      </li>
      <li>
        <span class="data-p-text left">经营范围</span>
        <el-tooltip :content="getPersonalDB.operationScope" placement="top" effect="light">
          <p class="com-text-data addCSSover" v-text="getPersonalDB.operationScope"></p>
        </el-tooltip>
      </li>
      <li>
        <span class="data-p-text left">经营产品</span>
        <p class="com-text-data" v-text="getPersonalDB.operationProduct"></p>
      </li>
      <li>
        <span class="data-p-text left">邮箱</span>
        <p class="com-text-data" v-text="getPersonalDB.email"></p>
      </li>
      <li>
        <span class="data-p-text left">中标记录</span>
        <p class="com-text-data" v-text="getPersonalDB.isHit == '0' ? '是' : '否'"></p>
      </li>
      <li>
        <span class="data-p-text left">产品检测报告</span>
        <p class="com-text-data" v-text="getPersonalDB.inspectionReport == '0' ? '是' : '否'"></p>
      </li>
      <li>
        <span class="data-p-text left">列入政府采购</span>
        <p class="com-text-data" v-text="getPersonalDB.joinGovernment == '0' ? '是' : '否'"></p>
      </li>
    </div>
    <div class="aptitude">
      <!--v-text="item"-->
      <p class="aptitude-tips">您企业的资质条件，直接推送符合您企业的招标信息</p>
      <div v-show="!getPersonalDB.qualification[0] == ''" class="aptitude-tips-div">
        <p>企业资质</p>
        <li v-for="(item,index) in getPersonalDB.qualification"><span class="aptitude-value" v-text="item"></span></li>
      </div>
      <div v-show="!getPersonalDB.patent[0] == ''" class="aptitude-tips-div">
        <p>专利证书</p>
        <li v-for="(item,index) in getPersonalDB.patent"><span class="aptitude-value" v-text="item"></span></li>
      </div>
      <div v-show="!getPersonalDB.intellectualProperty[0] == ''" class="aptitude-tips-div">
        <p>知识产权</p>
        <li v-for="(item,index) in getPersonalDB.intellectualProperty"><span class="aptitude-value" v-text="item"></span></li>
      </div>
      <div v-show="!getPersonalDB.afterProof[0] == ''" class="aptitude-tips-div">
        <p>售后证明</p>
        <li v-for="(item,index) in getPersonalDB.afterProof"><span class="aptitude-value" v-text="item"></span></li>
      </div>
      <div v-show="!getPersonalDB.groupQualifications[0] == ''" class="aptitude-tips-div">
        <p>团队资历</p>
        <li v-for="(item,index) in getPersonalDB.groupQualifications"><span class="aptitude-value" v-text="item"></span></li>
      </div>
      <div v-show="!getPersonalDB.recentCase[0] == ''" class="aptitude-tips-div">
        <p>近年案例</p>
        <li v-for="(item,index) in getPersonalDB.recentCase"><span class="aptitude-value" v-text="item"></span></li>
      </div>
    </div>
    <div class="pic-company">
      <p class="aptitude-tips">上传营业执照</p>
      <div class="pic-List">
        <li style="background-color: #ddd" v-if="getPersonalDB.imgLicense == ''">
          <router-link to="/personalCenter/updateCertification">
            <span style="cursor: pointer;display: block;width: 70px;height: 70px;margin: 60px auto 0;">
              <img class="imgCom" src="../../../static/addPic.png" alt="上传添加">
            </span>
          </router-link>
          <p style="font-size: 16px;font-weight: 600;margin-top: 15px;color: #333">请点击上传营业执照</p>
        </li>
        <li @click="openPic" v-else style="cursor: pointer">
          <img class="imgCom" :src="getPersonalDB.imgLicense" alt="图片预览">
        </li>
      </div>
    </div>
    <div class="update-company">
      <router-link to="/personalCenter/updateCertification"><el-button type="primary">修改</el-button></router-link>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import { mapActions,mapGetters } from 'vuex'
  export default {
    name: 'Certification',
    data () {
      return {
        showOFF:true,
        valueNum:0,
        valueText:'',
      }
    },
    //定义这个sweiper对象
    computed: {
      ...mapGetters([
        'getAPIState',
        'getUserDB',
        'getPersonalDB'
      ]),
    },
    mounted () {
      this.updateNavListIndex(5);
      if(this.getPersonalDB.score == ''){
        this.valueNum = 0;
        this.valueText = '0';
      }else{
        this.valueNum =  this.accMul(this.accDiv(this.getPersonalDB.score,100),5);
        this.valueText = JSON.stringify(Math.ceil(this.accMul(this.valueNum,20)));
      }
    },
    methods: {
      ...mapActions([
        'update_Search',
        'updateNavListIndex',
        'updatePersonalDB'
      ]),
      openPic:function(){
        window.open(this.getPersonalDB.imgLicense);
      },
    },
    components:{
      axios,
    }
  }
</script>

<style scoped>
  .Certification {
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
  .data-perfection {
    border-bottom: 1px solid #ddd
  }
  .data-perfection li {
    margin-bottom: 25px;
    overflow: hidden;
  }
  .data-p-text {
    display: inline-block;
    font-size: 16px;
    margin-right: 20px;
    color: #999;
    width: 140px;
  }
  .data-p-tip {
    font-size: 14px;
    color: #999;
    margin-left: 10px;
    display: inline-block;
  }
  .com-text-data {
    font-size: 14px;
    color: #333;
    width: 600px;
  }
  .aptitude {
    box-sizing: border-box;
  }
  .aptitude-tips {
    padding-top: 40px;
    padding-bottom: 36px;
    font-size: 16px;
    color: #333;
  }
  .aptitude li {
    color: #00bffe;
    font-size: 14px;
    list-style: disc;
  }
  .aptitude-value {
    color: #333;
  }
  .pic-company {
    margin-top: 38px;
    border-top: 1px solid #ddd
  }
  .pic-List {
    overflow: hidden;
  }
  .pic-List li {
    text-align: center;
    border: 1px solid #ddd;
    float: left;
    margin-right: 30px;
    margin-bottom: 20px;
    height: 267px;
    width: 200px;
  }
  .update-company {
    text-align: center;
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
  .aptitude-tips-div {
    font-size: 16px;
    color: #333;
    margin-bottom: 40px;
  }
  .aptitude-tips-div p {
    margin-bottom: 36px;
  }
  .aptitude-tips-div li {
    margin-top: 36px;
  }
  .imgDiv {
    margin: 0 auto;
    width: 280px;
    height: 280px;
  }
  .tip-p {
    padding: 0 20px;
    color: #333;
    font-size: 16px;
  }
</style>

