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
      <el-table-column prop="userNumber" label="群用户数"></el-table-column>
      <el-table-column prop="activeNumber" label="活跃数"></el-table-column>
      <el-table-column prop="groupLable" label="群标签"></el-table-column>
      <el-table-column prop="groupGreeting" label="入群欢迎语"></el-table-column>
      <el-table-column  label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="editGroupDialog(scope.row)">编辑</el-button>
          <!--<el-button type="text" @click="crowdMessagedialog=true">群信息设置</el-button>-->
          <el-button type="text" @click="">查看群用户</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--编辑弹窗-->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="form">
        <el-form-item label="群名称" :label-width="formLabelWidth">
          <el-input v-model="form.groupName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="群标签" :label-width="formLabelWidth">
          <el-input v-model="form.groupLable" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="入群欢迎语" :label-width="formLabelWidth">
          <el-input v-model="form.groupGreeting" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="群公告" :label-width="formLabelWidth">
          <el-input v-model="form.groupNotice" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--群消息弹窗-->
    <!--<el-dialog title="群消息设置" :visible.sync="crowdMessagedialog" width="500px">-->
      <!--<el-form>-->
        <!--<el-form-item label="群名称" :label-width="formLabelWidth">-->
          <!--<el-input v-model="crowdMessageForm.title" ></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="群头像" :label-width="formLabelWidth">-->
          <!--<img :src="crowdMessageForm.header" alt="">-->
        <!--</el-form-item>-->
      <!--</el-form>-->
      <!--<div slot="footer" class="dialog-footer">-->
        <!--<el-button @click="crowdMessagedialog = false">取 消</el-button>-->
        <!--<el-button type="primary" @click="crowdMessagedialog = false">确 定</el-button>-->
      <!--</div>-->
    <!--</el-dialog>-->
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
        groupName: undefined,
        alertMessage: '已选择 0 项',
        page: 1,//分页
        pageSize: 10,
        total: 0,
        tableData: [],
        from:null,
        crowdMessagedialog: false,
        crowdMessageForm:{
          title:undefined,
          header:undefined
      },
        formLabelWidth:'110',
        dialogFormVisible:false,
        form:{
          groupName:undefined,
          groupLable:undefined,
          groupGreeting:undefined,
          groupNotice:undefined
        }
      }
    },
    mounted() {
      this.RequestData()
    },

    methods: {
      RequestData() {
        Request.requestHandle({
          url:'getGroupBuiltByUid',
          data:{
            page:this.page,
            pageSize:this.pageSize,
            uid:this.userid,
            groupName:this.groupName,// 检索条件，群名称
          },
          type:'get'
        },res=>{
          this.tableData=res.data
          this.total = res.total
        })
      },
      // 编辑
      editGroupDialog(row){
        this.dialogFormVisible = true;
        Request.requestHandle({
          url:'getGroupBuiltByUid',
          data:{
            page:this.page,
            pageSize:this.pageSize,
            uid:this.userid,
            groupName:this.groupName,// 检索条件，群名称
          },
          type:'get'
        },res=>{
          this.tableData=res.data
          this.total = res.total
        })

      },
      //列表勾选
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
