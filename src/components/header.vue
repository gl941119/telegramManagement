<template>
  <div>
    <h3 class="header-left">{{titleName}}</h3>
    <div class="header-right">
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
  </div>
</template>

<script>
  import Cache from '@/utils/cache';
  import Request from '@/utils/require'

    export default {
      name: "Header",
      props:['titleName'],
      data(){
        return{
          userid: Cache.getSession("userid")||store.state.uid,
          username: Cache.getSession("username")
        }
      },
      methods:{
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


  .header-left:hover {
     color: rgb(0, 171, 234);
   }
  .header-left {
     float: left;
     font-size: 20px;
   }
  .header-right {
     float: right;

   }

</style>
