<template>
  <el-card class="box-card">
    <!--搜索-->
    <div style='overflow: hidden;text-align: left'>
      <el-form :inline="true" :model="search" class="demo-form-inline">
        <el-form-item label="查找群：">
          <el-input v-model="search" placeholder="请输入素材标题"></el-input>
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
      <el-table-column label="标题"></el-table-column>
      <el-table-column label="运营账号"></el-table-column>
      <el-table-column label="素材状态">
        <template slot-scope="scope">
          <el-button type="text" disabled>启用</el-button>
          <el-button type="text" disabled style="color: red">停用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="编辑时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="">编辑</el-button>
          <el-button type="text" @click="">停用
          </el-button>
          <el-button type="text" @click="">启用</el-button>
          <el-button type="text" @click="">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--打招呼添加（个人）-->
    <el-dialog title="打招呼添加(个人)" :visible.sync="addGreetDialog" width="700px">
      <el-form :model="addGreetForm" style="text-align: left">
        <el-form-item>
          <el-radio v-model="addGreetForm.radio" label="1" style="width: 100px;float: left">素材1</el-radio>
          <div style="float: left">
            <el-input type="textarea" v-model="addGreetForm.mat" :rows="3" style="width: 500px;display: block"></el-input>
            <com-update :title="ComUpdate_title" @UpdateSuccess="UpdateSuccess"></com-update>
          </div>
        </el-form-item>
        <el-form-item>
          <el-radio v-model="addGreetForm.radio" label="2" style="width: 100px;float: left">自定义素材</el-radio>
          <div style="float: left">
            <el-input type="textarea" v-model="addGreetForm.defined" :rows="3"
                      style="width: 500px;display: block"></el-input>
            <com-update :title="ComUpdate_title"></com-update>
            <el-button style="margin-top: -30px;">保存自定义素材</el-button>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addGreetDialog = false">取 消</el-button>
        <el-button type="primary" @click="addGreetDialog = false">确 定</el-button>
      </div>
    </el-dialog>
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
        search: undefined,
        alertMessage: '已选择 0 项',
        page: 1,//分页
        pageSize: 10,
        total: 0,
        tableData: [],
        addGreetDialog: true,//打招呼弹窗
        addGreetForm: {
          radio: 1,
          mat: undefined,
          defined: undefined
        },
        ComUpdate_title: '附件',
        ComUpdate_title2:'附件上传',
      }
    },
    mounted() {
      this.RequestData()
    },

    methods: {
      RequestData() {

      },
      //上传
      UpdateSuccess(val){
        console.log(val)
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
