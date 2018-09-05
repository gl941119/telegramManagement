<template>
    <div>
      <el-dialog title="加入群" :visible.sync="dialogFormVisible" width="350px">
        <el-form>
          <el-form-item label="群名:" :label-width="formLabelWidth">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.groupName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="Submit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>

  import Cache from '@/utils/cache'
  import Request from '@/utils/require'
    export default {
      name: "com-joinGroup",
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
      data(){
          return{
            group:undefined,
            options:[],
            formLabelWidth:undefined,
            value:undefined,
          }
      },
      mounted(){
        this.RequestData()
      },
      methods:{
        RequestData(){
          console.log('123');
          Request.requestHandle({
            url: 'getGroupWithConsole',
            data: {
              uid: this.uid(),// 用户id
            },
            type: 'get',
          }, res => {
            if (res.success == 1) {
              this.options = res.data
            }
          })
        },
        Submit(){
          let val=this.options.filter(item=>{
            return item.id === this.value
          })
          console.log(val)
          let info = {
            "dname":[this.Message.sn],
            "msg":{
              "groupName":val[0].groupName,
              "greet":val[0].groupGreeting
            }
          };
          this.$emit('backData','JOIN_GROUP',info);//传回
          this.dialogFormVisible = false
        }
      }

    }
</script>

<style scoped>

</style>
