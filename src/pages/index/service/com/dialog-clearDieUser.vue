<template>
  <div>

    <el-dialog :title="name" :visible.sync="dialogFormVisible" width="450px">
      <el-form>
        <el-form-item label="清理条件：" >
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="清理群选择：" v-if="differ=='group'">
          <el-select v-model="groupValue" multiple placeholder="请选择">
            <el-option
              v-for="item in groupOptions"
              :key="item.value"
              :label="item.groupTitle"
              :value="item.groupId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Request from '@/utils/require'
  import Config from '@/utils/config'

  export default {
    name: "dialog-cleardieuser",
    props: ['differ', 'selectTable', 'status','Message'],
    computed: {
      name: function () {
        return this.differ == 'group' ? '清理群死号' : '清理死号';
      },
      dialogFormVisible: {
        set: function (val) {
          return this.$emit('changeDialog', val)
        },
        get: function () {
          return this.status
        }
      },
    },
    data() {
      return {
        options: [{
          value: '7',
          label: '最近一星期未登录'
        }, {
          value: '30',
          label: '最近一个月未登录'
        }, {
          value: '365',
          label: '最近一年未登录'
        }],
        value:undefined,
        groupOptions: [],
        groupValue:[],
      }
    },
    mounted() {
      if (this.differ == 'group') {
        this.RequestData()
      }
    },
    methods: {
      RequestData() {
        Request.requestHandle({
          url: 'getGroupWithManage',
          data: {
            uid: this.uid(),// 用户id
            mobile: this.Message.phone,// 手机号
          },
          type: 'get',
        }, res => {
          if (res.success == 1) {
            this.groupOptions = res.data;
          }
        })
      },
      submit() {
        if(this.differ === 'group'){
          let info = {
            "dname": [this.Message.sn],
            "msg": {
              "groupIds": this.groupValue, // 清理的群ID，如果只有一个元素-1则表示清理所有的群死号
              "day": this.value, // 最近几天未登录
            }
          };
          this.$emit('backData', 'CLEAN_ZOMBIE_GROUPS',info);
          this.dialogFormVisible = false;
        }
        if(this.differ === 'users'){
          let info = {
            "dname": this.selectTable,
            "msg":this.value // 最近几天未登录，如果为"-1"则表示未回复消息
          };
          this.$emit('backData', 'CLEAN_ZOMBIE_CONTACTS',info);
          this.dialogFormVisible = false;
        }
      }
    }
  }
</script>

<style scoped>

</style>
