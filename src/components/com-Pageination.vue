<template>
  <div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "com-Pageination",
    // props:['total'],
    data() {
      return {

      }
    },
    computed:{
      currentPage:{
        set:function (val) {
          this.$store.commit('setPage',val)
        },
        get:function () {
          return this.$store.state.page
        }
      },
      total(){
        return this.$store.state.total
      }
    },
    methods: {
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.$store.commit('setPageSize',val);
        this.$emit('RequestPageData')
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.$store.commit('setPage',val);
        this.$emit('RequestPageData')
      }
    },
  }
</script>

<style scoped>

</style>
