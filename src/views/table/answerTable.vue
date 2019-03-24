<template>
  <div class="app-container">
    <el-row style="margin: 0px 0 20px 10px;">
      <el-button size="large" v-for="tab in tabs" :class="tab.active? 'tab_active' : ''" :key="tab.kinds" @click="changeTab(tab)">{{ tab.tabName }}</el-button>
    </el-row>
    <div class="filter-container">
      <el-input v-model="listQuery.title" :placeholder="$t('table.title')" style="width: 300px;float:right;margin-bottom: 20px">
        <el-button slot="append" icon="el-icon-search" type="success" @click="handleFilter" />
      </el-input>
    </div>
    <el-table
      v-if="curTab === 1"
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;margin-top: 8px"
      @sort-change="sortChange">
      <el-table-column :label="$t('table.userName')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.content')" align="center" min-width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.userTitle')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.companyName')"  align="center" min-width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.companyName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.isAnswer')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.questionZhuanjiaComments || '否' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.isOpen')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.isOpen || '否'  }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.questionStatus')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.questionStatus }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.questionTime')" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" style="width:80px" @click="handleCommetList(scope.row)">{{ $t('table.commetsList') }}</el-button>
          <el-button size="mini" type="success" style="width:80px" @click="handleCheckDetail(scope.row,'checkItem')">{{ $t('table.questionDetail') }}
          </el-button>
          <el-button size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')">{{ $t('table.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-table
      v-if="curTab === 2"
      v-loading="listLoading"
      :key="tableKey"
      :data="commentList"
      border
      fit
      highlight-current-row
      style="width: 100%;margin-top: 8px"
      @sort-change="sortChange">
      <el-table-column :label="$t('table.userName')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.commentContent')" align="center" min-width="300">
        <template slot-scope="scope">
          <span>{{ scope.row.commentContent }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.commetTime')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.commetStatus')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="success" style="width:80px" @click="handleCheckDetail(scope.row,'checkItem')">{{ $t('table.commetDetail') }}
          </el-button>
          <el-button size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')">{{ $t('table.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :pageSize.sync="listQuery.pageSize" @pagination="getList" />
    <!-- 问题详情start -->
    <el-dialog v-if="curTab === 1" :title="textMap['checkDetail']" :visible.sync="checkDetailVisible">
      <!-- 问题详情 -->
      <el-form :model="temp" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('table.userName')">
          <span>{{ temp.userName }}</span>
      </el-form-item>
      <el-form-item :label="$t('table.content')">
          <span>{{ temp.content }}</span>
      </el-form-item>
      <el-form-item :label="$t('table.userTitle')">
          <span>{{ temp.userTitle }}</span>
      </el-form-item>
      <el-form-item :label="$t('table.companyName')">
          <span>{{ temp.companyName }}</span>
      </el-form-item>
      <el-form-item :label="$t('table.isAnswer')">
          <span>{{ temp.isAnswer || '否' }}</span>
      </el-form-item>
      <el-form-item :label="$t('table.isOpen')">
          <span>{{ temp.isOpen || '否'  }}</span>
      </el-form-item>
      <el-form-item :label="$t('table.questionStatus')">
          <span>{{ temp.questionStatus }}</span>
      </el-form-item>
      <el-form-item :label="$t('table.questionPics')">
          <span>{{ temp.pics }}</span>
      </el-form-item>
      <el-form-item :label="$t('table.questionTime')">
          <span>{{ temp.createTime }}</span>
      </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="checkDetailSubmit">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <!-- 问题详情end -->
    <!-- 评论详情start -->
    <el-dialog v-if="curTab === 2" :title="textMap['checkDetail']" :visible.sync="checkDetailVisible">
      <!-- 评论详情 -->
      <el-form :model="temp" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('table.userName')" align="center">
            <span>{{ temp.userName }}</span>
        </el-form-item>
        <el-form-item :label="$t('table.commentContent')" align="center" min-width="300">
            <span>{{ temp.commentContent }}</span>
        </el-form-item>
        <el-form-item :label="$t('table.commetTime')" align="center">
            <span>{{ temp.createTime }}</span>
        </el-form-item>
        <el-form-item :label="$t('table.commetStatus')" align="center">
            <span>{{ temp.status }}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="checkDetailSubmit">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <!-- 评论详情end -->
  </div>
</template>

<script>
// import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
// import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
let list = {
        total: 3,
        items: [
          {
            "questionId": 1001,
            "userId": "1001",
            "userType": 3,
            "questionZhuanjiaComments": 10, // 大于0 已回答
            "isOpen": 1,
            "pics": "aaa.jpg,bbb.png",
            createTime: "2019-03-24 12:30:23",
            "questionStatus": 1,
            "userName": "老楚",
            "userTitle": "ceo啊",
            "companyName": "湖南牛逼互联网公司",
            createTime: "2019-03-24 12:30:23",
            content:'我是老楚  我牛不牛逼？'
          },
          {
            "questionId": 1001,
            "userId": "1001",
            "userType": 3,
            "questionZhuanjiaComments": 10, // 大于0 已回答
            "isOpen": 1,
            "pics": "aaa.jpg,bbb.png",
            createTime: "2019-03-24 12:30:23",
            "questionStatus": 1,
            "userName": "老楚",
            "userTitle": "ceo啊",
            "companyName": "湖南牛逼互联网公司",
            createTime: "2019-03-24 12:30:23",
            content:'我是老楚  我牛不牛逼？'
          },
          {
            "questionId": 1001,
            "userId": "1001",
            "userType": 3,
            "questionZhuanjiaComments": 10, // 大于0 已回答
            "isOpen": 1,
            "pics": "aaa.jpg,bbb.png",
            createTime: "2019-03-24 12:30:23",
            "questionStatus": 1,
            "userName": "老楚",
            "userTitle": "ceo啊",
            "companyName": "湖南牛逼互联网公司",
            createTime: "2019-03-24 12:30:23",
            content:'我是老楚  我牛不牛逼？'
          }
        ]
      }
let commentList = {
  "total": 100,
  "page": 1,
  "pageSize": 10,
  "items": [
      {
          "commentId": 1001,
          "commentContent": "这条政策好",
          "commentPics": "http://aa.baidu.com/aaa.jpg,http://aa.baidu.com/bbb.jpg",
          "userId": 1001,
          "userHeadImg": "http://aaa.baidu.com/jpg.com",
          "userName": "张三",
          "userType": 3,
          "userTitle": "高级工程师",
          "status": 1,
          "createTime": 6456546
      }
  ]
}
export default {
  name: 'ComplexTable',
  components: { Pagination },
  data() {
    return {
      tabs: [
        { tabName: '问题列表', type: 1, active: true },
        { tabName: '评论列表', type: 2, active: false }
      ],
      curTab: 1,
      search: '',
      tableKey: 0,
      list: [],
      commentList: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        pageSize: 20,
        sourceType: 1, // 资源类型   1-中国欧盟，2-中国韩国
        content: '', // 搜索内容
        // sort: '+id'
      },
      temp: {
      },
      tempCommetData: {},
      dialogFormVisible: false,
      allImportVisible: false,
      checkDetailVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增',
        allImport: '批量导入',
        checkDetail: '查看详细',
        highSearch: '高级检索'
      },
      rules: {
        uid: [{ required: true, message: 'uid is required', trigger: 'blur' }],
        chinaName: [{ required: true, message: 'chinaName is required', trigger: 'blur' }],
        englishName: [{ required: true, message: 'englishName is required', trigger: 'blur' }],
        sourceCas: [{ required: true, message: 'sourceCas is required', trigger: 'blur' }],
        sourceCi: [{ required: true, message: 'sourceCi is required', trigger: 'blur' }],
        chinaId: [{ required: true, message: 'chinaId is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    changeTab(item) {
      let tempTabs = this.tabs
      this.curTab = item.type
      let temp = []
      this.tabs = tempTabs.map(tab => {tab.active = false;return tab;})
      item.active = true
      this.getList()
    },
    globeSearch() {
      this.dialogStatus = 'highSearch'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    getList() {
      this.listLoading = true
      setTimeout(() => {
        if (this.curTab === 1) {
          this.list = list.items
        } else {
          this.getCommetList()
        }
        this.total = 100
        setTimeout(() => {
          this.listLoading = false
        }, 200)
      }, 200)
    },
    getCommetList() {
      this.listLoading = true
      setTimeout(() => {
        this.commentList = commentList.items
        this.total = 8
        setTimeout(() => {
          this.listLoading = false
        }, 200)
      }, 200)
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleCheckDetail(row, status) {
      // 拿详情数据
      this.checkDetailVisible = true
      console.log('rowwwww', row)
      this.temp = Object.assign({}, row) // copy obj
    },
    checkDetailSubmit () {
      // 关闭查看详情
      this.checkDetailVisible = false
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'uid') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+uid'
      } else {
        this.listQuery.sort = '-uid'
      }
      this.handleFilter()
    },
    handleCreate() {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleImportCreate() {
      this.allImportVisible = true
    },
    allImportCreat() {
      this.allImportVisible = false
    },
    createData() {
      this.temp = {};
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false
          this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
        }
      })
    },
    handleCommetList(row) {
      this.curTab = 2
      let tempTabs = this.tabs
      this.changeTab(tempTabs[1])
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
        }
      })
    }
  }
}
</script>
<style scoped>
.table_change{
  display: flex;
  margin: 20px 0;
}
.tab_active{
  background: #8BC34A;
}
  .high-search{
    text-align: center;
    float: right;
    width: 100px;
    line-height: 60px;
    color: brown;
  }
</style>

