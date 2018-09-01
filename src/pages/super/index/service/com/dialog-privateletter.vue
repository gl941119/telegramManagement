
<template>
  <div>
    <el-button type="primary" size="mini" @click="dialogFormVisible=true"><slot></slot></el-button>
    <el-dialog title="群成员私信" :visible.sync="dialogFormVisible" width="500px">
      <el-row>
        <el-col :span="6">
          <el-radio v-model="radio" label="1">选择素材:</el-radio>
        </el-col>
        <el-col :span="18">
          <com-select :options="options" :placeholder="'请选择群名'"></com-select>
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
      <el-row style="border-bottom: 1px solid #b4bccc;text-align: left;height: 100px;line-height: 50px">
        <div>
          <el-radio v-model="radio2" label="2" >指定群成员</el-radio>
          <com-select :options="options" :placeholder="'请选择群名'"></com-select>
        </div>
        <el-radio v-model="radio2" label="1">随机私信活跃用户</el-radio>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-col :span="6" style="line-height: 40px;">每次私信人数</el-col>
        <el-col :span="18">
          <el-input v-model="start" style="width: 50px" ></el-input>
          <el-input v-model="end" style="width: 50px"></el-input>
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

  export default {
    name: "dialog-notification",
    props:['selectData'],
    data() {
      return {
        dialogFormVisible: false,
        radio: '1',
        radio2: '1',
        value: undefined,
        options: [],
        textarea: undefined,
        title: '附件上传',
        start: undefined,
        end: undefined,

      }
    },
    methods: {
      number(){

      },
      timeMessage(val) {
        console.log(val)
      },

    }
  }
</script>

<style lang="scss" scoped>
  .el-col {
    text-align: left;

  }


</style>
