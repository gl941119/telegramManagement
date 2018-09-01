<template>
  <el-container>
    <el-header class="header">
      <com-header :titleName="titleName"></com-header>
    </el-header>
    <el-main>
      <el-card class="box-card">
        <!--搜索-->
        <div style='overflow: hidden;'>
          <el-form :inline="true" :model="srearchForm" class="demo-form-inline">
            <el-form-item label="查找群：" style="float: left">
              <el-input v-model="srearchForm.phone" placeholder="请输入关键词"></el-input>
            </el-form-item>
            <el-form-item style="float: left">
              <el-button type="primary" @click="onSubmit">搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-button type="primary" @click="refreshUserInfo" style="float: right;">刷新</el-button>
        <!--添加群组dialog-->
        <!--消息-->
        <el-alert
          :title="multipleSelection"
          type="info"
          show-icon
          style="margin-top: 60px">
        </el-alert>
        <span style="float: left;margin: 10px 0 10px">共搜索到46230个群信息，{{userInfo}}个用户信息</span>
        <!--表格-->
        <el-table :data="tableData" ref="multipleTable" style="width: 100%"
                  class="mt30" :header-cell-style="{'text-align':'center',background:'#f3f3f3'}"
                  @selection-change="handleSelectionChange" @row-click="rowClick">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column prop="groupName" label="群名称" ></el-table-column>
          <el-table-column prop="groupId" label="群id" ></el-table-column>
          <el-table-column prop="groupTitle" label="群标签" ></el-table-column>
          <el-table-column prop="username" label="所属用户" ></el-table-column>
          <el-table-column prop="mobile" label="所属用户手机号" ></el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
          background
          @current-change="handleCurrentChangehange"
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
      </el-card>
    </el-main>
  </el-container>
</template>
<script>
  import Cache from '@/utils/cache'
  import Request from '@/utils/require'
  import cache from "../../../utils/cache";
  import config from "../../../utils/config";
  import ComHeader from '@/components/header'

  export default {
    name: "service",
    components: {
      ComHeader
    },
    data() {
      return {
        userid: Cache.getSession("userid"),
        username: Cache.getSession("username"),
        titleName: '群管理',
        value1: false,
        alertMessage: "0",
        page: 1,//分页
        pageSize: 10,
        queryGroudPage: 1,
        queryGroupPageSize: 10,
        total: undefined,
        gourpTotal: undefined,
        srearchForm: {
          phone: undefined
        },
        tableData: [],
        multipleSelection: '已选择0项',
        dialogQueryGroup: false,
        QueryGroupData: [],
        uploadData: {
          gid: this.testData
        },
        uploadHeader: {
          token: this.$store.state.token || Cache.getSession('token')
        },
        testupload: config.testupload,
        testData: undefined,
        dialogaddmanagement: false,
        addmanagementform: {
          name: undefined,
          value1: false,
          value2: false,
          value3: false
        },
        labelPosition: 'left',
        formLabelWidth: '200px',
        userInfo: undefined
      }
    },
    mounted() {
      this.requestData()
      this.refreshUserInfo()
    },
    methods: {
      requestData() {
        Request.requestHandle({
          url: 'groupManageData',
          data: {
            page:this.page,
            pageSize:this.pageSize,
            uid:this.userid,
            searchKey:this.srearchForm.phone
          },
          type: 'get'
        }, res => {
          this.total = res.total
          this.tableData = res.data
        })
      },

      onSubmit() {
        this.requestData()
      },
      handleCurrentChangehange(val) {
        this.page = val
        this.requestData()
      },
      handleSelectionChange(val) {
        this.multipleSelection = `已选择${val.length}项`
      },
      handleCurrentChangehangeGroup(val) {
        // console.log(val)
        this.queryGroudPage = val
        this.queryGroupBtn()
      },
      videoUploadSuccess() {

      },
      rowClick(row, event, column) {
        this.uploadData.gid = row.id
        // console.log(row)
      },
      refreshUserInfo() {
        this.userInfo = Math.ceil(118283102 + (Math.random() * 2000))
      },

    },


  }
</script>

<style lang="scss" scoped>
  .el-container {
    background: #f4f4f4;
  }

  .header {
    background: white;
    height: 100px;
    line-height: 50px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  }


</style>
