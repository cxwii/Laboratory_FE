script<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header>
      <a href="/#/welcome"
        ><img src="../assets/logo.png" class="logo" @click="zhi1"
      /></a>
      <span>实验室固定资产管理系统</span>
      <el-popover
        placement="top-start"
        title="注意"
        trigger="hover"
        content="注销或刷新页面需重新登录"
        class="zhuxiao"
      >
        <el-button @click="logout" slot="reference">注销</el-button>
      </el-popover>
    </el-header>
    <!-- 主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="true"
          :router="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          :default-active="zhi"
        >
          <!-- 用户 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>用户</span>
            </template>
            <el-menu-item index="userlist">
              <i class="el-icon-menu"></i>
              <span>用户列表</span>
            </el-menu-item>
          </el-submenu>

          <!-- 器材 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-box"></i>
              <span>器材</span>
            </template>
            <el-menu-item index="qicailist">
              <i class="el-icon-tickets"></i>
              <span>器材列表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      zhi: this.$route.path,
      isCollapse: false
    }
  },
  created () {
    this.fuzhi()
  },
  methods: {
    logout () {
      this.$router.push('/login')
    },
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    zhi1 () {
      this.zhi = this.$route.path
    },
    fuzhi () {
      // console.log('输出1 :>> ', this.$route.query.name)
      this.loginForm = this.$route.query.name
    }
  }
}
</script>

<style lang="less" scoped>
// 布局
.home-container {
  height: 100%;
}
.el-header {
  display: flex;
  background-color: rgb(157, 212, 238);
  font-size: 18px;
  color: rgb(255, 255, 255);
  text-align: left;
  align-items: center;
}
.el-aside {
  background-color: #545c64;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: rgb(238, 243, 245);
}
// logo
.logo {
  margin-left: -10px;
  margin-right: 10px;
}
//注销
.zhuxiao {
  position: absolute;
  // top: 0%;
  right: 1%;
}
//折叠按钮
.toggle-button {
  background-color: #545c64;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
