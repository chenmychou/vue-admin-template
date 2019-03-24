<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-edit" @click="handleCreate">{{ $t('table.addAdmin') }}</el-button>
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
      style="width: 100%;margin-top: 8px"
      @sort-change="sortChange">
      <el-table-column :label="$t('table.adminId')" align="center" width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.adminId }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.adminName')"  align="center" width="250">
        <template slot-scope="scope">
          <span>{{ scope.row.adminName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.account')" align="center" width="350">
        <template slot-scope="scope">
          <span>{{ scope.row.account }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.lastLoginTime')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.lastLoginTime }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.status')" align="center">
        <template slot-scope="scope">
          <span>
            <el-switch
              v-model="scope.row.status === 1"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')">{{ $t('table.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :pageSize.sync="listQuery.pageSize" @pagination="getList" />
    <el-dialog :title="`${textMap[dialogStatus]}管理员`" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="tempAdminData" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('table.adminId')" prop="adminId">
          <el-input v-model="tempAdminData.adminId"/>
        </el-form-item>
        <el-form-item :label="$t('table.account')" prop="account">
          <el-input v-model="tempAdminData.account"/>
        </el-form-item>
        <el-form-item :label="$t('table.adminName')" prop="adminName">
          <el-input v-model="tempAdminData.adminName"/>
        </el-form-item>
        <el-form-item :label="$t('table.adminPhone')" prop="adminPhone">
          <el-input v-model="tempAdminData.adminPhone"/>
        </el-form-item>
        <el-form-item :label="$t('table.adminPassword')" prop="adminPassword">
          <el-input v-model="tempAdminData.adminPassword"/>
        </el-form-item>
         <el-form-item :label="$t('table.isDelete')" prop="isDelete">
           <!-- 是否禁用 -->
          <el-switch
            v-model="tempAdminData.status"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false;tempAdminData={}">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
// import { parseTime } from '@/utils'
import moment from 'moment'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
let listCompany = {
        total: 20,
        items: [
          {
            "adminId": 1001,
            "account": "dafdsa455",
            "adminName": "admin",
            "adminPhone": "13974999769",
            "adminPassword": '********',
            lastLoginTime: "2019-03-21 18:35:23",
            "status": 1,
            "createTime": 45546456,
            "adminType": 1
          }
        ]
      }


export default {
  name: 'systemTable',
  components: { Pagination },
  data() {
    return {
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
      tempAdminData: {
        // 添加管理员信息
      },
      temp: {
      },
      dialogFormVisible: false,
      checkDetailVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增'
      },
      rules: {
        uid: [{ required: true, message: 'uid is required', trigger: 'blur' }],
        chinaName: [{ required: true, message: 'chinaName is required', trigger: 'blur' }],
        englishName: [{ required: true, message: 'englishName is required', trigger: 'blur' }],
        sourceCas: [{ required: true, message: 'sourceCas is required', trigger: 'blur' }],
        sourceCi: [{ required: true, message: 'sourceCi is required', trigger: 'blur' }],
        chinaId: [{ required: true, message: 'chinaId is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      dialogPictureVisible: false,
      dialogImageUrl: 'http://source.zouzhengming.com/MSg6YdvsFb8FDCZRStziw.jpg'
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      setTimeout(() => {
        this.list = listCompany.items
        this.total = 20
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
      this.tempAdminData = Object.assign({}, row) // copy obj
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
      this.tempAdminData =  {
        // 添加管理员信息
        // "adminId": 1001,
        // "account": "dafdsa455",
        // "adminName": "admin",
        // "adminPhone": "13974999769",
        // "status": 1,
        // "adminPassword": "1234442",
        // "adminType": 1
      }
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.temp = {};
      this.tempAdminData={}
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
      console.log('rowwww', row)
      this.tempAdminData = Object.assign({}, row) // copy obj
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
    },
    handlePicSuccess(file, fileList) {
      // 图片上传删除
      this.dialogImageUrl = 'http://source.zouzhengming.com/MSg6YdvsFb8FDCZRStziw.jpg'
      console.log(file, fileList);
    },
    beforePicUpload() {
      // 图片上传 预览
      console.log('file', file)
      // this.dialogImageUrl = file.url;
      this.dialogImageUrl = 'http://source.zouzhengming.com/MSg6YdvsFb8FDCZRStziw.jpg'
      // this.dialogPictureVisible = true;
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
   .avatar-uploader > .el-upload {
    border: 1px dashed #409EFF;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px dashed #8c939d;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

