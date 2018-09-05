// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router';
import store from './store/store';
//element-ui
import ElementUI from 'element-ui';
Vue.use(ElementUI);
import 'element-ui/lib/theme-chalk/index.css';
//样式
import './assets/css/reset.css';
// import './assets/css/global.scss';


//全局组件
import ComSelect from '@/components/com-select'
import ComTime from '@/components/com-time'
import ComDayTime from '@/components/com-dayTime'
import ComUpdate from '@/components/com-update'
import ComUpdateimg from '@/components/com-updateImg'
import ComPages from '@/components/com-pages'
import ComHeader from '@/components/header'
Vue.component('com-select', ComSelect); // 有多处用到，则注册全局组件
Vue.component('com-time', ComTime); // 有多处用到，则注册全局组件
Vue.component('com-daytime', ComDayTime); // 有多处用到，则注册全局组件
Vue.component('com-update', ComUpdate); // 有多处用到，则注册全局组件
Vue.component('com-updateimg', ComUpdateimg); // 有多处用到，则注册全局组件
Vue.component('com-pages', ComPages); // 有多处用到，则注册全局组件
Vue.component('com-header', ComHeader); // 有多处用到，则注册全局组件

Vue.prototype.message=function (info,type) {
  this.$message({
    message:info,
    type:type
  })
};
Vue.prototype.confirm=function(){
  return new Promise((resolve,reject)=>{
    this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      resolve()
    }).catch(() => {
        reject()
    });
  })
}




import Cache from './utils/cache';
Vue.prototype.uid=function () {
  return Cache.getSession("userid") || store.state.uid
};



//全局路由守卫
router.beforeEach((to, from, next) => {
    let token = Cache.getSession('token');
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!token) {
            next({name: 'login'});
        } else {
            next();
        }
    } else {
        next();
    }
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
