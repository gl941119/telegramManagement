<template>
  <el-dialog title="消息推送" :visible.sync="dialogFormVisible" width="700px">
    <!--素材上传组件  type:1群2用户-->
    <div style="border-bottom: 1px solid #b4bccc;padding-bottom: 20px;">
      <com-materialupdate @backdData="backdData" :type="'1'"></com-materialupdate>
    </div>
    <el-row style="border-bottom: 1px solid #b4bccc;text-align: left;height: 100px;line-height: 50px">
      <div>
        <el-radio v-model="radio2" label="2">指定人:</el-radio>
        <!--<com-select :options="options" :placeholder="'请选择群名'"></com-select>-->
        <el-button type="primary" :disabled="radio2 == 1" @click="innerVisible = true">指定人</el-button>
        <el-dialog
          width="60%"
          title="指定"
          :visible.sync="innerVisible"
          append-to-body>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="通讯录好友" name="addressBook">
              <el-table :data="tableData" ref="multipleAddress"
                        class="mt30"
                        @select="handleRowChange"
                        @selection-change="handleSelectionChange"
                        :header-cell-style="{'text-align':'center',background:'#f3f3f3'}"
              >
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="userTitle" label="姓名"></el-table-column>
                <el-table-column prop="userMobile" label="手机号"></el-table-column>
              </el-table>
              <com-pages :total=" addressBook_total" @handleSizeChange="handleSizeChange"
                         @handleCurrentChange="handleCurrentChange"></com-pages>
            </el-tab-pane>
            <el-tab-pane label="聊天窗口对象" name="group">
              <el-table :data="group_tableData" ref="multipleGroup"
                        class="mt30"
                        @select="handleRowChange"
                        @selection-change="handleSelectionChange"
                        :header-cell-style="{'text-align':'center',background:'#f3f3f3'}"
              >
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="userTitle" label="姓名"></el-table-column>
                <el-table-column prop="userMobile" label="手机号"></el-table-column>
              </el-table>
              <com-pages :total="group_total" @handleSizeChange="handleSizeChange"
                         @handleCurrentChange="handleCurrentChange"></com-pages>
            </el-tab-pane>
            <el-tab-pane label="已选择" name="selected">
              <el-table :data="selected_tableData" ref="a"
                        class="mt30"
                        :header-cell-style="{'text-align':'center',background:'#f3f3f3'}"
              >
                <el-table-column prop="userTitle" label="姓名"></el-table-column>
                <el-table-column prop="userMobile" label="手机号"></el-table-column>
              </el-table>

            </el-tab-pane>
          </el-tabs>
          <div slot="footer" class="dialog-footer">
            <!--<el-button @click="innerVisible = false">取 消</el-button>-->
            <el-button type="primary" @click="innerVisible = false">确定</el-button>
          </div>
        </el-dialog>
      </div>
      <el-radio v-model="radio2" label="1">推送给全部通讯录</el-radio>
    </el-row>
    <el-row style="margin-top: 20px;">
      <el-col :span="6" style="line-height: 40px;">每次推送人数</el-col>
      <el-col :span="18">
        <el-input v-model="pushStart" style="width: 50px"></el-input>
        ~
        <el-input v-model="pushEnd" style="width: 50px"></el-input>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="notificationBtn">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import Cache from '@/utils/cache'
  import Request from '@/utils/require'
  import Config from '@/utils/config'
  import Util from '@/utils/util'

  import ComMaterialupdate from './com-materialUpdate'

  export default {
    name: "dialog-notification",
    props: ['Message', 'status'],
    components: {
      ComMaterialupdate
    },
    computed: {
      dialogFormVisible: {
        set: function (val) {
          return this.$emit('changeDialog', val)
        },
        get: function () {
          return this.status
        }
      },
    },
    data() {
      return {
        radio: '1',
        radio2: '1',
        value: undefined,
        util: new Util(),
        options: [],
        textarea: undefined,
        title: '附件上传',
        pushStart: undefined,
        pushEnd: undefined,
        innerVisible: false,
        activeName: 'addressBook',
        tableData: [],//通讯录
        addressBook_total: 0,
        addressBook_selected: [],
        addressBook_page: 1,
        addressBook_pageSize: 10,

        group_tableData: [],//群
        group_selected: [],
        group_total: 0,
        group_page: 1,
        group_pageSize: 10,

        selected_tableData: [],//已经选择列表数据
        Material: null,
      }
    },
    mounted() {
      this.getDeviceUserByUid(2);//通讯录好友
      this.getDeviceUserByUid(1)//群好友
    },
    methods: {
      backdData(val) {
        this.Material = val
      },
      //消息推送
      notificationBtn() {
        //数据处理
        console.log(this.ArraychangeObject(this.addressBook_selected));
        let contact,  // 推送通讯录好友，内容对应userId，如果只有一个元素-1则表示推送全部通讯录好友
          dialog;     // 推送聊天窗口对象，内容对应userId，如果只有一个元素-1则表示推送全部的聊天窗口对象
        if (this.radio2 == '2') {
          contact = this.ArraychangeObject(this.addressBook_selected).map(item => {
            return item.userId
          });
          dialog = this.ArraychangeObject(this.group_selected).map(item => {
            return item.userId
          });
        } else if (this.radio2 == '1') {
          contact = ['-1'];
          dialog = ['-1'];
        }
        // 图片数据处理
        if (!this.Material) return;
        let info = {
          "dname": [this.Message.sn],
          "msg": {
            "text": this.Material.text,
            photo:this.Material.photo,
            "video": this.Material.video,
            "pushTo": {
              contact,
              dialog,
            },
            batch:this.util.random(this.pushStart, this.pushEnd), // 每批推送的对象数量
            "interval": 900 // 批次之间的推送间隔，单位秒
          }
        };
        console.log('notification=>', info);
        this.$emit('backData',"PUSH_MESSAGE_TO_SOMEONE",info);//个人消息推送传回
        this.dialogFormVisible = false
      },
      handleRowChange(selection, row) {

      },
      //选项卡事件
      handleClick(tab) {
        if (tab.name == "selected") {
          let addressBook = this.ArraychangeObject(this.addressBook_selected),
            group = this.ArraychangeObject(this.group_selected);
          this.selected_tableData = addressBook.concat(group)
        }
      },
      //处理数据格式问题
      ArraychangeObject(arr) {
        if (arr.length == 0) return;
        arr = arr.filter(item => {//去空
          return item
        });
        let result = [];
        arr.forEach(item => {
          item.forEach(val => {
            result.push(val)
          })
        });
        return result
      },
      //列表勾选
      handleSelectionChange(val) {
        if (this.activeName == 'addressBook') {
          this.addressBook_selected[this.addressBook_page - 1] = val
        }
        if (this.activeName == 'group') {
          this.group_selected[this.group_page - 1] = val
        }
      },
      //分页器事件
      handleSizeChange(val) {
        if (this.activeName == 'addressBook') {
          this.addressBook_pageSize = val;
          this.getDeviceUserByUid(2)
        }
        if (this.activeName == 'group') {
          this.group_pageSize = val;
          this.getDeviceUserByUid(1)
        }

      },
      handleCurrentChange(val) {
        if (this.activeName == 'addressBook') {
          this.addressBook_page = val;
          this.getDeviceUserByUid(2)
        }
        if (this.activeName == 'group') {
          this.group_page = val;
          this.getDeviceUserByUid(1)
        }
      },
      //获取通讯录好友
      getDeviceUserByUid(type) {
        // console.log('info',this.Message)
        if (!this.Message.phone) return;
        Request.requestHandle({
          url: 'getDeviceUserByUid',
          data: {
            page: this.addressBook_page,
            pageSize: this.addressBook_pageSize,
            uid: this.uid(),// 运营账号id
            Mobile: this.Message.phone,// 手机号
            userType: type,// 1当前聊天窗口,2通讯录好友
          },
          type: 'get',
        }, res => {
          if (res.success == 1) {
            if (type == 2) {// 1当前聊天窗口,2通讯录好友
              this.tableData = res.data;
              this.memory(res.data);//翻页记忆
              this.addressBook_total = res.total
            }
            if (type == 1) {// 1当前聊天窗口,2通讯录好友
              this.group_tableData = res.data;
              this.group_memory(res.data);
              this.group_total = res.total;
            }
          }
        })
      },
      memory(res) {//通讯录翻页记忆
        let rows = [],
          arr = this.addressBook_selected[this.addressBook_page - 1];
        if (arr) {
          res.forEach(item => {
            arr.forEach(val => {
              if (item.userMobile == val.userMobile) {
                rows.push(item)
              }
            })
          })
        }
        setTimeout(() => {
          rows.forEach(row => {
            this.$refs.multipleAddress.toggleRowSelection(row, true);
          });
        }, 0)
      },
      group_memory(res) {//群好友翻页记忆
        let rows = [],
          arr = this.group_selected[this.group_page - 1];
        if (arr) {
          res.forEach(item => {
            arr.forEach(val => {
              if (item.userMobile == val.userMobile) {
                rows.push(item)
              }
            })
          })
        }
        setTimeout(() => {
          rows.forEach(row => {
            this.$refs.multipleGroup.toggleRowSelection(row, true);
          });
        }, 0)
      },

    }
  }
</script>

<style lang="scss" scoped>
  .el-col {
    text-align: left;

  }


</style>
