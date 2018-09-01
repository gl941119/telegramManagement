<template>
  <div>
    <el-button type="primary" size="mini" @click="dialogFormVisible=true"><slot></slot></el-button>
    <el-dialog title="新建群组" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="form" style="text-align: left">
        <el-form-item label="群名" :label-width="formLabelWidth">
          <el-input v-model="form.q" placeholder="请输入.." style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="新建群邀请人数设置" :label-width="formLabelWidth">
          <el-input v-model="form.w" placeholder="请输入.." style="width: 100px;"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.e" placeholder="请选择活动区域">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
    name: "buildGroup",
    props: ['selectData'],
    data() {
      return {
        options: [],
        value: undefined,
        dialogFormVisible: false,
        form: {
          q: undefined,
          w: undefined,
          e: undefined
        },
        formLabelWidth:'150px'

      }
    }
  }
</script>

<style lang="scss" scoped>


</style>
