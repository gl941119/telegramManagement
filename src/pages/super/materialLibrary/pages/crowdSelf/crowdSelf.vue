<template>
  <el-card class="box-card">
    <!--搜索-->
    <div style='overflow: hidden;text-align: left'>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="查找群：">
          <el-input v-model="groupTitle" placeholder="请输入素材标题"></el-input>
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
      <el-table-column prop="groupTitle" label="群名称"></el-table-column>
      <el-table-column prop="userNumber" label="群用户数"></el-table-column>
      <el-table-column prop="activeNumber" label="活跃数"></el-table-column>
      <el-table-column prop="groupLable" label="群标签"></el-table-column>
      <el-table-column prop="groupGreeting" label="入群欢迎语"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="editGroupDialog(scope.row)">编辑</el-button>
          <!--<el-button type="text" @click="crowdMessagedialog=true">群信息设置</el-button>-->
          <el-button type="text" @click="lookGroupUser(scope.row)">查看群用户</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--编辑弹窗-->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="form">
        <el-form-item label="群名称:" :label-width="formLabelWidth">
          <el-input v-model="form.groupTitle" disabled auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="@符:" :label-width="formLabelWidth">
          <el-input v-model="form.groupName" auto-complete="off" disabled  ></el-input>
        </el-form-item>
        <el-form-item label="群公告:" :label-width="formLabelWidth">
          <el-input type="textarea"
                    :rows="2" v-model="form.groupNotice" disabled auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="群标签:" :label-width="formLabelWidth">
          <el-input v-model="form.groupLable" disabled auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="入群欢迎语:" :label-width="formLabelWidth">
          <el-input v-model="form.groupGreeting" disabled auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editGroup">确 定</el-button>
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
        groupTitle: undefined,
        alertMessage: '已选择 0 项',
        page: 1,//分页
        pageSize: 10,
        total: 0,
        tableData: [],
        from: null,
        crowdMessagedialog: false,
        crowdMessageForm: {
          title: undefined,
          header: undefined
        },
        formLabelWidth: '110',
        dialogFormVisible: false,
        form: {
          groupTitle: undefined,
          groupLable: undefined,
          groupGreeting: undefined,
          groupNotice: undefined,
          groupName:undefined
        }
      }
    },
    mounted() {
      this.RequestData()
    },

    methods: {
      // 页面数据
      RequestData() {
        Request.requestHandle({
          url: 'chaogetGroupBuiltByUid',
          data: {
            page: this.page,
            pageSize: this.pageSize,
            groupTitle: this.groupTitle,// 检索条件，群名称
          },
          type: 'get'
        }, res => {
          this.tableData = res.data
          this.total = res.total
        })
      },
      // 打开编辑弹窗
      editGroupDialog(row) {
        this.dialogFormVisible = true;
        this.form = {
          id: row.id,
          groupTitle: row.groupTitle,
          groupLable: row.groupLable,
          groupGreeting: row.groupGreeting,
          groupNotice: row.groupNotice,
          groupName:row.groupName
        }
      },
      //编辑请求
      editGroup() {
        // Request.requestHandle({
        //   url: 'updateGroupBuilt',
        //   data: {
        //     "id": this.form.id,
        //     "groupTitle": this.form.groupTitle,//群名称
        //     "groupLable": this.form.groupLable,//群标签
        //     "groupGreeting": this.form.groupGreeting,//入群欢迎语
        //     "groupNotice": this.form.groupNotice,//群公告
        //   },
        //   type: 'post',
        //   flag: true
        // }, res => {
        //   if (res.success == 1) {
        //     this.message('修改成功', 'success')
        //     this.dialogFormVisible = false;
        //     this.RequestData()
        //   }
        // })
        this.dialogFormVisible = false;
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
      },
      //跳转群用户
      lookGroupUser(row){
        this.$router.push({name:'superLookGroupUser',params:{groupId:row.groupId}})
      }
    },


  }
</script>

<style scoped>

</style>
