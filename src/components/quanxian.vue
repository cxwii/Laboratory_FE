script<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="mianbaoxie">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限分配</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 权限列表 -->
      <el-table :data="tableData" height="250" border style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="id" label="用户ID" width="180"></el-table-column>
        <el-table-column
          prop="uname"
          label="名称"
          width="180"
        ></el-table-column>
        <el-table-column prop="username" label="账号"></el-table-column>
        <el-table-column label="权限">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.uid === '0'">普通用户</el-tag>
            <el-tag v-else-if="scope.row.uid === '1'" type="success"
              >管理员</el-tag
            >
            <el-tag v-else-if="scope.row.uid === '2'" type="danger"
              >超级管理员</el-tag
            >
            <el-tag v-else type="info">错误</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="更改权限"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="primary"
                icon="el-icon-coin"
                circle
                size="mini"
                @click="xianshi(scope.row.id)"
              ></el-button>
            </el-tooltip>
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

      <!-- 更改权限对话框 -->
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <!-- 主体 -->
        <el-select v-model="uidshuju.uid" placeholder="请分配权限">
          <el-option
            v-for="item in options"
            :key="item.uid"
            :label="item.label"
            :value="item.uid"
          >
          </el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
          <el-button @click="quxiao">取 消</el-button>
          <el-button type="primary" @click="quding">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
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
      // 对话框的显示
      dialogVisible: false,
      // 修改权限用数据源
      uidshuju: {
        id: '',
        uid: ''
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
      uid: ''
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
    // 显示权限修改对话框
    xianshi (id) {
      this.dialogVisible = !this.dialogVisible
      //   console.log('id :>> ', id)
      this.uidshuju.id = id
    },
    handleClose () {
      this.dialogVisible = !this.dialogVisible
      this.uidshuju = {}
    },
    quxiao () {
      this.dialogVisible = !this.dialogVisible
      this.uidshuju = {}
    },
    async quding () {
      // console.log('this.uidshuju.uid :>> ', this.uidshuju.uid)
      const { data: res } = await this.$http.post('updateUseruid', this.uidshuju)
      // console.log('res >> ', res.data)
      if (res.data !== 1) {
        this.$message.error('更改权限失败')
      }
      this.$message.success('更改权限成功')
      this.userlist()
      this.dialogVisible = !this.dialogVisible
      this.uidshuju = {}
    }
  }
}
</script>

<style lang="less" scoped>
//面包屑导航栏
.mianbaoxie {
  margin-bottom: 15px;
}
</style>
