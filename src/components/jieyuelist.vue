<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="mianbaoxie">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>器材归还</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 搜索添加框 -->
      <el-row :gutter="20" class="chatian">
        <el-col :span="8" class="biaotou">
          <span>用户:</span>
          <span class="biaotou">{{ this.mizi }}</span>
          <span> 的借用详情</span>
        </el-col>
      </el-row>

      <!-- 借阅情况 -->
      <el-table :data="tableData" height="250" border style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="qicainamesj" label="器材"></el-table-column>
        <el-table-column prop="subDateTime" label="借出时间" width="180">
          <template slot-scope="scope">
            <el-tag>{{scope.row.subDateTime}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="returnDateTime" label="归还时间" width="180">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.returnDateTime === null" type="danger">从未归还</el-tag>
            <el-tag v-else type="success">{{scope.row.returnDateTime}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="departmentsj" label="分类"></el-table-column>
        <el-table-column prop="subType" label="已借用数">
          <template slot-scope="scope">
            <span v-if="scope.row.subType !== 0">{{ scope.row.subType }}{{ "件" }}</span>
            <el-tag v-else type="success">全部归还</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="器材归还"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="primary"
                icon="el-icon-sell"
                circle
                size="mini"
                @click="guihuan(scope.row)"
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

      <!-- 归还对话框 -->
      <el-dialog
        title="器材归还"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose"
      >
        <el-form
          :model="guihuansj"
          :rules="guihuansjrules"
          ref="guihuansjref"
          label-width="100px"
        >
            <el-form-item label="归还数" prop="returnType">
            <el-input type="number" v-model="guihuansj.returnType"></el-input>
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
      // 列表数据
      tableData: [],
      // 当前页数和每页多少条和模糊查询的名字
      page: {
        uid: '',
        pageNum: 1,
        pageSize: 5
      },
      // 总页数
      total: 0,
      // 器材数据
      qicai: [],
      // 分类数据
      fenlei: [],
      // 再赋值用的数据
      page2: {
        qid: '',
        pageNum: 1,
        pageSize: 5
      },
      // 归还数据
      guihuansj: {
        id: '',
        returnDateTime: '',
        subType: '',
        returnType: ''
      },
      dialogVisible: false,
      guihuansjrules: {
        returnType: [
          { required: true, message: '请输归还数', trigger: 'blur' }
        ]
      },
      mizi: '',
      gengxi: {
        qid: '',
        inventory: ''
      },
      bzdsmsj: {
        qid: '',
        pageNum: 1,
        pageSize: 5
      }
    }
  },
  created () {
    this.chushi()
  },
  methods: {
    // 监听分页事件 -2
    handleSizeChange (newSize) {
      this.page.pageSize = newSize

      // 不要动这个，会出问题的
      this.page.pageNum = 1

      this.tableData = []
      this.chushi()
    },
    handleCurrentChange (newPage) {
      this.page.pageNum = newPage
      this.tableData = []
      this.chushi()
    },
    // 初始化 -1
    async chushi () {
      this.page.uid = window.sessionStorage.getItem('uid')
      this.mizi = window.sessionStorage.getItem('mizi')
      const { data: res } = await this.$http.post('querySubceshi', this.page)
      // console.log('res >> ', res)
      for (var i = 0; i < res.data.rows.length; i++) {
        this.page2.qid = res.data.rows[i].qid
        const { data: res2 } = await this.$http.post('qingquchaxun', this.page2)

        this.tableData.push(
          {
            qicainamesj: res2.data.rows[0].qicainame,
            departmentsj: res2.data.rows[0].department,
            subDateTime: res.data.rows[i].subDateTime,
            returnDateTime: res.data.rows[i].returnDateTime,
            subType: res.data.rows[i].subType,
            id: res.data.rows[i].id,
            qid: res.data.rows[i].qid
          }
        )
      }
      // console.log('this.tableData >> ', this.tableData)

      this.total = res.data.total
    },
    // 归还
    guihuan (row) {
      if (row.subType !== 0) {
        this.gengxi.qid = row.qid
        this.bzdsmsj.qid = row.qid
        // console.log('row.qid >> ', row)
        this.guihuansj.id = row.id
        this.guihuansj.subType = row.subType

        var date = new Date()
        var year = date.getFullYear()
        var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
        var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        this.guihuansj.returnDateTime = String(year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds)

        this.dialogVisible = !this.dialogVisible
      } else {
        this.$message.error('已经归还完毕')
      }
    },
    handleClose () {
      this.dialogVisible = !this.dialogVisible
      this.$refs.guihuansjref.resetFields()
    },
    quxiao () {
      this.dialogVisible = !this.dialogVisible
      this.$refs.guihuansjref.resetFields()
    },
    quding () {
      this.$refs.guihuansjref.validate(async (valid) => {
        if (valid === true) {
          if (Number(this.guihuansj.returnType) <= Number(this.guihuansj.subType) && Number(this.guihuansj.returnType >= 0)) {
            this.guihuansj.subType = String(Number(this.guihuansj.subType) - Number(this.guihuansj.returnType))
            const { data: res } = await this.$http.post('returnsubQicai', this.guihuansj)
            if (res.status !== 200) {
              this.$message.error('归还失败')
            } else {
              this.$message.success('归还成功')
              const { data: res5 } = await this.$http.post('qingquchaxun', this.bzdsmsj)
              this.gengxi.inventory = String(Number(res5.data.rows[0].inventory) + Number(this.guihuansj.returnType))
              await this.$http.post('updateInventtoriesceshi', this.gengxi)

              await this.shuaxin()
              this.dialogVisible = !this.dialogVisible
              this.$refs.guihuansjref.resetFields()
            }
          } else {
            this.$message.error('请输入正确的归还数')
          }
        }
      })
    },
    // 刷新方法
    shuaxin () {
      this.tableData = []
      this.chushi()
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
//表头
.biaotou {
  font-size: 20px;
  font-family: STZhongsong;
  color: #5a9ffa;
}
</style>
