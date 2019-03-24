<template>
  <div class="app-container">
    <el-row style="margin: 0px 0 20px 10px;">
      <el-button size="large" v-for="tab in tabs" :class="tab.active? 'tab_active' : ''" :key="tab.kinds" @click="changeTab(tab)">{{ tab.tabName }}</el-button>
    </el-row>
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-edit" @click="handleCreate">{{ $t('table.addsingle') }}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-star-off" @click="handleImportCreate">{{ $t('table.addmore') }}</el-button>
      <div class="high-search" @click="globeSearch">
        高级检索
      </div>
      <el-input v-model="listQuery.title" :placeholder="$t('table.title')" style="width: 300px;float:right">
        <el-button slot="append" icon="el-icon-search" type="success" @keyup.enter.native="handleFilter" />
      </el-input>
    </div>
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange">
      <el-table-column :label="$t('table.id')" align="center" width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.uid')" align="center" width="105">
        <template slot-scope="scope">
          <span>{{ scope.row.uid }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.chinaName')"  align="center" width="250">
        <template slot-scope="scope">
          <span>{{ scope.row.chinaName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.englishName')" align="center" width="350">
        <template slot-scope="scope">
          <span>{{ scope.row.englishName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.sourceCas')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sourceCas }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.sourceCi')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sourceCi }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.chinaId')" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.chinaId }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button size="mini" type="success" @click="handleCheckDetail(scope.row,'checkItem')">{{ $t('table.checkItem') }}
          </el-button>
          <el-button size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')">{{ $t('table.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :pageSize.sync="listQuery.pageSize" @pagination="getList" />
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="dialogStatus !== 'highSearch' ? rules: null" :model="temp" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('table.uid')" prop="uid">
          <el-input v-model="temp.uid"/>
        </el-form-item>
        <el-form-item :label="$t('table.kid')" prop="uid">
          <el-input v-model="temp.uid"/>
        </el-form-item>
        <el-form-item :label="$t('table.chinaName')" prop="chinaName">
          <el-input v-model="temp.chinaName"/>
        </el-form-item>
        <el-form-item :label="$t('table.englishName')" prop="englishName">
          <el-input v-model="temp.englishName"/>
        </el-form-item>
        <el-form-item :label="$t('table.sourceCas')" prop="sourceCas">
          <el-input v-model="temp.sourceCas"/>
        </el-form-item>
        <el-form-item :label="$t('table.sourceCi')" prop="sourceCi">
          <el-input v-model="temp.sourceCi"/>
        </el-form-item>
        <el-form-item :label="$t('table.chinaId')" prop="chinaId">
          <el-input v-model="temp.chinaId"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false;temp={}">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="textMap['allImport']" :visible.sync="allImportVisible">
      <div>
        下载模板:<a href="##">1.excel</a>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="allImportVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="allImportCreat">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="textMap['checkDetail']" :visible.sync="checkDetailVisible">
      <el-form :model="temp" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('table.uid')">
          {{temp.uid}}
        </el-form-item>
        <el-form-item :label="$t('table.chinaName')">
          {{temp.chinaName}}
        </el-form-item>
        <el-form-item :label="$t('table.englishName')">
          {{temp.englishName}}
        </el-form-item>
        <el-form-item :label="$t('table.sourceCas')">
          {{temp.sourceCas}}
        </el-form-item>
        <el-form-item :label="$t('table.sourceCi')">
          {{temp.sourceCi}}
        </el-form-item>
        <el-form-item :label="$t('table.chinaId')">
          {{temp.chinaId}}
        </el-form-item>
         <el-form-item :label="$t('table.uid')">
          {{temp.uid}}
        </el-form-item>
        <el-form-item :label="$t('table.chinaName')">
          {{temp.chinaName}}
        </el-form-item>
        <el-form-item :label="$t('table.englishName')">
          {{temp.englishName}}
        </el-form-item>
        <el-form-item :label="$t('table.sourceCas')">
          {{temp.sourceCas}}
        </el-form-item>
        <el-form-item :label="$t('table.sourceCi')">
          {{temp.sourceCi}}
        </el-form-item>
        <el-form-item :label="$t('table.chinaId')">
          {{temp.chinaId}}
        </el-form-item>
         <el-form-item :label="$t('table.chinaName')">
          {{temp.chinaName}}
        </el-form-item>
        <el-form-item :label="$t('table.englishName')">
          {{temp.englishName}}
        </el-form-item>
        <el-form-item :label="$t('table.sourceCas')">
          {{temp.sourceCas}}
        </el-form-item>
        <el-form-item :label="$t('table.sourceCi')">
          {{temp.sourceCi}}
        </el-form-item>
        <el-form-item :label="$t('table.chinaId')">
          {{temp.chinaId}}
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="checkDetailSubmit">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
let list = {
        total: 20,
        items: [
          {
            "sourceId": 1,
            "id": 1,
            "uid": 1001,
            "sourceType": 1,
            "kinds": 1,
            "chinaName": "N-5-氯苯哑唑-2-基乙酰胺",
            "englishName": "N-(5-Chlorobenzoxazol-2-yl) acetamide",
            "sourceCas": "35783-57-4",
            "sourceCi": "aafasfafafci",
            "chinaId": "943"
          },
          {
            "sourceId": 1,
            "uid": 1001,
            "id": 2,
            "sourceType": 1,
            "kinds": 1,
            "chinaName": "N-5-氯苯哑唑-2-基乙酰胺",
            "englishName": "N-(5-Chlorobenzoxazol-2-yl) acetamide",
            "sourceCas": "35783-57-4",
            "sourceCi": "aafasfafafci",
            "chinaId": "943"
          },
          {
            "sourceId": 1,
            "id": 3,
            "uid": 1001,
            "sourceType": 1,
            "kinds": 1,
            "chinaName": "N-5-氯苯哑唑-2-基乙酰胺",
            "englishName": "N-(5-Chlorobenzoxazol-2-yl) acetamide",
            "sourceCas": "35783-57-4",
            "sourceCi": "aafasfafafci",
            "chinaId": "943"
          },
          {
            "sourceId": 1,
            id: 4,
            "uid": 1001,
            "sourceType": 1,
            "kinds": 1,
            "chinaName": "N-5-氯苯哑唑-2-基乙酰胺",
            "englishName": "N-(5-Chlorobenzoxazol-2-yl) acetamide",
            "sourceCas": "35783-57-4",
            "sourceCi": "aafasfafafci",
            "chinaId": "943"
          },
          {
            "sourceId": 1,
            "uid": 1001,
            id: 5,
            "sourceType": 1,
            "kinds": 1,
            "chinaName": "N-5-氯苯哑唑-2-基乙酰胺",
            "englishName": "N-(5-Chlorobenzoxazol-2-yl) acetamide",
            "sourceCas": "35783-57-4",
            "sourceCi": "aafasfafafci",
            "chinaId": "943"
          }
        ]
      }
const tabsU = [ // 欧盟
    { tabName: '禁用成分', kinds: 1, active: true },
    { tabName: '限用成分', kinds: 2, active: false },
    { tabName: '着色剂', kinds: 3, active: false },
    { tabName: '防腐剂', kinds: 4, active: false },
    { tabName: '防晒剂', kinds: 5, active: false }
  ]
const tabsK = [ // 韩国
    { tabName: '禁用成分', kinds: 1, active: true },
    { tabName: '限用成分', kinds: 2, active: false },
    { tabName: '用色素', kinds: 3, active: false },
    { tabName: '防晒剂', kinds: 4, active: false },
    { tabName: '染发剂', kinds: 5, active: false },
    { tabName: '其他准用成分', kinds: 6, active: false }
  ]
export default {
  name: 'publicTable',
  components: { Pagination },
  data() {
    return {
      tabs: this.$route.path === '/european-table' ? tabsU : tabsK,
      search: '',
      tableKey: 0,
      list: [],
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
    // let { path } = this.$route
    // console.log('path===>>', path)
    // if(path = '/european-table'){
    //   this.tabs = this.tabsU
    // } else {
    //   this.tabs = this.tabsK
    // }
    this.getList()
  },
  methods: {
    changeTab(item) {
      let tempTabs = this.tabs
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
        this.list = list.items
        this.total = 100
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      }, 1000)
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleCheckDetail(row, status) {
      this.checkDetailVisible = true
      this.temp = Object.assign({}, row) // copy obj
    },
    checkDetailSubmit () {
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
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
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
  },
  watch: {
    '$route': {
      handler: function(val, oldVal){
        console.log(val, oldVal);
      },
      // 深度观察监听
      // deep: true
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

