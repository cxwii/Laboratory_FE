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
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表 -->
      <el-table :data="tableData" height="250" border style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="id" label="用户ID" width="180"></el-table-column>
        <el-table-column prop="uname" label="名称" width="180"></el-table-column>
        <el-table-column prop="username" label="账号"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="用户详情" placement="top">
              <el-button type="primary" icon="el-icon-edit" circle size='mini'></el-button>
            </el-tooltip>
              <el-button type="danger" icon="el-icon-delete" circle size='mini' @click="deleteuser(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>

    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 用户列表
      tableData: [],
      // 当前页数和每页多少条
      page: {
        pageNum: '1',
        pageSize: '5'
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
