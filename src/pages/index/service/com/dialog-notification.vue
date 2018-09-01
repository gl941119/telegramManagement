<template>
  <el-dialog title="消息推送" :visible.sync="dialogFormVisible" width="700px">
    <!--素材上传组件  type:1群2用户-->
    <com-materialupdate @backdefinddata="updataBackdata" @backSelectData="backSelectData" @radioStatus="radioStatus" :type="'1'"></com-materialupdate>
    <el-row style="border-bottom: 1px solid #b4bccc;text-align: left;height: 100px;line-height: 50px">
      <div>
        <el-radio v-model="radio2" label="2">指定人</el-radio>
        <!--<com-select :options="options" :placeholder="'请选择群名'"></com-select>-->
        <el-button type="primary" @click="innerVisible = true">指定人</el-button>
        <el-dialog
          width="60%"
          title="指定"
          :visible.sync="innerVisible"
          append-to-body>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="通讯录好友" name="addressBook">
              <el-table :data="tableData" ref="multiple"
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
              <el-table :data="group_tableData" ref="b"
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
            <el-button @click="innerVisible = false">取 消</el-button>
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
        <!--~-->
        <!--<el-input v-model="pushEnd" style="width: 50px"></el-input>-->
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
    watch: {
      Message: function () {


      }
    },
    data() {
      return {
        radio: '1',
        radio2: '1',
        value: undefined,
        util:new Util(),
        options: [],
        textarea: undefined,
        title: '附件上传',
        pushStart: undefined,
        pushEnd: undefined,
        innerVisible: false,
        activeName: 'addressBook',
        tableData: [],
        addressBook_selected: [],
        group_selected: [],

        addressBook_total: 0,
        addressBook_page: 1,
        addressBook_pageSize: 10,

        group_tableData: [],
        group_total: 0,
        group_page: 1,
        group_pageSize: 10,

        selected_tableData: [],

        not_addSelect: [],
        backdata: null,
        Material:undefined,
        MaterialRadio:'1',
        MaterialSlect:undefined,

        selectData:[]

      }
    },
    // watch:{
    //   dialogFormVisible:function (val) {
    //     console.log(this.clickData)
    //   }
    // },

    mounted() {
      this.getDeviceUserByUid()//通讯录好友
      this.getgroupUserByUid()//群好友
    },
    methods: {
      updataBackdata(val) {
        this.backdata = val
      },
      //消息推送
      notificationBtn() {
        console.log(this.MaterialRadio)
        let contactData =  this.addressBook_selected.map(item=>{
          return item.userId
        })
        let dialogData =  this.group_selected.map(item=>{
          return item.userId
        })

        let data,info
        if(this.MaterialRadio=='1'){
          if(!this.MaterialSlect) return ;
          let {
            photo1Url,
            photo2Url,
            photo3Url
          }=this.MaterialSlect;
          let photo=[photo1Url, photo2Url, photo3Url].filter(item=>{
            return item!=null
          })
          info = {
            "dname": [this.Message.sn],
            "msg": {
              "text": this.MaterialSlect.content,
              photo,
              "video":this.MaterialSlect.videoUrl,
              "pushTo": {
                "contact": this.radio2 == '1'?  '-1':contactData, // 推送通讯录好友，内容对应userId，如果只有一个元素-1则表示推送全部通讯录好友
                "dialog": this.radio2 == '1'?   '-1':dialogData, // 推送聊天窗口对象，内容对应userId，如果只有一个元素-1则表示推送全部的聊天窗口对象
              },
              batch:this.pushStart, // 每批推送的对象数量
              "interval": 900 // 批次之间的推送间隔，单位秒
            }
          }
        }
        if(this.MaterialRadio=='2'){
          if(!this.MaterialSlect) return ;
          let {
            photo1Url,
            photo2Url,
            photo3Url
          }=this.backdata;
          let photo=[photo1Url, photo2Url, photo3Url].filter(item=>{
            return item!=null
          })
          info = {
            "dname": [this.Message.sn],
            "msg": {
              "text": this.backdata.content,
              photo,
              "video":this.backdata.videoUrl,
              "pushTo": {
                "contact": this.radio2=='1'?  '-1':contactData, // 推送通讯录好友，内容对应userId，如果只有一个元素-1则表示推送全部通讯录好友
                "dialog":  this.radio2=='1'?  '-1':dialogData, // 推送聊天窗口对象，内容对应userId，如果只有一个元素-1则表示推送全部的聊天窗口对象
              },
              batch:this.pushStart, // 每批推送的对象数量
              "interval": 900 // 批次之间的推送间隔，单位秒
            }
          }

        }

        this.$emit('backData',info)
        this.dialogFormVisible = false
      },
      handleRowChange(selection, row) {
        if (this.activeName == 'addressBook') {
          let val = undefined;
          this.addressBook_selected.forEach((item, index) => {
            if (item.userMobile == row.userMobile) {
              val = index;
              return;
            }
          })
          if (!val) {
            this.addressBook_selected.push(row)
          } else {
            this.addressBook_selected.splice(val, 1)
          }
          console.log('book=>',this.addressBook_selected)
        }
        if (this.activeName == 'group') {
          let val = undefined;
          this.group_selected.forEach((item, index) => {
            if (item.userMobile == row.userMobile) {
              val = index;
              return;
            }
          })
          if (!val) {
            this.group_selected.push(row)
          } else {
            this.group_selected.splice(val, 1)
          }
          console.log('group=>',this.group_selected)
        }
      },
      //选项卡事件
      handleClick(tab, event) {
        if (tab.name == "selected") {
          this.selected_tableData = this.addressBook_selected.concat(this.group_selected)
        }

      },
      //列表勾选
      handleSelectionChange(val) {
        console.log(val)

        // this.selectData = val
        // if (this.activeName == 'addressBook') {
        //   this.addressBook_selected = val
        // }
        // if (this.activeName == 'group') {
        //   this.group_selected = val
        // }

      },
      //分页器事件
      handleSizeChange(val) {
        if (this.activeName == 'addressBook') {
          this.addressBook_pageSize = val;
          this.getDeviceUserByUid()
        }
        if (this.activeName == 'group') {
          this.group_pageSize = val;
          this.getgroupUserByUid()
        }

      },
      handleCurrentChange(val) {
        // console.log(!Cache.getSession('notSelect'))
        if (this.activeName == 'addressBook') {
          this.addressBook_page = val;
          this.getDeviceUserByUid()
        }
        if (this.activeName == 'group') {
          this.group_page = val;
          this.getgroupUserByUid()
        }
      },
      //获取通讯录好友
      getDeviceUserByUid() {
        // console.log('info',this.Message)
        if (!this.Message.phone) return;
        Request.requestHandle({
          url: 'getDeviceUserByUid',
          data: {
            page: this.addressBook_page,
            pageSize: this.addressBook_pageSize,
            uid: this.uid(),// 运营账号id
            Mobile: this.Message.phone,// 手机号
            userType: 2,// 1当前聊天窗口,2通讯录好友
          },
          type: 'get',
        }, res => {
          if (res.success == 1) {
            console.log(this.addressBook_selected, res.data)
            let a = []
            this.addressBook_selected.forEach((item, index) => {
              if (item.userMobile == res.data[index].userMobile) {
                a.push(res.data[index])
              }
            })
            this.test(a)
            this.tableData = res.data
            this.addressBook_total = res.total
          }
        })
      },
      test(rows) {
        setTimeout(() => {
          rows.forEach(row => {
            this.$refs.multiple.toggleRowSelection(row, true);
          });
        }, 1000)

      },
      //获取群好友
      getgroupUserByUid() {
        // console.log('info',this.Message)
        if (!this.Message.phone) return;
        Request.requestHandle({
          url: 'getDeviceUserByUid',
          data: {
            page: this.group_page,
            pageSize: this.group_pageSize,
            uid: this.uid(),// 运营账号id
            Mobile: this.Message.phone,// 手机号
            userType: 1,// 1当前聊天窗口,2通讯录好友
          },
          type: 'get',
        }, res => {
          if (res.success == 1) {
            this.group_tableData = res.data;
            this.group_total = res.total;
          }
        })
      },
      timeMessage(val) {
        // console.log(val)
      },
      radioStatus(val){
        this.MaterialRadio =val
      },
      backSelectData(val){
        this.MaterialSlect = val
      },



    }
  }
</script>

<style lang="scss" scoped>
  .el-col {
    text-align: left;

  }


</style>
