<template>
  <el-container>
    <el-header class="header">
      <com-header :titleName="titleName"></com-header>
    </el-header>
    <el-main>
      <el-card class="box-card">
        <!--搜索-->
        <div style='overflow: hidden;text-align: left'>
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="查找设备号：">
              <el-input v-model="search" placeholder="请输入素材标题"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="RequestData">搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!--按钮-->
        <div class="mt20 btns">
          <p>系统操作</p>
          <el-button type="info" @click="">亮屏</el-button>
          <el-button type="info" @click="">暗屏</el-button>
          <el-button type="info" @click="">重启设备</el-button>
          <el-button type="info" @click="">升级服务</el-button>
          <el-button type="info" @click="">升级telegram</el-button>
          <el-button type="info" @click="">切换账号</el-button>
          <el-button type="info" @click="">开关代理</el-button>
          <el-button type="info" @click="">代理测速</el-button>
          <!--定时任务-->
          <dialog-timedtask>定时任务</dialog-timedtask>
          <el-button type="info" @click="">停止操作</el-button>
          <p>个人操作</p>
          <el-button type="info" @click="">推送准备</el-button>
          <el-button type="info" @click="">清理对话</el-button>
          <el-button type="info" @click="">清理通讯录</el-button>
          <!--清理死号-->
          <dialog-clearDieUser :differ="'person'"></dialog-clearDieUser>
          <!--消息推送-->
          <dialog-notification :slectData="selectDate">消息推送</dialog-notification>
          <el-button type="info" @click="">机器人互聊</el-button>
          <el-button type="info" @click="">停止机器人互聊</el-button>
          <p>群操作</p>
          <!--清理群死号-->
          <dialog-clearDieUser :differ="'group'"></dialog-clearDieUser>
          <!--加入群-->
          <dialog-joingroup :selectData="selectDate">加入群</dialog-joingroup>

        </div>
        <!--消息-->
        <el-alert :title="alertMessage" type="info" show-icon class="mt20">
        </el-alert>
        <!--表格-->
        <el-table :data="tableData" ref="multipleTable" style="width: 100%"
                  class="mt30 tableClass"
                  @row-click="handleRowClick"
                  @selection-change="handleSelectionChange"
                  :header-cell-style="{'text-align':'center',background:'#f3f3f3'}"
                  >
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column label="机器人序号" width="800" >
            <template slot-scope="scope" >
              <el-button class="tableClass" type="primary" size="mini">开启机器人</el-button>
              <el-button class="tableClass" type="primary" size="mini">导入手机号</el-button>
              <dialog-groupsyn class="tableClass">群成员同步</dialog-groupsyn>
              <dialog-privateletter class="tableClass">群成员私信</dialog-privateletter>
              <!--新建群-->
              <dialog-buildgroup class="tableClass">新建群</dialog-buildgroup>
              <el-button type="primary" size="mini" class="tableClass">群消息修改</el-button>
              <!--群公告-->
              <dialog-groupnotice class="tableClass">群公告</dialog-groupnotice>
              <!--群推送-->
              <dialog-grouppush class="tableClass">群推送</dialog-grouppush>
            </template>
          </el-table-column>
          <el-table-column prop="sn" label="设备号"></el-table-column>
          <el-table-column prop="phone" label="手机号"></el-table-column>
          <el-table-column prop="username" label="用户名"></el-table-column>
          <el-table-column label="任务状态">
            <template slot-scope="scope">
              <p style="color: red" v-if="scope.row.switch==2">未连接</p>
              <p style="color: red" v-if="scope.row.switch==3">{{scope.row.onlineStatus}}</p>
            </template>
          </el-table-column>
          <el-table-column label="设备状态"></el-table-column>
          <el-table-column label="机器人状态"></el-table-column>
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
  import DialogNotification from './com/dialog-notification'
  import DialogJoingroup from './com/dialog-joinGroup'
  import DialogBuildgroup from './com/dialog-buildGroup'
  import DialogTimedtask from './com/dialog-timedTask'
  import DialogClearDieUser from './com/dialog-clearDieUser'
  import DialogGroupnotice from './com/dialog-groupNotice'
  import DialogGrouppush from './com/dialog-grouppush'
  import DialogPrivateletter from './com/dialog-privateletter'
  import DialogGroupsyn from './com/dialog-groupsyn'

  export default {
    name: "loginUser",
    components: {
     DialogNotification,DialogJoingroup,
      DialogBuildgroup,DialogTimedtask,
      DialogClearDieUser,DialogGroupnotice,
      DialogGrouppush,DialogPrivateletter,
      DialogGroupsyn

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
        titleName: '控制台',
        selectDate: [],
        clickData:null

      }
    },
    mounted() {
      this.RequestData()
    },

    methods: {
      //页面数据
      RequestData() {
        Request.requestHandle({
          url: 'queryServiceData',
          data: {
            page: this.page,
            pageSize: this.pageSize,
            userSid: this.userid,
            phone: this.search,
            belongType: null
          },
          type: 'get'
        }, res => {
          this.tableData = res.data
          this.total = res.total
        })
      },
      //列表点击
      handleRowClick(row, event, column){
        // console.log(row)
        this.clickData = row
      },
      //列表勾选
      handleSelectionChange(val) {
        this.alertMessage = `已选择 ${val.length} 项`
        this.selectDate = val

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

<style lang="scss" scoped>
  .btns {
    text-align: left;
    p {
      margin: 10px 0;
    }
    >div{
      display: block;
      float: left;
      margin-left: 10px;
    }
  }
  .tableClass{
    display: block;
    float: left;
  }

</style>
