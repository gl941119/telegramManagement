<template>
  <el-container>
    <el-header>
      <div style="" class="el-header-div">
        <router-link  class="el-header-div-link" tag="a" :to="{name:'crowdSelf'}" type="text" >群管理(自建)</router-link>
        <router-link  class="el-header-div-link" tag="a" :to="{name:'crowdMaterial'}" type="text" >群管理(素材)</router-link>
        <router-link  class="el-header-div-link" tag="a" :to="{name:'notification'}" type="text" >消息推送</router-link>
        <!--<router-link  class="el-header-div-link" tag="a" :to="{name:'greet'}" type="text"  >打招呼设置</router-link>-->
        <router-link  class="el-header-div-link" tag="a" :to="{name:'loginUser'}" type="text"  >登录账户管理</router-link>
        <router-link  class="el-header-div-link" tag="a" :to="{name:'robot'}" type="text"  >telegram机器人</router-link>
      </div>
      <div class="header-right right">
        <i class="el-icon-star-off"></i>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-main>
      <router-view></router-view>

    </el-main>
  </el-container>
</template>
<script>
  import Cache from '@/utils/cache'
  import Request from '@/utils/require'
  export default {
    name:'materialLibrary',
    data(){
      return {
        userid: Cache.getSession("userid")||this.$store.state.uid,
        username: Cache.getSession("username")||this.$store.state.username,
      }
    },
    methods:{
      //退出登录
      handleCommand() {
        Cache.removeSession('username');
        Cache.removeSession('token');
        Request.requestHandle({
          url: 'outLogin',
          data: {
            uid: this.userid
          },
          type: 'post'
        }, res => {
          this.$router.push({
            name: 'login'
          });

        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-container {
    background: #f4f4f4;
  }

  .el-main {
    display: block;
  }
  .el-header{
    &-div{
      text-align: left;
      float: left;
      width: 1000px;
      &-link{
        display: block;
        float: left;
        font-size: 20px;
        margin-left: 20px;

        color: #001e32;
      }
      &-link:hover{
        color: #00abea;
        border-bottom: 2px solid #00abea;
      }


    }
  }


</style>
