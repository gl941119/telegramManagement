<template>
  <div>
    <el-form>
      <el-form-item label="查询绑定账号">
        <el-select v-model="optionsValue" placeholder="请选择活动区域">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.username"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" style="margin-top: 100px">
      <el-button @click="$emit('closeDialog',false)">取 消</el-button>
      <el-button type="primary" @click="updatacheckoutUser">确 定</el-button>
    </div>
  </div>
</template>

<script>
  import Cache from '@/utils/cache'
  import Request from '@/utils/require'

  export default {
    name: "com-checkoutUser",
    props: {
      selectTable: Array
    },
    data() {
      return {
        userid: Cache.getSession("userid") || this.$store.state.uid,
        optionsValue: undefined,
        options: undefined,
      }
    },
    mounted() {
      this.requestData()
      console.log(this.selectTable)

    },
    methods: {
      requestData() {
        Request.requestHandle({
          url: 'querygetAccountByDeviceId',
          data: {
            uid: this.userid,// 子账户id
            deviceId: this.selectTable[0].id,// 所选设备id
          },
          type: 'get'
        }, res => {
          this.options = res.data
        })
      },
      updatacheckoutUser() {
        let val = this.options.filter(item => {
          return item.id == this.optionsValue
        })
        console.log(val)
        Request.requestHandle({
          url: 'updateDeviceAccount',
          data: {
            "id": this.selectTable[0].id,//设备id
            "userId": val[0].id,//telegram用户id
            "mobile": val[0].mobile,//手机号
            "username": val[0].username,//用户名
            "userTitle": val[0].userTitle,//用户title
          },
          type: 'post',
          flag:true

        }, res => {
          if(res.success==1){
            this.$message({
              type:'success',
              message:'切换成功'
            })
            this.$emit('closeDialog',false)
          }
        })

      }

    }
  }
</script>

<style scoped>

</style>
