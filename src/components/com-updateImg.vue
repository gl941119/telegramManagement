<template>


  <div>
  <el-upload
    :action="importContacts"
    :headers="uploadHeader"
    :data="uploadData"
    list-type="picture-card"
    :limit="3"
    :on-success="UploadSuccess"
  >
    <i class="el-icon-plus"></i>
  </el-upload>
  <el-dialog :visible.sync="dialogVisible">
    <img width="100" :src="dialogImageUrl" alt="" style="width: 100px;">
  </el-dialog>
  </div>
</template>

<script>
  //parsmas 属性 title  传出fileList
  import Cache from '@/utils/cache'
  import Request from '@/utils/require'
  import Config from "@/utils/config";
  export default {
    name: "com-updateimg",
    // props:{
    //   title:String
    // },
    data(){
      return{
        importContacts:Config.uploadImg,
        uploadHeader: {
          token: this.$store.state.token || Cache.getSession('token')
        },
        uploadData: {
          uid: Cache.getSession("userid")||this.$store.state.uid
        },
        fileList:[],
        dialogVisible:false,
        dialogImageUrl:undefined
      }
    },
    methods:{
      UploadSuccess(response, file, fileList){

        this.message('上传成功','success');
        let url=fileList.map(item=>{
          return item.response.data
        })
        this.$emit('fileList',url)
      }
    },
  }
</script>

<style lang="scss" scoped>
.picture-card{
  width: 100px;
  height: 100px;
}
</style>
