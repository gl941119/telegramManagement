<template>
  <div>
    <el-button type="primary" @click="dialogFormVisible = true">清理日志</el-button>
    <el-dialog title="日志清理" :visible.sync="dialogFormVisible" width="400px" style="text-align: left">
      <el-form>
        <el-form-item>
          <el-radio v-model="radio" label="1">按时间清理:</el-radio>
          <el-select v-model="value" placeholder="一周以前">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-radio v-model="radio" label="2" @change="radioBtn">全部清理</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="clearLog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Cache from '@/utils/cache'
  import Request from '@/utils/require'

  export default {
    name: "dialog-clearLog",
    props: ['status'],
    data() {
      return {
        userid: Cache.getSession("userid") || this.$store.state.uid,
        dialogFormVisible: false,
        radio: '1',
        value: 5,
        options: [{
          value: 1,
          label: '一年以前'
        }, {
          value: 2,
          label: '半年以前'
        }, {
          value: 3,
          label: '3个月以前'
        }, {
          value: 4,
          label: '一个月以前'
        }, {
          value: 5,
          label: '一周以前'
        }, {
          value: 10,
          label: '清理全部'
        }],

      }
    },
    mounted() {

    },
    methods: {
      radioBtn() {
        this.value = 10
      },
      // 清理日志
      clearLog() {
        this.confirm().then(t=>{
          if (!this.status) return;
          let url;
          if (this.status == 'chat') {
            url = 'clearChatRecord'
          } else if (this.status == 'robot') {
            url = 'clearChatLog'
          }
          Request.requestHandle({
            url,
            data: {
              uid: 183,// 运营账号id
              clearType: this.value
            },
            type: 'Post'
          }, res => {
            this.dialogFormVisible = false;
            this.$emit('RequestData', '1')
          })
        }).catch(e=>{
          this.dialogFormVisible = false;
        })
      }
    }
  }
</script>

<style scoped>

</style>
