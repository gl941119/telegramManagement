<template>
  <div class="block">
    <span class="demonstration">默认</span>
    <el-date-picker
      v-model="value"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </div>
</template>

<script>
  //输出事件 time
  import util from '@/utils/util'
  export default {
    name: "com-dayTime",
    data(){
      return{
        value: undefined,
        util:new util
      }
    },
    watch:{
      value:function (val){
        let info = this.util.timeCycle(val)
        console.log(info)
        this.$emit('timeMessage',info)
        return
      }
    }
  }
</script>

<style scoped>

</style>
