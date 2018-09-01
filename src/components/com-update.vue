<template>

  <el-upload
    class="upload-demo"
    :action="importContacts"
    :headers="uploadHeader"
    :data="uploadData"
    multiple
    :limit="1"
    :on-success="UploadSuccess"
    style="display: inline-block;"
    :file-list="fileList"
   >
    <el-button type="primary">{{title}}</el-button>
  </el-upload>

</template>

<script>
  //parsmas 属性 title  传出videoUrl
  import Cache from '@/utils/cache'
  import Request from '@/utils/require'

  import Config from "@/utils/config";
    export default {
        name: "com-update",
      props:{
          title:String
      },
      data(){
          return{
            importContacts:Config.uploadVideo,
            uploadHeader: {
              token: this.$store.state.token || Cache.getSession('token')
            },
            uploadData: {
              uid: Cache.getSession("userid")||this.$store.state.uid
            },
            fileList:[],
          }
      },
      methods:{
        UploadSuccess(response, file, fileList){
          // console.log(response)
          this.message('上传成功','success');
          // let url=fileList.map(item=>{
          //   return item.response.data
          // })
          this.$emit('videoUrl',response.data)
        }
      },
    }
</script>

<style scoped>

</style>
