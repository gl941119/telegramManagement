import Vue from 'vue';
import Router from 'vue-router';

//登录页
import Login from '@/pages/login/login'

//首页
import Index from '@/pages/index/index'

//智能客服
import Service from '@/pages/index/service/service'
//私人语料库
import PrivateCorpus from '@/pages/index/privateCorpus/privateCorpus'
//素材库
import materialLibrary from '@/pages/index/materialLibrary/materialLibrary'
import crowdSelf from '@/pages/index/materialLibrary/pages/crowdSelf/crowdSelf' // 群自建
import lookGroupUser from  '@/pages/index/materialLibrary/pages/crowdSelf/lookGroupUser'
import crowdMaterial from '@/pages/index/materialLibrary/pages/crowdMaterial/crowdMaterial' // 群素材
import notification from '@/pages/index/materialLibrary/pages/notification/notification' // 消息推送
import greet from '@/pages/index/materialLibrary/pages/greet/greet' // 打招呼
import robot from '@/pages/index/materialLibrary/pages/robot/robot' // 机器人
import loginUser from '@/pages/index/materialLibrary/pages/loginUser/loginUser' // 登录用户



//群管理
import groupManagement from '@/pages/index/GroupManagement/GroupManagement'
//new群管理
import GroupManage from '@/pages/index/GroupManage/GroupManage'

//用户管理
import UsersManage from '@/pages/index/UsersManage/UsersManage'
//聊天日志
import ChatLog from '@/pages/index/chatlog/chatlog'
import robotLog from '@/pages/index/chatlog/pages/robotLog'
import ChatLogChildren from '@/pages/index/chatlog/pages/chatLog'
//设备管理
import facilityManage from '@/pages/index/facilityManage/facilityManage'
//通讯录
import addressBook from '@/pages/index/addressBook/addressBook'
//计划任务
import planTask from '@/pages/index/planTask/planTask'


Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      redirect: {name: 'index'},
    },
    {
      path: '/index',
      name: 'index',
      meta: {requiresAuth: true},
      component: Index,
      redirect: {name: 'service'},
      children: [
        {
          path: 'service',
          name: 'service',
          component: Service
        }, {
          path: 'privateCorpus',
          name: 'privateCorpus',

          component: PrivateCorpus
        }, {//素材库
          path: 'materialLibrary',
          name: 'materialLibrary',
          redirect:{name:'crowdSelf'},
          component: materialLibrary,
          children:[{//群管理自建
            path:'crowdSelf',
            name:'crowdSelf',
            component:crowdSelf
          },{//群管理素材
            path:'crowdMaterial',
            name:'crowdMaterial',
            component:crowdMaterial
          },{//消息推送
            path:'notification',
            name:'notification',
            component:notification
          },{//打招呼
            path:'greet',
            name:'greet',
            component:greet
          },{//机器人
            path:'robot',
            name:'robot',
            component:robot
          },{
            path:'loginUser',
            name:'loginUser',
            component:loginUser
          }]
        }, {//查看群用户,因为样式问题放2级路由
        path:'lookGroupUser',
          name:'lookGroupUser',
          component:lookGroupUser
        },{
          path: 'groupManagement',
          name: 'groupManagement',
          component: groupManagement
        }, {
          path: 'groupManage',
          name: 'groupManage',
          component: GroupManage
        }, {
          path: 'usersManage',
          name: 'usersManage',
          component: UsersManage
        }, {
          path: 'chatLog',
          name: 'chatLog',
          component: ChatLog,
          redirect:{name:'robotLog'},
          children:[{
            path:'robotLog',
            name:'robotLog',
            component:robotLog
          },{
            path:'ChatLogChildren',
            name:'ChatLogChildren',
            component:ChatLogChildren
          }]
        }, {
          path: 'facilityManage',
          name: 'facilityManage',
          component: facilityManage
        },{
          path:'addressBook',
          name:'addressBook',
          component:addressBook
        },{//计划任务
          path:'planTask',
          name:'planTask',
          component:planTask
        }
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {path: '*', redirect: '/'},
  ],
});
