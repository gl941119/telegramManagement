<template>
  <div>
  <el-button type="info" @click="dialogFormVisible=true">{{name}}</el-button>
  <el-dialog :title="name" :visible.sync="dialogFormVisible" width="450px">
    <el-form>
      <el-form-item label="清理条件："  v-if="differ=='group'">
        <com-select :options="options" ></com-select>
      </el-form-item>
      <el-form-item label="清理选择：">
        <com-select :options="options"></com-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "dialog-cleardieuser",
      props:['differ'],
      computed:{
        name:function (){
          return  this.differ == 'group' ?  '清理群死号' : '清理死号' ;
        }
      },
        data(){
          return{
            dialogFormVisible:false,
            options:[]
          }
        }
    }
</script>

<style scoped>

</style>
