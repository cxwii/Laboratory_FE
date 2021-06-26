<template>
  <div class="background">
    <!-- 登录表单 -->
      <el-form
        :class="[form, zhuan]"
        label-position=top
        ref="loginFormRef"
        label-width="120px"
        :model="loginForm"
        :rules="loginFormRules"
        :hide-required-asterisk="true"
        @keyup.enter.native="login()"
      >

        <!-- 标题 -->
        <div class="biaoti">实验室固定资产管理系统</div>

        <!-- 账号 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user"
            @focus="dingzhi"
            @blur="kaishi"
          ></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            prefix-icon="el-icon-lock"
            @focus="dingzhi"
            @blur="kaishi"
          ></el-input>
        </el-form-item>

        <!-- 登录按钮 -->
        <el-form-item class="bianju">
          <el-button @click="login">登录</el-button>
          <el-button @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    <!-- 3d球体 -->
    <section :class="bianhuacolor">
      <div class="d1"></div>
      <div class="d2"></div>
      <div class="d3"></div>
      <div class="d4"></div>
      <div class="d5"></div>
      <div class="d6"></div>
      <div class="d7"></div>
      <div class="d8"></div>
      <div class="d9"></div>
      <div class="d10"></div>
    </section>

    <div class="guanyu">
      <a href="/#/guanyu">关于</a>|<a href="/#/zuozhe">作者</a>|<a href="/#/riqi">日期</a>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      // 翻面样式
      form: 'form',
      zhuan: '',
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 表单验证规则
      loginFormRules: {
        // 账号验证规则
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        // 密码验证规则
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ]
      },

      bianhuacolor: 'qiuti'
    }
  },

  // created () {
  //   this.fuzhi()
  // },

  methods: {
    // fuzhi () {
    //   console.log('输出 :>> ', this.loginForm)
    // },
    async login () {
      const { data: res } = await this.$http.post('queryUser', this.loginForm)
      if (this.loginForm.username === '' && this.loginForm.password === '') {
        this.$message.error('账号或密码为空')
      } else {
        if (res.status === 200) {
          this.$message.success('登录成功！')
          this.$router.push({ path: '/home', query: { name: JSON.stringify(this.loginForm) } })
        } else {
          this.$message.error('账号或密码错误！')
          this.resetLoginForm()
        }
      }
    },

    resetLoginForm () {
      const that = this
      this.zhuan = 'zhuan'
      setTimeout(function () {
        that.loginForm.username = ''
        that.loginForm.password = ''
      }, 750)
      setTimeout(function () { that.zhuan = '' }, 1000)
    },

    dingzhi () {
      console.log('dingzhi')
      this.bianhuacolor = 'qiuti2'
    },
    kaishi () {
      console.log('kaishi')
      this.bianhuacolor = 'qiuti'
    },
    ceshi () {
      console.log('父组件方法 :>> ')
    }
  }
}
</script>

<style lang="less" scoped>
.background {
  //背景颜色大小
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    to bottom right,
    rgb(179, 183, 185),
    rgb(144, 206, 235)
  );
}
//登录表单大小位置
.form {
  width: 18%;
  height: 18%;
  position: absolute;
  top: 10%;
  right: 5%;
}
//登录表单的反面功能
.zhuan {
  animation: fanmian 1s linear;
}
//登录按钮边距
.bianju {
  display: flex;
  justify-content: space-between;
}
//标题字体
.biaoti {
  // position: absolute;
  // top:2%;
  // right: 2%;
  margin-bottom: 15px;
  font-family: Microsoft Yahei;
  font-size: 25px;
  text-align: center;
}
// 杂项
.guanyu {
  position: absolute;
  bottom: 1%;
  right: 1%;
  color: rgb(255, 255, 255);
  font-size: 5px;
}
a:link {
  color: rgb(255, 255, 255);
}
a:visited {color: rgb(255, 255, 255);}
a {
  text-decoration: none;
}
//3d球体
@keyframes rotate3d {
  0% {
    transform: rotateZ(45deg) rotatex(0deg) rotateY(0deg);
  }
  50% {
    transform: rotateZ(45deg) rotatex(360deg) rotateY(360deg);
  }
  100% {
    transform: rotateZ(45deg) rotatex(0deg) rotateY(0deg);
  }
}
//反面用的
@keyframes fanmian {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}
.qiuti {
  box-sizing: border-box;
  width: 200px;
  height: 200px;
  position: absolute;
  left: 3%;
  top: 5%;
  transform-style: preserve-3d;
  animation: rotate3d 20s linear infinite;
}
.qiuti2 {
  box-sizing: border-box;
  width: 200px;
  height: 200px;
  position: absolute;
  left: 3%;
  top: 5%;
  transform-style: preserve-3d;
  animation: rotate3d 20s linear infinite;
  animation-play-state: paused;
}
section div {
  width: 200px;
  height: 200px;
  position: absolute;
  border-radius: 100%;
  border: 1px rgb(0, 0, 0) solid;
}
.d1 {
  transform: rotatex(36deg);
}
.d2 {
  transform: rotatex(72deg);
}
.d3 {
  transform: rotatex(108deg);
}
.d4 {
  transform: rotatex(144deg);
}
.d5 {
  transform: rotatex(180deg);
}
.d6 {
  transform: rotatey(36deg);
}
.d7 {
  transform: rotatey(72deg);
}
.d8 {
  transform: rotatey(108deg);
}
.d9 {
  transform: rotatey(144deg);
}
.d10 {
  transform: rotatey(180deg);
}
</style>
