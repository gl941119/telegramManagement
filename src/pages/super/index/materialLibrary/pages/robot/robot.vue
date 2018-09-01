<template>
  <el-card class="box-card">
    <!--搜索-->
    <div style='overflow: hidden;text-align: left'>
      <el-form :inline="true" :model="search" class="demo-form-inline">
        <el-form-item label="查找群：">
          <el-input v-model="search" placeholder="请输入素材标题"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="RequestData">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--添加机器人-->
    <el-button type="primary" @click="robotDialog=true" v-bind:style="{float: 'right',marginBottom:20+'px'}">添加机器人</el-button>
    <!--添加机器人弹窗-->
    <dialogAddrobot :Dialog="robotDialog" @closeDialog="closeDialog" ></dialogAddrobot>
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
      <el-table-column label="机器人ID"></el-table-column>
      <el-table-column label="机器人姓名"></el-table-column>
      <el-table-column label="所在群"></el-table-column>
      <el-table-column label="入群打招呼设置"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="">编辑打招呼设置</el-button>
        </template>
      </el-table-column>
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

  import DialogAddrobot from './com/dialog-addRobot'

  export default {
    name: "greet",
    components: {
      DialogAddrobot
    },
    data() {
      return {
        userid: Cache.getSession("userid") || this.$store.state.uid,
        username: Cache.getSession("username") || this.$store.state.username,
        search: undefined,
        alertMessage: '已选择 0 项',
        page: 1,//分页
        pageSize: 10,
        total: 0,
        tableData: [],
        robotDialog: false,


      }
    },
    mounted() {
      this.RequestData()
    },

    methods: {
      RequestData() {

      },
      closeDialog(val) {
        console.log(val)
        this.robotDialog = val
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
