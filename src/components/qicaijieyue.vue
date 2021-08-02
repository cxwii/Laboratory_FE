<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="mianbaoxie">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>器材借用</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 搜索框 -->
      <el-row :gutter="20" class="chatian">
        <el-col :span="8">
          <el-input
            placeholder="请输入名称"
            v-model="page.qicainame"
            @keyup.enter.native="qicailist"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="qicailist"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>

      <!-- 器材列表 -->
      <el-table :data="tableData" height="250" border style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column
          prop="qicainame"
          label="名称"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="department"
          label="分类"
          width="180"
        ></el-table-column>
        <el-table-column prop="inventory" label="库存">
          <template slot-scope="scope">
            <span>{{ scope.row.inventory }}{{ "件" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="单价">
          <template slot-scope="scope">
            <span>{{ scope.row.price }}{{ "元/件" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="器材借出"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="primary"
                icon="el-icon-sold-out"
                circle
                size="mini"
                @click="jiechu(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="deleteuser(scope.row.qid)"
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

      <!-- 借出对话框 -->
      <el-dialog
        title="器材借出"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose"
      >
        <el-form
          :model="jyshuju"
          :rules="jyshujurules"
          ref="jyshujuref"
          label-width="100px"
        >
            <el-form-item label="借用者">
            <el-input v-model="jyshuju.jiyueren" disabled></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="jyshuju.qicainame" disabled></el-input>
          </el-form-item>
          <el-form-item label="分类">
            <el-input v-model="jyshuju.department" disabled></el-input>
          </el-form-item>
          <el-form-item label="库存">
            <el-input v-model="jyshuju.inventory" disabled></el-input>
          </el-form-item>
          <el-form-item label="借用数量" prop="subType">
            <el-input v-model="jyshuju.subType"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="quxiao">取 消</el-button>
          <el-button type="primary" @click="quding"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 器材列表
      tableData: [],
      // 当前页数和每页多少条和模糊查询的名字
      page: {
        qicainame: '',
        pageNum: 1,
        pageSize: 5
      },
      // 总页数
      total: 0,
      // 借出显示隐藏
      dialogVisible: false,
      // 对话框数据源
      jyshuju: {
        jiyueren: '',
        department: '',
        qicainame: '',
        inventory: '',
        subType: ''
      },
      // 更改数据源
      ggshuju: {
        qid: '',
        qicainame: '',
        department: '',
        inventory: '',
        price: ''
      },
      // 借阅数据源
      jieyushuju: {
        uid: '',
        qid: '',
        subDateTime: '',
        subType: ''
      },
      // 数据验证
      jyshujurules: {
        subType: [
          { required: true, message: '请输入借用数量', trigger: 'blur' },
          {
            min: 1,
            max: 3,
            message: '借用数量在0~999',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {
    this.qicailist()
  },
  methods: {
    // 监听分页事件 -2
    handleSizeChange (newSize) {
      this.page.pageSize = newSize
      this.qicailist()
    },
    handleCurrentChange (newPage) {
      this.page.pageNum = newPage
      this.qicailist()
    },
    // 初始化器材列表
    async qicailist () {
      const { data: res } = await this.$http.post('queryQicaiList', this.page)
      // console.log('res >> ', res.data.rows)
      this.tableData = res.data.rows
      this.total = res.data.total
    },
    // 删除
    async deleteuser (qid) {
    //   console.log('qid >> ', qid)
      const confirmResult = await this.$confirm(
        '此操作将永久删除该器材所以数据, 是否继续?',
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
      await this.$http.post('delQicai', { qid: qid })
      // console.log('qid >> ', qid)
      this.$message.success('删除该器材成功！')
      this.qicailist()
    },
    // 借出功能
    jiechu (row) {
      // 赋值
      this.jyshuju.jiyueren = window.sessionStorage.getItem('mizi')
      this.jyshuju.qicainame = row.qicainame
      this.jyshuju.department = row.department
      this.jyshuju.inventory = row.inventory

      this.ggshuju.qid = row.qid
      this.ggshuju.qicainame = row.qicainame
      this.ggshuju.department = row.department
      this.ggshuju.inventory = row.inventory
      this.ggshuju.price = row.price

      this.jieyushuju.uid = window.sessionStorage.getItem('uid')
      this.jieyushuju.qid = row.qid

      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

      this.jieyushuju.subDateTime = String(year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds)

      this.dialogVisible = !this.dialogVisible
      // console.log('row >> ', row)
    },
    handleClose () {
      this.dialogVisible = !this.dialogVisible
      this.$refs.jyshujuref.resetFields()
    },
    quxiao () {
      this.dialogVisible = !this.dialogVisible
      this.$refs.jyshujuref.resetFields()
    },
    quding () {
      this.$refs.jyshujuref.validate(async (valid) => {
        if (valid === true) {
          if (this.jyshuju.subType <= this.ggshuju.inventory) {
            this.ggshuju.inventory = String(Number(this.ggshuju.inventory) - Number(this.jyshuju.subType))

            const { data: res } = await this.$http.post('editQicai', this.ggshuju)

            if (res.status !== 200) {
              this.$message.error('借用失败')
            }
            this.$message.success('借用成功')
            console.log('res >> ', res)

            this.jieyushuju.subType = this.jyshuju.subType
            await this.$http.post('addsubQicai', this.jieyushuju)

            this.qicailist()
            this.dialogVisible = !this.dialogVisible
            this.$refs.jyshujuref.resetFields()
          } else {
            this.$message.error('借用数量大于库存')
          }
        }
      })
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
