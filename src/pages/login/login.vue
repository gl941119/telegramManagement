<template>
  <el-container >
    <el-header class="bierinc-header">
      <el-row class="bierinc-header-left">
        <el-col :span="8"
                class="bierinc-logo-content">
          <img src="../../assets/img/logo.png"
               alt="logo" style="width: 50px;height: 50px;">
          <div>币尔大数据</div>
        </el-col>
        <el-col :span="8"
                :offset="8"
                class="bierinc-lanuage">
          <div class="bierinc-lanuage-icon">
            <img src="../../assets/img/yuyan.png">
          </div>
          <el-dropdown class="bierinc-lanuage-drop"
                       @visible-change="handleChange">
                        <span class="el-dropdown-link">
                            选择语言
                            <i class="el-icon-arrow-down el-icon--right"
                               :class="{active: isActive}"></i>
                            <i class="el-icon-arrow-up el-icon--right"
                               :class="{active: !isActive}"></i>
                        </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>简体中文</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="login-container">
      <div class="login-container-content">
        <div class="login-container-content-left">
          <h3>欢迎进入币尔大数据管理后台</h3>
          <p>币尔大数据着力于AI+大数据挖掘，</p>
          <p>致力于为中国企业出海提供服务，</p>
          <p>凭借着AI+大数据技术背景和丰富的海外行业经验，</p>
          <p>为企业开拓海外流量提供全套技术解决方案。</p>
        </div>
        <el-form :model="formLabelAlign"
                 label-position="left"
                 label-width="100px"
                 class="login-container-content-right">
          <h3>用户登录</h3>
          <el-form-item label="用户名">
            <el-input v-model="formLabelAlign.name"
                      placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="登录密码">
            <el-input type="password"
                      v-model="formLabelAlign.password"
                      @keyup.enter.native="submitForm"
                      placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-checkbox-group v-model="formLabelAlign.type">
            <el-checkbox label="《币尔大数据产品注意事项及法律声明》"
                         name="type"></el-checkbox>
          </el-checkbox-group>
          <el-form-item class="login-container-content-right-btn">
            <el-button type="primary"
                       :loading="loading"
                       @click="submitForm">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-container>
  </el-container>
</template>
<script>
  import Request from '../../utils/require';
  import Cache from '../../utils/cache';
  export default {
    data() {
      return {
        isActive: true,
        formLabelAlign: {
          name: '',
          password: '',
          type: true
        },
        loading: false
      };
    },
    methods: {
      handleChange(flag) {
        this.isActive = flag ? false : true;
      },
      submitForm() {//提交
        if (this.formLabelAlign.type) {
          if (this.formLabelAlign.name && this.formLabelAlign.password) {
            let { name: username, password } = this.formLabelAlign;
            this.loading = true;
            let params = {
              url: 'Login',
              data: {
                username,
                password,
                sequence: 1 // login
              }
            };
            Request.requestHandle(
              params,
              res => {
                this.loading = false;
                this.successHandle(res.data);
              },
              null,
              () => {
                this.loading = false;
              },
              res => {
                this.loading = false;
                if (res.data.data && res.data.data.iscontinue) {
                  this.$confirm(
                    '该账户已在别处登录, 继续登录将导致他直接下线，是否继续?',
                    '提示',
                    {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }
                  )
                    .then(() => {
                      let paramsAgain = {
                        url: 'Login',
                        data: {
                          username,
                          password,
                          sequence: 2
                        }
                      };
                      Request.requestHandle(
                        paramsAgain,
                        res => {
                          this.successHandle(res.data);
                        }
                      );
                    })
                    .catch(() => {
                      this.$message({
                        type: 'info',
                        message: '已取消'
                      });
                    });
                }
              }
            );
          } else {
            this.$message({
              message: '用户名和密码不能为空',
              type: 'warning'
            });
          }
        } else {
          this.$message({
            message: '请先阅读注意事项和法律声明',
            type: 'warning'
          });
        }
      },
      successHandle(data) {
        if (data) {
          let { id, uid, username, token, type,permission } = data;
          this.$store.commit('setUserId', id);
          this.$store.commit('setUserUId', uid);
          this.$store.commit('setUserName', username);
          this.$store.commit('setToken', token);
          this.$store.commit('setUserType', type);
          this.$store.commit('setUserPermission', permission);
          Cache.setSession('token', token);
          Cache.setSession('username', username);
          Cache.setSession('userid', id);
          Cache.setSession('user_type', type);
          Cache.setSession('permission', permission);
          if (permission === '0') {
            this.$router.push({ name: 'super' });
          } else if(permission === '3'){
            this.$router.push({ name: 'index' });
          }
        } else {
          console.error('login error');
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../assets/css/global.scss';
  .login-container {
    height: calc(100vh - 60px);
    background: $basicColor;
    display: flex;
    justify-content: center;
    align-items: center;
    &-content {
      display: flex;
      width: 100%;
      justify-content: space-around;
      &-left {
        color: #fff;
        & > h3 {
          font-size: 32px;
          font-weight: 400;
          margin-bottom: 50px;
        }
        & > p {
          margin-bottom: 20px;
        }
      }
      &-right {
        padding: 30px;
        background: #fff;
        & > h3 {
          margin-bottom: 22px;
          font-weight: normal;
          font-size: 22px;
        }
        &-btn {
          margin: 10px 0 0 0;
          width: 100%;
        }
      }
    }
  }
</style>

