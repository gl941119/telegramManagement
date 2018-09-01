<template>
  <div>

    <el-dialog title="添加机器人" :visible.sync="robotDialog" width="350px">
      <el-form :model="robotForm" ref="ruleForm">
        <el-form-item label="机器人ID" prop="name">
          <el-input v-model="robotForm.name" style="width: 200px;float: left"></el-input>
        </el-form-item>
        <el-form-item label="robot名称" prop="crowd">
          <el-input v-model="robotForm.crowd" style="width: 200px;float: left"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="robotDialog = false">取 消</el-button>
        <el-button type="primary" @click="robotDialog = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "com-addRobot",
    props: ['Dialog'],
    computed: {
      robotDialog: {
        get: function () {
          // this.$refs['ruleForm'].resetFields();
          this.robotForm = {
            name: undefined,
            crowd: null
          }
          return this.Dialog
        },
        set: function (val) {
          this.$emit('closeDialog', val)
        }
      }

    },
    data() {
      return {
        //添加机器人弹窗
        robotForm: {
          name: undefined,
          crowd: null
        }
      }
    },
  }
</script>

<style scoped>

</style>
