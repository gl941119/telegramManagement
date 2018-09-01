<template>
  <div>
    <el-button type="primary" class="Btn" @click="dialogFormVisible = true">新增</el-button>
    <el-dialog title="计划任务" :visible.sync="dialogFormVisible" width="500px">
      <el-row>
        <el-col :span="6">
          <el-radio v-model="radio" label="1">选择素材:</el-radio>
        </el-col>
        <el-col :span="18">
          <el-select v-model="value" placeholder="请选择" style="width: 300px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;border-bottom: 1px solid #b4bccc">
        <el-col :span="6">
          <el-radio v-model="radio" label="2">自定义素材</el-radio>
        </el-col>
        <el-col :span="18">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="textarea"
            style="width: 300px;">
          </el-input>
          <div style="margin: 20px 0 10px;">
            <com-update :title="title" @UpdateSuccess="" v-bind:style="{textAlign:'left'}"></com-update>
            <el-button>保存自定义素材</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row style="border-bottom: 1px solid #b4bccc;text-align: left">
        <el-radio v-model="radio2" label="1" style="margin:20px 0">推送给全部通讯录</el-radio>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-col :span="6" style="line-height: 40px;">每次推送人数</el-col>
        <el-col :span="18">
          <el-input v-model="start" style="width: 50px" @keyup.native="people"></el-input>
          <el-input v-model="end" style="width: 50px" @keyup.native="people"></el-input>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-col :span="6" style="line-height: 40px;">选择时间段</el-col>
        <el-col :span="18">
          <com-time @timeMessage="timeMessage"></com-time>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Cache from '@/utils/cache'
  import Request from '@/utils/require'
  import Config from '@/utils/config'

  import ComTime from '@/components/com-time'
  import ComUpdate from '@/components/com-update'

  export default {
    name: "dialog-addPlanTask",
    components: {
      ComUpdate, ComTime
    },
    data() {
      return {
        dialogFormVisible: false,
        radio: '1',
        radio2: '1',
        value: undefined,
        options: null,
        textarea: undefined,
        title: '附件上传',
        start: undefined,
        end: undefined,

      }
    },
    methods: {
      timeMessage(val) {
        console.log(val)
      },
      people() {
        this.start = this.start.replace(/[^0-9]/g, '')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-col {
    text-align: left;
  }

  .Btn {
    display: block;
    float: right;
    margin-bottom: 20px
  }
</style>
