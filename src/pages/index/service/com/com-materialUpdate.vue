<template>
  <div style="text-align: left">
    <el-row>
      <el-col :span="6">
        <el-radio v-model="radio" label="1">选择素材:</el-radio>
      </el-col>
      <el-col :span="18">
        <!--<com-select :options="options" :disabled="disabled" :placeholder="'请选择群名'" @change="selectHandle" style="margin-top: -8px"></com-select>-->
        <el-select :disabled="radio == 2" @change="selectHandle" v-model="value" style="width: 250px;margin-top: -10px;">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.title"
            :value="item.id">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px;">
      <el-col :span="6">
        <el-radio v-model="radio" label="2">自定义素材</el-radio>
      </el-col>
      <el-col :span="18" v-if="radio==2">
        <el-input v-model='inputTitle' placeholder="请输入标题" style="width: 300px;"></el-input>
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
          v-model="textarea"
          style="width: 300px;margin-top: 30px;">
        </el-input>
        <div style="margin: 20px 0 10px;">
          <com-updateimg @fileList="fileList" style="margin-bottom: 10px"></com-updateimg>
          <com-update :title="title" @videoUrl="videoUrl" style="float: left"></com-update>
          <div style="margin-left: 10px;float: left">
            <el-button @click="saveMaterial" style="display: block">保存自定义素材</el-button>
            <el-button @click="backDataEvent" style="margin: 10px 0">不保存自定义素材</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Request from '@/utils/require'
  import Cache from '@/utils/cache'


  export default {
    name: "com-meterialUpdate",
    props: ['type'],
    data() {
      return {
        options: [],
        radio: '1',
        textarea: undefined,
        title: '视频上传',
        inputTitle: undefined,
        video: undefined,
        imgUrlArray: [],
        value: undefined,
      }
    },
    watch: {
      radio:function (val) {


      }
    },
    mounted() {
      this.RequestData()
    },
    methods: {
      //请求素材
      RequestData() {
        Request.requestHandle({
          url: 'queryFodderList',
          data: {
            uid: Cache.getSession("userid") || this.$store.state.uid,// 子账户id
            materialType: this.type,// 类型 1群，2 用户
          },
          type: 'get'
        }, res => {
          this.options = res.data
        })
      },
      //保存自定义素材
      saveMaterial() {
        let arr = [null, null, null];//对返回的图片处理
        this.imgUrlArray.forEach((item, index) => {
          arr[index] = item
        });
        Request.requestHandle({
          url: 'addMaterial',
          data: {
            "uid": this.uid(),// 子账户uid
            "title": this.inputTitle,
            "materialType": this.type,
            "content": this.textarea,
            "photo1Url": arr[0],
            "photo2Url": arr[1],
            "photo3Url": arr[2],
            "videoUrl": this.video
          },
          type: 'post',
          flag: true
        }, res => {
          if (res.success == 1) {
            this.message('保存成功', 'success')
          }
        });
        this.backDataEvent() // 素材数据传回
      },
      //数据回传事件
      backDataEvent() {
        let val = {
          "uid": this.uid(),// 子账户uid
          "title": this.inputTitle,
          "text": this.textarea,
          photo:this.imgUrlArray,
          "video": this.video,
          // "materialType": this.type,
          'radio':this.radio
        };
        this.$emit('backdData', val)
      },
      // 视频组件传回url
      videoUrl(res) {
        this.video = res
      },
      //updata组件返回的上传图片
      fileList(fileList) {

        this.imgUrlArray = fileList
      },
      //选择器事件
      selectHandle(val) {
        Request.requestHandle({
          url: 'getMaterialWithId',
          data: {
            id: val
          },
          type: 'get',
        }, res => {
          let {photo1Url, photo2Url, photo3Url} = res.data;
          let  photo= [photo1Url, photo2Url, photo3Url].filter(item => {
            return item != null
          });
          let val = {
            "uid": this.uid(),// 子账户uid
            "title": res.data.title,
            "text": res.data.content,
            photo,
            "video": res.data.videoUrl,
            "materialType": res.data.materialType,
          };
          console.log('matertialUpdate=>',val);
          this.$emit('backdData', val)
        })
      },


    }
  }
</script>

<style scoped>

</style>
