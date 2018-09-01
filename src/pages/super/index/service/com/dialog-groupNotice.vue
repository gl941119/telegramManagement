<template>
  <div>
    <el-button type="primary" size="mini"  @click="dialogFormVisible = true"><slot></slot></el-button>
    <el-dialog title="选择群公告" :visible.sync="dialogFormVisible" width="500px">
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "dialog-groupNotice",
      data(){
          return{
            dialogFormVisible:false,
            radio:1,
            options:[],
            title:'附件上传',
            textarea:undefined

          }
      },
    }
</script>

<style scoped>

</style>
