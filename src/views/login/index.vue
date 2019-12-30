<template>
  <div class="login-main">
    <div class="main-left">
      <svg-icon class="left-logo" icon-class="logo" />
      <p class="left-sign">Just Make Transmission Simple</p>
      <p v-show="lang==='zh'" class="left-sign1">Copyright ©  <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030502002644" target="_bank">粤ICP备10207960号</a></p>
      <div class="left-pic" />
    </div>
    <div class="main-right">
      <div class="tabEn" @click="tabLan()">
        <button v-show="lang==='en'">Zh</button>
        <button v-show="lang==='zh'">Ch</button>
      </div>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

        <div class="title-container">
          <h3 class="title">{{ $t('logoTitle') }}</h3>
        </div>

        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="密码登录" name="first">
            <el-form-item prop="username">
              <el-input
                ref="username"
                v-model="loginForm.username"
                prefix-icon="el-icon-user-solid"
                :placeholder="$t('login.account')"
                name="username"
                type="text"
                tabindex="1"
                auto-complete="on"
              />
            </el-form-item>

            <el-form-item prop="password">
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                prefix-icon="el-icon-info"
                :type="passwordType"
                :placeholder="$t('login.password')"
                name="password"
                tabindex="2"
                auto-complete="on"
              />
            </el-form-item>

          </el-tab-pane>
          <el-tab-pane label="短信登录" name="second">
            <el-form-item prop="username">
              <el-input
                ref="username"
                v-model="loginForm.username"
                prefix-icon="el-icon-user-solid"
                :placeholder="$t('login.account')"
                name="username"
                type="text"
                tabindex="1"
                auto-complete="on"
              />
            </el-form-item>
            <el-form-item prop="username">
              <el-input
                ref="username"
                v-model="loginForm.word"
                prefix-icon="el-icon-s-promotion"
                :placeholder="$t('login.verification')"
                name="username"
                type="text"
                tabindex="1"
                auto-complete="on"
                style="width:48.4%;"
              />
              <el-button type="primary" style="width:50%;" @click.prevent="removeDomain(domain)">{{ $t('login.obtain') }}</el-button>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>

        <el-button class="loginBntSty" type="primary" @click.native.prevent="handleLogin">{{ $t('login.loginbot') }}</el-button>

        <div class="toRegStyle">
          <p>{{ $t('login.register') }}</p>
          <p>{{ $t('login.restpassword') }}</p>
        </div>

      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    // 账号验证s
    const validateUsername = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error(this.$t('login.check.userEmpty')))
      } else {
        callback()
      }
    }
    // 密码验证
    const validatePassword = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error(this.$t('login.check.passwordEmpty')))
      } else {
        callback()
      }
    }
    return {
      passwordType: 'password',
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      activeName: 'first',
      lang: this.$store.getters.language
    }
  },
  created() {},
  mounted() {
  },
  methods: {
    // 登录
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('user/login', this.loginForm).then((e) => {
            this.$router.push({ path: this.redirect || '/' })
          }).catch(error => {
            if (error === '没有该用户') {
              this.$message({
                message: this.$t('login.check.userNotExist'),
                type: 'warning'
              })
            } else {
              this.$message({
                message: this.$t('login.passwordWrong'),
                type: 'warning'
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 显示密码按钮
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    // 登录方式切换
    handleClick(tab, event) {
      console.log(tab, event)
    },
    // 语言切换
    tabLan() {
      if (this.lang === 'zh') {
        this.lang = 'en'
      } else {
        this.lang = 'zh'
      }
      this.$i18n.locale = this.lang
      this.$store.dispatch('app/setLanguage', this.lang)
      this.$message({
        message: this.$t('successTab'),
        type: 'success'
      })
    }
  }
}
</script>
<style lang='scss' scoped>
// css样式
.login-main{
  width: 100%;
  height: 100vh;
  float: left;
  background: #ffffff;
  border-radius: 10px;
  .main-left{
    width: 60%;
    height: 100%;
    float: left;
    background: url('../../assets/img/loginbg1.jpg') no-repeat;
    background-size: 100% auto;
    position: relative;
    .left-logo{
      width: 300px;
      margin-left: -80px;
      margin-top: 30px;
    }
    .left-sign{
      position: absolute;
      bottom: 20px;
      left: 20px;
      width:auto;
      height:24px;
      font-size:16px;
      font-family:PingFangSC-Regular,PingFangSC;
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height:24px;
    }
    .left-sign1{
      position: absolute;
      bottom: 20px;
      right: 20px;
      height:24px;
      font-size:13px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(128,134,149,1);
      line-height:24px;
    }
    .left-pic{
      width: 70%;
      height: 80%;
      margin: 5% auto;
      background: url('../../assets/img/loginbg.png') no-repeat;
      background-size: 100% auto;
    }
  }
  .main-right{
    width: 40%;
    height: 100%;
    position: relative;
    overflow: hidden;
    .tabEn{
      text-align: right;
      margin-top: 20px;
      margin-right: 20px;
      button{
        border: none;
        color: #0F9EF1;
        font-weight: bold;
        background: none;
        margin-right: 30px;
      }
    }
    .login-form {
      width: 70%;
      max-width: 100%;
      overflow: hidden;
      background: #ffffff;
      padding: 50px;
      margin: 0 auto;
      margin-top: 10%;
      .el-tabs__item{
        color:rgba(50,59,77,1);
      }
      .hl-select{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 2px;
        color: #454545;
        line-height: 40px;
        margin-bottom: 22px;
        .el-button{
          border-radius: 2px;
        }
      }
      .title-container {
        position: relative;
        margin-bottom: 50px;
        .title {
          height:38px;
          font-size: 1.5rem;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:600;
          color:rgba(50,59,77,1);
          line-height:38px;
          text-align: left;
        }
      }
    }
    .loginBntSty{
      width: 100%;
      text-align: center;
    }
    .bots{
      position: absolute;
      bottom: 20px;
      height:24px;
      font-size:14px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(128,134,149,1);
      line-height:24px;
    }
    .toRegStyle{
      width: 100%;
      text-align: center;
      margin-top: 20vh;
      p{
        display: inline-block;
        height:22px;
        font-size:0.95rem;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(15,158,241,1);
        line-height:22px;
        margin: 0 10px;
      }
      p:hover{
        color: #454545;
      }
    }
  }
}
</style>
