<template>

      <el-container>
        <el-aside width="200px" class="aside">
          <img src="@/assets/img/logo.png" alt="">
        <ul class="aside-ul">
          <router-link tag='li' :to="{name:'facilityManage'}" class="aside-ul-li">设备管理</router-link>
          <router-link tag='li' :to="{name:'superPlanTask'}" class="aside-ul-li">计划任务</router-link>
          <router-link tag='li' :to="{name:'superUsersManage'}" class="aside-ul-li">客户管理</router-link>
          <router-link tag='li'  :to="{name:'superMaterialLibrary'}" class="aside-ul-li">素材管理</router-link>
        </ul>
        </el-aside>
        <router-view></router-view>
      </el-container>
</template>

<script>
  import Cache from '@/utils/cache'
    export default {
        name: "index",
      data(){
          return {
            permission: Cache.getSession('permission')||this.$store.state.permission
          }
      }
    }
</script>
<style lang="scss" scoped>
  .el-container{
    height: 100%;
  }
  .aside{
    height: 100%;
    background-color: rgba(63, 63, 63, 1);
    >img{
      width: 83px;
      height: 83px;
    }
    &-ul{
      margin-top: 30px;
      color: white;
      font-size: 20px;
      &-li:hover{
        background: #108de9;
      }
      &-li{
        height: 50px;
        line-height: 50px;
        text-align: center;
        cursor: pointer	;
      }

    }
  }

</style>
