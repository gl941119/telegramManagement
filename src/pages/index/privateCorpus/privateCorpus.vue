<template>
  <el-container>
    <el-header class="header">
      <com-header :titleName="titleName"></com-header>
    </el-header>
    <el-main>
      <el-card class="box-card">
        <!--搜索-->
        <div style='overflow: hidden;'>
          <el-form :inline="true" :model="srearchForm" class="demo-form-inline">
            <!--<el-form-item label="问答匹配度：" style="float: left">-->
              <!--<el-input v-model="srearchForm.matching" size="mini" style="width: 52px"></el-input>-->
              <!--%-->
            <!--</el-form-item>-->
            <el-form-item label="语料查找：" style="float: left;margin-left: 100px;">
              <el-input v-model="srearchForm.find" size="mini"></el-input>
            </el-form-item>
            <el-form-item style="float: left">
              <el-button type="primary" @click="requestCorpus" size="mini">搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!--新增语料-->
        <div style="text-align: right;">
          <el-button type="info" size="mini" @click="dialogAddCorpus = true">新增语料
          </el-button>
          <el-button type="info" size="mini" @click="delCorpus('more')">批量删除
          </el-button>
        </div>
        <!--新增语料弹窗-->
        <el-dialog title="新增语料" :visible.sync="dialogAddCorpus" width="600px">
          <el-form :model="addCorpusform" :label-position="labelPosition">
            <el-form-item label="问题:">
              <el-input v-model="addCorpusform.problem" style="width: 400px"></el-input>
            </el-form-item>
            <el-form-item label="答案:">
              <el-radio-group v-model="btnPosition" size="mini">
                <el-radio-button plain size="mini" label="1">文字</el-radio-button>
                <el-radio-button plain size="mini" label="2">图片</el-radio-button>
                <el-radio-button plain size="mini" label="3">视频</el-radio-button>
              </el-radio-group>
              <div>
                <el-input v-if="btnPosition==1" v-model="addCorpusform.content"
                          style="width: 400px;margin-left: 39px"   type="textarea" :rows="4"></el-input>
                <!--图片上传-->
                <el-upload
                  class="avatar-uploader"
                  :action="uploadImgUrl"
                  :show-file-list="false"
                  :headers="uploadHeader"
                  :data="uploadData"
                  accept=".jpg,.jpeg,.png,.pdf"
                  :on-success="ImgUploadSuccess"
                  v-if="btnPosition==2"
                >
                  <img v-if="addCorpusform.photoUrl" :src="addCorpusform.photoUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <!--视频上传-->
                <el-upload
                  class="upload-dem"
                  :action="uploadVideo"
                  :headers="uploadHeader"
                  :data="uploadData"
                  :before-upload="beforeAvatarUpload"
                  accept=".mp3,.mp4,.avi"
                  :on-success="videoUploadSuccess"
                  :show-file-list="false"
                  v-if="btnPosition==3"
                >
                  <video v-if="addCorpusform.videoUrl" :src="addCorpusform.videoUrl"
                         style="width: 400px;height: 300px"></video>
                  <el-button v-else size="small" type="primary">上传视频</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传mp3/mp4/avi文件，且不超过100MB</div>
                </el-upload>
              </div>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogAddCorpus = false">取 消</el-button>
            <el-button type="primary" @click="addCorpus">确 定</el-button>
          </div>
        </el-dialog>
        <p style="text-align: left">共搜索到{{total}}条数据</p>
        <!--消息-->
        <el-alert
          :title="alertMessage"
          type="info"
          show-icon
          class="mt20">
        </el-alert>
        <!--表格-->
        <el-table :data="tableData" ref="multipleTable" style="width: 100%"
                  class="mt30" @selection-change="tableSelect"
                  :header-cell-style="{'text-align':'center',background:'#f3f3f3'}"
        >
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="problem" label="问题"></el-table-column>
          <el-table-column prop="content" label="答案"></el-table-column>
          <el-table-column prop="updateTime" label="修改时间"></el-table-column>
          <el-table-column label="语料状态" :render-header="renderHeader">
            <template slot-scope="scope">
              <p v-if="scope.row.status==1"><i class="el-icon-success" style="color: #2ec991"></i>使用中</p>
              <p v-else><i class="el-icon-error"></i>已停用</p>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="editCorpusBtn(scope.row)">编辑</el-button>
              <el-button type="text" @click="startAndStopCorpusBtn(scope.row,0)" v-if="scope.row.status==1">停用
              </el-button>
              <el-button type="text" @click="startAndStopCorpusBtn(scope.row,1)" v-else>启用</el-button>
              <el-button type="text" @click="delCorpus('single',scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--编辑弹窗-->
        <el-dialog title="编辑语料" :visible.sync="dialogEditCorpus" width="600px">
          <el-form :model="editCorpusForm" :label-position="labelPosition">
            <el-form-item label="问题:">
              <el-input v-model="editCorpusForm.problem" style="width: 400px"></el-input>
            </el-form-item>
            <el-form-item label="答案:">
              <el-radio-group v-model="btnPosition" size="mini">
                <el-radio-button plain size="mini" label="1">文字</el-radio-button>
                <el-radio-button plain size="mini" label="2">图片</el-radio-button>
                <el-radio-button plain size="mini" label="3">视频</el-radio-button>
              </el-radio-group>
              <div>
                <el-input v-if="btnPosition==1" v-model="editCorpusForm.content"
                          style="width: 400px;margin-left: 39px"  type="textarea" :rows="4"></el-input>
                <!--图片上传-->
                <el-upload
                  class="avatar-uploader"
                  :action="uploadImgUrl"
                  :show-file-list="false"
                  :headers="uploadHeader"
                  :data="uploadData"
                  accept=".jpg,.jpeg,.png,.pdf"
                  :on-success="editImgUploadSuccess"
                  v-if="btnPosition==2"
                >
                  <img v-if="editCorpusForm.photoUrl" :src="editCorpusForm.photoUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <!--视频上传-->
                <video v-if="btnPosition==3" :src="editCorpusForm.videoUrl" controls
                       style="width: 400px;height: 300px"></video>
                <el-upload
                  class="upload-dem"
                  :action="uploadVideo"
                  :headers="uploadHeader"
                  :data="uploadData"
                  :before-upload="beforeAvatarUpload"
                  accept=".mp3,.mp4,.avi"
                  :on-success="editvideoUploadSuccess"
                  :show-file-list="false"
                  v-if="btnPosition==3"
                >
                  <el-button v-if="btnPosition==3" size="small" type="primary">上传视频</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传mp3/mp4/avi文件，且不超过100MB</div>
                </el-upload>
                <!--<img v-if="btnPosition==2" :src="editCorpusForm.photoUrl" alt="">-->
              </div>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogEditCorpus = false">取 消</el-button>
            <el-button type="primary" @click="updataCourpus">确 定</el-button>
          </div>
        </el-dialog>
        <!--分页-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          class="mt30">
        </el-pagination>
      </el-card>
    </el-main>
  </el-container>
</template>
<script>
  import Cache from '@/utils/cache'
  import Request from '@/utils/require'
  import Config from '@/utils/config'
  import  ComHeader from '@/components/header'


  export default {
    name: "service",
    components:{
      ComHeader
    },
    data() {
      return {
        userid: Cache.getSession("userid"),
        username: Cache.getSession("username"),
        titleName:'语料库',
        value1: false,
        alertMessage: '已选择 0 项',
        page: 1,//分页
        pageSize: 10,
        total: undefined,
        multipleSelection: [],
        srearchForm: {
          matching: undefined,
          find: undefined
        },
        addCorpusform: {
          problem: undefined,
          content: undefined,
          photoUrl: undefined,
          videoUrl: undefined
        },
        tableData: null,
        dialogAddCorpus: false,
        btnPosition: '1',
        labelPosition: 'left',
        uploadImgUrl: Config.uploadImg,
        uploadVideo: Config.uploadVideo,
        imageUrl: undefined,
        uploadHeader: {
          token: this.$store.state.token || Cache.getSession('token')
        },
        uploadData: {
          uid: Cache.getSession("userid")
        },
        dialogEditCorpus: false,
        editCorpusForm: {
          problem: undefined,
          content: undefined,
          photoUrl: undefined,
          videoUrl: undefined
        }
      }
    },
    created() {
      this.requestCorpus()
    },
    methods: {
      //请求语料库数据
      requestCorpus() {
        let params = {
          url: 'queryCorpusData',
          data: {
            page: this.page,
            pageSize: this.pageSize,
            uid: this.userid,
            searchKey: this.srearchForm.find,
            compatibility: this.srearchForm.matching
          },
          type: 'get'
        };
        Request.requestHandle(params, res => {
          this.tableData = res.data;
          this.total = res.total
        })
      },
      //根据id获取语料库内容详情
      addCorpus() {
        let {
          problem,
          content,
          photoUrl,
          videoUrl
        } = this.addCorpusform;

        if (!(problem && content)) {
          this.$message({
            message: '问题和答案必填哈',
            type: 'warning'
          });
          return;
        }
        let params = {
          url: 'addCorpus',
          data: {
            uid: this.userid,
            problem,
            content,
            photoUrl,
            videoUrl
          },
          type: 'post',
          flag: true
        };
        Request.requestHandle(params, res => {
          this.dialogAddCorpus = false;
          this.requestCorpus();
          this.addCorpusform = {
            problem: undefined,
            content: undefined,
            photoUrl: undefined,
            videoUrl: undefined
          }
        })
      },
      //编辑语料btn
      editCorpusBtn(row) {
        this.dialogEditCorpus = true;
        Request.requestHandle({
          url: 'getCorpusContentMessage',
          data: {
            id: row.id
          },
          type: 'get'
        }, res => {
          let {id, problem, content, photoUrl, videoUrl} = res.data;
          this.editCorpusForm = {id, problem, content, photoUrl, videoUrl}
        })
      },
      //del语料btn
      delCorpus(type, row) {
        this.confirm().then(t=>{
          let ids = [];
          if (type == 'more') {
            if (this.multipleSelection.length != 0) {
              this.multipleSelection.forEach(item => {
                ids.push(item.id)
              })
            } else {
              this.$message({
                message: '至少一项',
                type: 'warning'
              });
              return
            }
          }
          if (type == 'single') {
            ids.push(row.id)
          }
          // console.log(ids.length)
          Request.requestHandle({
            url: 'delCorpus',
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
                type: 'suceess'
              });
              this.requestCorpus()
            }
          })
        }).catch(e=>{

        })

      },
      //停用
      startAndStopCorpusBtn(row, type) {
        Request.requestHandle({
          url: 'stopCorpus',
          data: {
            "id": row.id,
            "status": type
          },
          type: 'post',
          flag: true
        }, res => {
          this.requestCorpus()
        })
      },
      //弹窗里修改语料
      updataCourpus() {

        Request.requestHandle({
          url: 'updataCorpus',
          data: this.editCorpusForm,
          type: 'post',
          flag: true
        }, res => {
          if (res.success == 1) {
            this.dialogEditCorpus = false;
            this.$message({
              message: res.message,
              type: 'success'
            });
            this.requestCorpus()
          }

        })

      },
      //img上传
      ImgUploadSuccess(res, file) {
        // console.log(res, file)
        this.imageUrl = res.data;
        this.addCorpusform.photoUrl = res.data;
        this.$message({
          message: res.message,
          type: 'success'
        })
      },
      //video上传
      videoUploadSuccess(res, file) {
        // console.log(res, file)
        this.addCorpusform.videoUrl = res.data;
        this.$message({
          message: res.message,
          type: 'success'
        })
      },
      //img上传
      editImgUploadSuccess(res, file) {
        // console.log(res, file)

        this.editCorpusForm.photoUrl = res.data;
        this.$message({
          message: res.message,
          type: 'success'
        })
      },
      //video上传
      editvideoUploadSuccess(res, file) {
        // console.log(res, file)
        this.editCorpusForm.videoUrl = res.data;
        this.$message({
          message: res.message,
          type: 'success'
        })
      },
      //视频上传大小限制
      beforeAvatarUpload(file) {
        // console.log(file)
        // const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 100;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        if (!isLt2M) {
          this.$message.error('上传大小不能超过 100MB!');
        }
        return isLt2M;
      },
      //分页数
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.requestCorpus()
      },
      //翻页
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.page = val;
        this.requestCorpus()
      },
      //勾选
      tableSelect(selection, row) {
        let cen = selection.length.toString();
        this.alertMessage = `已选择 ${cen} 项`;
        this.multipleSelection = selection
      },
      handleCommand() {
        Cache.removeSession('username');
        Cache.removeSession('token');
        Request.requestHandle({
          url: 'outLogin',
          data: {
            uid: this.userid
          },
          type: 'post'
        }, res => {
          this.$router.push({
            name: 'login'
          });
        })
      },
      //列表勾选项
      handleSelectionChange(val) {
        this.CheckoutForm.id = val.length;
      },
      //表头图标
      renderHeader(h) {
        return (
          < div >
          < span > 语料状态 < /span>
          < i class= 'el-icon-tickets' > < /i>
          < /div>
      )
      },

    }
  }
</script>

<style lang="scss" scoped>
  .el-container {
    background: #f4f4f4;
  }

  .header {
    background: white;
    height: 100px;
    line-height: 50px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    &-left:hover {
      color: rgb(0, 171, 234);
    }
    &-left {
      float: left;
      font-size: 20px;
    }
    &-right {
      float: right;
    }
  }


</style>
