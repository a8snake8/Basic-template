<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu avatar-container">
      <el-popover
        v-model="visible"
        placement="bottom-end"
        width="300"
      >
        <div class="infomation">
          <p>德玛西亚</p>
          <span>深圳市德信数据科技有限公司</span>
          <div class="hr" />
          <div class="flex">
            <span @click="$router.push('/acount/acountInfo')">用户信息</span>
            <span @click="$router.push('/acount/acountPwd')">修改密码</span>
            <span @click="$router.push('/acount/acountFath')">上级用户</span>
            <span @click="logout">退出登录</span>
          </div>
        </div>
        <div slot="reference" class="avatar-wrapper">
          <img :src="user +'?imageView2/1/w/80/h/80'" class="user-avatar">
          <p class="name">德玛西亚</p>
          <i class="el-icon-caret-bottom" />
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
var userImage = require('../../assets/image/user.png')

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      user: userImage,
      lang: this.$store.getters.language,
      visible: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ]),
    language() {
      return this.$store.getters.language
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    tabLan() {
      console.log('sss' + this.$store.getters.language)
      if (this.lang === 'zh') {
        this.lang = 'en'
      } else {
        this.lang = 'zh'
      }
      this.$i18n.locale = this.lang
      this.$store.dispatch('app/setLanguage', this.lang)
      const { fullPath } = this.$route
      this.$router.replace({
        path: '/redirect' + fullPath
      })
      this.$message({
        message: this.$t('successTab'),
        type: 'success'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #243264;
  box-shadow:0px 2px 8px 0px rgba(0,0,0,0.1);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }
    .avatar-wrapper {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-right: 20px;
      height: 50px;

      .user-avatar {
        width: 24px;
        height: 24px;
        border-radius: 10px;
        margin-right: 6px;
      }

      .name{
        color: #FFFFFF;
        cursor: pointer;
        display: inline-block;
        height: 24px;
        line-height: 24px;
        margin-right: 4px;
        font-size:14px;
      }

      .el-icon-caret-bottom {
        font-size: 12px;
        color: #eeeeee;
      }
    }
  }
}
</style>
