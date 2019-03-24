<template>
  <div class="app-container" style="padding-bottom: 20px">
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column :label="$t('table.feedbackId')" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.feedbackId }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.userType')" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ userTypeMap[scope.row.userType] }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.userName')" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.content')"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.content }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :pageSize.sync="listQuery.pageSize" @pagination="getList" />
  </div>
</template>

<script>
// import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
let list = {
        total: 3,
        items: [
          {
            "feedbackId": 1,
            "userName": "张三丰",
            "userType": 2,
            "content": "这是个好软件"
          },
          {
            "feedbackId": 1,
            "userName": "张三丰",
            "userType": 2,
            "content": "这是个好软件"
          },
          {
            "feedbackId": 1,
            "userName": "张三丰",
            "userType": 2,
            "content": "这是个好软件"
          }
        ]
      }
export default {
  name: 'questionTable',
  components: { Pagination },
  data() {
    return {
      search: '',
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      userTypeMap: {
        2: '专家',
        3: "企业用户"
      },
      listQuery: {
        page: 1,
        pageSize: 20,
        sourceType: 1, // 资源类型   1-中国欧盟，2-中国韩国
        content: '', // 搜索内容
        // sort: '+id'
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      setTimeout(() => {
        this.list = list.items
        this.total = 100
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      }, 1000)
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

