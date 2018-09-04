<template>
  <el-container>
    <el-header class="header">
      <com-header :titleName="titleName"></com-header>
    </el-header>
    <el-main>
      <el-card class="box-card">
        <!--搜索-->
        <div style='overflow: hidden;text-align: left'>
          <el-form :inline="true"  class="demo-form-inline" >
            <el-form-item label="时间范围：" style="display: block">
              <com-daytime @timeMessage="timeMessage"></com-daytime>
            </el-form-item>
            <el-form-item label="任务名称：" >
              <el-input v-model="searchKey" placeholder="请输入关键词"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="RequestData">搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!--计划任务弹窗-->
        <!--<dialog-plantask></dialog-plantask>-->
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
                  @row-click="handleRowClick"
                  @selection-change="handleSelectionChange"
                  :header-cell-style="{'text-align':'center',background:'#f3f3f3'}">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="taskName" label="任务名称"></el-table-column>
          <el-table-column prop="startTime" label="开始时间"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <p style="color: #2ec991" v-if="scope.row.taskStatus==2">已运行</p>
              <p style="color: #5A95CC" v-if="scope.row.taskStatus==1">待开始</p>
              <p style="color: #6E7D92;" v-if="scope.row.taskStatus==3">已结束</p>
              <p style="color: red;" v-if="scope.row.taskStatus==4">异常</p>
            </template>
          </el-table-column>
          <!--<el-table-column label="操作">-->
            <!--<template slot-scope="scope">-->
              <!--<el-button type="text" @click="deletePlanTask(scope.row)" style="color: red">删除</el-button>-->
            <!--</template>-->
          <!--</el-table-column>-->
        </el-table>
        <!--分页-->
        <com-pages :total="total" @handleSizeChange="handleSizeChange"
                   @handleCurrentChange="handleCurrentChange"></com-pages>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
  import Cache from '@/utils/cache'
  import Request from '@/utils/require'
  import Config from '@/utils/config'
  import ComPages from '@/components/com-pages'
  import ComHeader from '@/components/header'
  import ComTime from '@/components/com-time'
  import dialogPlantask from './com/dialog-addPlanTask'

  export default {
    name: "planTask",
    components: {
      ComPages,ComHeader,ComTime,dialogPlantask
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
        rowData:null,
        titleName:'客户管理',
        searchKey:undefined,
        startTime:undefined,
        endTime:undefined

      }
    },
    mounted() {
      this.RequestData()
    },

    methods: {
      RequestData() {
        Request.requestHandle({
          url:'getAllTask',
          data:{
            page:this.page,
            pageSize:this.pageSize,
            searchKey:this.searchKey,//  关键字检索
            startTime:this.startTime,// 开始时间
            endTime:this.endTime,// 结束时间
          },
          type:'get'
        },res=>{
          if(res.success==1){
            this.tableData = res.data;
            this.total = res.total;
          }
        })

      },
      // 删除
      deletePlanTask(row){
        Request.requestHandle({
          url:'deleteTaskByIds',
          data:{
            "uid":this.userid,//运营账户id
              "ids":[row.id] ,//  计划任务id
      },
          type:'post',
          flag:true
        },res=>{
          if(res.success == 1){
            this.message('删除成功','warning');
            this.RequestData()
          }
        })

      },
      timeMessage(val){
        this.startTime = val[0];
        this.endTime = val[1]
      },
      //列表点击
      handleRowClick(row){
        this.rowData = row
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
