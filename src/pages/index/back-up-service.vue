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
            <el-form-item label="查找设备号：" style="float: left">
              <el-input v-model="srearchForm.phone" placeholder="请输入关键词"></el-input>
            </el-form-item>
            <el-form-item style="float: left">
              <el-button type="primary" @click="queryDataInfo">搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
        <p style="text-align: left">共搜索到 {{total}} 条数据</p>
        <!--按钮-->
        <div style="" class="mt20">
          <div class="mt20 Btn">
            <el-button type="info" @click="brightBtn">亮屏</el-button>
            <el-button type="info" @click="darknessBtn">暗屏</el-button>
            <el-button type="info" @click="NotificationBtn('one')">消息推送</el-button>
            <el-button type="info" @click="NotificationBtn('more')">群发消息</el-button>
            <el-button type="info" @click="checkoutClickCheckout">切换群/用户</el-button>
            <el-button type="info" @click="addUsersBtn">添加账号</el-button>
            <el-button type="info" @click="checkoutuserDialog=true">切换用户</el-button>
            <el-button type="info" @click="information">信息同步</el-button>
            <el-button type="info" @click="selectdictionary(1)">升级服务</el-button>
            <el-button type="info" @click="selectdictionary(2)">升级APP</el-button>
            <p>系统操作</p>
            <el-button type="info" @click="">亮屏</el-button>
            <el-button type="info" @click="">暗屏</el-button>
            <el-button type="info" @click="">重启设备</el-button>
            <el-button type="info" @click="">升级服务</el-button>
            <el-button type="info" @click="">升级telegram</el-button>
            <el-button type="info" @click="">切换账号</el-button>
            <el-button type="info" @click="">开关代理</el-button>
            <el-button type="info" @click="">代理测速</el-button>
            <el-button type="info" @click="">定时任务</el-button>
            <el-button type="info" @click="">停止操作</el-button>
            <p>个人操作</p>
            <el-button type="info" @click="">推送准备</el-button>
            <el-button type="info" @click="">清理对话</el-button>
            <el-button type="info" @click="">清理通讯录</el-button>
            <el-button type="info" @click="">清理死号</el-button>
            <el-button type="info" @click="">消息推送</el-button>
            <el-button type="info" @click="">机器人互聊</el-button>
            <el-button type="info" @click="">停止机器人互聊</el-button>
            <p>群操作</p>
            <el-button type="info" @click="">清理群死号</el-button>
            <el-button type="info" @click="">加入群</el-button>
          </div>
        </div>
        <!--消息推送弹窗-->
        <el-dialog title="消息推送" :visible.sync="NotificationDialog" style="text-align: left" width="500px">
          <el-radio-group v-model="radio">
            <el-radio :label="1" style="display: block;margin: 0;">
              <label>选择素材:</label>
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-radio>
            <el-radio :label="2" style="display: block;margin: 0;height: 180px;margin-top: 20px">
              <label>自定义素材:</label>
              <div>
                <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="NotificationTextarea"
                  style="resize:none;margin-top: 10px;">
                </el-input>
                <el-upload
                  class="upload-demo left mt10"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  multiple
                  :limit="1"
                >
                  <el-button type="primary">点击上传</el-button>
                </el-upload>
                <el-button style="float: left;margin-left: 20px;margin-top: 10px;">保存自定义素材</el-button>
              </div>
            </el-radio>

          </el-radio-group>
          <el-radio-group v-model="radio2" style="display: block">
            <el-radio :label="1" style="display: block;margin: 0;">
              <label>指定人</label>
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>

            </el-radio>
            <el-radio :label="2" style="display: block;margin: 0;margin-top:20px;">
              <label>推送给全部通讯录</label>
            </el-radio>
          </el-radio-group>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="NotificationDialog = false">取 消</el-button>
            <el-button type="primary" @click="NotificationDialog = false">确 定</el-button>
          </div>
        </el-dialog>


        <!--消息推送弹窗-->
        <el-dialog title="消息推送" :visible.sync="dialogNotification" width="500px" class="Notification">
          <el-form>
            <el-button-group>
              <el-button type="primary" plain @click="NotificationType=1">素材</el-button>
              <el-button type="primary" plain @click="NotificationType=2">图片</el-button>
              <el-button type="primary" plain @click="NotificationType=3">视频</el-button>
            </el-button-group>
            <div v-show="NotificationType==1">
              <el-form-item label="选择素材：" style="margin-top: 30px;">
                <el-select v-model="NotificationValue" placeholder="请选择" style="width: 300px;"
                           @change="NotificationSelectChange">
                  <el-option
                    v-for="item in NotificationSelect"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="备注：">
                <el-input v-model="NotificationFodder.content" placeholder="请输入内容" type="textarea"
                          style="width: 300px;margin-left: 29px;">
                </el-input>
              </el-form-item>
            </div>
            <div v-show="NotificationType==2" style="margin-top: 30px;">
              <img :src="NotificationFodder.photo1Url" alt="" style="max-width: 150px;max-height: 150px;">
              <img :src="NotificationFodder.photo2Url" alt="" style="max-width: 150px;max-height: 150px;">
              <img :src="NotificationFodder.photo3Url" alt="" style="max-width: 150px;max-height: 150px;">
            </div>
            <div v-show="NotificationType==3" style="margin-top: 30px;">
              <video :src="NotificationFodder.videoUrl" controls="controls" style="max-width: 400px;max-height: 200px"
                     v-if="NotificationFodder.videoUrl">
              </video>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogNotification = false">取 消</el-button>
            <el-button type="primary" @click="NotificationConfirm">确 定</el-button>
          </div>
        </el-dialog>
        <!--添加账号弹窗-->
        <el-dialog title="智能机器人信息设置" :visible.sync="dialogAddUsers" width="400px">
          <el-form :model="addUsersForm">
            <el-form-item label="机器人账号：" :label-width="formLabelWidth">
              <el-input v-model="addUsersForm.phone" auto-complete="off" placeholder="请输入机器人账号"></el-input>
            </el-form-item>
            <el-form-item label="户名昵称：" :label-width="formLabelWidth">
              <el-input v-model="addUsersForm.username" auto-complete="off" placeholder="请输入户名昵称"></el-input>
            </el-form-item>
            <el-form-item label="机器人标签：" :label-width="formLabelWidth">
              <el-input v-model="addUsersForm.personalLable" auto-complete="off" placeholder="请输入机器人标签"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogAddUsers = false">取 消</el-button>
            <el-button type="primary" @click="queryAddUser">确 定</el-button>
          </div>
        </el-dialog>
        <!--切换群/用户弹窗-->
        <el-dialog title="切换群/用户" :visible.sync="dialogCheckout" width="450px">
          <el-form :model="CheckoutForm">
            <el-button-group style="width: 218px;">
              <!--<el-button type="primary" autofocus="true" plain size="medium" @click="CheckoutForm.belongType= 'user' ">群</el-button>-->
              <!--<el-button type="primary" plain size="medium" @click="CheckoutForm.belongType= 'group'">用户</el-button>-->
              <button :class="{checkoutBtn:true,clickcheckoutBtn:isgroupchechout}" type="botton"
                      @click="checkoutBelongTpe('group')">群
              </button>
              <button :class="{checkoutBtn:true,clickcheckoutBtn:isuserchekout}" type="botton"
                      @click="checkoutBelongTpe('user')">用户
              </button>
            </el-button-group>
            <el-form-item label="选择：" style="margin-top: 30px;">
              <el-select v-model="CheckoutForm.belongUser" placeholder="请选择" style="width: 300px;"
                         v-if="NotificationbelongType=='group'">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.groupTitle"
                  :value="item.groupTitle">
                </el-option>
              </el-select>
              <el-select v-model="CheckoutForm.belongUser" v-if="NotificationbelongType=='user'" placeholder="请选择"
                         style="width: 300px;">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.userTitle"
                  :value="item.userTitle">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogCheckout = false">取 消</el-button>
            <el-button type="primary" @click="requestCheckout">确 定</el-button>
          </div>
        </el-dialog>
        <!--切换用户弹窗-->
        <el-dialog title="切换账号" :visible.sync="checkoutuserDialog" width="500px">
          <com-checkoutuser :selectTable="selectTable" @closeDialog="checkoutuserDialog = false"
                            v-if="checkoutuserDialog">
          </com-checkoutuser>
        </el-dialog>
        <!--消息-->
        <el-alert
          :title="alertMessage"
          type="info"
          show-icon
          class="mt20">
        </el-alert>
        <!--表格-->
        <el-table :data="tableData" ref="multipleTable" style="width: 100%" class="mt30"
                  @selection-change="handleSelectionChange"
                  @cell-mouse-enter="rowClickHandle"
                  :header-cell-style="{'text-align':'center',background:'#f3f3f3'}">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column  label="机器人序号" width="800">
            <template slot-scope="scope">
              <el-button type="primary" size="mini">开启机器人</el-button>
              <el-button type="primary" size="mini">导入手机号</el-button>
              <el-button type="primary" size="mini">群同步</el-button>
              <el-button type="primary" size="mini">群成员私信</el-button>
              <el-button type="primary" size="mini">新建群</el-button>
              <el-button type="primary" size="mini">群消息修改</el-button>
              <el-button type="primary" size="mini">群公告</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="sn" label="设备号"></el-table-column>
          <el-table-column prop="phone" label="手机号"></el-table-column>
          <el-table-column prop="username" label="用户名"></el-table-column>

          <!--<el-table-column prop="belongUser" label="所在群"></el-table-column>-->
          <!--<el-table-column prop="belongType" label="所在界面">-->
          <!--<template slot-scope="scope">-->
          <!--<p v-if="scope.row.belongType == 1">群</p>-->
          <!--<p v-if="scope.row.belongType == 2">用户</p>-->
          <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column prop="belongType" label="转人工">-->
          <!--<template slot-scope="scope">-->
          <!--<el-switch-->
          <!--v-model="scope.row.manualWork"-->
          <!--active-color="#ff4949"-->
          <!--inactive-color="#13ce66"-->
          <!--active-value="off"-->
          <!--inactive-value="on"-->
          <!--@change="switchChangeHandle">-->
          <!--</el-switch>-->
          <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column label="任务状态">
            <template slot-scope="scope">
              <!--<p style="color: #2ec991" v-if="scope.row.switch==1">已连接</p>-->
              <p style="color: red" v-if="scope.row.switch==2">未连接</p>
              <p style="color: red" v-if="scope.row.switch==3">{{scope.row.onlineStatus}}</p>
            </template>
          </el-table-column>
          <el-table-column label="设备状态"></el-table-column>
          <el-table-column label="机器人状态"></el-table-column>


        </el-table>
        <!--分页-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[10, 15, 20,50]"
          :page-size="50"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          class="mt30">
        </el-pagination>
      </el-card>
    </el-main>
  </el-container>
</template>
<script>
  import Cache from '@/utils/cache'
  import Require from '@/utils/require'
  import require from "../../../utils/require";
  import Config from '@/utils/config'
  import utils from '@/utils/util'
  import ComHeader from '@/components/header'
  import ComCheckoutuser from './com/com-checkoutUser'

  export default {
    name: "Service",
    components: {
      ComHeader, ComCheckoutuser
    },
    data() {
      return {
        userid: Cache.getSession("userid"),
        username: Cache.getSession("username"),
        titleName: '智能机器人',
        utils: new utils(),
        value1: false,
        alertMessage: "已选择 0 项",
        tableData: null,
        page: 1,//分页
        pageSize: 50,
        srearchForm: {
          phone: undefined,
          belongType: undefined
        },
        total: undefined,
        dialogNotification: false,//消息推送
        dialogAddUsers: false,//添加账号
        dialogCheckout: false,//切换用户
        multipleSelection: undefined,
        addUsersForm: {
          phone: undefined,
          username: undefined,
          personalLable: undefined
        },
        CheckoutForm: {
          id: undefined,
          belongType: 'group',
          belongUser: undefined,
          belongId: 1,
          belongTitle: 2,
        },
        selectdictionaryUrl: undefined,
        NotificationSelect: [],
        NotificationbelongType: 'group',
        NotificationValue: undefined,
        NotificationType: 1,
        dialogNotificationType: undefined,
        NotificationFodder: {
          photo1Url: undefined,
          photo2Url: undefined,
          photo3Url: undefined,
          videoUrl: undefined
        },
        socket: null,
        toPersonAction: 'on',
        selectTable: [],//勾选项
        selectTable_sn: [],//勾选项设备号
        formLabelWidth: '120px',
        fodderValue: '选项1',
        formInline: {
          user: '',
          region: ''
        },

        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        SetInterval: null,
        rowClickData: null,//点击某行数据
        checkoutuserDialog: false,


        //新属性
        NotificationDialog: false,
        radio: 1,
        radio2: 1,
        options: [],
        value: undefined,
        NotificationTextarea: undefined,


      }
    },
    mounted() {
      this.queryDataInfo()
      this.requestNotification()
      this.initWebSocket()
    },
    computed: {
      isgroupchechout() {
        return this.CheckoutForm.belongType == 'group'
      },
      isuserchekout() {
        return this.CheckoutForm.belongType == 'user'
      }
    },
    watch: {
      checkoutuserDialog() {
        if (this.multipleSelection != 1) {
          this.$message({
            message: '选择一项',
            type: 'warning'
          })
          this.checkoutuserDialog = false;
        }
      }
    },
    methods: {
      queryDataInfo() {
        Require.requestHandle({
          url: 'queryServiceData',
          data: {
            page: this.page,
            pageSize: this.pageSize,
            userSid: this.userid,
            phone: this.srearchForm.phone,
            belongType: this.srearchForm.belongType
          },
          type: 'get'
        }, res => {
          if (res.data.length != 0) {
            res.data.forEach(item => {
              item.switch = 2;
              item.onlineStatus = undefined
            })
          }
          this.tableData = res.data
          this.total = res.total
        })
      },
      //请求素材
      requestNotification() {
      },
      //列表勾选项
      handleSelectionChange(val) {
        console.log(val)
        this.multipleSelection = val.length;
        // this.CheckoutForm.id = val[0].id;
        this.selectTable = val;//勾选项
        this.selectTable_sn = []
        val.forEach(item => {//勾选项设备号
          this.selectTable_sn.push(item.sn)
        })
        let cen = val.length.toString()
        this.alertMessage = `已选择 ${cen} 项`
      },
      //切换弹窗按钮
      checkoutClickCheckout() {
        if (this.multipleSelection != 1) {
          this.$message({
            message: '选择一项',
            type: 'warning'
          })
          return;
        }
        this.dialogCheckout = true
        this.checkoutBelongTpe('group')
      },
      //切换弹窗获取所有用户信息通用
      checkoutBelongTpe(type) {
        this.CheckoutForm.belongType = type;
        this.NotificationbelongType = type;
        let url = type == 'group' ? 'querygetAllGroupByUid' : 'querygetAllUserByUid';
        Require.requestHandle({
          url,
          data: {
            uid: this.userid,// 用户id
            mobile: this.selectTable[0].phone,// 手机号
            searchKey: null //检索条件
          },
          type: 'get'
        }, res => {
          this.options = res.data
        })
      },
      //请求切换
      requestCheckout() {
        if (!this.CheckoutForm.belongType) {
          this.$message({
            message: "选择群或者用户",
            type: 'warning'
          })
          return;
        }
        let data
        let Type = this.CheckoutForm.belongType,
          options = this.options,
          obj = null,
          ingroup = null;
        if (Type == 'group') {
          options.forEach(item => {
            if (item.groupTitle == this.CheckoutForm.belongUser) {
              obj = item
            }
          })
          data = {
            "id": this.selectTable[0].id,
            "belongType": this.CheckoutForm.belongType,
            "belongUser": obj.groupName,
            "belongId": obj.groupId,
            "belongTitle": obj.groupTitle
          }
        } else {
          options.forEach(item => {
            if (item.userTitle == this.CheckoutForm.belongUser) {
              obj = item
            }
          })
          data = {
            "id": this.selectTable[0].id,
            "belongType": this.CheckoutForm.belongType,
            "belongUser": obj.username,
            "belongId": obj.userId,
            "belongTitle": obj.userTitle
          }
        }
        require.requestHandle({
          url: 'queryCheckout',
          data,
          type: 'post',
          flag: true
        }, res => {
          if (res.success == 1) {

            this.queryDataInfo()
          }
        })
        // //手机

        let info = this.utils.websocketJoin("CHANGE_GROUP_USER", this.selectTable_sn, {
          type: this.CheckoutForm.belongType,
          accountbot: this.selectTable[0].phone,  //机器人帐号
          nicknamebot: this.selectTable[0].username,       //机器人呢称
          ingroup: data  //所在群
        });
        this.websocketsend(info).then(res => {
          this.$message({
            message: "推送成功",
            type: 'success'
          })
          this.dialogCheckout = false;
        })

      },
      //消息推送按钮
      NotificationBtn(type) {
        this.dialogNotificationType = type
        this.dialogNotification = true
        Require.requestHandle({//查询素材
          url: 'queryFodderList',
          data: {
            uid: this.userid
          },
          type: 'get'
        }, res => {
          this.NotificationSelect = res.data
        })
      },
      //获取素材详细信息
      NotificationSelectChange(val) {
        Require.requestHandle({
          url: 'queryFodderListMessage',
          data: {
            id: val
          },
          type: 'get'
        }, res => {
          this.NotificationFodder = res.data
        })
      },
      //消息推送弹窗确定传手机
      NotificationConfirm() {
        if (!this.NotificationValue) return;
        let {title, content, photo1Url, photo2Url, photo3Url, videoUrl} = this.NotificationFodder
        let obj = {
          belongType: this.selectTable[0].belongType == '1' ? 'group' : 'user',
          belongId: this.selectTable[0].belongId,
          belongTitle: this.selectTable[0].belongTitle,
          belongUser: this.selectTable[0].belongUser
        }

        let data, type
        if (this.NotificationType == 1) {//判断选择

          // this.NotificationSelect.forEach(item => {
          //   if (this.NotificationValue == item.id) {
          //     data = item.title
          //     return;
          //   }
          // })
          if (!content) return;
          data = content
          type = 'text'
        }
        if (this.NotificationType == 2) {
          let arr = [photo1Url, photo2Url, photo3Url]
          data = arr.filter(item => {
            return item != null
          })

          type = 'picture'
        }
        if (this.NotificationType == 3) {
          if (!videoUrl) return;
          data = [videoUrl]
          type = 'video'
        }
        if (this.dialogNotificationType == 'one') {
          if (this.selectTable.length != 1) {
            this.$message({
              message: '选择一项',
              type: 'warning'
            })
            return;
          }
          //消息推送socket
          let info = this.utils.websocketJoin("MESSAGE_PUSH", this.selectTable_sn, {
            type,
            data,
            demo: this.NotificationFodder.content,
            accountbot: this.selectTable[0].phone,  //机器人帐号
            nicknamebot: this.selectTable[0].username,       //机器人呢称
            ingroup: obj  //所在群
          });
          this.websocketsend(info).then(res => {
            this.dialogNotification = false;
            this.$message({
              message: "推送成功",
              type: 'success'
            })
          })

        } else if (this.dialogNotificationType == 'more') {
          //群发消息socket
          if (this.selectTable.length < 1) {
            this.$message({
              message: '至少选择一项',
              type: 'warning'
            })
            return;
          }
          this.selectTable.forEach(item => {
            let info = this.utils.websocketJoin("MESSAGES_SENT", [item.sn], {
              type,
              data,
              demo: this.NotificationFodder.content,
              accountbot: item.phone,  //机器人帐号
              nicknamebot: item.username,       //机器人呢称
              ingroup: 'null'  //所在群
            });
            this.websocketsend(info).then(res => {
              this.dialogNotification = false;
              this.$message({
                message: "推送成功",
                type: 'success'
              })
            })
          })
        }
      },
      //分页数
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageSize = val
        this.queryDataInfo()
      },
      //翻页
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.page = val
        this.queryDataInfo()
      },
      //亮屏
      brightBtn() {
        if (this.selectTable.length < 1) {
          this.$message({
            message: '至少选择一项',
            type: 'warning'
          })
          return;
        }
        let info = this.utils.websocketJoin("BrightScreen", this.selectTable_sn);
        this.websocketsend(info).then(res => {
          this.$message({
            message: '亮屏消息发送成功',
            type: 'success'
          })
        })
      },
      //暗屏
      darknessBtn() {
        if (this.selectTable.length == 0) {
          this.$message({
            message: '至少选择一项',
            type: 'warning'
          })
          return;
        }
        let info = this.utils.websocketJoin("DarkScreen", this.selectTable_sn);
        this.websocketsend(info).then(res => {
          this.$message({
            message: '暗屏消息发送成功',
            type: 'success'
          })
        })
      },

      // 记录hover某行数据
      rowClickHandle(row, event, column) {
        this.rowClickData = row
      },
      //转人工
      switchChangeHandle(val) {
        Require.requestHandle({
          url: 'updateManualWork',
          data: {
            "id": this.rowClickData.id,//设备id
            "manualWork": val//转人工状态
          },
          type: 'post',
          flag: true
        }, res => {
          if (res.success == 1) {
            this.switchChangeHandlePhone(val)
          }
        })
      },
      //转人工传手机
      switchChangeHandlePhone(val) {
        let info = this.utils.websocketJoin("CHANGE_MAN", [this.rowClickData.sn], {
          "action": val,   // on=转人工  off=转机器人
          "accountbot": this.rowClickData.phone,  //机器人帐号
          "nicknamebot": this.rowClickData.username,        //机器人呢称
          "ingroup": {//所在群
            belongType: this.rowClickData.belongType,
            belongId: this.rowClickData.belongId,
            belongTitle: this.rowClickData.belongTitle,
            belongUser: this.rowClickData.belongUser
          }
        });
        this.websocketsend(info).then(res => {
          this.$message({
            message: '消息发送成功',
            type: 'warning'
          })
          this.queryDataInfo()
        })
      },
      //添加账号弹窗
      addUsersBtn() {
        if (this.selectTable.length != 1) {
          this.$message({
            message: '勾选一项',
            type: 'warning'
          })
          return;
        }

        this.dialogAddUsers = true
      },
      //请求账户添加
      queryAddUser() {
        if (!(this.addUsersForm.phone && this.addUsersForm.username && this.addUsersForm.personalLable)) {
          this.$message({
            message: '请输入完整',
            type: 'warning'
          })
          return;
        }
        let {
          phone,
          username,
          personalLable
        } = this.addUsersForm
        let info = this.utils.websocketJoin("ADD_ACCOUNT", this.selectTable_sn, {
          account: phone,  //机器人账号
          nickname: username,   //户名昵称
          labelname: personalLable   //机器人标签
        });
        this.websocketsend(info).then(res => {
          this.addUsersForm = {
            phone: undefined,
            username: undefined,
            personalLable: undefined
          };
          this.dialogNotification = false;
          this.$message({
            message: "添加成功",
            type: 'success'
          })
        })

      },
      //获取服务升级地址
      selectdictionary(type) {//1升级服务2升级telegram
        Require.requestHandle({
          url: 'querySelectdictionary',
          data: {
            type: type
          }
        }, res => {
          // this.selectdictionaryUrl = res.data.url
          if (type == 1) {
            this.updateServiseBtn(res.data.url)
          }
          if (type == 2) {
            this.updataAppBtn(res.data.url)
          }

        })
      },
      //升级服务
      updateServiseBtn(url) {
        if (this.selectTable.length < 1) {
          this.$message({
            message: '至少选择一项',
            type: 'warning'
          })
          return;
        }
        // console.log(this.selectTable.length)
        let info
        info = this.utils.websocketJoin("UpgradeService", this.selectTable_sn, url);
        this.websocketsend(info).then(res => {
          this.$message({
            message: '升级服务消息发送成功',
            type: 'success'
          })
        })

      },
      //升级App
      updataAppBtn(url) {
        if (this.selectTable.length < 1) {
          this.$message({
            message: '至少选择一项',
            type: 'warning'
          })
          return;
        }
        let info = this.utils.websocketJoin("UpgradeApplication", this.selectTable_sn, url);
        this.websocketsend(info).then(res => {
          this.$message({
            message: '升级服务消息发送成功',
            type: 'success'
          })
        })
      },

      //信息同步
      information() {
        if (this.selectTable.length == 0) {
          this.$message({
            message: "请勾选",
            type: 'warning'
          })
          return;
        }
        let info = this.utils.websocketJoin("SYNC_INFO", this.selectTable_sn, 'null');
        this.websocketsend(info).then(res => {
          this.queryDataInfo()
        })
      },
      //初始化websocket
      initWebSocket() {
        console.dir(window.WebSocket)
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
          this.websocketsendtwo("JOIN", {dname: ["null"], msg: "OK"})
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
      websocketsend(agentData) {
        return new Promise(resolve => {
          //数据发送
          let params = {
            url: 'DataEncryption',
            data: agentData,
            flag: true,
          }
          Require.requestHandle(params, res => {
            this.socket && this.socket.send(res.data);
            // console.log("数据发送...");
            resolve();
          })
        })
      },
      // type 类型
      //data {
      //    dname,
      //    msg
      // }
      websocketsendtwo(type, data) {

        let {
          dname,
          msg = null
        } = data
        let jsonData = JSON.stringify({
          device: "mclient",
          type: type,
          data: {
            uid: window.sessionStorage.getItem('userid') || this.$store.state.uid,
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
        Require.requestHandle(params, res => {
          this.socket && this.socket.send(res.data);
          // console.log("数据发送...");
        })


      },
      //数据接收
      websocketonmessage(e) {
        console.log('on message ->', e);
        this.handleOnlineStatus(e.data);
      },
      //关闭websocket
      websocketclose() {
        console.log('关闭socket')
        this.socket.close();
      },
      handleOnlineStatus(msg) {
        // console.log('on message ->', msg);
        let msgObj = JSON.parse(msg);
        // console.log(msgObj)
        if (msgObj.type === 'STATUS') {
          this.tableData.forEach(item => {
            // console.log(item)
            if (item.sn == msgObj.dname) {
              item.onlineStatus = decodeURIComponent(msgObj.msg);
              item.switch = 3
            }
          })
        }
        // console.log(this.tableData)
      },
    },
    //实例销毁
    beforeDestroy() {
      this.socket && this.websocketclose()
      clearInterval(this.SetInterval);
    }
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

  .checkoutBtn {
    width: 70px;
    height: 30px;
    border: 1px solid #b3d8ff;
    border-radius: 3px;
    background: #ecf5ff;
    color: #409EFF;
    cursor: pointer;
  }

  .checkoutBtn:hover {
    background: #409EFF;
    color: white;
  }

  .clickcheckoutBtn {
    background: #409EFF;
    color: white;
  }

  .Btn {

    text-align: left;
    > button {
      margin-top: 20px;
      margin-left: 0;
    }
  }
</style>
