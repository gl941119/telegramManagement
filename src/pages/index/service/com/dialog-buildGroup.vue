<template>
  <div>
    <el-dialog title="新建群组" :visible.sync="dialogFormVisible" width="600px">
      <el-form  style="text-align: left">
        <el-form-item label="群名:" :label-width="formLabelWidth">
          <el-input v-model="groupTitle" placeholder="请输入.." style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="群公告:" :label-width="formLabelWidth">
          <el-input v-model="groupInfo" placeholder="请输入.." type="textarea" style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item label="新建群邀请人数设置:" :label-width="formLabelWidth">
          <el-input v-model="inviteSize" placeholder="请输入.." style="width: 217px;"></el-input>
          <p style="color: red;font-size: 12px;">可设置导入数量区间在1-200范围内，随机邀请通讯录内人员</p>
        </el-form-item>
        <el-form-item label="选择telegram机器人:" :label-width="formLabelWidth">
          <el-select v-model="botName" placeholder="请选择活动区域">
            <el-option
              v-for="item in options"
              :key="item.botId"
              :label="item.botName"
              :value="item.botName">
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
    name: "buildGroup",
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

    data() {
      return {
        options: [],
        value: undefined,
        groupTitle:undefined,
        groupInfo:undefined,
        inviteSize:undefined,
        botName:undefined,
        formLabelWidth:'150px'
      }
    },
    mounted(){
      this.getRobot()
    },
    methods:{
      getRobot(){
        Request.requestHandle({
          url:'getTelegramBotWithConsole',
          data:{
            uid:this.uid()// 子账户id
          },
          type:'get',
        },res=>{
          if(res.success==1){
            this.options = res.data
          }
        })
      },
      Submit(){
        let info = {
          "dname": [this.Message.sn],
          "msg":{
            "groupTitle":this.groupTitle,
            "groupInfo":this.groupInfo,
            "botName":this.botName,
            'inviteSize':parseInt(this.inviteSize)
          }
        };
        this.$emit('backData', 'CREATE_NEW_GROUP',info);
        this.dialogFormVisible = false;
      }
    }
  }
</script>

<style lang="scss" scoped>


</style>
