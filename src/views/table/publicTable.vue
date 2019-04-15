<template>
  <div class="app-container">
    <el-row style="margin: 0px 0 20px 10px;">
      <el-button size="large" v-for="tab in tabs" :class="tab.active? 'tab_active' : ''" :key="tab.kinds" @click="changeTab(tab)">{{ tab.tabName }}</el-button>
    </el-row>
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-edit" @click="handleCreate">{{ $t('table.addsingle') }}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-star-off" @click="handleImportCreate">{{ $t('table.addmore') }}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-star-off" @click="handlerMoreDelete">批量删除</el-button>
      <div class="high-search" @click="dialogFormSearchVisible=true">
        高级检索
      </div>
    </div>
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column :label="curTab < 6 ? '欧盟序号':'韩国序号'" align="center" width="105">
        <template slot-scope="scope">
          <span>{{ scope.row.uid }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="fieldData.list.chinaName" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.chinaName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="fieldData.list.englishName" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.englishName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="fieldData.list.chinaId" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.chinaId }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="curTab !== 3 && curTab !== 11" :label="fieldData.list.sourceCas" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sourceCas }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="curTab === 3 || curTab === 11" :label="fieldData.list.sourceCi" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sourceCi }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button size="mini" type="success" @click="handleCheckDetail(scope.row.sourceId,'checkItem')">{{ $t('table.checkItem') }}
          </el-button>
          <el-button size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')">{{ $t('table.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="totals>0" :total="totals" :page.sync="listQuery.page" :pageSize.sync="listQuery.pageSize" @pagination="getList" />
    <el-dialog title="高级检索" :visible.sync="dialogFormSearchVisible">
      <el-form :model="searchObject" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item v-if="curTab < 6" label="欧盟序号" align="center" width="105">
            <el-input v-model="searchObject.oumengUid"/>
        </el-form-item>
        <el-form-item v-if="curTab >= 6" label="韩国序号" align="center" width="105">
            <el-input v-model="searchObject.hanUid"/>
        </el-form-item>
        <el-form-item :label="fieldData.list.chinaName" align="center">
            <el-input v-model="searchObject.chinaName"/>
        </el-form-item>
        <el-form-item :label="fieldData.list.englishName" align="center" >
            <el-input v-model="searchObject.englishName"/>
        </el-form-item>
        <el-form-item :label="fieldData.list.chinaId" align="center">
            <el-input v-model="searchObject.chinaId"/>
        </el-form-item>
        <el-form-item v-if="curTab !== 3 && curTab !== 11" :label="fieldData.list.sourceCas" align="center">
            <el-input v-model="searchObject.sourceCas"/>
        </el-form-item>
        <el-form-item v-if="curTab === 3 || curTab === 11" :label="fieldData.list.sourceCi" align="center">
            <el-input v-model="searchObject.sourceCi"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormSearchVisible = false;">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="globeSearch">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataFormOp" :rules="rules" :model="tempDetailData" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item v-if="curTab >= 6" label="韩国序号" prop="uid">
            <el-input v-model="tempDetailData.hanUid"/>
        </el-form-item>
        <el-form-item v-if="curTab < 6" label="欧盟序号" prop="uid">
            <el-input v-model="tempDetailData.oumengUid"/>
        </el-form-item>
        <el-form-item :label="fieldData.detail.chinaName" prop="chinaName">
            <el-input v-model="tempDetailData.chinaName"/>
        </el-form-item>
        <el-form-item :label="fieldData.detail.englishName" prop="englishName">
          <el-input v-model="tempDetailData.englishName"/>  
        </el-form-item>
        <el-form-item :label="fieldData.detail.chinaId" prop="chinaId">
          <el-input v-model="tempDetailData.chinaId"/>  
        </el-form-item>
        <el-form-item :label="fieldData.detail.remark" prop="remark">
          <el-input v-model="tempDetailData.remark"/>  
        </el-form-item>
        <el-form-item v-if="curTab !== 3 && curTab !== 11" :label="fieldData.detail.sourceCas" prop="sourceCas">
          <el-input v-model="tempDetailData.sourceCas"/>  
        </el-form-item>
        <el-form-item v-if="curTab === 3 || curTab === 11" :label="fieldData.detail.sourceCi" prop="sourceCi">
          <el-input v-model="tempDetailData.sourceCi"/>  
        </el-form-item>
        <el-form-item v-if="curTab === 1 || curTab === 6" :label="curTab < 6 ? '欧盟':'韩国'" prop="other">
          <el-input v-model="tempDetailData.other"/>  
        </el-form-item>
        <el-form-item v-if="curTab === 1 || curTab === 6" :label="fieldData.detail.china" prop="china">
          <el-input v-model="tempDetailData.china"/>  
        </el-form-item>
        <el-form-item v-if="curTab !== 1 && curTab !== 3 && curTab !== 6 && curTab !== 11" :label="curTab < 6 ? '欧盟限量':'韩国限量'" prop="otherLimit">
          <el-input v-model="tempDetailData.otherLimit"/>  
        </el-form-item>
        <el-form-item v-if="curTab !== 1 && curTab !== 3 && curTab !== 6 && curTab !== 11" :label="fieldData.detail.chinaLimit" prop="chinaLimit">
          <el-input v-model="tempDetailData.chinaLimit"/>  
        </el-form-item>
        <el-form-item v-if="curTab === 3 || curTab === 11" :label="fieldData.detail.sourceOdds" prop="sourceOdds">
          <el-input v-model="tempDetailData.sourceOdds"/>  
        </el-form-item>
        <el-form-item v-if="curTab === 3 || curTab === 11" :label="fieldData.detail.sourceEye" prop="sourceEye">
          <el-input v-model="tempDetailData.sourceEye"/>  
        </el-form-item>
        <el-form-item v-if="curTab === 3 || curTab === 11" :label="fieldData.detail.sourceMucous" prop="sourceMucous">
          <el-input v-model="tempDetailData.sourceMucous"/>  
        </el-form-item>
        <el-form-item v-if="curTab === 3 || curTab === 11" :label="fieldData.detail.sourceSkin" prop="sourceSkin">
          <el-input v-model="tempDetailData.sourceSkin"/>  
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false;temp={}">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="textMap['allImport']" :visible.sync="allImportVisible"
      v-loading="uploadLoading"
      element-loading-text="拼命上传中..."
      element-loading-spinner="el-icon-loading">
      <div style="with:100%">
        <div style="margin-bottom: 20px">已有模板，直接导入</div>
          <el-upload
            class="upload-demo"
            :action="uploadUrl()"
            ref="upload"
            :on-progress="uploadProgress"
            :on-error="uploadError"
            :headers="{token}"
            :data="{kinds: curTab}"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="uploadSuccess"
            :file-list="fileList"
            enctype="multipart/form-data"
            :before-upload="beforeExcelUpload"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传EXCEL文件，且不超过10M</div>
          </el-upload>
        <!-- <upload-excel-component :on-success="handleExcelSuccess" :before-upload="beforeExcelUpload" /> -->
      </div>
      <div style="margin-top: 20px">
        没有模板,下载模板
        <el-button style="margin-left: 20px" type="primary" @click="downLoadTemplate">点击获取当前数据模板下载地址</el-button>
        <div style="line-height: 40px;">
          <a :href="curExcelUrl" target="_blank" rel="noopener noreferrer">{{curExcelUrl}}</a>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="allImportVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="allImportCreat">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="textMap['checkDetail']" :visible.sync="checkDetailVisible">
      <el-form :model="curDetailData" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="curTab < 6 ? '欧盟序号':'韩国序号'">
          {{curDetailData.uid}}
        </el-form-item>
        <el-form-item :label="fieldData.detail.chinaName">
          {{curDetailData.chinaName}}
        </el-form-item>
        <el-form-item :label="fieldData.detail.englishName">
          {{curDetailData.englishName}}
        </el-form-item>
        <el-form-item :label="fieldData.detail.chinaId">
          {{curDetailData.chinaId}}
        </el-form-item>
        <el-form-item :label="fieldData.detail.remark">
          {{curDetailData.remark}}
        </el-form-item>
        <el-form-item v-if="curTab !== 3 && curTab !== 11" :label="fieldData.detail.sourceCas">
          {{curDetailData.sourceCas}}
        </el-form-item>
        <el-form-item v-if="curTab === 3 || curTab === 11" :label="fieldData.detail.sourceCi">
          {{curDetailData.sourceCi}}
        </el-form-item>
        <el-form-item v-if="curTab === 1 || curTab === 6" :label="fieldData.detail.other">
          {{curDetailData.other}}
        </el-form-item>
        <el-form-item v-if="curTab === 1 || curTab === 6" :label="fieldData.detail.china">
          {{curDetailData.china}}
        </el-form-item>
        <el-form-item v-if="curTab !== 1 && curTab !== 3 && curTab !== 6 && curTab !== 11" :label="curTab < 6 ? '欧盟限量':'韩国限量'">
          {{curDetailData.otherLimit}}
        </el-form-item>
        <el-form-item v-if="curTab !== 1 && curTab !== 3 && curTab !== 6 && curTab !== 11" :label="fieldData.detail.chinaLimit">
          {{curDetailData.chinaLimit}}
        </el-form-item>
        <el-form-item v-if="curTab === 3 || curTab === 11" :label="fieldData.detail.sourceOdds">
          {{curDetailData.sourceOdds}}
        </el-form-item>
        <el-form-item v-if="curTab === 3 || curTab === 11" :label="fieldData.detail.sourceEye">
          {{curDetailData.sourceEye}}
        </el-form-item>
        <el-form-item v-if="curTab === 3 || curTab === 11" :label="fieldData.detail.sourceMucous">
          {{curDetailData.sourceMucous}}
        </el-form-item>
        <el-form-item v-if="curTab === 3 || curTab === 11" :label="fieldData.detail.sourceSkin">
          {{curDetailData.sourceSkin}}
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="checkDetailSubmit">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
// import { parseTime } from '@/utils'
import { mapGetters } from 'vuex'
import { Message, MessageBox } from 'element-ui'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
// const tabsU = [ // 欧盟
//     { tabName: '禁用成分', kinds: 1, active: true},
//     { tabName: '限用成分', kinds: 2, active: false},
//     { tabName: '着色剂', kinds: 3, active: false},
//     { tabName: '防腐剂', kinds: 4, active: false },
//     { tabName: '防晒剂', kinds: 5, active: false }
//   ]
// const tabsK = [ // 韩国
//     { tabName: '禁用成分', kinds: 6, active: true },
//     { tabName: '限用成分', kinds: 7, active: false },
//     { tabName: '防晒剂', kinds: 8, active: false },
//     { tabName: '染发剂', kinds: 9, active: false },
//     { tabName: '其他准用成分', kinds: 10, active: false },
//     { tabName: '准用色素', kinds: 11, active: false }
//   ]

const allFieldData = {
  list: {
    "uid": "欧盟序号",
    "chinaName": "中文名",
    "englishName": "英文名",
    "chinaId": "中国序号",
    "sourceCas": "CAS号", // 1,2,4,5,6,7,8,9,10
    "sourceCi": "CI号" // 3,11
  },
  detail: {
    "uid": "欧盟序号",
    "chinaName": "中文名",
    "englishName": "英文名",
    "chinaId": "中国序号",
    "remark": "备注",
    "sourceCas": "CAS号", // 1,2,4,5,6,7,8,9,10
    "sourceCi": "CI号", // 3,11
    // 1,6
    "other": "其他",
    "china": "中国",
    "otherLimit": "欧盟限量", // 除了1,3,6,11
    "chinaLimit": "中国限量", // 除了1,3,6,11
    // 3,11
    "sourceOdds": "其他化妆品",
    "sourceEye": "除眼部之外",
    "sourceMucous": "不与粘膜接触",
    "sourceSkin": "皮肤暂时接触",
  }
}
export default {
  name: 'publicTable',
  components: { Pagination },
  data() {
    return {
      tabs: this.$route.path === '/european-table' ? [ // 欧盟
    { tabName: '禁用组分', kinds: 1, active: true},
    { tabName: '限用组分', kinds: 2, active: false},
    { tabName: '准用着色剂', kinds: 3, active: false},
    { tabName: '准用防腐剂', kinds: 4, active: false },
    { tabName: '准用防晒剂', kinds: 5, active: false }
  ] : [ // 韩国
    { tabName: '禁用组分', kinds: 6, active: true },
    { tabName: '准用防腐剂', kinds: 7, active: false },
    { tabName: '准用防晒剂', kinds: 8, active: false },
    { tabName: '准用染发剂', kinds: 9, active: false },
    { tabName: '其他准用成分', kinds: 10, active: false },
    { tabName: '准用色素', kinds: 11, active: false }
  ],
      search: '',
      uploadLoading: false,
      tableKey: 0,
      curTab: this.$route.path === '/european-table' ? 1 : 6,
      list: [],
      curDetailData: {},
      curExcelUrl: '',
      fieldData: allFieldData,
      listLoading: true,
      listQuery: {
        page: 1,
        pageSize: 10,
        content: '', // 搜索内容
      },
      tempDetailData: { // 编辑+创建
        "uid": "",
        "chinaName": "",
        "englishName": "",
        "chinaId": "",
        "remark": "",
        "sourceCas": "", // 1,2,4,5,6,7,8,9,10
        "sourceCi": "", // 3,11
        // 1,6
        "other": "",
        "china": "",
        "otherLimit": "", // 除了1,3,6,11
        "chinaLimit": "", // 除了1,3,6,11
        // 3,11
        "sourceOdds": "",
        "sourceEye": "",
        "sourceMucous": "",
        "sourceSkin": "",
      },
      searchObject: { // 搜索
        oumengUid: '', // 欧盟/韩国序号
        hanUid: '',
        chinaName: '', //中文名
        englishName: '', // 英文名
        sourceCas: '', // cas
        sourceCi: '', //ci
        chinaId: '', // 中文序号
      },
      temp: {
      },
      fileList: [],
      curHost: window.location.host,
      dialogFormVisible: false,
      allImportVisible: false,
      checkDetailVisible: false,
      dialogFormSearchVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增',
        allImport: '批量导入',
        checkDetail: '查看详细',
        highSearch: '高级检索'
      },
      rules: {
        uid: [{ required: true, message: '必填项', trigger: 'blur' }],
        chinaName: [{ required: true, message: '必填项', trigger: 'blur' }],
        englishName: [{ required: true, message: '必填项', trigger: 'blur' }],
        sourceCas: [{ required: true, message: '必填项', trigger: 'blur' }],
        sourceCi: [{ required: true, message: '必填项', trigger: 'blur' }],
        chinaId: [{ required: true, message: '必填项', trigger: 'blur' }]
      },
      excelTableData: [],
      excelTableHeader: [],
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
   computed: {
    ...mapGetters([
      "token",
      'items',
      'listQuerys',
      'totals',
      "companyData",
      "detailData",
      "loadExcelUrl",
      "excelFile"
    ])
  },
  methods: {
    changeTab(item) {
      let tempTabs = this.tabs
      this.curTab = item.kinds
      let temp = []
      this.tabs = tempTabs.map(tab => {tab.active = false; return tab;})
      item.active = true
      this.getList()
    },
    uploadUrl(){
      // var url = process.env.BASE_API + `/sys/source/file?kinds=${this.curTab}` 
      var url = `/sys/source/file?kinds=${this.curTab}` // 生产环境和开发环境的判断
      // 生产环境和开发环境的判断
      return url
    },
    uploadProgress(e, file, filelist){

    },
    uploadError() {
      this.$notify({
        title: '错误',
        message: '上传失败',
        type: 'fail',
        duration: 2000
      })
      this.uploadLoading = false
    },
    uploadSuccess(){
      this.$notify({
        title: '成功',
        message: '操作成功',
        type: 'success',
        duration: 2000
      })
      this.uploadLoading = false
      this.getList()
      this.fileList = []
      this.allImportVisible = false
    },
    submitUpload(file) {
      this.uploadLoading = true
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeExcelUpload(file) {
      // let type = file.name.split('.')
      // if (type[1] === 'xlsx') {
      //   return file
      // } else {
      //   this.$message.error('上传文件只能是 xlsx 格式!')
      //   return false
      // }
      // return true
    },
    downLoadTemplate() {
      this.curExcelUrl = ''
      let params = {
        data: {},
        fetchUrl: `/sys/source/getModel?kinds=${this.curTab}`
      }
      this.$store.dispatch("DownloadExcelFile", params).then(res => {
        this.curExcelUrl = res.data
      })
    },
    globeSearch() {
      this.searchObject.sourceType = this.curTab < 6 ? 1 : 2
      this.listQuery = Object.assign({...this.listQuery}, {...this.searchObject} )
      this.getList()
      this.dialogFormSearchVisible = false
    },
     getList() {
      this.listLoading = true
      let kinds = this.curTab
      this.tempDetailData.sourceType = this.curTab < 6 ? 1 : 2
      this.listQuery.kinds = kinds
      let mergeListQuery = Object.assign({...this.listQuery}, {...this.tempListData} )
      let params = {
        listQuery: {...mergeListQuery},
        fetchUrl: "/sys/source/list"
      }
      this.$store.dispatch("GetList", params).then( res => {
        this.list = this.items
        this.listLoading = false
        this.listQuery.content = ''
        this.listQuery.oumengUid= ''
        this.listQuery.hanUid= ''
        this.listQuery.sourceType= ''
      })
    },
    handlerMoreDelete() {
      // TODOs
      MessageBox.confirm(
        '确定要删除该种类的所有数据吗？',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        let params = {
          data: {},
          type:"post",
          fetchUrl: '/sys/source/deleteKinds?kinds=' + this.curTab
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
    handleCheckDetail(sourceId) {
      this.checkDetailVisible = true
      let params = {
        data: {},
        fetchUrl: `/sys/source/detail?sourceId=${sourceId}`
      }
      this.$store.dispatch("GetDetail", params).then( res => {
        this.curDetailData = this.detailData
      })
    },
    checkDetailSubmit () {
      this.checkDetailVisible = false
    },
    handleModifyStatus(row, status) {
      MessageBox.confirm(
        '确定要删除该数据吗？',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        let params = {
          data: {},
          fetchUrl: '/sys/source/delete?sourceId=' + row.sourceId
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
        this.$refs['dataFormOp'].clearValidate()
      })
    },
    handleImportCreate() {
      this.allImportVisible = true
      this.curExcelUrl = ""
    },
    allImportCreat() {
      this.allImportVisible = false
    },
    createData() {
      this.tempDetailData.sourceType = this.curTab < 6 ? 1 : 2
      this.tempDetailData.kinds = this.curTab
      this.$refs['dataFormOp'].validate((valid) => {
        if (valid) {
          let params = {
            data: {...this.tempDetailData},
            fetchUrl: '/sys/source/add'
          }
          this.$store.dispatch("AddMembers", params).then( res => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: `操作成功`,
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
        }
      })
    },
    handleUpdate(row) {
      let params = {
        data: {},
        fetchUrl: `/sys/source/detail?sourceId=${row.sourceId}`
      }
      this.$store.dispatch("GetDetail", params).then( res => {
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.tempDetailData = this.detailData
        this.$nextTick(() => {
          this.$refs['dataFormOp'].clearValidate()
        })
      })
      
    },
    updateData() {
      this.$refs['dataFormOp'].validate((valid) => {
        if (valid) {
          let params = {
            data: {...this.tempDetailData},
            fetchUrl: '/sys/source/edit'
          }
          this.$store.dispatch("EditMembers", params).then( res => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: `修改成功`,
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
        }
      })
    }
  },
  watch: {
    '$route': {
      handler: function(newVal, oldVal){
        this.tabs = newVal.path === '/european-table' ? [ // 欧盟
    { tabName: '禁用组分', kinds: 1, active: true},
    { tabName: '限用组分', kinds: 2, active: false},
    { tabName: '准用着色剂', kinds: 3, active: false},
    { tabName: '准用防腐剂', kinds: 4, active: false },
    { tabName: '准用防晒剂', kinds: 5, active: false }
  ] : [ // 韩国
    { tabName: '禁用组分', kinds: 6, active: true },
    { tabName: '准用防腐剂', kinds: 7, active: false },
    { tabName: '准用防晒剂', kinds: 8, active: false },
    { tabName: '准用染发剂', kinds: 9, active: false },
    { tabName: '其他准用成分', kinds: 10, active: false },
    { tabName: '准用色素', kinds: 11, active: false }
  ],
        this.curTab = newVal.path === '/european-table' ? 1 : 6
        this.getList()
        // this.fieldData = newVal.path === '/european-table' ? fieldKinds1 : fieldKinds6
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

