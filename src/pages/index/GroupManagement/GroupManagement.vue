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
        <el-button type="primary" @click="dialogaddmanagement = true" style="float: right;margin-right: 20px">添加群组
        </el-button>
        <!--添加群组dialog-->
        <el-dialog title="添加群组" :visible.sync="dialogaddmanagement" width="500px">
          <el-form :model="addmanagementform" :label-position="labelPosition">
            <el-form-item label="群名" :label-width="formLabelWidth">
              <el-input v-model="addmanagementform.name" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="是否启用机器人" :label-width="formLabelWidth">
              <el-switch
                v-model="addmanagementform.value1"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
            <el-form-item label="是否生成机器人建群" :label-width="formLabelWidth">
              <el-switch
                v-model="addmanagementform.value2"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
            <el-form-item label="自动群组" :label-width="formLabelWidth">
              <el-switch
                v-model="addmanagementform.value3"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogaddmanagement = false">取 消</el-button>
            <el-button type="primary" @click="dialogaddmanagement = false">确 定</el-button>
          </div>
        </el-dialog>
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
          <el-table-column prop="groupName" label="所在群" width="180"></el-table-column>
          <el-table-column prop="country" label="所在国家" width="180"></el-table-column>
          <el-table-column prop="userCount" label="群用户数" width="180"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="queryGroupBtn(scope.row)">查看群成员</el-button>
              <el-button type="text" style="color: red;">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--dialog-->
        <el-dialog title="群成员" :visible.sync="dialogQueryGroup">
          <el-table :data="QueryGroupData" style="width: 100%;"
                    :header-cell-style="{'text-align':'center',background:'#f3f3f3'}">
            <el-table-column property="username" label="用户名"></el-table-column>
            <el-table-column property="phone" label="注册手机"></el-table-column>
          </el-table>
          <span>共搜索到{{gourpTotal}}条数据</span>
          <el-pagination
            background
            @current-change="handleCurrentChangehangeGroup"
            layout="prev, pager, next"
            :total="gourpTotal">
          </el-pagination>
        </el-dialog>
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
          url: 'queryGroupManagementData',
          data: {
            page: this.page,
            pageSize: this.pageSize
          },
          type: 'get'
        }, res => {
          this.total = res.total
          this.tableData = res.data
        })
      },
      // 查看
      queryGroupBtn(row) {
        let gid
        // console.log(!row)
        if (!row) {
          gid = cache.getSession('GourpId')
          // console.log(gid)
        } else {
          cache.setSession('GourpId', row.id)
          gid = row.id
        }
        this.dialogQueryGroup = true;
        Request.requestHandle({
          url: 'queryGroupMessage',
          data: {
            page: this.queryGroudPage,
            pageSize: this.queryGroupPageSize,
            gid
          },
          type: 'get'
        }, res => {
          this.QueryGroupData = res.data;
          this.gourpTotal = res.total;
        })

      },
      onSubmit() {
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
