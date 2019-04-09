<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button v-if="curAdminType === '1'" class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-edit" @click="handleCreate">{{ $t('table.addAdmin') }}</el-button>
      <el-input v-model="listQuery.content" :placeholder="$t('table.title')" style="width: 300px;float:right">
        <el-button slot="append" icon="el-icon-search" type="success" @click="handleFilter" />
      </el-input>
    </div>
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;margin-top: 8px">
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
          <span>{{ scope.row.lastLoginTime ? moment.unix(scope.row.lastLoginTime).format("YYYY-MM-DD hh:mm:ss"): '暂无'}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.isDelete')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.status === 1 ? "启用" : "禁用" }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" :disabled="curAdminType !== '1'" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button size="mini" :disabled="curAdminType !== '1'" type="danger" @click="handleModifyStatus(scope.row,'deleted')">{{ $t('table.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :pageSize.sync="listQuery.pageSize" @pagination="getList" />
    <el-dialog :title="`${textMap[dialogStatus]}管理员`" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('table.adminType')" prop="adminType">
          <template>
              <el-radio v-model="adminType" label="1">超级管理员</el-radio>
              <el-radio v-model="adminType" label="2">管理员</el-radio>
          </template>
        </el-form-item>
        
        <el-form-item :label="$t('table.adminName')" prop="adminName">
          <el-input v-model="dataForm.adminName"/>
        </el-form-item>
        <el-form-item :label="$t('table.adminPhone')" prop="adminPhone">
          <el-input v-model="dataForm.adminPhone"/>
        </el-form-item>
        <el-form-item :label="$t('table.adminPassword')" prop="adminPassword">
          <el-input v-model="dataForm.adminPassword"/>
        </el-form-item>
         <el-form-item :label="$t('table.isDelete')" prop="status">
           <!-- 是否禁用 -->
          <el-switch
            v-model="switchValue"
            active-text="启用"
            inactive-text="禁用">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false;">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import md5 from 'md5'
import {getAdminRole} from '@/utils/auth'
import { Message, MessageBox } from 'element-ui'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  name: 'systemTable',
  components: { Pagination },
  data() {
    return {
      search: '',
      tableKey: 0,
      list: [],
      total: 0,
      moment: moment,
      curAdminType: getAdminRole(),
      adminType: '2',
      dataForm: {
        "adminName": "",
        "adminPhone": "",
        "adminPassword": "",
        "status": 1,
        "adminType": '2'
      },
      switchValue: true,
      listLoading: true,
      listQuery: {
        page: 1,
        pageSize: 20,
        content: ''
      },
      adminTypeMap: {
        1: "管理员",
        2: "超级管理员"
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
        uid: [{ required: true, message: '必填项', trigger: 'blur' }],
        chinaName: [{ required: true, message: '必填项', trigger: 'blur' }],
        englishName: [{ required: true, message: '必填项', trigger: 'blur' }],
        sourceCas: [{ required: true, message: '必填项', trigger: 'blur' }],
        sourceCi: [{ required: true, message: '必填项', trigger: 'blur' }],
        chinaId: [{ required: true, message: '必填项', trigger: 'blur' }]
      },
      downloadLoading: false,
      dialogPictureVisible: false,
      dialogImageUrl: 'http://source.zouzhengming.com/MSg6YdvsFb8FDCZRStziw.jpg'
    }
  },
  computed: {
    ...mapGetters([
      'items',
      'listQuerys',
      'totals'
    ])
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      let params = {
        listQuery: this.listQuery,
        fetchUrl: '/sys/admin/list'
      }
      this.listLoading = true
      this.$store.dispatch("GetList", params).then( res => {
        this.listLoading = false
        this.listQuery = this.listQuerys
        this.total = this.totals
        this.list = this.items
      })
    },
    handleFilter() {
      this.getList()
    },
    handleCheckDetail(row, status) {
      this.checkDetailVisible = true
      this.tempAdminData = Object.assign({}, row) // copy obj
    },
    checkDetailSubmit () {
      this.checkDetailVisible = false
    },
    handleModifyStatus(row) {
      // /sys/admin/delete?adminId=1001
      MessageBox.confirm(
          '确定要删除该管理员吗？',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          let params = {
            data: {},
            fetchUrl: '/sys/admin/delete?adminId=' + row.adminId
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
    createData() {
      this.temp = {};
      this.tempAdminData={}
      this.dataForm.status = this.switchValue ? 1 : 2
      this.dataForm.adminType = this.adminType
      this.dataForm.adminPassword = md5(this.dataForm.adminPassword)
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let params = {
            data: this.dataForm,
            fetchUrl: '/sys/admin/add'
          }
          this.$store.dispatch("AddMembers", params).then( res => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: `创建${this.adminTypeMap[this.dataForm.adminType]}成功`,
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
        }
      })
    },
    handleUpdate(row) {
      console.log('rowwww', row)
      this.dataForm = Object.assign({}, row) // copy obj
      this.switchValue = row.status === 1 ? true : false
      this.adminType = row.adminType + ''
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.dataForm.status = this.switchValue ? 1 : 2
      this.dataForm.adminType = this.adminType
      this.dataForm.adminPassword = md5(this.dataForm.adminPassword)
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let params = {
            data: this.dataForm,
            fetchUrl: '/sys/admin/edit'
          }
          this.$store.dispatch("EditMembers", params).then( res => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: `更新成功`,
              type: 'success',
              duration: 2000
            })
            this.getList()
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

