<template>
  <div class="contactUs">
    <div class="contactUs-title">
      <p>联系我们</p>
      <p>Contact us</p>
    </div>
    <div class="Customer">
      <div class="Customer-title">客服热线</div>
      <div class="border2px"></div>
      <p>联系人：客服部</p>
      <p>客服电话：0431-81707576<span style="display: inline-block;margin: 0 15px"></span>咨询电话：043181705629</p>
      <p>电子邮件：service@1234.com</p>
    </div>
    <div class="Customer marginT76">
      <div class="Customer-title">优格总部</div>
      <div class="border2px"></div>
      <p>公司名称：吉林优格科技有限责任公司</p>
      <p>地址：吉林省长春市浦东路2661号</p>
      <p>电话：0431-81854515</p>
      <!--<p>传真：021-59713266</p>-->
      <p>电子邮件：Yogee81854515@163.com</p>
    </div>
    <div class="Customer marginT76">
      <div class="Customer-title">市场合作</div>
      <div class="border2px"></div>
      <p>联系人：市场部</p>
      <p>电话：0431-81930405</p>
      <!--<p>传真：010-59713266</p>-->
      <p>电子邮件：yogee0431@126.com</p>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapActions,mapGetters } from 'vuex'
  export default {
    name: 'contactUs',
    data () {
      return {

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
      this.updateBanner({
        chinese:'关于我们',
        english:'About us',
        urlPic:'./qyhl/copyright_bg.jpg',
      });
    },
    methods: {
      ...mapActions([
        'update_Search',
        'updateBanner'
      ]),

    },
    components:{
      axios,
    }
  }
</script>

<style scoped>
  .contactUs {
    padding-bottom: 60px;
    width: 950px;
    background: #fff;
  }
  .contactUs-title {
    text-align: center;
  }
  .contactUs-title p:first-child {
    margin-top: 30px;
    font-size: 18px;
    color: #333;
  }
  .contactUs-title p:last-child {
    margin-top: 5px;
    margin-bottom: 30px;
    font-size: 14px;
    color: #999;
  }
  .border2px {
    margin: 20px auto;
    border-top: 2px solid #00bffe;
    width: 40px;
  }
  .Customer {
    text-align: center;
  }
  .Customer-title {
    font-size: 16px;
    color: #333;
  }
  .Customer p {
    font-size: 14px;
    line-height: 36px;
  }
  .marginT76 {
    margin-top: 76px;
  }
</style>

