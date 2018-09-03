<template>
  <div>

    <el-dialog title="加入群" :visible.sync="dialogFormVisible" width="350px">
      <el-form>
        <el-form-item label="群名:" :label-width="formLabelWidth">
          <com-select :options="options" :placeholder="placeholder"></com-select>
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
    name: "com-timedTask",
    props:['Message','status'],
    computed:{
      dialogFormVisible:{
        set:function (val) {
          return this.$emit('changeDialog',val)
        },
        get:function () {
          return this.status
        }
      },
    },
    // watch:{
    //   Message:function () {
    //     this.getRobot()
    //   }
    // },

    data(){
      return{

        group:undefined,
        options:[],
        formLabelWidth:undefined,
        placeholder:'定时任务'
      }
    }
  }
</script>

<style scoped>

</style>
