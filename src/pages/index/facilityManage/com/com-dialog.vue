<template>
  <div>

    <p style="text-align: left">账号名: {{username}}</p>
    <el-input
      placeholder="请输入设备号,Enter键搜索"
      suffix-icon="el-icon-search"
      v-model="search"
      @keyup.enter.native="classify"
      style="margin:10px 0 ;width: 300px;float: left;"
    >
    </el-input>
    <el-table :data="tableData" style="width: 100%" :header-cell-style="{'text-align':'center',background:'#f3f3f3'}"
              @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="50">
      </el-table-column>
      <el-table-column property="sn" label="设备号" v-if="status == 'find'||status == 'bind' "></el-table-column>
      <el-table-column property="mobile" label="手机号" v-if="status == 'phone' "></el-table-column>
      <el-table-column property="status" label='设备状态' v-if="status == 'find'||status == 'bind' ">
        <template slot-scope="scope">
          <p v-if="scope.row.status==2">已绑定</p>
          <p v-if="scope.row.status==1">未绑定</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" v-if="status=='find' || status=='phone' ">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="delfacility(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="1"
      background
      layout="prev, pager, next"
      :total="total">
    </el-pagination>
    <div slot="footer" class="dialog-footer" style="text-align: right" v-if="status == 'bind'">
      <!--<el-button @click="dialogFormVisible = false">取 消</el-button>-->
      <el-button type="primary" @click="bindFacility">确 定</el-button>
    </div>
  </div>
</template>

<script>
  import Cache from '@/utils/cache'
  import Request from '@/utils/require'

  export default {
    name: "com-dialog",
    props: {
      id: Number,
      username: String,
      status: String
    },
    data() {
      return {
        tableData: [],
        page: 1,
        pageSize: 10,
        search: undefined,
        total: undefined,
        multipleSelection: [],
        url: undefined
      }
    },
    watch: {
      id() {
        this.classify()
      },
      status() {
        this.classify()
      }
    },
    mounted() {
      this.classify()
    },
    methods: {
      //分类
      classify() {
        switch (this.status) {
          case 'find':
            this.url = 'queryAllByUserSid'
            this.RequestTableData()
            break;
          case 'bind':
            this.url = 'queryselectNoBind'
            this.RequestTableData()
            break;
          case 'phone':
            this.url = 'getAccountByDeviceIdWithPage'
            this.RequestPhoneData()
            break;

          default:
            return;
        }
      },
      RequestTableData() {
        Request.requestHandle({
          url: this.url,
          data: {
            userSid: this.id,// 子账户id
            page: this.page,//  分页
            pageSize: this.pageSize,//  页面展示数量
            sn: this.search,//(检索条件 设备号)
          },
          type: 'get'
        }, res => {
          this.tableData = res.data
          this.total = res.total
        })
      },
      //查询手机号
      RequestPhoneData() {
        Request.requestHandle({
          url: this.url,
          data: {
            page: this.page,//  分页
            pageSize: this.pageSize,//  页面展示数量
            deviceId: this.id,// 所选设备id
            phone: this.search //手机号，检索条件
          },
          type: 'get'
        }, res => {
          this.tableData = res.data
          this.total = res.total
        })
      },
      //绑定设备
      bindFacility() {
        if (!this.multipleSelection) return;
        let ids = this.multipleSelection.map(item => {
          return item.id
        })

        Request.requestHandle({
          url: 'amendbindDevices',
          data: {
            "bid": this.id,//子账户id
            ids  // 设备id
          },
          type: 'POST',
          flag: true
        }, res => {
          if (res.success = 1) {
            this.$message({
              message: '绑定成功',
              type: 'success'
            })
            this.RequestTableData()
          }

        })


      },
      //勾选
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      //分页
      handleCurrentChange(val) {
        this.page = val
        this.RequestTableData()
      },
      delfacility(row) {
        // console.log(row)
        let params
        switch (this.status) {
          case 'find':
            params = {
              url: 'deldevicesbyusersid',
              data: {
                id: row.id,// 设备id
                userSid: row.userSid,//  子账户id
              },
              type: 'post',
            }
            break;
          case 'phone':
            params={
              url:'deleteByDeviceId',
              data:{
                "deviceId":this.id,//  设备id
                "ids":[row.id] // telegram账号id
              },
              type: 'post',
              flag: true
            }
            break;
          default:
            return;
        }
        Request.requestHandle(params, res => {
          if (res.success == 1) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.classify()
          }

        })
      }

    }
  }
</script>

<style scoped>

</style>
