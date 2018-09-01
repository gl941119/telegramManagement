<template>
  <el-select v-model="value" :placeholder="placeholder" @change="handleChange" style="width: 250px;">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.title"
      :value="item.id">
    </el-option>
  </el-select>
</template>

<script>
    export default {
        name: "com-select",
      props:['options','placeholder'],
        data(){
          return {
            value:undefined
          }
        },
      methods:{
        handleChange(val){

          this.$emit('change',val)
        }
      }
    }
</script>

<style scoped>

</style>
