<template>
  <el-container>
    <el-header>
      <div style="" class="el-header-div">
        <router-link  class="el-header-div-link" :class="{'active':ind === '1'}" @click.native="ind = '1'" tag="a" :to="{name:'robotLog'}" type="text" >机器人回复日志</router-link>
        <router-link  class="el-header-div-link" :class="{'active':ind === '2'}" @click.native="ind = '2'" tag="a" :to="{name:'ChatLogChildren'}" type="text" >聊天日志</router-link>
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
        ind:'1',
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
      }
    }
  }
  .active{
    color: #00abea;
    border-bottom: 2px solid #00abea;
  }
</style>
