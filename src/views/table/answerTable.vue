<template>
  <div class="app-container">
    <el-row style="margin: 0px 0 20px 10px;">
      <el-button size="large" v-for="tab in tabs" :class="tab.active? 'tab_active' : ''" :key="tab.kinds" @click="changeTab(tab)">{{ tab.tabName }}</el-button>
    </el-row>
    <div class="filter-container">
      <template>
        <el-radio v-model="allowStatus" label="0">待审核</el-radio>
        <el-radio v-model="allowStatus" label="1">审核通过</el-radio>
        <el-radio v-model="allowStatus" label="2">审核失败</el-radio>
      </template>
        <div style="margin-top: 20px">
        </div>
      <el-button v-if="allowStatus === '0'" size="mini" type="success" @click="oneKeyAllowed">一键审核</el-button>
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
      style="width: 100%;margin-top: 8px">
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
          <span v-if="scope.row.questionZhuanjiaComments > 0">是</span>
          <span v-if="scope.row.questionZhuanjiaComments === 0">否</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.isOpen')" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.isOpen === 1">是</span>
          <span v-if="scope.row.isOpen === 0">否</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.questionStatus')" align="center" width="180">
        <template slot-scope="scope">
          <div v-if="scope.row.questionStatus === 0">
            <el-button size="mini" type="success" @click="questionStatusChange(scope.row.questionId, 1)">通过</el-button>
            <el-button size="mini" type="info" @click="questionStatusChange(scope.row.questionId, 2)">不通过</el-button>
          </div>
          <span v-if="scope.row.questionStatus === 1">审核通过</span>
          <span v-if="scope.row.questionStatus === 2">审核失败</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.questionTime')" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" style="width:90px" @click="handleCommetList(scope.row)">{{ $t('table.commetsList') }}</el-button>
          <el-button size="mini" type="success" style="width:90px" @click="handleCheckDetail(scope.row,'checkItem')">{{ $t('table.questionDetail') }}
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
      style="width: 100%;margin-top: 8px">
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
      <el-table-column :label="$t('table.commetStatus')" align="center" width="180">
        <template slot-scope="scope">
          <div v-if="scope.row.status === 0">
            <el-button size="mini" type="success" @click="questionStatusChange(scope.row.commentId, 1)">通过</el-button>
            <el-button size="mini" type="info" @click="questionStatusChange(scope.row.commentId, 2)">不通过</el-button>
          </div>
          <span v-if="scope.row.status === 1">审核通过</span>
          <span v-if="scope.row.status === 2">审核失败</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" class-name="small-padding fixed-width" min-width="100">
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
          <span>{{ temp.questionZhuanjiaComments === 0 ? "否":'是' }}</span>
      </el-form-item>
      <el-form-item :label="$t('table.isOpen')">
          <span>{{ temp.isOpen === 1 ? "否":'是'  }}</span>
      </el-form-item>
      <el-form-item :label="$t('table.questionStatus')">
          <span v-if="temp.questionStatus === 0">待审核</span>
          <span v-if="temp.questionStatus === 1">审核通过</span>
          <span v-if="temp.questionStatus === 2">审核失败</span>
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
          <span v-if="temp.status === 0">待审核</span>
          <span v-if="temp.status === 1">审核通过</span>
          <span v-if="temp.status === 2">审核失败</span>
        </el-form-item>
        <el-form-item :label="$t('table.commentId')" align="center">
            <span>{{ temp.commentId }}</span>
        </el-form-item>
        <el-form-item :label="$t('table.userHeadImg')" align="center" min-width="300">
            <span>{{ temp.userHeadImg }}</span>
        </el-form-item>
        <el-form-item :label="$t('table.userHeadImg')" align="center">
            <span>{{ temp.userHeadImg }}</span>
        </el-form-item>
        <el-form-item :label="$t('table.replyUserName')" align="center">
            <span>{{ temp.replyUserName }}</span>
        </el-form-item>
        <el-form-item :label="$t('table.commentPics')" align="center">
            <span v-if="temp.commentPics && temp.commentPics.length > 0">
              <span v-for="(item, index) in temp.commentPics" style="width: 45%" :key="index"><img :src="item" alt=""></span>
            </span>
            <span v-else>
              暂无图集
            </span>
        </el-form-item>
        <el-form-item :label="$t('table.replyId')" align="center" min-width="300">
            <span>{{ temp.replyId }}</span>
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
import { mapGetters } from 'vuex'
import moment from 'moment'
import { Message, MessageBox } from 'element-ui'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  name: 'ComplexTable',
  components: { Pagination },
  data() {
    return {
      tabs: [
        { tabName: '问题列表', type: 1, active: true },
        { tabName: '评论列表', type: 2, active: false }
      ],
      allowCheckValue: false,
      allowStatus: '0',
      curTab: 1,
      search: '',
      tableKey: 0,
      switchValue: false,
      list: [],
      commentList: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        pageSize: 10,
        "status": 0,
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
   computed: {
    ...mapGetters([
      'items',
      'listQuerys',
      'totals',
      "detailData"
    ]),
  },
  watch: {
    allowStatus: function(val, ols) {
      this.allowStatus = val
      this.getList()
    }
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
    oneKeyAllowed() {
      // 一键审核
      let tempIdList = []
      if (this.curTab === 1) {
        this.list.map(item => {
          tempIdList.push(item.questionId)
        })
      } else {
        this.commentList.map(item => {
          tempIdList.push(item.commentId)
        })
      }
      
      let examineIdList = tempIdList.join(',')
      this.questionStatusChange(examineIdList, 1)
    },
    questionStatusChange(examineIdList, opType) {
      let params = {
        data: {
          opType, // 操作类型（1-通过，2-不通过）
          examineIdList, //数据id,多数据逗号分隔
          "type": this.curTab //数据类型 1-咨询信息，2-评论
        },
        fetchUrl: "/sys/examine/op"
      }
      this.$store.dispatch("AllowAccess", params).then( res => {
        this.$message({
          message: "操作完成",
          type: 'success'
        })
        this.getList()
      }).catch(err => {
        this.$message({
          message: "操作失败",
          type: 'info'
        })
      })
    },
    globeSearch() {
      this.dialogStatus = 'highSearch'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    getList(id) {
      this.listLoading = true
        if (this.curTab === 1) {
          // 问题列表数据
          this.listQuery.status = this.allowStatus
          let params = {
            listQuery: this.listQuery,
            fetchUrl: 'sys/question/list'
          }
          this.listLoading = true
          this.$store.dispatch("GetList", params).then( res => {
            this.listLoading = false
            // this.listQuery = this.listQuerys
            this.total = this.totals
            this.list = this.items
          })
        } else {
          // 评论列表数据
          this.listQuery.status = this.allowStatus
          this.listQuery.questionId = id || ''
          let params = {
            listQuery: this.listQuery,
            fetchUrl: 'sys/comment/list'
          }
          this.listLoading = true
          this.$store.dispatch("GetList", params).then( res => {
            this.listLoading = false
            this.total = this.totals
            this.commentList = this.items
            this.listQuery.questionId = ''
          })
        }
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleCheckDetail(row, status) {
      // 拿详情数据
      // /sys/question/detail
      let tempUrl = this.curTab === 1 ? `/sys/question/detail?questionId=${row.questionId}` : `sys/comment/detail?commentId=${row.commentId}`

      this.checkDetailVisible = true
      this.temp = Object.assign({}, row) // copy obj
      let params = {
        data: {},
        fetchUrl: tempUrl
      }
      this.$store.dispatch("GetDetail", params).then( res => {
        this.temp = this.detailData
        this.temp.createTime = moment.unix(this.detailData.createTime).format("YYYY-MM-DD hh:mm:ss")
        this.temp.commentPics = this.detailData.commentPics.split(',')
      })
    },
    checkDetailSubmit () {
      // 关闭查看详情
      this.checkDetailVisible = false
    },
    handleModifyStatus(row) {
      let tempUrl = this.curTab === 1 ? `/sys/question/delete?questionId=${row.questionId}` : `sys/comment/delete?commentId=${row.commentId}`
      MessageBox.confirm(
          '确定要删除吗？',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          let params = {
            data: {},
            fetchUrl: tempUrl
          }
          this.$store.dispatch("DeleteMembers", params).then( res => {
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
        })
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
      this.getList(row.questionId)
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

