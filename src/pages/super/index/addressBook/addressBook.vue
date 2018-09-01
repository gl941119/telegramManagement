<template>
  <el-container>
    <el-header class="header">
      <com-header :titleName="titleName"></com-header>
    </el-header>
    <el-main>
      <el-card class="box-card">
        <!--搜索-->
        <div style='overflow: hidden;'>
          <el-form :inline="true" :model="search" class="demo-form-inline">
            <el-form-item label="查找管理账号：" style="float: left" v-if="permission==0">
              <el-input v-model="search.manageAccount" placeholder="请输入关键词"></el-input>
            </el-form-item>
            <el-form-item label="查找手机号：" style="float: left">
              <el-input v-model="search.phone" placeholder="请输入关键词"></el-input>
            </el-form-item>
            <el-form-item label="标签:" style="float: left;">
              <el-input v-model="search.lable" placeholder="请输入关键词" ></el-input>
            </el-form-item>
            <el-form-item  style="float: left">
              <el-button type="primary" @click="requestData" >搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-upload
          class="upload-demo"
          :action="importContacts"
          :headers="uploadHeader"
          :data="uploadData"
          accept=".xlsx,.docx"
          multiple
          :limit="1"
          :show-file-list="false"
          :on-success="UploadSuccess"
          style="float: right"
          v-if="permission==3">
          <el-button size="small" type="primary">导入excel</el-button>
        </el-upload>
        <!--添加群组dialog-->
        <!--消息-->
        <el-alert
          :title="multipleSelection"
          type="info"
          show-icon
          style="margin-top: 60px">
        </el-alert>

        <!--表格-->
        <el-table :data="tableData" ref="multipleTable" style="width: 100%"
                  class="mt30" :header-cell-style="{'text-align':'center',background:'#f3f3f3'}"
                  @selection-change="handleSelectionChange" @row-click="rowClick">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column prop="username" label="用户名"></el-table-column>
          <el-table-column prop="phone" label="注册手机号"></el-table-column>
          <el-table-column prop="deviceSn" label="设备号"></el-table-column>
          <el-table-column prop="contactsLable" label="标签"></el-table-column>
          <el-table-column prop="updateTime" label="编辑标签时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="updataTabBtn(scope.row)">编辑标签</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!--分页-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChangehange"
          :current-page="page"
          :page-sizes="[5,10, 20, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-card>
    </el-main>
  </el-container>
</template>
<script>
  import Cache from '@/utils/cache'
  import Request from '@/utils/require'

  import Config from "@/utils/config";
  import ComHeader from '@/components/header'

  export default {
    name: "service",
    components: {
      ComHeader
    },
    data() {
      return {
        userid: Cache.getSession("userid"),
        username: Cache.getSession("username"),
        titleName: '通讯录好友管理',
        value1: false,
        alertMessage: "0",
        page: 1,//分页
        pageSize: 10,
        queryGroudPage: 1,
        queryGroupPageSize: 10,
        total: undefined,
        gourpTotal: undefined,
        search: {
          phone: undefined,
          manageAccount: undefined,
          lable: undefined
        },
        tableData: [],
        multipleSelection: '已选择0项',
        importContacts:Config.importContacts,
        uploadHeader: {
          token: this.$store.state.token || Cache.getSession('token')
        },
        uploadData: {
          uid: Cache.getSession("userid")
        },
        permission: Cache.getSession('permission')||this.$store.state.permission
      }
    },
    mounted() {
      this.requestData()

    },
    methods: {
      requestData() {
        let url = this.permission == 0 ? 'querygetAll':'querygetByUid';
        let manageAccount = this.permission == 0 ? this.search.manageAccount:null;
        let uid= this.permission == 0 ? null:this.userid;
        Request.requestHandle({
          url,
          data: {
            uid,
            page: this.page,
            pageSize: this.pageSize,
            manageAccount,// 管理员账号（检索条件）
            phone: this.search.phone,// 手机号 （检索条件）
            lable: this.search.lable,// 标签 （检索条件）
          },
          type: 'get'
        }, res => {
          this.total = res.total
          this.tableData = res.data
        })
      },
      //编辑标签
      updataTabBtn(row) {
        // console.log(row)
        this.$prompt('', '新增标签', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({value}) => {
          if(!value) return ;
          Request.requestHandle({
            url: 'addressBookupdateLable',
            data: {
              "id":row.id,//数据id
                "contactsLable":value
            },
            type: 'post',
            flag:true
          }, res => {
           if(res.success==1){
             this.$message({
               type:'success',
               message:'新增成功'
             })
             this.requestData()
           }

          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      // 上传成功
      UploadSuccess(res){
        if(res.success==1){
          this.$message({
            message:'上传成功',
            type:'success'
          })
          this.requestData()
        }


      },
      handleCurrentChangehange(val) {
        this.page = val
        this.requestData()
      },
      handleSelectionChange(val) {
        this.multipleSelection = `已选择${val.length}项`
      },
      //分页
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.requestData()
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.page = val;
        this.requestData()
      },
      handleCurrentChangehangeGroup(val) {
        this.queryGroudPage = val
        this.queryGroupBtn()
      },
      rowClick(row, event, column) {
      },


    },


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


</style>
