<template>
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
        content="注销需重新登录"
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
          <el-submenu index="1"  :disabled='qx1'>
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>用户</span>
            </template>
            <el-menu-item index="userlist">
              <i class="el-icon-menu"></i>
              <span>用户列表</span>
            </el-menu-item>
            <el-menu-item index="quanxian">
              <i class="el-icon-s-tools"></i>
              <span>权限分配</span>
            </el-menu-item>
          </el-submenu>

          <!-- 器材 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-box"></i>
              <span>器材</span>
            </template>
            <el-menu-item index="qicailist" :disabled='qx'>
              <i class="el-icon-tickets"></i>
              <span>器材管理</span>
            </el-menu-item>
            <el-menu-item index="qicaijieyue">
              <i class="el-icon-sold-out"></i>
              <span>器材借用</span>
            </el-menu-item>
            <el-menu-item index="jieyuelist">
              <i class="el-icon-sell"></i>
              <span>器材归还</span>
            </el-menu-item>
          </el-submenu>

          <!-- 数据 -->
          <!-- <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-data"></i>
              <span>数据</span>
            </template>
            <el-menu-item index="jhsj">
              <i class="el-icon-refresh"></i>
              <span>借还数据</span>
            </el-menu-item>
            <el-menu-item index="htsj">
              <i class="el-icon-set-up"></i>
              <span>后台数据</span>
            </el-menu-item>
          </el-submenu> -->

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
      zhi: '',
      isCollapse: false,
      qx: true,
      qx1: true
    }
  },
  created () {
    this.fuzhi()
    this.tiaohui()
    this.panduanquanxian()
    // this.zhi = this.$route.path
  },
  methods: {
    logout () {
      this.$router.push('/login')
      sessionStorage.clear()
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
    },
    tiaohui () {
      // console.log('object :>> ', this.$route.path)
      if (this.$route.path !== '/welcome') { this.$router.push('/welcome') }
    },
    panduanquanxian () {
      if (String(window.sessionStorage.getItem('quan')) === '超级管理员') {
        this.qx1 = false
        this.qx = false
      } else {
        if (String(window.sessionStorage.getItem('quan')) === '管理员') {
          this.qx = false
        }
      }
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
