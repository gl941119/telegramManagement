<template>
  <div>
    <el-dialog title="群消息推送" :visible.sync="dialogFormVisible" width="500px" style="text-align: left">
      <el-row>
        <el-col :span="6">
          <p>选择群组:</p>
        </el-col>
        <el-col :span="18">
          <el-select v-model="Value" placeholder="选择群" multiple  style="margin-top: -10px">
            <el-option
              v-for="item in options"
              :key="item.groupId"
              :label="item.groupTitle"
              :value="item.groupId">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row style="margin: 30px 0">
        <el-col :span="2">
        </el-col>
        <el-col :span="22">
          <com-materialupdate  @backdData='backdData' :type="'1'"></com-materialupdate>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="groupNotificationPush">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Cache from '@/utils/cache'
  import Request from '@/utils/require'
  import ComMaterialupdate from './com-materialUpdate'

  export default {
    name: "dialog-groupNotice",
    props: ['Message', 'status'],
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
    data() {
      return {
        radio: 1,
        options: [],
        Value: [],
        title: '附件上传',
        textarea: undefined,
        Material:null,
      }
    },
    mounted(){
      this.getGroup()
    },
    methods: {
      //群消息推送
      groupNotificationPush(){
        let info = {
          "dname": [this.Message.sn],
          "msg": {
            "text": this.Material.content,
            "photo":this.Material.photo,
            "video": this.Material.videoUrl,
            "pushTo": {
              "group":this.Value, // 推送群对象，内容对应groupId，如果只有一个元素-1则表示推送全部的群
            },
          }
        };
        console.log('groupPush=>', info);
        this.$emit('backData','PUSH_MESSAGE_TO_SOMEONE',info);//传回
        this.dialogFormVisible = false
      },
      //选择群
      getGroup() {
        if (!this.Message.phone) return;
        Request.requestHandle({
          url: 'querygetAllGroupByUid',
          data: {
            uid: this.uid(),// 用户id
            mobile: this.Message.phone,// 手机号
          },
          type: 'get',
        }, res => {
          if (res.success == 1) {
            this.options = res.data
          }
        })
      },
      //素材消息回传
      backdData(res){
        this.Material = res;
      }
    }
  }
</script>

<style scoped>

</style>
