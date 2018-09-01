<template>
  <div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "com-Pages",
    props:['total'],
    data() {
      return {
        page:1,
        pageSize:10,

      }
    },
    computed:{
      // currentPage:{
      //   set:function (val) {
      //     this.$store.commit('setPage',val)
      //   },
      //   get:function () {
      //     return this.$store.state.page
      //   }
      // },
      // total(){
      //   return this.$store.state.total
      // }
    },
    methods: {
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        // this.$store.commit('setPageSize',val)
        this.$emit('handleSizeChange',val)
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        // this.$store.commit('setPage',val)
        this.$emit('handleCurrentChange',val)
      }
    },
  }
</script>

<style scoped>

</style>
