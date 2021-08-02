<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="mianbaoxie">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>器材管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 搜索添加框 -->
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
        <el-col :span="4">
          <el-button type="primary" @click="tianjia">添加器材</el-button>
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
              content="器材详情"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                size="mini"
                @click="xiugai(scope.row)"
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

      <!-- 添加器材对话框 -->
      <el-dialog
        title="添加器材"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose"
      >
        <!-- 内容主体区 -->
        <el-form
          :model="addqicai"
          :rules="addqicairules"
          ref="addqicairef"
          label-width="100px"
        >
          <el-form-item label="名称" prop="qicainame">
            <el-input v-model="addqicai.qicainame"></el-input>
          </el-form-item>
          <el-form-item label="分类" prop="department">
            <el-input v-model="addqicai.department"></el-input>
          </el-form-item>
          <el-form-item label="库存" prop="inventory">
            <el-input v-model="addqicai.inventory"></el-input>
          </el-form-item>
          <el-form-item label="单价" prop="price">
            <el-input v-model="addqicai.price"></el-input>
          </el-form-item>
        </el-form>

        <!-- 底部按钮 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="quxiao">取 消</el-button>
          <el-button type="primary" @click="quding">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 修改器材对话框 -->
      <el-dialog
        title="管理器材"
        :visible.sync="xqdialogVisible"
        width="50%"
        :before-close="xqhandleClose"
      >
        <!-- 内容主体区 -->
        <el-form
          :model="xgqicai"
          :rules="addqicairules"
          ref="addqicairef"
          label-width="100px"
        >
          <el-form-item label="名称" prop="qicainame">
            <el-input v-model="xgqicai.qicainame"></el-input>
          </el-form-item>
          <el-form-item label="分类" prop="department">
            <el-input v-model="xgqicai.department"></el-input>
          </el-form-item>
          <el-form-item label="库存" prop="inventory">
            <el-input v-model="xgqicai.inventory"></el-input>
          </el-form-item>
          <el-form-item label="单价" prop="price">
            <el-input v-model="xgqicai.price"></el-input>
          </el-form-item>
        </el-form>

        <!-- 底部按钮 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="xqquxiao">取 消</el-button>
          <el-button type="primary" @click="xqquding">确 定</el-button>
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
      // 控制添加器材对话框的显示隐藏
      dialogVisible: false,
      // 控制修改器材对话框的显示隐藏
      xqdialogVisible: false,
      // 添加器材数据源
      addqicai: {
        qicainame: '',
        department: '',
        inventory: '',
        price: ''
      },
      // 添加器材验证源
      addqicairules: {
        qicainame: [
          { required: true, message: '请输入器材名称', trigger: 'blur' },
          {
            min: 1,
            max: 5,
            message: '器材名称的长度在1~5个字',
            trigger: 'blur'
          }
        ],
        department: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          {
            min: 3,
            max: 5,
            message: '分类名称的长度在3~5个字',
            trigger: 'blur'
          }
        ],
        inventory: [
          { required: true, message: '请输入库存数量', trigger: 'blur' },
          {
            min: 1,
            max: 3,
            message: '库存数量在0~999',
            trigger: 'blur'
          }
        ],
        price: [
          { required: true, message: '请输入单价', trigger: 'blur' },
          {
            min: 1,
            max: 3,
            message: '单价范围在0~999',
            trigger: 'blur'
          }
        ]
      },
      // 修改器材数据源
      xgqicai: {
        qid: '',
        qicainame: '',
        department: '',
        inventory: '',
        price: ''
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
      // console.log('qid >> ', qid)
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
    // 添加事件 -4
    tianjia () {
      this.dialogVisible = !this.dialogVisible
    },
    // 按x事件
    handleClose () {
      this.$refs.addqicairef.resetFields()
      this.dialogVisible = !this.dialogVisible
    },
    // 确定事件
    quding () {
      // console.log('this.addqicai >> ', this.addqicai)
      this.$refs.addqicairef.validate(async (valid) => {
        if (valid === true) {
          const { data: res } = await this.$http.post('addQicai', this.addqicai)
          if (res.status !== 200) {
            this.$message.error('添加器材失败')
          }
          this.$message.success('添加器材成功')

          this.qicailist()
          this.dialogVisible = !this.dialogVisible
          this.$refs.addqicairef.resetFields()
        }
      })
    },
    // 取消事件
    quxiao () {
      this.dialogVisible = !this.dialogVisible
      this.$refs.addqicairef.resetFields()
    },
    // 修改事件 -4
    xiugai (row) {
      // console.log('row >> ', row)
      // this.xgqicai = row
      this.xgqicai.qid = row.qid
      this.xgqicai.qicainame = row.qicainame
      this.xgqicai.department = row.department
      this.xgqicai.inventory = String(row.inventory)
      this.xgqicai.price = String(row.price)
      this.xqdialogVisible = !this.xqdialogVisible
    },
    // 按x事件
    xqhandleClose () {
      this.$refs.addqicairef.resetFields()
      this.xqdialogVisible = !this.xqdialogVisible
    },
    // 确定事件
    async xqquding () {
      this.$refs.addqicairef.validate(async (valid) => {
        if (valid === true) {
          const { data: res } = await this.$http.post('editQicai', this.xgqicai)
          if (res.status !== 200) {
            this.$message.error('修改器材失败')
          }
          this.$message.success('修改器材成功')

          this.qicailist()
          this.$refs.addqicairef.resetFields()
          this.xqdialogVisible = !this.xqdialogVisible
        }
      })
    },
    // 取消事件
    xqquxiao () {
      this.$refs.addqicairef.resetFields()
      this.xqdialogVisible = !this.xqdialogVisible
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
