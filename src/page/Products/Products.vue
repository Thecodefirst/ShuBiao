<template>
  <div class="product">
    <div class="product-title">
      <p>产品介绍</p>
      <p>Product Introduction</p>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapActions,mapGetters } from 'vuex'
  export default {
    name: 'Products',
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
        urlPic:'../../../static/copyright_bg.jpg',
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
  .product {
    width: 950px;
    background: #fff;
  }
  .product-title {
    text-align: center;
  }
  .product-title p:first-child {
    margin-top: 30px;
    font-size: 18px;
    color: #333;
  }
  .product-title p:last-child {
    margin-top: 5px;
    margin-bottom: 30px;
    font-size: 14px;
    color: #999;
  }
</style>

