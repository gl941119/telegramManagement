<!--suppress ALL -->
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
          <el-button type="info" @click="ifSelect('brightenBtn')">亮屏操作</el-button>
          <el-button type="info" @click="ifSelect('darknessBtn')">暗屏操作</el-button>
          <el-button type="danger" @click="ifSelect('resetBtn')">重启设备</el-button>
          <el-button type="primary" @click="ifSelect('updataBtn')">升级服务</el-button>
          <el-button type="warning" @click="ifSelect('OpenVPN')">开启代理</el-button>
          <el-button type="success" @click="ifSelect('checkoutUser')">切换电报账号</el-button>
          <el-button type="primary" @click="ifSelect('updataTelegramBtn')">升级APP</el-button>


          <!--<el-button type="info" @click="ifSelect('measurement')">网络监测</el-button>-->
          <!--<el-button type="info" @click="tiemStatus=true">定时任务</el-button>-->
          <!--<el-button type="info" @click="">停止操作</el-button>-->

          <p>个人操作</p>
          <el-button type="warning" @click="person('SYNC_ACCOUNT_INFO')">用户信息同步</el-button>
          <el-button type="danger" @click="person('CLEAN_CONVERSATIONS')">清空聊天窗口</el-button>
          <el-button type="danger" @click="person('CLEAN_CONTACTS')">清空通讯录</el-button>
          <el-button type="warning" @click="clearUser">清理死号</el-button>
          <el-button type="success" @click="person('START_MONITOR')">开启客服</el-button>
          <el-button type="warning" @click="person('STOP_MONITOR')">关闭客服</el-button>
          <!--<el-button type="info" @click="">机器人互聊</el-button>-->
          <!--<el-button type="info" @click="">停止机器人互聊</el-button>-->
          <!--定时任务弹窗-->
          <dialog-timedtask :Message="Message" :status="tiemStatus"
                            @changeDialog="tiemStatus=false"></dialog-timedtask>
          <!--切换用户弹窗-->
          <el-dialog title="切换电报账号" :visible.sync="checkoutuserDialog" width="500px">
            <com-checkoutuser :selectTable="select" @closeDialog="checkoutuserDialog = false"
                              v-if="checkoutuserDialog">
            </com-checkoutuser>
          </el-dialog>
          <!--清理死号-->
          <dialog-clearDieUser :differ="clearDiaDiffer" :selectTable="selectDate" :status="clearDiaStatus"
                               v-if="clearDiaStatus" :Message="Message" @backData="backData"
                               @changeDialog="clearDiaStatus=false"></dialog-clearDieUser>
          <!--加入群t弹窗-->
          <dialog-joingroup :Message="Message" :status="joinGroupStatus"
                            v-if="joinGroupStatus" @backData="backData"
                            @changeDialog="joinGroupStatus=false"></dialog-joingroup>
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
          <el-table-column label="控制台" width="700" class-name="tableCol">
            <template slot-scope="scope">
              <el-button type="warning" size="mini" v-if="scope.row.manualWork == 'off'"
                         @click="openRobotBtn(scope.row)">开启客服
              </el-button>
              <el-button type="warning" size="mini" v-if="scope.row.manualWork =='on'"
                         @click="closeRobotBtn(scope.row)">关闭客服
              </el-button>
              <el-button type="success" size="mini" @click="importPhoneBtn(scope.row)">导入手机号</el-button>
              <!--<dialog-groupsyn class="tableClass">群成员同步</dialog-groupsyn>-->
              <el-button type="success" size="mini" @click="groupsyn(scope.row)">群同步</el-button>
              <el-button type="warning" size="mini" @click="groupEditBtn(scope.row)">群信息修改</el-button>
              <el-button type="primary" size="mini" @click="groupPush(scope.row)">群消息推送</el-button>
              <el-button type="warning" size="mini" @click="buildBtn(scope.row)">新建群</el-button>
              <el-button type="success" size="mini" @click="notificationBtn(scope.row)">个人消息推送</el-button>
              <el-button type="warning" size="mini" @click="letterBtn(scope.row)">群成员私信</el-button>
              <!--<el-button type="primary" size="mini" @click="groupnotice(scope.row)">群公告</el-button>-->
              <el-button type="danger" size="mini" @click="clearGroupBtn(scope.row)">清理群死号</el-button>
              <el-button type="primary" size="mini" @click="joinGroupBtn(scope.row)">加入群</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="sn" label="设备号"></el-table-column>
          <el-table-column prop="phone" label="手机号"></el-table-column>
          <el-table-column prop="username" label="用户名"></el-table-column>
          <el-table-column prop="onlineStatus" label="任务状态"></el-table-column>
          <!--<el-table-column label="设备状态"></el-table-column>-->
          <!--<el-table-column label="机器人状态"></el-table-column>-->
        </el-table>
        <!--个人消息推送dialog-->
        <dialog-notification :Message="Message" :status="notificationStatus"
                             @changeDialog="notificationStatus=false"
                             v-if="notificationStatus" @backData="backData"></dialog-notification>
        <!--新建群-->
        <dialog-buildgroup :Message="Message" :status="buildStatus"
                           v-if="buildStatus" @backData="backData"
                           @changeDialog="buildStatus=false"></dialog-buildgroup>
        <!--群成员私信-->
        <dialog-privateletter :Message="Message" :status="letterStatus" v-if="letterStatus"
                              @changeDialog="letterStatus=false" @backData="backData"></dialog-privateletter>
        <!--群信息修改-->
        <el-dialog title="群信息修改" :visible.sync="dialogGroupEdit" width="300px">
          <el-select v-model="GroupEditValue" placeholder="请选择">
            <el-option
              v-for="item in GroupEditOptions"
              :key="item.groupId"
              :label="item.groupTitle"
              :value="item.groupId">
            </el-option>
          </el-select>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="groupSubmitBtn">确 定</el-button>
          </div>
        </el-dialog>
        <!--群公告-->
        <!--<dialog-groupnotice :Message="Message" :status="noticeStatus"-->
        <!--@changeDialog="noticeStatus=false"></dialog-groupnotice>-->
        <!--群消息推送-->
        <dialog-grouppush :Message="Message" :status="pushStatus" v-if="pushStatus"
                          @changeDialog="pushStatus=false" @backData="backData"></dialog-grouppush>

      </el-card>
      <!--分页-->
      <com-pages :total="total" @handleSizeChange="handleSizeChange"
                 @handleCurrentChange="handleCurrentChange"></com-pages>
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
  import ComCheckoutuser from './com/com-checkoutUser'

  export default {
    name: "loginUser",
    components: {
      DialogNotification, DialogJoingroup,
      DialogBuildgroup, DialogTimedtask,
      DialogClearDieUser, DialogGroupnotice,
      DialogGrouppush, DialogPrivateletter,
      DialogGroupsyn, ComCheckoutuser
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
        select: [],
        clickData: null,
        notificationStatus: false,
        buildStatus: false,
        letterStatus: false,
        noticeStatus: false,
        pushStatus: false,
        tiemStatus: false,
        clearDiaStatus: false,
        clearDiaDiffer: 'group',//清理死号弹窗状态
        joinGroupStatus: false,
        Message: undefined,
        dialogGroupEdit: false,
        GroupEditValue: undefined,
        GroupEditOptions: [],
        checkoutuserDialog: false,
      }
    },
    mounted() {
      this.RequestData()
      this.initWebSocket()


    },
    methods: {
      // 回传消息发送，通用
      backData(type, val) {
        console.log(type, val)
        this.websocketsend(type, val)
      },
      /************************************************************************************系统操作***********************************************/
      ifSelect(info) {
        if (this.selectDate.length == 0) {
          this.message('请选择至少一台设备', 'warning')
          return;
        }
        switch (info) {
          case 'brightenBtn':
            this.websocketsend("BrightScreen", {dname: this.selectDate})//亮屏
            break;
          case 'darknessBtn':
            this.websocketsend("DarkScreen", {dname: this.selectDate}) //暗屏
            break;
          case 'resetBtn':
            this.websocketsend("RebootDevice", {dname: this.selectDate}) //重启设备
            break;
          case 'updataBtn':
            Request.requestHandle({
              url: 'querySelectdictionary',
              data: {
                type: '1'
              },
              type: 'post'
            }, res => {
              if (res.success == 1) {
                // console.log(res.data.url)
                this.websocketsend("UpgradeService", {dname: this.selectDate, msg: res.data.url}) //升级服务
              }
            })
            break;
          case 'updataTelegramBtn':
            Request.requestHandle({
              url: 'querySelectdictionary',
              data: {
                type: '2'
              },
              type: 'post'
            }, res => {
              if (res.success == 1) {
                // console.log(res.data.url)
                this.websocketsend("UpgradeApplication", {dname: this.selectDate, msg: res.data.url}) //升级APP
              }
            })
            break;
          case 'checkoutUser'://切换电报账号
            this.checkoutuserDialog = true
            break;
          case 'OpenVPN'://开关代理
            this.websocketsend("OpenVPN", {dname: this.selectDate})//开启Vpn
            break;
          case 'measurement'://网络监测
            this.measurement()
            break;
        }
      },
      /************************************************************************************个人操作***********************************************/
      //用户信息同步通用
      person(command) {
        if (this.selectDate.length == 0) {
          this.message('请选择至少一台设备', 'warning')
          return;
        }
        this.websocketsend(command, {dname: this.selectDate})
      },
      //清理死号
      clearUser() {
        if (this.selectDate.length == 0) {
          this.message('请选择至少一台设备', 'warning')
          return;
        }
        this.clearDiaStatus = true
        this.clearDiaDiffer = 'users'
      },
      /************************************************************************************列表按钮事件***********************************************/
      //   开启客服
      openRobotBtn(row) {
        this.websocketsend("START_MONITOR", {dname: [row.sn]})
      },
      // 关闭客服
      closeRobotBtn(row) {
        this.websocketsend("STOP_MONITOR", {dname: [row.sn]})
      },
      //导入手机号
      importPhoneBtn(row) {
        this.$prompt('手机号导入数量设置：', '导入手机号码', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({value}) => {
          this.websocketsend("IMPORT_CONTACTS", {
            "dname": [row.sn],
            "msg": {
              "count": parseInt(value) // 导入数量
            }
          })
        }).catch(() => {
        });
      },
      // 群成员同步
      groupsyn(row) {
        this.websocketsend("SYNC_GROUP_INFO", {dname: [row.sn]})
      },
      //群信息修改
      groupEditBtn(row) {
        if (!row.phone) return;
        this.dialogGroupEdit = true
        Request.requestHandle({
          url: 'getGroupBuiltWithConsole',
          data: {
            uid: this.uid(),// 用户id
            mobile: row.phone,// 手机号
          },
          type: 'get',
        }, res => {
          if (res.success == 1) {
            this.GroupEditOptions = res.data
          }
        })
      },
      //群信息修改提交
      groupSubmitBtn() {
        let val = this.GroupEditOptions.filter(item => {
          return item.groupId == this.GroupEditValue
        })
        console.log(val)
        let info = {
          "dname": [this.clickData.sn],
          "msg": {
            "groupId": this.GroupEditValue, // 要修改的群ID
            "groupTitle": val[0].groupTitle, // 想要修改的群名
            "groupInfo": val[0].groupNotice, // 想要修改的公告
          }
        }
        this.websocketsend('EDIT_GROUP_INFO', info)
      },

      //群消息推送
      groupPush(row) {
        this.Message = row;
        this.pushStatus = true;
      },
      // 群公告
      groupnotice(row) {
        this.Message = row;
        this.noticeStatus = true;
      },
      notificationBtn(row) {
        this.Message = row;
        this.notificationStatus = true;
      },
      buildBtn(row) {
        this.Message = row;
        this.buildStatus = true;
      },
      letterBtn(row) {
        this.Message = row;
        this.letterStatus = true;
      },
      //清理群死号
      clearGroupBtn(row) {
        this.Message = row
        this.clearDiaStatus = true
        this.clearDiaDiffer = 'group'
      },
      joinGroupBtn(row) {
        this.Message = row
        this.joinGroupStatus = true
      },

      /************************************************************************************elementui事件***********************************************/
      //页面数据
      RequestData() {
        Request.requestHandle({
          url: 'queryServiceData',
          data: {
            page: this.page,
            pageSize: this.pageSize,
            userSid: this.userid,
            sn: this.search,
            belongType: null
          },
          type: 'get'
        }, res => {
          this.tableData = res.data
          this.total = res.total
        })
      },
      //列表点击
      handleRowClick(row, event, column) {
        // console.log(row)
        this.clickData = row
      },
      //列表勾选
      handleSelectionChange(val) {
        this.alertMessage = `已选择 ${val.length} 项`
        this.select = val
        let arr = val.map(item => {
          return item.sn
        })
        this.selectDate = arr
      },
      //分页器事件
      handleSizeChange(val) {
        this.pageSize = val;
        this.RequestData()
      },
      handleCurrentChange(val) {
        this.page = val;
        this.RequestData()
      },
      /************************************************************************************websocket***********************************************/
      //初始化websocket
      initWebSocket() {
        if (!window.WebSocket) {
          window.WebSocket = window.MozWebSocket;
        }
        if (window.WebSocket) {
          this.socket = new WebSocket(Config.websocketUrl);
          if (!this.socket) return;
          this.socket.onmessage = this.websocketonmessage;
          this.socket.onclose = this.websocketclose;
          this.socket.onerror = this.websocketError;
          // this.socket.onopen = this.websocketsend;
          // this.websocketsend({device: "mclient", type: "JOIN", data: {uid: this.userid, dname: ["null"], msg: "OK"}})
          //登录
          setTimeout(item => {
              let dname = ["null"],
                   msg = "OK"
              let jsonData = JSON.stringify({
                device: "mclient",
                type: "JOIN",
                data: {
                  uid: Cache.getSession("userid") || this.$store.state.uid,
                  dname,
                  msg
                }
              })
              //数据发送
              let params = {
                url: 'DataEncryption',
                data: jsonData,
                flag: true,
              }
              Request.requestHandle(params, res => {
                this.socket && this.socket.send(res.data);
              })
          }, 1000)

        } else {
          console.error('browser do not support webscoket!');
        }
      },
      //socket报错
      websocketError() {
        console.log('报错重连')
        this.initWebSocket()
      },
      //数据发送
      // type 类型
      //data {
      //    dname,
      //    msg
      // }
      websocketsend(type, data) {
        return new Promise(resolve => {
          let {
            dname = '',
            msg = 'null'
          } = data

          let jsonData = JSON.stringify({
            device: "mclient",
            type: type,
            data: {
              uid: Cache.getSession("userid") || this.$store.state.uid,
              dname,
              msg
            }
          })
          //数据发送
          let params = {
            url: 'DataEncryption',
            data: jsonData,
            flag: true,
          }
          Request.requestHandle(params, res => {
            this.socket && this.socket.send(res.data);
            this.message('消息发送成功', 'success')
            resolve()
            // console.log("数据发送...");
          })
        })
      },
      //数据接收
      websocketonmessage(e) {
        // console.log('on message ->', e);
        this.handleOnlineStatus(e.data);
      },
      //关闭websocket
      websocketclose() {
        console.log('关闭socket')
        this.socket.close();
      },
      handleOnlineStatus(msgObj) {
        msgObj = JSON.parse(msgObj)
        if (msgObj.type === "STATUS") {
          let msg = decodeURIComponent(msgObj.msg)
          try {
            msg = JSON.parse(msg)
            if (msg.code === 1) {

              this.tableData.forEach(item => {
                if (item.sn == msgObj.dname) {
                  this.$set(item, 'onlineStatus', msg.message)

                  if(msg.cmd=='START_MONITOR'){

                    this.$set(item, 'manualWork', 'on')
                  }
                  if(msg.cmd=='STOP_MONITOR'){
                    this.$set(item, 'manualWork', 'off')
                  }
                }
              })
            }
            console.log(this.tableData)
          } catch (err) {

            this.tableData.forEach(item => {
              if (item.sn == msgObj.dname) {
                this.$set(item, 'onlineStatus', msg)
              }
            })

          }
        }
        // console.log(this.tableData)
      },
    },
    //实例销毁
    beforeDestroy() {
      this.socket && this.websocketclose()
      // clearInterval(this.SetInterval);
    }
  }
</script>

<style lang="scss">
  .btns {
    text-align: left;
    p {
      margin: 10px 0;
    }
    > div {
      display: block;
      float: left;
      margin-left: 10px;
    }
  }

  .tableClass {
    display: block;
    float: left;
  }

  .tableCol {
    .cell {
      > button {
        float: left;
        width: 100px;
        height: 30px;
        margin: 0 0 10px 10px;

      }
    }

  }

</style>
