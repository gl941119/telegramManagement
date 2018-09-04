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
import lookGroupUser from  '@/pages/index/materialLibrary/pages/crowdSelf/lookGroupUser'//查看用户
import crowdMaterial from '@/pages/index/materialLibrary/pages/crowdMaterial/crowdMaterial' // 群素材
import notification from '@/pages/index/materialLibrary/pages/notification/notification' // 消息推送
import greet from '@/pages/index/materialLibrary/pages/greet/greet' // 打招呼
import robot from '@/pages/index/materialLibrary/pages/robot/robot' // 机器人
import loginUser from '@/pages/index/materialLibrary/pages/loginUser/loginUser' // 登录用户

//群管理
import groupManagement from '@/pages/index/GroupManagement/GroupManagement'
//new群管理
import GroupManage from '@/pages/index/GroupManage/GroupManage'
//客户管理
import UsersManage from '@/pages/index/UsersManage/UsersManage'
//聊天日志
import ChatLog from '@/pages/index/chatlog/chatlog'
import robotLog from '@/pages/index/chatlog/pages/robotLog'
import ChatLogChildren from '@/pages/index/chatlog/pages/chatLog'

//通讯录
import addressBook from '@/pages/index/addressBook/addressBook'
//计划任务
import planTask from '@/pages/index/planTask/planTask'

/////////////////////////超管后台

import SuperManagement from '@/pages/super/index'
//设备管理
import facilityManage from '@/pages/super/facilityManage/facilityManage'
//计划任务
import superPlanTask from '@/pages/super/planTask/planTask'
//客户管理
import superUsersManage from '@/pages/super/UsersManage/UsersManage'
//素材库
import superMaterialLibrary from '@/pages/super/materialLibrary/materialLibrary'
import superCrowdSelf from '@/pages/super/materialLibrary/pages/crowdSelf/crowdSelf' // 群自建
import superCrowdMaterial from '@/pages/super/materialLibrary/pages/crowdMaterial/crowdMaterial' // 群素材
import superNotification from '@/pages/super/materialLibrary/pages/notification/notification' // 消息推送
import superRobot from '@/pages/super/materialLibrary/pages/robot/robot' // 机器人
import superLoginUser from '@/pages/super/materialLibrary/pages/loginUser/loginUser' // 登录用户
import superLookGroupUser from  '@/pages/super/materialLibrary/pages/crowdSelf/lookGroupUser'//查看用户

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
          },{//登录账号
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
    },{////////////////超管后台
    path:'/super',
      name:'super',
      component:SuperManagement,
      redirect:{name:'facilityManage'},
      children:[ {//设备管理
        path: 'facilityManage',
        name: 'facilityManage',
        component: facilityManage
      }, {//计划任务
        path: 'PlanTask',
        name: 'superPlanTask',
        component: superPlanTask
      }, {//客户管理
        path: 'UsersManage',
        name: 'superUsersManage',
        component: superUsersManage
      },{//素材库
        path: 'materialLibrary',
        name: 'superMaterialLibrary',
        redirect:{name:'superCrowdSelf'},
        component: superMaterialLibrary,
        children:[{//群管理自建
          path:'crowdSelf',
          name:'superCrowdSelf',
          component:superCrowdSelf
        },{//群管理素材
          path:'crowdMaterial',
          name:'superCrowdMaterial',
          component:superCrowdMaterial
        },{//消息推送
          path:'notification',
          name:'superNotification',
          component:superNotification
        },{//登录账号管理
          path:'loginUser',
          name:'superLoginUser',
          component:superLoginUser
        },{//机器人
          path:'robot',
          name:'superRobot',
          component:superRobot
        }]
      },{//超级管理查看群用户,因为样式问题放2级路由
        path:'lookGroupUser',
        name:'superLookGroupUser',
        component:superLookGroupUser
      }]
    }, {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {path: '*', redirect: '/'},
  ],
});
