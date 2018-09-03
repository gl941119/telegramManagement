<template>
  <div>
    <el-dialog title="群消息推送" :visible.sync="dialogFormVisible" width="500px" style="text-align: left">
      <el-row>
        <el-col :span="6">
          <p>选择群组:</p>
        </el-col>
        <el-col :span="18">
          <el-select v-model="Value" placeholder="请选择">
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
          <com-materialupdate :type="'1'"></com-materialupdate>
        </el-col>
      </el-row>
      <el-row>

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
    watch: {
      Message: function (row) {
        this.getGroup(row)
      }
    },
    data() {
      return {
        radio: 1,
        options: [],
        Value: undefined,
        title: '附件上传',
        textarea: undefined
      }
    },
    methods: {
      getGroup(row) {
        if (!row.phone) return;
        Request.requestHandle({
          url: 'querygetAllGroupByUid',
          data: {
            uid: this.uid(),// 用户id
            mobile: row.phone,// 手机号
          },
          type: 'get',
        }, res => {
          if (res.success == 1) {
            this.options = res.data
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
