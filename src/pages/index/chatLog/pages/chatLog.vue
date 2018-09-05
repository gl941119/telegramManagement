<template>
  <el-card class="box-card">
    <!--搜索-->
    <div style='overflow: hidden;text-align: left'>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="时间范围：">
          <com-daytime @timeMessage="timeMessage"></com-daytime>
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchKey" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="RequestData">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <dialog-clearlog style="float: right;margin-bottom: 20px" :status="'chat'"
                     @RequestData="RequestData"></dialog-clearlog>
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
      <el-table-column label="聊天对象">
        <template slot-scope="scope">
          <p v-if="scope.row.chatObject==1">聊天对话</p>
        </template>
      </el-table-column>
      <el-table-column label="对象属性">
        <template slot-scope="scope">
          <p v-if="scope.row.objectType==1">群</p>
          <p v-if="scope.row.objectType==2">人</p>
        </template>
      </el-table-column>
      <el-table-column prop="chatTitle" label="名称"></el-table-column>
      <el-table-column prop="chatAccount" label="聊天账号"></el-table-column>
      <el-table-column prop="replyAccount" label="回复账号"></el-table-column>
      <el-table-column  label="回复内容"  width="300px">
        <template slot-scope="scope">
          <p v-if="scope.row.replyType==1">{{scope.row.replyContent}}</p>
          <img v-if="scope.row.replyType==2" :src="scope.row.replyContent" alt="" style="max-width: 300px;max-height: 100px;"/>
          <video v-if="scope.row.replyType==3" :src="scope.row.replyContent" controls style="max-width: 300px;max-height: 100px;"></video>
        </template>
      </el-table-column>
      <el-table-column prop="replyTime" label="回复时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text">添加客户标签</el-button>
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
  import DialogClearlog from './dialog-clearLog'


  export default {
    name: "greet",

    components: {
      DialogClearlog
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
        addGreetDialog: true,//打招呼弹窗
        addGreetForm: {
          radio: 1,
          mat: undefined,
          defined: undefined
        },
        ComUpdate_title: '附件',
        ComUpdate_title2: '附件上传',
        searchKey: undefined,
        startTime: undefined,
        endTime: undefined
      }
    },
    mounted() {
      this.RequestData()
    },

    methods: {
      RequestData() {
        Request.requestHandle({
          url: 'getChatRecordByUid',
          data: {
            page: this.page,// 分页
            pageSize: this.pageSize,// 页面数量
            uid: this.userid,// 运营账号id
            searchKey: this.searchKey,// 检索关键字  非必填
            startTime: this.startTime,// 开始时间  非必填
            endTime: this.endTime,//  结束时间  非必填
          },
          type: 'get'
        }, res => {
          if (res.success == 1) {
            this.tableData = res.data;
            this.total = res.totals
          }
        })

      },
      timeMessage(val) {
        console.log(val);
        this.startTime = val[0];
        this.endTime = val[1];
      },
      //上传
      UpdateSuccess(val) {
        console.log(val)
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
