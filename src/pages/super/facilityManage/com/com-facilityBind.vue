<template>
  <div>
    <div style='overflow: hidden;'>
      <el-form ref="form" label-width="100px" style="text-align: left" :inline="true">
        <el-form-item label="查找账号名称:" >
          <el-input v-model="search.phone" placeholder="请输入关键词" style="width: 150px;"></el-input>
          <el-button type="primary" @click="RequestPageData" style="margin-left: 30px;">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--消息-->
    <p style="float: left;">共搜索到{{totalMessage}}条数据</p>
    <el-alert
      :title="multipleSelection"
      type="info"
      show-icon
      style="margin-top: 30px">
    </el-alert>
    <!--表格-->
    <el-table :data="tableData" ref="multipleTable" style="width: 100%"
              class="mt30" :header-cell-style="{'text-align':'center',background:'#f3f3f3'}"
              @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column prop="username" label="子账号名称"></el-table-column>
      <el-table-column prop="datetime" label="创建时间"></el-table-column>
      <el-table-column  label="状态">
        <template slot-scope="scope">
          <el-button type="text" @click="openTableDialog(scope.row,'find')" size="mini">查看设备</el-button>
          <el-button type="text" @click="openTableDialog(scope.row,'bind')" size="mini">绑定设备</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="查看设备" :visible.sync="dialogTableVisible" width="650px">
      <com-dialog :id="queryId" :username="queryUsername" :status="dialogStatus"></com-dialog>
    </el-dialog>
    <!--分页-->
    <pageination @RequestPageData="RequestPageData"></pageination>
  </div>
</template>
<script>
  import Cache from '@/utils/cache'
  import Request from '@/utils/require'
  import Pageination from '@/components/com-Pageination'
  import comDialog from './com-dialog'

  export default {
    name: "com-facility-bind",
    components:{
      Pageination,comDialog
    },
    data() {
      return {
        userid: Cache.getSession("userid") || this.$store.state.uid,
        username: Cache.getSession("username"),
        page:this.$store.state.page,//分页
        pageSize: this.$store.state.pageSize,
        totalMessage:undefined,
        multipleSelection: '已选择0项',
        tableData: [],
        search:{
          phone:undefined
        },
        dialogTableVisible:false,
        queryId:undefined,
        queryUsername:undefined,
        dialogStatus:'find'
      }
    },
    mounted() {
      this.RequestPageData()

    },
    methods: {
      //页面数据
      RequestPageData() {
        Request.requestHandle({
          url: 'queryfacilityBindData',
          data: {
            page: this.$store.state.page,//  分页
            pageSize: this.$store.state.pageSize,//  页面展示数量
            phone:this.search.phone,// 检索条件
          },
          type: 'get'
        }, res => {
          this.tableData = res.data;
          this.$store.commit('setTotal',res.total);
          this.totalMessage = res.total;
        })
      },
      //打开详情弹窗
      openTableDialog(row,type){
        this.queryId = row.id;
        this.queryUsername = row.username;
        this.dialogStatus = type;
        this.dialogTableVisible = true
      },
      handleSelectionChange(val) {
        this.multipleSelection = `已选择${val.length}项`
      }
    }
  }
</script>

<style scoped>

</style>
