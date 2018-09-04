<template>
  <el-container>
    <el-header class="header">
      <div>
        <div class="header-left">
          <el-button type="info" plain @click="back">返回</el-button>
        </div>
        <!--<div class="header-right">-->
          <!--<i class="el-icon-star-off"></i>-->
          <!--<el-dropdown @command="handleCommand">-->
          <!--<span class="el-dropdown-link">-->
            <!--{{username}}<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
          <!--</span>-->
            <!--<el-dropdown-menu slot="dropdown">-->
              <!--<el-dropdown-item command="a">退出</el-dropdown-item>-->
            <!--</el-dropdown-menu>-->
          <!--</el-dropdown>-->
        <!--</div>-->
      </div>
    </el-header>
    <el-main>
      <el-card class="box-card">
        <!--搜索-->
        <div style='overflow: hidden;text-align: left'>
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="查找群：">
              <el-input v-model="username" placeholder="请输入素材标题"></el-input>
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
          <el-table-column prop="title" label="用户名"></el-table-column>
          <el-table-column prop="mobile" label="注册手机号"></el-table-column>
          <el-table-column prop="country" label="国家"></el-table-column>
          <el-table-column prop="timestamp" label="最后一次在线时间"></el-table-column>
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
    name: "lookgroupuser",
    components: {
      ComPages,ComHeader
    },
    data() {
      return {
        userid: Cache.getSession("userid") || this.$store.state.uid,
        username:undefined,
        alertMessage: '已选择 0 项',
        page: 1,//分页
        pageSize: 10,
        total: 0,
        tableData: [],
        titleName:'客户管理'

      }
    },
    mounted() {
      this.RequestData()

    },

    methods: {
      RequestData() {
        Request.requestHandle({
          url: 'getGroupMemberByGroupId',
          data: {
            page: this.page,
            pageSize: this.pageSize,
            groupId:this.$route.params.groupId,// 群id
            username:this.username ,// 检索条件
          },
          type: 'get'
        }, res => {
          this.tableData = res.data
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
      },
      back(){
        // this.$router.push({name:'crowdSelf'})
        this.$router.back(-1)
      }
    },


  }
</script>

<style lang="scss" scoped>

  .header-left:hover {
    color: rgb(0, 171, 234);
  }
  .header-left {
    float: left;
    font-size: 20px;
  }
  .header-right {
    float: right;

  }
</style>
