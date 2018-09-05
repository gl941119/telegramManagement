<template>
  <div>
    <div style='overflow: hidden;'>
      <el-form ref="form" label-width="100px" style="text-align: left" :inline="true">
        <el-form-item label="查找设备号:" >
          <el-input v-model="search.sn" placeholder="请输入关键词" style="width: 150px;"></el-input>
        </el-form-item>
        <el-form-item label="查找账号名称:" >
          <el-input v-model="search.username" placeholder="请输入关键词" style="width: 150px;"></el-input>
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
      <el-table-column prop="sn" label="设备号"></el-table-column>
      <el-table-column prop="username" label="账号名称"></el-table-column>
      <el-table-column  label="状态" v-if=" type == 'list' " >
        <template slot-scope="scope">
          <p v-if="scope.row.status==1" style="color: #6E7D92"><i class="el-icon-error"></i>未绑定</p>
          <p v-if="scope.row.status==2" style="color: #00abea"><i class="el-icon-success"></i>已绑定</p>
        </template>
      </el-table-column>
      <el-table-column  label="操作" v-if="type== 'phone'">
        <template slot-scope="scope">
          <el-button type="text" @click="openDialog(scope.row)">查看手机</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--dialog-->
    <el-dialog title="查看手机号" :visible.sync="dialogTableVisible" width="650px">
      <com-dialog :id="queryId" :status="dialogStatus"></com-dialog>
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
    name: "com-table",
    components:{
      Pageination,comDialog
    },
    props:['type'],
    watch:{
      type(){
        this.RequestPageData()
      }
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
          sn:undefined,
          username:undefined
        },
        dialogTableVisible:false,
        queryId:undefined,
        dialogStatus:'phone'
      }
    },
    mounted() {
      this.RequestPageData()

    },
    methods: {
      //页面数据
      RequestPageData() {
        // console.log('刷新')
        Request.requestHandle({
          url: 'queryfacilityPageData',
          data: {
            id: this.userid,// 主账户id
            page: this.$store.state.page,//  分页
            pageSize: this.$store.state.pageSize,//  页面展示数量
            username: this.search.username,//(检索条件 用户名称)
            sn: this.search.sn,//(检索条件 设备号)
          },
          type: 'get'
        }, res => {
          this.tableData = res.data;
          this.$store.commit('setTotal',res.total);
          this.totalMessage = res.total;
        })
      },
      //打开dialog弹窗
      openDialog(row){
        console.log(row);
        this.queryId = row.id;
        this.dialogTableVisible = true;

      },
      handleSelectionChange(val) {
        this.multipleSelection = `已选择${val.length}项`
      }
    }
  }
</script>

<style scoped>

</style>
