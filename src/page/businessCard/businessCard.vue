<template>
  <div class="vee">
      <div class="card-head">
          <div class="head1"></div>
          <span class="head2" v-text="base.name"></span>
          <div class="head3">下载报告</div>
      </div>
      <div class="card-cont">
          <div class="cont1">
            <p class="cont1-time">更新时间：<span v-text="base.updateDate"></span></p>
            <li class="cont1-text blue-line blue-all" v-for="(item,index) in base.range" v-text="item"></li>
          </div>
          <div class="cont2">
              <div class="cont2-text"><span>法人代表：</span><span v-text="base.legalPerson"></span></div>
              <div class="cont2-text"><span>注册时间：</span><span v-text="base.registerDate"></span></div>
              <div class="cont2-text"><span>注册资本：</span><span v-text="base.registerCapital"></span></div>
              <div class="cont2-text cont2-mar"><span>联系电话：</span><span v-text="base.telephone"></span></div>
              <div class="cont2-text cont2-mar"><span>邮箱：</span><span v-text="base.email"></span></div>
              <div class="cont2-text cont2-mar"><span>公司地址：</span>
                <el-tooltip :content="base.address" placement="bottom" effect="light">
                  <span v-text="base.address"></span>
                </el-tooltip>
              </div>
          </div>
          <div class="cont3" v-show="!base.introduce==''">
              <div>简介：
                  <span v-text="base.introduce"></span>
              </div>
              <!--<span>展开</span>-->
          </div>
      </div>
      <div class="card-introduc">
          <div class="introduc-head">
              <div class="int-head1"></div>
              <div class="int-head2">公司背景</div>
          </div>
          <div class="introduc-cont">
              <div class="int-cont1 m30b">工商信息</div>
              <div class="int-cont2"><span>职业状态：</span><span class="green" v-text="business.state"></span></div>
              <div class="int-cont3"><span>工商注册号：</span><span v-text="business.registerCode"></span></div>
              <div class="int-cont3"><span>组织机构代码：</span><span v-text="business.organizationCode"></span></div>
              <div class="int-cont3"><span>统一信用代码：</span><span v-text="business.creditCode"></span></div>
              <div class="int-cont3"><span>组织形式：</span><span v-text="business.enterpriseForms"></span></div>
              <div class="int-cont3"><span>税务登记号：</span><span v-text="business.taxCode"></span></div>
              <div class="int-cont3"><span>执业许可证号：</span><span v-text="business.licenseNumber"></span></div>
              <div class="int-cont3"><span>信用等级：</span><span v-text="business.creditRating"></span></div>
              <div class="int-cont3"><span>营业期限：</span><span v-text="business.timeLimit"></span></div>
              <div class="int-cont3"><span>发证日期：</span><span v-text="business.issuingDate"></span></div>
              <div class="int-cont3"><span>主管机关：</span><span v-text="business.chargeUnit"></span></div>
              <div class="int-cont3"><span>批准日期：</span><span v-text="business.approvalDate"></span></div>
              <div class="int-cont3"><span>地址：</span><span v-text="business.address"></span></div>
              <div class="int-cont3"><span>经营范涛：</span>
                <el-tooltip :content="business.operationScope" placement="bottom" effect="light">
                  <span class="operationScope" v-text="business.operationScope"></span>
                </el-tooltip>
              </div>
          </div>
          <div class="introduc-cont" v-show="!qualifications.length=='0'">
              <div class="int-cont1 m30t">资质证书</div>
              <div class="int-cont4 line">
                  <div>证书类型</div>
                  <div>证书编号</div>
                  <div>发证日期</div>
                  <div>截止日期</div>
              </div>
              <div class="int-cont4" v-for="(item,index) in qualifications">
                  <div v-text="item.name"></div>
                  <div v-text="item.number"></div>
                  <div v-text="item.issuingDate"></div>
                  <div v-text="item.expiryDate"></div>
              </div>
          </div>
          <div class="introduc-cont" v-show="!brands.length=='0'">
              <div class="int-cont1 m30t">知识产权</div>
              <div class="int-cont5 line">
                  <div>申请日期</div>
                  <div>商标名称</div>
                  <div>注册号</div>
                  <div>类别</div>
                  <div>流程状态</div>
              </div>
              <div class="int-cont5" v-for="(item,index) in brands">
                  <div v-text="item.applyDate"></div>
                  <div v-text="item.name"></div>
                  <div v-text="item.number"></div>
                  <div v-text="item.type"></div>
                  <div v-text="item.state"></div>
              </div>
          </div>
          <div class="introduc-cont" v-show="!patents.length=='0'">
              <div class="int-cont1 m30t">专利信息</div>
              <div class="int-cont5 line">
                  <div>申请公布日</div>
                  <div class="w40">专利名称</div>
                  <div>申请号</div>
                  <div>申请公布号</div>
              </div>
              <div class="int-cont5" v-for="(item,index) in patents">
                  <div v-text="patents.applyDate"></div>
                  <div v-text="patents.name"></div>
                  <div v-text="patents.applyNumber"></div>
                  <div v-text="patents.publishNumber"></div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions,mapGetters } from 'vuex'
export default {
  name: 'businessCard',
  data () {
    return {
      base:'',/*基本信息*/
      patents:'',/*专利证书*/
      business:'',/*工商信息*/
      brands:'',/*知识产权*/
      qualifications:'',/*资质证书*/
    }
  },
  //定义这个sweiper对象
  computed: {
    ...mapGetters([
      'getAPIState',
      'getCompanyOptionDB'
    ]),
  },
  mounted () {
     this.base = this.getCompanyOptionDB.base;
     this.patents = this.getCompanyOptionDB.patents;
     this.business = this.getCompanyOptionDB.business;
     this.brands = this.getCompanyOptionDB.brands;
     this.qualifications = this.getCompanyOptionDB.qualifications;
  },
  methods: {
    ...mapActions([
    ]),
  },
  components:{
    axios,
  }
}
</script>

<style scoped>
.m30t{
    margin-top: 30px;
}
.m30b{
    margin-bottom: 30px;
}
.w40{
    width: 40%!important;
}
.line{
    padding: 20px 0;
    border-top: 1px dashed #dddddd;
    border-bottom: 1px dashed #dddddd;
    margin: 20px 0 -30px;
}
.vee{
    background-color: #f5f5f5;
    padding-bottom: 80px;
}
.card-head{
    position: relative;
    width: 1200px;
    height: 22px;
    padding: 30px 0;
    margin: 0 auto;
}
.head1{
    width: 5px;
    height: 22px;
    background-color: #00bffe;
    display: inline-block;
}
.head2{
    position: absolute;
    top: 50%;
    left: 25px;
    transform: translateY(-50%);
    font-size: 22px;
    color: #333333;
}
.head3{
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 100px;
    height: 30px;
    background-color: #ff6600;
    font-size: 14px;
    color: #ffffff;
    text-align: center;
    line-height: 30px;
    border-radius: 20px;
    cursor: pointer;
}
.card-cont{
    width: 1200px;
    padding: 30px 0;
    margin: 0 auto;
    background-color: #ffffff;
}
.cont1{
    margin-right: 20px;
    overflow: hidden;
}
.blue-line:last-child {
  border: none;
}
.cont1-text{
    float: left;
    font-size: 16px;
    color: #00bffe;
}
.blue-line{
    border-right: 2px solid #00bffe;
}
.blue-left{
    padding-left: 25px;
}
.blue-right{
    padding-right: 25px;
}
.blue-all{
    padding: 0 20px;
}
.cont1-time{
    float: right;
    font-size: 16px;
    color: #999999;
}
.cont2{
    overflow: hidden;
    margin: 30px 20px 20px 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #dddddd;
}
.cont2-text{
    float: left;
    width: 365px;
    font-size: 16px;
    color: #333333;
}
.cont2-text span {
  height: 20px;
  display: inline-block;
  vertical-align: middle;
}
.cont2-text span:first-child {
  text-align: justify;
  width: 80px;
}
.cont2-text span:last-child {
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  width: 280px;
}
.cont2-mar{
    margin: 20px 0;
}
.cont3{
    position: relative;
    margin: 0 20px;
    font-size: 16px;
}
.cont3 div{
    line-height: 30px;
    color: #333333;
}
.cont3 span{
    width: 50px;
    color: #999999;
    background: url('../../assets/img/down-select-arrow.png') no-repeat 0 5px;
    text-align: right;
}
/* 公司背景 */
.card-introduc{
    width: 1200px;
    background-color: #ffffff;
    margin: 20px auto 0;
    padding-bottom: 60px;
}
.introduc-head{
    padding: 30px 0;
    height: 20px;
    line-height: 20px;
    position: relative;
}
.int-head1{
    height: 20px;
    width: 5px;
    background-color: #00bffe;
    display: inline-block;
}
.int-head2{
    font-size: 18px;
    color: #333333;
    position: absolute;
    top: 50%;
    left: 25px;
    transform: translateY(-50%);
}
.introduc-cont{
    margin: 0 20px;
    border-bottom: 1px solid #dddddd;
    overflow: hidden;
}
.int-cont1{
    font-size: 16px;
    color: #00bffe;
}
.int-cont2{
    font-size: 16px;
    color: #333333;
    margin-bottom: 30px;
}
.green{
    color: #37b66a;
}
.int-cont3{
    float: left;
    width: 580px;
    font-size: 16px;
    color: #333333;
    margin-bottom: 30px;
}
.int-cont4{
    font-size: 16px;
    color: #333333;
    overflow: hidden;
    text-align: center;
    margin-bottom: 30px;
}
.int-cont4 div{
    width: 25%;
    float: left;
}
.int-cont5{
    margin-bottom: 30px;
    font-size: 16px;
    color: #333333;
    overflow: hidden;
    text-align: center;
}
.int-cont5 div{
    width: 20%;
    float: left;
}
.cont1 li:last-child {
  border: none;
}
.operationScope {
  display: inline-block;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  width: 400px;
}
.introduc-cont div span {
  vertical-align: middle;
}
.introduc-cont div span:first-child {
  display: inline-block;
  width: 130px;
}
</style>
