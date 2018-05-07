import Vue from 'vue'
import Router from 'vue-router'

const App = resolve => require(['../App.vue'], resolve)//首页
const index = resolve => require(['../page/index/index.vue'], resolve)//首页

const helpArray = resolve => require(['../page/helpCom/helpArray.vue'], resolve)//常见问题
const helpOptions = resolve => require(['../page/helpCom/helpOptions.vue'], resolve)//常见列表
const helpInfo = resolve => require(['../page/helpCom/helpInfo.vue'], resolve)//常见详情

const search = resolve => require(['../page/search/search.vue'], resolve)//招标搜索
const noticeInfo = resolve => require(['../page/noticeInfo/noticeInfo.vue'], resolve)//招标详情

const tender = resolve => require(['../page/tender/tender.vue'], resolve)//招标订阅

const policy = resolve => require(['../page/policy/policy.vue'], resolve)//政策解读
const policyOption = resolve => require(['../page/policyOption/policyOption.vue'], resolve)//政策解读详情

const personalCenter = resolve => require(['../page/personalCenter/personalCenter.vue'], resolve)//个人中心
const Certification = resolve => require(['../page/Certification/Certification.vue'], resolve)//企业认证
const update_Certification = resolve => require(['../page/update_Certification/update_Certification.vue'], resolve)//企业认证-修改
const pushContents = resolve => require(['../page/pushContents/pushContents.vue'], resolve)//推送管理
const accountSettings = resolve => require(['../page/accountSettings/accountSettings.vue'], resolve)//账号设置
const updatePassword = resolve => require(['../page/updatePassword/updatePassword.vue'], resolve)//密码修改

const bottomCenter = resolve => require(['../page/bottomCenter/bottomCenter.vue'], resolve)//导航底部
const LegalNotices = resolve => require(['../page/LegalNotices/LegalNotices.vue'], resolve)//法律声明
const serviceRegulation = resolve => require(['../page/serviceRegulation/serviceRegulation.vue'], resolve)//服务条例
const Products = resolve => require(['../page/Products/Products.vue'], resolve)//产品介绍
const contactUs = resolve => require(['../page/contactUs/contactUs.vue'], resolve)//联系我们

const businessCard = resolve => require(['../page/businessCard/businessCard.vue'], resolve)//企业名片
const analysis = resolve => require(['../page/analysis/analysis.vue'], resolve)//分析报告

const companyOptions = resolve => require(['../page/companyOptions/companyOptions.vue'], resolve)//公司动态

Vue.use(Router)

export default new Router({
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {path: '/', redirect: '/index'},
    {
      path: '/',
      name: 'App',
      component: App,
      children:[
        /*首页-轮播图-最新发布-招标大厅-政策解读*/
        {path: "/index", name:'index', component: index},
        /*常见问题-问题详情*/
        {path: "/helpArray", name:'helpArray', component: helpArray,
          children:[
            {path: "/helpArray/helpOptions", name:'helpOptions', component: helpOptions},
            {path: "/helpArray/helpInfo", name:'helpInfo', component: helpInfo},
          ]
        },
        /*高级搜索*/
        {path: '/search', name: 'search', component: search,
          children:[

          ]
        },
        /*招标详情*/
        {path: '/noticeInfo',name: 'noticeInfo', component: noticeInfo,
          children:[

          ]
        },
        /*招标订阅*/
        {path: '/tender',name: 'tender', component: tender,
          children:[

          ]
        },
        /*政策解读*/
        {path: '/policy',name: 'policy', component: policy,
          children:[

          ]
        },
        /*政策解读详情*/
        {path: '/policyOption',name: 'policyOption', component: policyOption,
          children:[

          ]
        },
        /*个人中心*/
        {path: '/personalCenter',name: 'personalCenter', component: personalCenter,
          children:[
            {path: '/personalCenter/Certification',name: 'Certification', component: Certification},
            {path: '/personalCenter/updateCertification',name: 'updateCertification', component: update_Certification},
            {path: '/personalCenter/pushContents',name: 'pushContents', component: pushContents},
            {path: '/personalCenter/accountSettings',name: 'accountSettings', component: accountSettings},
            {path: '/personalCenter/updatePassword',name: 'updatePassword', component: updatePassword},
          ]
        },

        /*底部导航*/
        {path: '/bottomCenter',name: 'bottomCenter', component: bottomCenter,
          children:[
            {path: '/bottomCenter/LegalNotices',name: 'LegalNotices', component: LegalNotices},
            {path: '/bottomCenter/serviceRegulation',name: 'serviceRegulation', component: serviceRegulation},
            {path: '/bottomCenter/Products',name: 'Products', component: Products},
            {path: '/bottomCenter/contactUs',name: 'contactUs', component: contactUs},
          ]
        },
        /*企业名片*/
        {path: '/businessCard',name: 'businessCard', component: businessCard,},
        /*分析报告*/
        {path: '/analysis',name: 'analysis', component: analysis},
        /*公司动态*/
        {path: '/companyOptions',name: 'companyOptions', component: companyOptions,},
      ]
    },
  ]
})
