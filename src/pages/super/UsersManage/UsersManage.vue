<template>
  <el-container>
    <el-header class="header">
      <com-header :titleName="titleName"></com-header>
    </el-header>
    <el-main>
      <el-card class="box-card">
        <!--搜索-->
        <div style='overflow: hidden;text-align: left'>
          <el-form :inline="true" :model="search" class="demo-form-inline">
            <el-form-item label="查找手机号：">
              <el-input v-model="search.userMobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="所在国家：">
              <el-input v-model="search.country" placeholder="请搜索国家"></el-input>
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
          <el-table-column prop="userTitle" label="姓名"></el-table-column>
          <el-table-column prop="userMobile" label="手机号"></el-table-column>
          <el-table-column prop="country" label="国家"></el-table-column>
          <el-table-column prop="" label="头像"></el-table-column>
          <el-table-column prop="lastOnline" label="最后一次在线时间"></el-table-column>
          <el-table-column prop="lable" label="标签"></el-table-column>
          <el-table-column prop="updateTime" label="编辑标签时间"></el-table-column>
          <el-table-column prop="" label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="edit(scope.row)">编辑标签</el-button>
              <!--<el-button type="text" @click="del(scope.row)" style="color: red">删除</el-button>-->
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <com-pages :total="total" @handleSizeChange="handleSizeChange"
                   @handleCurrentChange="handleCurrentChange"></com-pages>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
  import Cache from '@/utils/cache'
  import Request from '@/utils/require'
  import Config from '@/utils/config'
  import ComPages from '@/components/com-pages'
  import ComHeader from '@/components/header'

  export default {
    name: "loginUser",
    components: {
      ComPages, ComHeader
    },
    data() {
      return {
        userid: Cache.getSession("userid") || this.$store.state.uid,
        username: Cache.getSession("username") || this.$store.state.username,
        search: {
          userMobile: undefined,
          country: undefined
        },
        alertMessage: '已选择 0 项',
        page: 1,//分页
        pageSize: 10,
        total: 0,
        tableData: [],
        titleName: '客户管理'
      }
    },
    mounted() {
      this.RequestData()
    },

    methods: {
      RequestData() {
        Request.requestHandle({
          url: 'getAllDeviceUser',
          data: {
            page: this.page,
            pageSize: this.pageSize,
            userMobile: this.search.userMobile,// 手机号
            country: this.search.country,// 国家
          },
          type: 'get'
        }, res => {
          if (res.success == 1) {
            this.tableData = res.data;
            this.total = res.total;
          }
        })
      },
      //编辑
      edit(row) {
        this.$prompt('请输入', '编辑标签', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({value}) => {
          Request.requestHandle({
            url: 'updateDeviceUserLable',
            data: {
              "id": row.id,
              "lable": value,//标签
            },
            type: 'post',
            flag: true,
          }, res => {
            if (res.success == 1) {
              this.message('修改成功','success');
              this.RequestData()
            }
          })
        }).catch(() => {
        });
      },
      //删除
      del(row) {
        Request.requestHandle({
          url: 'deleteByIds',
          data: {
            "ids": [row.id]
          },
          type: 'post',
          flag: true,
        }, res => {
          if (res.success == 1) {
            this.message('删除成功','danger');
            this.RequestData()
          }
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
