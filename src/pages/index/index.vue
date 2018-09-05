<template>

  <el-container>
    <el-aside width="200px" class="aside">

      <img class="logo" src="@/assets/img/logo.png" alt="" style="margin-top: 6px;display: block;">

      <ul class="aside-ul">
        <router-link tag="li" :to="{name:'service'}" class="aside-ul-li">控制台</router-link>
        <router-link tag='li' :to="{name:'materialLibrary'}" class="aside-ul-li">素材管理</router-link>
        <router-link tag='li' :to="{name:'usersManage'}" class="aside-ul-li">客户管理</router-link>
        <router-link tag='li' :to="{name:'privateCorpus'}" class="aside-ul-li">私有语料库</router-link>
        <router-link tag='li' :to="{name:'chatLog'}" class="aside-ul-li">聊天日志</router-link>
        <router-link tag='li' :to="{name:'planTask'}" class="aside-ul-li">计划任务</router-link>
        <!--<router-link tag='li' v-if="permission== 3||permission==0" :to="{name:'groupManagement'}" class="aside-ul-li">群管理</router-link>-->
        <!--<router-link tag='li' v-if="permission== 3||permission==0" :to="{name:'groupManage'}" class="aside-ul-li">群管理</router-link>-->
        <!--<router-link tag='li' v-if="permission== 3||permission==0" :to="{name:'addressBook'}" class="aside-ul-li">通讯录好友管理</router-link>-->
      </ul>
    </el-aside>
    <router-view></router-view>
  </el-container>
</template>

<script>
  import Cache from '@/utils/cache'

  export default {
    name: "index",
    data() {
      return {
        permission: Cache.getSession('permission') || this.$store.state.permission
      }
    }
  }
</script>
<style lang="scss" scoped>
  .el-container {
    height: 100%;
  }

  .aside {
    height: 100%;
    background-color: rgba(63, 63, 63, 1);
    > img {
      width: 180px;
      height: 50px;
    }
    &-ul {

      color: white;
      font-size: 20px;
      &-li:hover {
        background: #108de9;
      }
      &-li {
        height: 50px;
        line-height: 50px;
        text-align: center;
        cursor: pointer;
      }

    }
  }

</style>
