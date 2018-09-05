<template>
  <el-card class="box-card">
    <!--搜索-->
    <div style='overflow: hidden;text-align: left'>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="查找群：">
          <el-input v-model="groupName" placeholder="请输入素材标题"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="RequestData">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-button type="primary" @click="addDialog" style="float: right;margin-bottom: 20px;">添加</el-button>
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
              @selection-change="handleSelectionChange"
              :header-cell-style="{'text-align':'center',background:'#f3f3f3'}">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="groupName" label="群名称"></el-table-column>
      <el-table-column prop="groupGreeting" label="入群打招呼设置"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="editDialog(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--编辑弹窗-->
    <el-dialog :title="form.id ? '编辑':'新增'" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="form">
        <el-form-item label="群名称" :label-width="formLabelWidth">
          <el-input v-model="form.groupName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="打招呼设置" :label-width="formLabelWidth">
          <el-input v-model="form.groupGreeting" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit" v-if="form.id">修改</el-button>
        <el-button type="primary" @click="add" v-else >新增</el-button>
      </div>
    </el-dialog>
    <!--分页-->
    <com-pages :total="total" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></com-pages>
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
        userid: Cache.getSession("userid")||this.$store.state.uid,
        username: Cache.getSession("username")||this.$store.state.username,
        groupName:undefined,
        alertMessage: '已选择 0 项',
        page: 1,//分页
        pageSize: 10,
        total: 0,
        tableData:[],
        dialogFormVisible:false,
        form:{
          id:undefined,
          groupName:undefined,
          groupGreeting:undefined
        },
        formLabelWidth:'120px',

      }
    },
    mounted() {
      this.RequestData()
    },

    methods: {
      RequestData(){
        Request.requestHandle({
          url:'getGroupMaterialByUid',
          data:{
            page:this.page,
            pageSize:this.pageSize,
            uid:this.userid,//运营账号id
            groupName:this.groupName,//群名称
          },
          type:'get',
        },res=>{
          this.tableData = res.data;
          this.total = res.total
        })
      },
      // 添加
      addDialog(){
        this.dialogFormVisible=true;
        this.form = {
          id:undefined,
          groupName:undefined,
          groupGreeting:undefined
        }
      },
      add(){
        Request.requestHandle({
          url:'addGroupMaterial',
          data:{
            "uid": this.userid,
            "groupName": this.form.groupName,//群名称
            "groupGreeting": this.form.groupGreeting,// 打招呼设置
          },
          type:'post',
          flag:true
        },res=>{
          if(res.success==1){
            this.message('新增成功','success');
            this.dialogFormVisible=false;
            this.RequestData()
          }
        })
      },
      //编辑
      editDialog(row){
        this.dialogFormVisible=true;
        this.form = {
          id:row.id,
          groupName:row.groupName,
          groupGreeting:row.groupGreeting
        }
      },
      edit(){
        Request.requestHandle({
          url:'updateGroupMaterial',
          data:{
            "id": this.form.id,
            "groupName": this.form.groupName,//群名称
              "groupGreeting": this.form.groupGreeting,// 打招呼设置
          },
          type:'post',
          flag:true
        },res=>{
          if(res.success==1){
            this.message('修改成功','success');
            this.dialogFormVisible=false;
            this.RequestData()
          }
        })
      },
      //列表勾选
      handleSelectionChange(val){
        this.alertMessage = `已选择 ${val.length} 项`
      },
      //分页器事件
      handleSizeChange(val){
        this.pageSize = val;
        this.RequestData()
      },
      handleCurrentChange(val){
        this.page = val;
        this.RequestData()
      }
    },


  }
</script>

<style scoped>

</style>
