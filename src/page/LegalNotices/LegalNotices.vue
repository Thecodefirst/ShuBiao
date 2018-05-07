<template>
  <div class="LegalNotices">
    <div class="LegalNotices-title">
      <p>法律声明</p>
      <p>Legal statement</p>
    </div>
    <div class="LegalNotices-value">
      若要访问和使用属标网，您必须不加修改地完全接受本协议中所包含的条款、条件和属标网即时刊登的通告，并且遵守有关互联网、万维网及/或本网站的相关法律、规定与规则。一旦您访问、使用了属标网，即表示您同意并接受了所有该等条款、条件及通告。
一、本网站上的信息
1、本网站上关于属标网的注册信息均由用户自行提供，用户依法应对其提供的任何信息承担全部责任。属标网对任何使用或提供本网站信息的商业活动及其风险不承担任何责任。
2、浏览者可以下载本网站上显示的资料，但不得用于任何商业用途，无论是否在资料上明示，所有此等资料都是受到版权法的法律保护。浏览者没有获得属标网或各自的版权所有者明确的书面同意下，不得分发、修改、散布、再使用、再传递或使用本网站的内容用于任何公众商业用途。
二、意见反馈
本网站表述的任何意见均属于作者个人意见，并不代表属标网、属标网运营商或属标网关联公司的意见。
三、版权和商标
属标网吉林省优格信息科技有限公司版权所有。所有的权利均在全世界范围内受到法律保护，除非有其他的标注或在此等条款和规则中被允许使用，本网站上可阅读和可见的所有资料都受到知识产权法的保护。
"属标"、"71hulian.com"、"qiyehulian.net"和属标网LOGO商标或标识都是吉林省优格信息科技有限公司的商品及服务商标和域名。所有其他优格信息科技有限公司没有主张权利的商标和产品名称则可能是它们各自所有权人的商标或注册商标，未获得属标网或其他在本网站上有权使用商标的第三方的书面同意下，本网站不应理解为授权使用被展示于本网站的任何商标。
四、免责声明
属标网在此特别声明对如下事宜不承担任何法律责任：
1、属标网在此声明，对您使用网站、与本网站相关的任何内容、服务或其它链接至本网站的站点、内容均不作直接、间接、法定、约定的保证。
2、无论在任何原因下（包括但不限于疏忽原因），对您或任何人通过使用本网站上的信息或由本网站链接的信息，或其他与本网站链接的网站信息所导致的损失或损害（包括直接、间接、特别或后果性的损失或损害，例如收入或利润之损失，电脑系统之损坏或数据丢失等后果），责任均由使用者自行承担（包括但不限于疏忽责任）使用者对本网站的使用即表明同意承担浏览本网站的全部风险，属标网、属标网运营商和属标网关联公司对使用者在本网站存取资料所导致的任何直接、相关的、后果性的、间接的或金钱上的损失不承担任何责任。

    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapActions,mapGetters } from 'vuex'
  export default {
    name: 'LegalNotices',
    data () {
      return {

      }
    },
    //定义这个sweiper对象
    computed: {
      ...mapGetters([
        'getAPIState',
        'getUserDB',
        'getPersonalDB',
        'getNavList'
      ]),
    },
    mounted () {
      this.updateBanner({
        chinese:'版权声明',
        english:'Copyright statement',
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
  .LegalNotices {
    width: 950px;
    background: #fff;
  }
  .LegalNotices-title {
    text-align: center;
  }
  .LegalNotices-title p:first-child {
    margin-top: 30px;
    font-size: 18px;
    color: #333;
  }
  .LegalNotices-title p:last-child {
    margin-top: 5px;
    margin-bottom: 30px;
    font-size: 14px;
    color: #999;
  }
  .LegalNotices-value {
    line-height: 30px;
    font-size: 14px;
    color: #333;
    box-sizing: border-box;
    padding: 20px;
  }
</style>

