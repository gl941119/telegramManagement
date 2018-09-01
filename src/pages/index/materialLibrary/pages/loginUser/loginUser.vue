<template>
  <el-card class="box-card">
    <!--搜索-->
    <div style='overflow: hidden;text-align: left'>
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item label="手机号：">
          <el-input v-model="phone" placeholder="请输入素材标题"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="RequestData">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--消息-->
    <el-alert
      :title="alertMessage"
      type="info"
      show-icon
      class="mt20">
    </el-alert>
    <!--表格-->
    <el-table :data="tableData" ref="multipleTable" style="width: 100%"
              class="mt30"
              @selection-change="handleSelectionChange"
              :header-cell-style="{'text-align':'center',background:'#f3f3f3'}">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="userTitle" label="姓名"></el-table-column>
      <el-table-column prop="mobile" label="手机号"></el-table-column>
      <el-table-column prop="country" label="国家"></el-table-column>
      <el-table-column label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.headUrl" alt="">
        </template>
      </el-table-column>
      </el-table-column>
      <el-table-column prop="signature" label="个性签名"></el-table-column>
      <el-table-column prop="lastOnline" label="最后一次在线时间"></el-table-column>
      <!--<el-table-column label="操作">-->
        <!--<template slot-scope="scope">-->
          <!--<el-button type="text" @click="">编辑资料</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
    <!--分页-->
    <com-pages :total="total" @handleSizeChange="handleSizeChange"
               @handleCurrentChange="handleCurrentChange"></com-pages>
  </el-card>
</template>

<script>
  import Cache from '@/utils/cache'
  import Request from '@/utils/require'
  import Config from '@/utils/config'

  export default {
    name: "loginUser",

    data() {
      return {
        userid: Cache.getSession("userid") || this.$store.state.uid,
        username: Cache.getSession("username") || this.$store.state.username,
        phone: undefined,
        alertMessage: '已选择 0 项',
        page: 1,//分页
        pageSize: 10,
        total: 0,
        tableData: [],

      }
    },
    mounted() {
      this.RequestData()
    },

    methods: {
      RequestData() {
        Request.requestHandle({
          url:'getDeviceAccountByUid',
          data:{
            page:this.page,
            pageSize:this.pageSize,
            uid:this.uid(),// 运营账户id
            phone:this.phone,// 手机号
          },
          type:'get',
        },res=>{
          if(res.success==1){
            this.tableData = res.data;
            this.total = res.total;
          }
        })

      },
      //列表勾选
      handleSelectionChange(val) {
        this.alertMessage = `已选择 ${val.length} 项`
      },
      //分页器事件
      handleSizeChange(val) {
        this.pageSize = val;
        this.RequestData()
      },
      handleCurrentChange(val) {
        this.page = val;
        this.RequestData()
      }
    },


  }
</script>

<style scoped>

</style>
