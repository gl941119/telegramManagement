<template>
  <div>

    <el-dialog title="选择群公告" :visible.sync="dialogFormVisible" width="500px">
      <com-materialupdate :type="'1'"></com-materialupdate>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import ComMaterialupdate from './com-materialUpdate'

  export default {
    name: "dialog-groupNotice",
    props:['Message','status'],
    components: {
      ComMaterialupdate
    },
    computed: {
      dialogFormVisible: {
        set: function (val) {
          return this.$emit('changeDialog', val)
        },
        get: function () {
          return this.status
        }
      },
    },
    watch: {
      Message: function () {

      }
    },
    data() {
      return {

        radio: 1,
        options: [],
        title: '附件上传',
        textarea: undefined

      }
    },
  }
</script>

<style scoped>

</style>
