<template>
  <div>

    <el-dialog title="群成员私信" :visible.sync="dialogFormVisible" width="600px">
      <!--素材上传组件  type:1群2用户-->
      <com-materialupdate @backdData="backdData" :type="'1'"></com-materialupdate>
      <el-row style="text-align: left;height: 100px;line-height: 50px">
        <div>
          <el-radio v-model="radio" label="1">指定群成员</el-radio>
          <div>
            <el-select v-model="groupValue" placeholder="选择群" @change="selectChange">
              <el-option
                v-for="item in options"
                :key="item.groupId"
                :label="item.groupTitle"
                :value="item.groupId">
              </el-option>
            </el-select>
            <el-select v-model="memberValue" multiple  placeholder="选择群成员" :disabled="radio ==2">
              <el-option
                v-for="item in options2"
                :key="item.userId"
                :label="item.title"
                :value="item.userId">
              </el-option>
            </el-select>
          </div>
        </div>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-col :span="6" style="line-height: 40px;"><el-radio v-model="radio" label="2">随机私信活跃用户</el-radio></el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-col :span="6" style="line-height: 40px;">随机发送私信人数范围</el-col>
        <el-col :span="18">
          <el-input v-model="randDown" style="width: 50px"></el-input>
          ~
          <el-input v-model="randUp" style="width: 50px"></el-input>
        </el-col>
      </el-row>
      <p style="color: red;font-size: 12px;margin:10px 0;text-align: left">每次执行消息推送任务时间间隔大于15分钟</p>
      <el-row style="margin-top: 20px;">
        <el-col :span="6" style="line-height: 40px;">每次私信人数</el-col>
        <el-col :span="18">
          <el-input v-model="start" style="width: 50px"></el-input>
          ~
          <el-input v-model="end" style="width: 50px"></el-input>
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="groupPrivateletter">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Cache from '@/utils/cache'
  import Request from '@/utils/require'
  import Config from '@/utils/config'
  import Util from '@/utils/util'
  import ComMaterialupdate from './com-materialUpdate'

  export default {
    name: "dialog-notification",
    props: ['Message', 'status'],
    components: {
      ComMaterialupdate
    },
    data() {
      return {
        util: new Util(),
        radio: '2',
        groupValue: undefined,
        memberValue: [],
        options: [],
        options2: [],
        textarea: undefined,
        title: '附件上传',
        start: undefined,
        end: undefined,
        Material:null,
        randUp:undefined,
        randDown:undefined,
      }
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
    mounted(){
      this.getgroup()
    },
    methods: {
      //群成员私信消息推送
      groupPrivateletter(){
        let info = {
          "dname": [this.Message.sn],
          "msg": {
            "text": this.Material.text,
            "photo":this.Material.photo,
            "video": this.Material.video,
            "groupId":this.groupValue,
            "members":this.radio==2 ?  ['-1']:this.memberValue, // 群成员对象，内容对应userId，如果只有一个元素-1则表示随机成员
            "randUp":parseInt(this.randUp), //随机私信人数上限
            "randDown":parseInt(this.randDown), // 随机私信人数下限
            "batch":parseInt(this.util.random(this.start, this.end)), // 每批推送的对象数量
            "interval":parseInt(Config.interval) // 批次之间的推送间隔，单位秒
          }
        };
        // console.log('Privateletter=>', info);
        this.$emit('backData',"PUSH_MESSAGE_TO_MEMBERS",info);//个人消息推送传回

        this.dialogFormVisible = false

      },
      getgroup(){

        Request.requestHandle({
          url:'querygetAllGroupByUid',
          data:{
            uid:this.uid(),// 用户id
            mobile:this.Message.phone,// 手机号
          },
          type:'get',
        },res=>{
          if(res.success==1){
           this.options = res.data
          }
        })
      },
      selectChange(val){
        Request.requestHandle({
          url:'getAllMemberByGroupId',
          data:{
            groupId:val,// 群id
          },
          type:'get',
        },res=>{
          if(res.success==1){
            this.options2 = res.data
          }
        })
      },
      backdData(val){//素材选择传回数据
        this.Material = val
      }

    }
  }
</script>

<style lang="scss" scoped>
  .el-col {
    text-align: left;

  }


</style>
