<template>
  <div>
    <!-- 面包屑导航区 -->
    <div class="shangmian">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="mianbaoxie">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
      </el-breadcrumb>
      <img src="../assets/button/zhuanhuan.png" class="imgzh" @click="xuanzhuan">
    </div>

    <!-- 双面卡片视图 -->
    <div :class="[sandi, fanfuzhuan]">
      <!-- 正面 -->
      <el-card class="box-card, xuanzheng1">
        <div slot="header" :class="[clearfix, juzhong]">
          <span><el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar></span>
          <span class="span1">{{ this.mizi }}</span>
          <span>你好,</span>
          <span>你的权限为：</span>
          <span class="span2">{{ this.quanxian }}</span>
        </div>
        <!-- 功能按钮 -->
        <div class="neirong">
          <div class="div1">
            用户列表
          </div>
          <div class="div2">
            权限分配
          </div>
          <div class="div3">
            器材管理
          </div>
          <div class="div4">
            器材借用
          </div>
          <div class="div5">
            器材归还
          </div>
        </div>
      </el-card>
      <!-- 反面 -->
      <el-card class="box-card, xuanzheng2">
        <div slot="header" :class="[clearfix, juzhong]">
          <span><el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar></span>
          <span class="span1">{{ this.mizi }}</span>
          <span>你好,</span>
          <span>你的权限为：</span>
          <span class="span2">{{ this.quanxian }}</span>
          <img src="../assets/button/zhuanhuan.png" class="imgzh">
        </div>
        <!-- 走马灯 -->
        <div class="neirong" align="center">
          <el-carousel :interval="4000" type="card" height="300px">
            <el-carousel-item v-for="(item, index) in tupian" :key="index">
              <img class="imgwh, kuangdu" :src=item.url >
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      UserName: {
        username: '0'
      },
      userxishi: {},
      uname: '',
      mizi: '',
      quanxian: '',
      // 图片
      tupian: [
        { url: require('../assets/img/1.jpg') },
        { url: require('../assets/img/2.jpg') },
        { url: require('../assets/img/3.jpg') },
        { url: require('../assets/img/4.jpg') },
        { url: require('../assets/img/5.jpg') }
      ],
      // 头像和欢迎居中
      clearfix: 'clearfix',
      juzhong: 'juzhong',
      sandi: 'sandi',
      fanfuzhuan: '',
      qikong: true
    }
  },
  created () {
    this.fuzhi()
    // location.reload()

    // 废弃方法,这个应该在登录就调用方法把名字放进去session里然后再在这个页面获取，而不是用现在这种方法，要改的太多所以不想改了:----现在改了QAQ)

    // const that = this
    // setTimeout(function () { that.saceNavstate() }, 50)
    // setTimeout(function () { that.saceNavstate2() }, 100)
  },
  methods: {
    fuzhi () {
      this.mizi = window.sessionStorage.getItem('mizi')
      this.quanxian = window.sessionStorage.getItem('quan')

      // console.log('this.mizi >> ', this.mizi)
      // console.log('this.quanxian >> ', this.quanxian)

      // // JSON.parse这个方法就tm的是神--------JSON.stringify
      // this.loginForm = JSON.parse(
      //   this.$parent.$parent.$parent.$parent.$data.loginForm
      // )
      // this.UserName.username = this.loginForm.username

      // // console.log('this.username :>> ', JSON.stringify(this.UserName))

      // const { data: res } = await this.$http.post(
      //   'queryUserListjiqu',
      //   this.UserName
      // )
      // this.userxishi = res
      // this.uname = res.data.rows[0].uname
      // this.quanxian = res.data.rows[0].uid

      // // console.log('输出1 :>> ', this.userxishi.data.rows[0].uid)
      // // console.log('输出2 :>> ', this.quanxian)

      // if (this.quanxian === '0') {
      //   this.quanxian = '普通用户'
      // }
      // if (this.quanxian === '1') {
      //   this.quanxian = '管理员'
      // }
      // if (this.quanxian === '2') {
      //   this.quanxian = '超级管理员'
      // }
    },
    xuanzhuan () {
      this.qikong = !this.qikong
      if (this.qikong) {
        this.fanfuzhuan = 'fanfuzhuaned'
      } else {
        this.fanfuzhuan = 'fanfuzhuan'
      }
    }

    // 废弃方法别动了

    // // 保存登录信息。在session中
    // saceNavstate () {
    //   var mizi = this.uname
    //   window.sessionStorage.setItem('mizi', mizi)
    // },
    // // 拿到session中的名字
    // saceNavstate2 () {
    //   this.mizi = window.sessionStorage.getItem('mizi')
    // }
  }
}
</script>

<style lang="less" scoped>
//面包屑导航栏
.mianbaoxie {
  margin-bottom: 15px;
}
//头部
.span1 {
  font-family: STZhongsong;
}
.span2 {
  color: rgb(236, 34, 34);
}
//内容
.neirong {
  position: relative;
  height: 380px;
}
//走马灯
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
//走马灯图片
.imgwh {
  min-width: 100%;
  min-height: 100%;
  max-width: 100%;
  max-height: 100%;
}
//头像和欢迎居中
.juzhong {
  display: flex;
  align-items: center;
}
//双面卡片
.sandi {
  transform-style: preserve-3d;
}
.xuanzheng1,
.xuanzheng2 {
  position: absolute;
  width: 100%;
  height: 500px;
}
.xuanzheng2 {
  transform: rotateY(180deg);
}
.spanz:hover {
  cursor: pointer;
}
.shangmian {
  display: flex;
  position: relative;
}
.imgzh {
  position: absolute;
  top: -20%;
  right: 1%;
}
.imgzh:hover {
  cursor: pointer;
}
.fanfuzhuan {
  transform: rotateY(180deg);
  transition: all 1s;
}
.fanfuzhuaned {
  transform: rotateY(360deg);
  transition: all 1s;
}
.kuangdu {
  height: 100%;
}
.div1 {
  width: 25%;
  height: 100%;
  position: absolute;
  right: 1%;
  background-color: rgb(99, 176, 240);
  border: 3px solid #000000;
  border-radius: 20px;
  text-align:center;
  line-height: 200px;
  font-size: 35px;
  font-family: SimHei;
}
.div2 {
  width: 70%;
  height: 25%;
  position: absolute;
  top: 1%;
  background-color: cornflowerblue;
  border: 3px solid #000000;
  border-radius: 20px;
  text-align:center;
  line-height: 100px;
  font-size: 35px;
  font-family: SimHei;
}
.div3 {
  width: 25%;
  height: 60%;
  position: absolute;
  bottom: 1%;
  background-color: rgb(236, 86, 116);
  border: 3px solid #000000;
  border-radius: 20px;
  text-align:center;
  line-height: 220px;
  font-size: 35px;
  font-family: SimHei;
}
.div4 {
  width: 40%;
  height: 25%;
  position: absolute;
  top: 73%;
  left: 30%;
  background-color: rgb(252, 153, 72);
  border: 3px solid #000000;
  border-radius: 20px;
  text-align:center;
  line-height: 90px;
  font-size: 35px;
  font-family: SimHei;
}
.div5 {
  width: 40%;
  height: 25%;
  position: absolute;
  top: 40%;
  left: 30%;
  background-color: rgb(102, 226, 210);
  border: 3px solid #000000;
  border-radius: 20px;
  text-align:center;
  line-height: 90px;
  font-size: 35px;
  font-family: SimHei;
}
</style>
