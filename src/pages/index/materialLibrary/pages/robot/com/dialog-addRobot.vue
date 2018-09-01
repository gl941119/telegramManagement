<template>
  <div>

  </div>
</template>

<script>
  export default {
    name: "com-addRobot",
    props: ['Dialog','type','rowData'],
    computed: {
      robotDialog: {
        get: function () {
          // this.$refs['ruleForm'].resetFields();
          // console.log('运行')
          // console.log(this.type)
          // console.log(this.row)
          // if(this.type=='add'){
          //   this.robotForm= {
          //     botId: undefined,
          //       botName: undefined,
          //       helloSet:undefined
          //   }
          // }
          // if(this.type=='edit'){
          //   this.robotForm= {
          //     botId: this.row.botId,
          //     botName: this.row.botName,
          //     helloSet:this.row.helloSet
          //   }
          // }
          return this.Dialog
        },
        set: function (val) {
          this.$emit('closeDialog', val)
        }
      },
      // Data:{
      //   get:function () {
      //     return this.row
      //   }
      // }

    },
    watch: {
      rowData: function (val) {
        console.log(val)
      },

    },
    mounted(){


    },
    data() {
      return {
        //添加机器人弹窗
        robotForm: {
          botId: undefined,
          botName: undefined,
          helloSet:undefined
        }
      }
    },
    methods:{
      add(){}
    }
  }
</script>

<style scoped>

</style>
