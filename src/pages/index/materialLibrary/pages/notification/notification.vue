<template>
  <el-card class="box-card">
    <!--搜索-->
    <div style='overflow: hidden;text-align: left'>
      <el-form :inline="true" :model="srearchForm" class="demo-form-inline">
        <el-form-item label="关键词:">
          <el-input v-model="srearchForm.input" placeholder="请输入素材标题"></el-input>
        </el-form-item>
        <el-form-item label="素材类型：">
          <div>
            <el-radio v-model="radio" label="1" border>群</el-radio>
            <el-radio v-model="radio" label="2" border>个人</el-radio>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="requestData">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="text-align: right">
      <el-button type="primary" @click="dialogOpenGenre">添加</el-button>
    </div>
    <!--弹窗1-->
    <el-dialog title="添加" :visible.sync="dialogGenre" width="300px">
      <p>选择上传素材类型：</p>
      <el-form :model="GenreForm">
        <el-form-item label="文字" :label-width="formLabelWidth">
          <el-switch
            v-model="value1"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-switch
            v-model="value2"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item label="视频" :label-width="formLabelWidth">
          <el-switch
            v-model="value3"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!--<el-button @click="dialogFormVisible = false">取 消</el-button>-->
        <el-button type="primary" @click="dialogNextBtn">下一步</el-button>
      </div>
    </el-dialog>
    <!--弹窗2-->
    <el-dialog title="添加" :visible.sync="dialogUpload" width="500px">
      <el-form :model="uploadForm">
        <el-switch
          v-model="uploadForm.materialType"
          active-text="群"
          inactive-text="个人">
        </el-switch>
        <el-form-item label="标题">
          <el-input v-model="uploadForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" v-if="value1">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="uploadForm.content"
          >
          </el-input>
        </el-form-item>
        <!--图片上传-->
        <div style="margin-top: 50px;" v-if="value2">
          <el-upload
            class="upload-demo mt30"
            :action="uploadImgUrl"
            :headers="uploadHeader"
            :data="uploadData"
            accept=".jpg,.jpeg,.png,.pdf"
            :limit='3'
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="editImgUploadSuccess"
            :file-list="fileList2"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </div>
        <!--视频上传-->
        <div style="margin-top: 50px;" v-if="value3">
          <el-upload
            ref="uploadVideo"
            class="upload-dem mt30"
            :action="uploadVideo"
            :headers="uploadHeader"
            :data="uploadData"
            accept=".mp3,.mp4,.avi"
            :on-success="editvideoUploadSuccess"
            :limit='1'
          >
            <el-button size="small" type="primary">上传视频</el-button>
            <div slot="tip" class="el-upload__tip">只能上传mp3/mp4/avi文件，且不超过100MB</div>
          </el-upload>
          <div v-show="uploadForm.videoUrl">
            <video :src="uploadForm.videoUrl" controls class="video" style="vertical-align: middle;margin-right: 10px;"></video>
            <el-button type="primary" @click="uploadForm.videoUrl=undefined" style="">删除</el-button>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpload = false">取 消</el-button>
        <el-button type="primary" @click="editMaterial" v-if="editStatus">修改</el-button>
        <el-button type="primary" @click="addMaterial" v-else>确 定</el-button>
      </div>
    </el-dialog>
    <!--消息-->
    <el-alert
      :title="alertMessage"
      type="info"
      show-icon
      class="mt20">
    </el-alert>
    <!--表格-->
    <el-table :data="tableData" ref="multipleTable" style="width: 100%"
              class="mt30" @select="tableSelect"
              @selection-change="handleSelectionChange"
              :header-cell-style="{'text-align':'center',background:'#f3f3f3'}">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column label="素材类型" >
        <template slot-scope="scope">
          <p v-if="scope.row.materialType==1">群</p>
          <p v-if="scope.row.materialType==2">个人</p>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="文本" width="300"></el-table-column>
      <el-table-column label="图片" width="500">
        <template slot-scope="scope">
          <img :src="scope.row.photo1Url" alt="" class="photo">
          <img :src="scope.row.photo2Url" alt="" class="photo">
          <img :src="scope.row.photo3Url" alt="" class="photo">
        </template>
      </el-table-column>
      <el-table-column label="视频" width="300">
        <template slot-scope="scope">
          <video :src="scope.row.videoUrl" controls v-if="scope.row.videoUrl" class="video"></video>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="素材状态">
        <template slot-scope="scope">
          <p style="color: #2ec991" v-if="scope.row.status==1">使用中</p>
          <p style="color: #6E7D92" v-else>已停用</p>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="dialogEditMaterialBtn(scope.row)">编辑</el-button>
          <el-button type="text" @click="updateMaterialStatus(scope.row,0)" v-if="scope.row.status==1">停用
          </el-button>
          <el-button type="text" @click="updateMaterialStatus(scope.row,1)" v-else>启用</el-button>
          <el-button type="text" @click="deleteMaterial(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->

    <com-pages :total="total" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></com-pages>
  </el-card>
</template>

<script>
  import Cache from '@/utils/cache'
  import Request from '@/utils/require'
  import Config from '@/utils/config'


  export default {

    name: "notification",

    data() {
      return {
        userid: Cache.getSession("userid")||this.$store.state.uid,
        username: Cache.getSession("username")||this.$store.state.username,
        titleName: "素材库",
        alertMessage: '已选择 0 项',
        page: 1,//分页
        pageSize: 10,
        total: 0,
        dialogEditMaterial: false,
        radio:null,
        srearchForm: {
          input: undefined
        },
        tableData: [],
        dialogGenre: false,
        GenreForm: {},
        value1: false,
        value2: false,
        value3: false,
        formLabelWidth: '120px',
        dialogUpload: false,
        uploadForm: {
          title: undefined,
          content: undefined,
          photo1Url: undefined,
          photo2Url: undefined,
          photo3Url: undefined,
          videoUrl: undefined,

        },
        uploadImgUrl: Config.uploadImg,
        uploadVideo: Config.uploadVideo,
        uploadHeader: {
          token: this.$store.state.token || Cache.getSession('token')
        },
        uploadData: {
          uid: Cache.getSession("userid")
        },
        editStatus: false,
        fileList2: []
      }
    },
    mounted() {
      this.requestData()
    },
    watch: {
      dialogUpload() {
        this.requestData()
      }
    },
    methods: {
      //页面Data
      requestData() {
        Request.requestHandle({
          url: 'queryMaterialData',
          data: {
            page: this.page,
            pageSize: this.pageSize,
            uid: this.userid,
            title: this.srearchForm.input,
            materialType:this.radio
          },
          type: 'get'
        }, res => {
          this.tableData = res.data;
          this.total = res.total
        })
      },
      //打开编辑弹窗
      dialogEditMaterialBtn(row) {
        console.log(row);
        this.editStatus = true;
        this.dialogUpload = true;
        this.value1 = true;
        this.value2 = true;
        this.value3 = true;

        // this.uploadForm.materialType = row.materialType==2 ? true:false;
        // console.log(row)
        this.uploadForm = row;
        let {
          photo1Url,
          photo2Url,
          photo3Url
        } = row;
        let arr = [photo1Url, photo2Url, photo3Url].filter(item => {
          return item
        });
        this.fileList2 = arr.map(item => {
          return {
            name: "已上传图片.jpeg",
            status: "success",
            url: item,
          }
        })
      },
      //编辑弹窗修改请求
      editMaterial() {
        // console.log(this.uploadForm)
        let {
          id,
          title,
          content,
          videoUrl,
          materialType
        } = this.uploadForm;

        let photoUrl = {
          photo1Url: undefined,
          photo2Url: undefined,
          photo3Url: undefined
        };

        this.fileList2.forEach((item, index) => {
          photoUrl['photo' + (index + 1) + 'Url'] = item.url
        });
        Request.requestHandle({
          url: 'updateMaterial',
          data: {
            uid: this.userid,
            id,
            title,
            content,
            photo1Url: photoUrl.photo1Url,
            photo2Url: photoUrl.photo2Url,
            photo3Url: photoUrl.photo3Url,
            videoUrl,
            materialType:materialType==2? true:false,
          },
          type: 'post',
          flag: true
        }, res => {
          this.dialogUpload = false;
          this.editStatus = false;
          this.uploadForm = {
            title: undefined,
            content: undefined,
            videoUrl: undefined,
            materialType:false,
          };
          this.fileList2 = []
        })

      },

      //打开下一步弹窗
      dialogOpenGenre() {
        this.dialogGenre = true;
        this.value1 = false;
        this.value2 = false;
        this.value3 = false;
      },
      // 下一步弹窗确定按钮
      dialogNextBtn() {
        this.dialogGenre = false;
        this.dialogUpload = true;
      },
      //添加素材
      addMaterial() {
        let {
          title,
          content,
          videoUrl,
          materialType
        } = this.uploadForm;

        let photoUrl = {
          photo1Url: undefined,
          photo2Url: undefined,
          photo3Url: undefined
        };
        this.fileList2.forEach((item, index) => {
          photoUrl['photo' + (index + 1) + 'Url'] = item.response.data
        });
        if (!title) {
          this.$message({
            message: '请输入标题',
            type: 'warning'
          });
          return;
        }
        Request.requestHandle({
          url: 'addMaterial',
          data: {
            "uid": this.userid,
            title,
            content,
            photo1Url: photoUrl.photo1Url,
            photo2Url: photoUrl.photo2Url,
            photo3Url: photoUrl.photo3Url,
            videoUrl,
            materialType: materialType == false ? 2:1

          },
          type: 'post',
          flag: true
        }, res => {
          this.dialogUpload = false;
          this.value1 = false;
          this.value2 = false;
          this.value3 = false;
          this.uploadForm = {
            title: undefined,
            content: undefined,
            videoUrl: undefined,
            materialType:false
          };
          this.fileList2 = [];
          this.requestData()
        })
      },
      //停用
      updateMaterialStatus(row, type) {
        Request.requestHandle({
          url: 'updateMaterialStatus',
          data: {
            "id": row.id,
            "status": type
          },
          type: 'post',
          flag: true
        }, res => {
          if (res.success == 1) {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.requestData()
          }
        })
      },
      //删除
      deleteMaterial(row) {
        let ids = [];
        ids.push(row.id);
        Request.requestHandle({
          url: 'deleteMaterial',
          data: {
            ids,
            uid: this.userid
          },
          type: 'post',
          flag: true
        }, res => {
          if (res.success == 1) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.requestData()
          }

        })
      },
      //列表勾选项
      handleSelectionChange(val) {
        this.multipleSelection = val.length;
        this.alertMessage = `已选择${val.length}项`
        // this.CheckoutForm.id = val.length;
      },
      //分页数
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.requestData()
      },
      //翻页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val;
        this.requestData()
      },
      tableSelect(selection, row) {//勾选
        let cen = selection.length.toString();
        this.alertMessage = `已选择 ${cen} 项`
      },

      handleEdit(index, row) {
        // console.log(index, row);
      },

      editImgUploadSuccess(response, file, fileList) {
        this.fileList2 = fileList
      },
      handleRemove(file, fileList) {
        // console.log('Remove=>', file, fileList);
        this.fileList2 = fileList
      },
      handlePreview(file) {
        // console.log('Preview=>', file);
      },
      editvideoUploadSuccess(res) {
        this.uploadForm.videoUrl = res.data
      },

    },


  }
</script>

<style scoped>

</style>
