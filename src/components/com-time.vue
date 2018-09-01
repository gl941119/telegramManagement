<template>
  <div class="block">
    <el-date-picker
      v-model="value"
      type="daterange"
      format="yyyy / MM 月 dd 日"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
    {{value}}
  </div>
</template>

<script>
  //输出事件 time
  import util from '@/utils/util'
    export default {
        name: "com-time",
      data(){
          return{
            value:'',
            util:new util
          }
      },
      watch:{
          value:function (val){
            console.log(val)
            // let info = this.util.timeCycle(val)
            this.$emit('timeMessage',info)
          }
      }
    }
</script>

<style scoped>

</style>
