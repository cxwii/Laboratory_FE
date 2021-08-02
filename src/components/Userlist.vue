<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="mianbaoxie">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 搜索添加框 -->
      <el-row :gutter="20" class="chatian">
        <el-col :span="8">
          <el-input
            placeholder="请输入名称"
            v-model="page.uname"
            @keyup.enter.native="userlist"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="userlist"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="tianjia">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表 -->
      <el-table :data="tableData" height="250" border style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="id" label="用户ID" width="180"></el-table-column>
        <el-table-column
          prop="uname"
          label="名称"
          width="180"
        ></el-table-column>
        <el-table-column prop="username" label="账号"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="用户详情"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                size="mini"
                @click="genggai(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="deleteuser(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.pageNum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 添加用户的对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <!-- 内容主体区 -->
      <el-form
        :model="adduser"
        :rules="adduserrules"
        ref="adduserref"
        label-width="100px"
      >
        <el-form-item label="名称" prop="uname">
          <el-input v-model="adduser.uname"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="username">
          <el-input v-model="adduser.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="adduser.password"></el-input>
        </el-form-item>
        <!-- 分配权限 -->
        <el-form-item label="权限" prop="uid">
          <el-select v-model="adduser.uid" placeholder="请分配权限">
            <el-option
              v-for="item in options"
              :key="item.uid"
              :label="item.label"
              :value="item.uid"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="quxiao">取 消</el-button>
        <el-button type="primary" @click="quding">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户对话框，用户详情 -->
    <el-dialog
      title="修改用户信息"
      :visible.sync="xianshi"
      width="50%"
      :before-close="guanbi"
    >
      <!-- 内容主体 -->
      <el-form
        :model="gaiuser"
        :rules="adduserrules"
        ref="adduserref"
        label-width="100px"
      >
        <el-form-item label="账号">
          <el-input v-model="gaiuser.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="uname">
          <el-input v-model="gaiuser.uname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="gaiuser.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="quxiao2">取 消</el-button>
        <el-button type="primary" @click="quding2"
          >确 定</el-button
        >
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data () {
    return {
      // 用户列表
      tableData: [],
      // 当前页数和每页多少条和模糊查询的名字
      page: {
        uname: '',
        pageNum: 1,
        pageSize: 5
      },
      // 总页数
      total: 0,
      // 控制添加用户对话框的显示和隐藏
      dialogVisible: false,
      // 添加用户的数据，验证等等
      adduser: {
        uname: '',
        username: '',
        password: '',
        uid: ''
      },
      adduserrules: {
        uname: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名称的长度在3~10个字',
            trigger: 'blur'
          }
        ],
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名称的长度在3~10个字',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名称的长度在3~10个字',
            trigger: 'blur'
          }
        ],
        uid: [{ required: true, message: '请分配权限', trigger: 'change' }]
      },
      // 权限分配
      options: [
        {
          uid: '0',
          label: '普通用户'
        },
        {
          uid: '1',
          label: '管理员'
        },
        {
          uid: '2',
          label: '超级管理员'
        }
      ],
      uid: '',
      // 修改用户用的内容
      xianshi: false,
      gaiuser: {
        uid: '',
        uname: '',
        username: '',
        password: ''
      }
    }
  },
  created () {
    this.userlist()
  },
  methods: {
    // 初始化用户列表
    async userlist () {
      const { data: res } = await this.$http.post('queryUserList', this.page)
      // 用户列表赋值
      this.tableData = res.data.rows
      this.total = res.data.total
      // console.log('输出', res.data.total)
    },
    // 删除用户
    async deleteuser (id) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch((err) => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      await this.$http.post('delUser', { id: id })
      this.$message.success('删除用户成功！')
      this.userlist()
    },
    // 监听分页事件
    handleSizeChange (newSize) {
      // console.log('newSize :>> ', newSize)
      this.page.pageSize = newSize
      this.userlist()
    },
    handleCurrentChange (newPage) {
      // console.log('newPage :>> ', newPage)
      this.page.pageNum = newPage
      this.userlist()
    },
    // 添加用户，下面四个都是
    tianjia () {
      this.dialogVisible = !this.dialogVisible
      // console.log('this.dialogVisible :>> ', this.dialogVisible)
    },
    // 按x事件
    handleClose () {
      // this.adduser = {}
      // this.dialogVisible = !this.dialogVisible
      this.$refs.adduserref.resetFields()
      this.dialogVisible = !this.dialogVisible
      // console.log('按x事件 :>> ')
    },
    // 确定事件
    quding () {
      this.$refs.adduserref.validate(async (valid) => {
        // console.log('this.adduser :>> ', this.adduser)
        if (valid === true) {
          const { data: res } = await this.$http.post('addUser', this.adduser)
          // console.log('输出 :>> ', res)
          if (res.status !== 200) {
            this.$message.error('添加用户失败')
          }
          this.$message.success('添加用户成功')

          this.userlist()
          this.dialogVisible = !this.dialogVisible
          this.$refs.adduserref.resetFields()
          // console.log('输出2', this.adduser)
        }
      })
    },
    // 取消事件
    async quxiao () {
      this.dialogVisible = !this.dialogVisible
      // console.log('取消事件 :>> ')
    },
    // 修改用户，下面四个都是
    genggai (row) {
      // console.log('row :>> ', row.username)
      this.gaiuser.uid = row.uid
      this.gaiuser.uname = row.uname
      this.gaiuser.username = row.username
      this.gaiuser.password = row.password
      // console.log('gaiuser :>> ', this.gaiuser)

      this.xianshi = !this.xianshi
    },
    quxiao2 () {
      this.$refs.adduserref.resetFields()
      this.xianshi = !this.xianshi
    },
    async quding2 () {
      this.$refs.adduserref.validate(async (valid) => {
        // console.log('this.adduser :>> ', this.adduser)
        if (valid === true) {
          const { data: res } = await this.$http.post('updateUser', this.gaiuser)
          // console.log('输出 :>> ', res)
          if (res.status !== 200) {
            this.$message.error('修改用户失败')
          }
          this.$message.success('修改用户成功')

          this.userlist()
          this.$refs.adduserref.resetFields()
          this.xianshi = !this.xianshi
        }
      })
      // const { data: res } = await this.$http.post('updateUser', this.gaiuser)
      // console.log('res :>> ', res)
      // console.log('输出 :>> ', this.gaiuser)
    },
    guanbi () {
      this.$refs.adduserref.resetFields()
      this.xianshi = !this.xianshi
    }
  }
}
</script>

<style lang="less" scoped>
//面包屑导航栏
.mianbaoxie {
  margin-bottom: 15px;
}
//搜索和添加下边距
.chatian {
  margin-bottom: 10px;
}
</style>
