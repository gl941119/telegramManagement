<template>
  <div>

    <el-dialog title="群成员私信" :visible.sync="dialogFormVisible" width="500px">
      <!--素材上传组件  type:1群2用户-->
      <com-materialupdate :type="'1'"></com-materialupdate>
      <el-row style="text-align: left;height: 100px;line-height: 50px">
        <div>
          <el-radio v-model="radio2" label="2">指定群成员</el-radio>
          <div>
            <el-select v-model="value" placeholder="请选择" @change="selectChange">
              <el-option
                v-for="item in options"
                :key="item.groupId"
                :label="item.groupTitle"
                :value="item.groupId">
              </el-option>
            </el-select>
            <el-select v-model="value2" placeholder="请选择">
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
        <el-col :span="6" style="line-height: 40px;"><el-radio v-model="radio2" label="1">随机私信活跃用户</el-radio></el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-col :span="6" style="line-height: 40px;">每次私信人数</el-col>
        <el-col :span="18">
          <el-input v-model="start" style="width: 50px"></el-input>
          <el-input v-model="end" style="width: 50px"></el-input>
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Cache from '@/utils/cache'
  import Request from '@/utils/require'
  import Config from '@/utils/config'
  import ComMaterialupdate from './com-materialUpdate'

  export default {
    name: "dialog-notification",
    props: ['Message', 'status'],
    components: {
      ComMaterialupdate
    },
    data() {
      return {
        radio: '1',
        radio2: '1',
        value: undefined,
        options: [],
        value2: undefined,
        options2: [],
        textarea: undefined,
        title: '附件上传',
        start: undefined,
        end: undefined,

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
    watch: {
      Message: function () {
        this.getgroup()
      }
    },
    methods: {
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
      }

    }
  }
</script>

<style lang="scss" scoped>
  .el-col {
    text-align: left;

  }


</style>
