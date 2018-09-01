<template>
  <el-card class="box-card">
    <!--搜索-->
    <div style='overflow: hidden;text-align: left'>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="查找群：">
          <el-input v-model="belongGroup" placeholder="请输入素材标题"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="RequestData">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--添加机器人-->
    <el-button type="primary" @click="addDialog" v-bind:style="{float: 'right',marginBottom:20+'px'}">添加机器人
    </el-button>
    <!--添加机器人弹窗-->
    <el-dialog :title="dialogType=='add' ?'添加机器人':'编辑机器人'" :visible.sync="robotDialog" width="400px">
      <el-form :model="robotForm" ref="ruleForm">
        <el-form-item label="bot name" prop="name" :label-width="formLabelWidth">
          <el-input v-model="robotForm.botId" style="width: 200px;float: left"></el-input>
        </el-form-item>
        <el-form-item label="bot名称" prop="crowd" :label-width="formLabelWidth">
          <el-input v-model="robotForm.botName" style="width: 200px;float: left"></el-input>
        </el-form-item>
        <el-form-item label="入群打招呼设置" prop="crowd" :label-width="formLabelWidth">
          <el-input v-model="robotForm.helloSet" style="width: 200px;float: left"></el-input>
        </el-form-item>
        <el-form-item label="所属群" prop="crowd" :label-width="formLabelWidth">
          <el-input v-model="robotForm.belongGroup" style="width: 200px;float: left"></el-input>
        </el-form-item>
        <el-form-item label="所属账号" prop="crowd" :label-width="formLabelWidth">
          <el-input v-model="robotForm.belongAccount" style="width: 200px;float: left"></el-input>
        </el-form-item>
        <el-form-item label="秘钥" prop="crowd" :label-width="formLabelWidth">
          <el-input v-model="robotForm.secretKey" style="width: 200px;float: left"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="robotDialog = false">取 消</el-button>
        <el-button type="primary" @click="addRobot" >确定</el-button>
        <!--<el-button type="primary" @click="editRobot">编辑</el-button>-->
      </div>
    </el-dialog>
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
              @row-click="handleRowClick"
              @selection-change="handleSelectionChange"
              :header-cell-style="{'text-align':'center',background:'#f3f3f3'}">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="botId" label="机器人name"></el-table-column>
      <el-table-column prop="botName" label="机器人名称"></el-table-column>
      <el-table-column prop="belongGroup" label="所在群"></el-table-column>
      <el-table-column prop="helloSet" label="入群打招呼设置"></el-table-column>
      <el-table-column prop="belongAccount" label="所属账号"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="editDialog(scope.row)">编辑</el-button>
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


  export default {
    name: "greet",
    data() {
      return {
        userid: Cache.getSession("userid") || this.$store.state.uid,
        username: Cache.getSession("username") || this.$store.state.username,
        belongGroup: undefined,
        alertMessage: '已选择 0 项',
        page: 1,//分页
        pageSize: 10,
        total: 0,
        tableData: [],
        robotDialog: false,
        dialogType: 'add',
        rowData: null,
        robotDialog: false,
        robotForm: {
          id:undefined,
          botId: undefined,
          botName: undefined,
          belongGroup:undefined,
          helloSet: undefined,
          belongAccount:undefined,
          secretKey:undefined,
        },
        formLabelWidth:'120px',

      }
    },
    mounted() {
      this.RequestData()
    },

    methods: {
      RequestData() {
        Request.requestHandle({
          url: 'getTelegramBotByUid',
          data: {
            page: this.page,//   分页
            pageSize: this.pageSize,// 页面数量
            uid: this.userid,// 运营账号id
            belongGroup: this.belongGroup,// 检索条件非必填
          },
          type: 'get',
        }, res => {
          if (res.success == 1) {
            this.tableData = res.data
            this.total = res.total
          }
        })
      },
      //表格点击
      handleRowClick(row, event, column) {
        console.log(row)
        this.rowData = row
      },
      //新增
      addDialog() {
        this.robotDialog = true
        this.robotForm = {
          botId: undefined,
          botName: undefined,
          helloSet: undefined,
          belongAccount:undefined,
          secretKey:undefined,
        }
        this.dialogType = 'add'
      },
      addRobot() {
        let url
        if(this.dialogType=='add'){
          url = 'addTelegramBot'
        }
        if(this.dialogType=='edit'){
          url='updateTelegramBot'
        }
        Request.requestHandle({
          url,
          data:{
            "uid": this.uid(),
            id:this.robotForm.id,
            "botId": this.robotForm.botId,
            "botName": this.robotForm.botName,//"机器人名称",
            belongGroup:this.robotForm.belongGroup,//所属群
            "helloSet":this.robotForm.helloSet,// "打招呼语设置"
            belongAccount:this.robotForm.belongAccount,
            secretKey:this.robotForm.secretKey,
          },
          type:'post',
          flag:true
        },res=>{
          if(res.success==1){
            this.message('成功','success')
            this.RequestData();
            this.robotDialog = false;
          }
        })
      },
      //修改
      editDialog(row) {
        this.robotDialog = true;
        this.dialogType = 'edit';
        this.robotForm = {
          id:row.id,
          botId: row.botId,
          botName: row.botName,
          helloSet: row.helloSet,
          belongAccount: row.belongAccount,
          secretKey: row.secretKey,
        }
      },
      editRobot() {
        Request.requestHandle({
          url:'addTelegramBot',
          data:{
            "uid": this.uid(),
            "botId": this.robotForm.botId,
            "botName": this.robotForm.botName,//"机器人名称",
            "helloSet":this.robotForm.helloSet,// "打招呼语设置"
          },
          type:'post',
          flag:true
        },res=>{
          if(res.success==1){
            this.message('新增成功','success')
            this.RequestData()
          }
        })
      },
      closeDialog(val) {
        console.log(val)
        this.robotDialog = val
      },

      //表格勾选
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
