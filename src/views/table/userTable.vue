<template>
  <div class="app-container">
    <el-row style="margin: 0px 0 20px 10px;">
      <el-button size="large" v-for="tab in tabs" :class="tab.active? 'tab_active' : ''" :key="tab.type" @click="changeTab(tab)">{{ tab.tabName }}</el-button>
    </el-row>
    <div class="filter-container">
      <el-button v-if="curTab === 1" class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-edit" @click="handleCreate">{{ $t('table.addCompany') }}</el-button>
      <el-button v-if="curTab === 2" class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-edit" @click="handleCreate">{{ $t('table.addUser') }}</el-button>
      <el-button v-if="curTab === 3" class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-edit" @click="handleCreate">{{ $t('table.addMaster') }}</el-button>
      <el-input v-if="curTab !== 2" v-model="searchContent" :placeholder="$t('table.title')" style="width: 300px;float:right">
        <el-button  slot="append" icon="el-icon-search" type="success" @click="handleFilter" />
      </el-input>
      <el-button v-if="curTab === 2" size="mini" style="float:right" type="danger" @click="dialogSearchVisible=true">企业用户筛选</el-button>
    </div>
    <!-- 企业-->
    <el-table
      v-if="curTab === 1"
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;margin-top: 8px">
      <el-table-column :label="$t('table.companyName')"  align="center" width="250">
        <template slot-scope="scope">
          <span>{{ scope.row.companyName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.headName')" align="center" width="350">
        <template slot-scope="scope">
          <span>{{ scope.row.headName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.phone')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.createTime')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime ? moment.unix(scope.row.createTime).format("YYYY-MM-DD hh:mm:ss") : "暂无"}}</span>
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
    <!-- 企业end-->
    <!-- 企业用户-->
    <el-table
      v-if="curTab === 2"
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;margin-top: 8px">
      <el-table-column :label="$t('table.headImg')"  align="center">
        <template slot-scope="scope">
          <span>
            <img width="40" height="40" :src="scope.row.headImg" />
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.userId')"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userId }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.userName')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.userTitle')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.createTime')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime ? moment.unix(scope.row.createTime).format("YYYY-MM-DD hh:mm:ss") : '暂无' }}</span>
        </template>
      </el-table-column>
      
      <el-table-column :label="$t('table.loginTime')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.lastLoginTime ? moment.unix(scope.row.lastLoginTime).format("YYYY-MM-DD hh:mm:ss") : '暂无'}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.isDelete')" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 1">
            启用
          </span>
          <span v-if="scope.row.status === 2">
            禁用
          </span>
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
    <!-- 企业用户end-->
    <!-- 专家 -->
    <el-table
      v-if="curTab === 3"
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;margin-top: 8px">
      <el-table-column :label="$t('table.userId')"  align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.userId }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.userName')" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.userTitle')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.goodField')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.goodField }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.createTime')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime ? moment.unix(scope.row.createTime).format("YYYY-MM-DD hh:mm:ss"): '暂无'}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.expertIsCert')" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.expertIsCert === 1">
            已认证
          </span>
          <span v-if="scope.row.expertIsCert === 0">
            未认证
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.isDelete')" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 1">
            启用
          </span>
          <span v-if="scope.row.status === 2">
            禁用
          </span>
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
    <!-- 专家 end-->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :pageSize.sync="listQuery.pageSize" @pagination="getList" />
    <el-dialog title="企业用户模糊查询" :visible.sync="dialogSearchVisible">
      <el-form :model="searchObject" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('table.companyName')">
          <el-input v-model="searchObject.companyNameLike"/>
        </el-form-item>
        <el-form-item :label="$t('table.userName')">
          <el-input v-model="searchObject.userNameLike"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSearchVisible = false;">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="handlerSearchFilter">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog v-if="curTab === 1" :title="`${textMap[dialogStatus]}企业`" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="tempCompanyData" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('table.companyName')" prop="companyName">
          <el-input v-model="tempCompanyData.companyName"/>
        </el-form-item>
        <el-form-item :label="$t('table.cardNo')" prop="cardNo">
          <el-input v-model="tempCompanyData.cardNo"/>
        </el-form-item>
        <el-form-item :label="$t('table.cardPic')" prop="cardPic">
          <el-upload
            enctype="multipart/form-data"
            class="avatar-uploader"
            :headers="{token}"
            :action="uploadUrl()"
            :show-file-list="false"
            :on-success="handleCompanySuccess"
            :before-upload="beforeCompanyUpload">
            <img v-if="tempCompanyData.cardPic" :src="tempCompanyData.cardPic" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item :label="$t('table.headName')" prop="headName">
          <el-input v-model="tempCompanyData.headName"/>
        </el-form-item>
        <el-form-item :label="$t('table.phone')" prop="phone">
          <el-input v-model="tempCompanyData.phone"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false;">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog v-if="curTab === 2" :title="`${textMap[dialogStatus]}用户`" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="tempUserData" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item label="关联公司" prop="companyId">
          <el-select v-model="tempUserData.companyId" clearable placeholder="请选择关联企业">
            <el-option
              v-for="(item, index) in companyData"
              :key="index"
              :label="item.companyName"
              :value="item.companyId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.userName')" prop="userName">
          <el-input v-model="tempUserData.userName"/>
        </el-form-item>
        <el-form-item :label="$t('table.userPhone')" prop="userPhone">
          <el-input v-model="tempUserData.userPhone"/>
        </el-form-item>
        <el-form-item :label="$t('table.userPassword')" prop="userPassword">
          <el-input v-model="tempUserData.userPassword"/>
        </el-form-item>
        <el-form-item :label="$t('table.headImg')" prop="headImg">
          <!-- TODO -->
          <!-- 头像上传 -->
          <el-upload
            enctype="multipart/form-data"
            class="avatar-uploader"
            :headers="{token}"
            :action="uploadUrl()"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="tempUserData.headImg" :src="tempUserData.headImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item :label="$t('table.userTitle')" prop="userTitle">
          <el-input v-model="tempUserData.userTitle"/>
        </el-form-item>
        <el-form-item :label="$t('table.isDelete')" prop="isDelete">
          <el-switch
            v-model="tempUserData.statusType"
            active-color="#13ce66"
            active-text="启用"
            inactive-text="禁用"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false;temp={}">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog v-if="curTab === 3" :title="`${textMap[dialogStatus]}专家`" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="tempMasterData" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('table.headImg')" prop="headImg">
          <!-- TODO -->
           <el-upload
            enctype="multipart/form-data"
            class="avatar-uploader"
            :headers="{token}"
            :action="uploadUrl()"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="tempMasterData.headImg" :src="tempMasterData.headImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <!-- 头像上传 -->
          <!-- <span><img width="100" height="100" :src="tempMasterData.headImg" alt=""></span> -->
        </el-form-item>
        <el-form-item :label="$t('table.userName')" prop="userName">
          <el-input v-model="tempMasterData.userName"/>
        </el-form-item>
        <el-form-item :label="$t('table.userPhone')" prop="userPhone">
          <el-input v-model="tempMasterData.userPhone"/>
        </el-form-item>
        <el-form-item :label="$t('table.userPassword')" prop="userPassword">
          <el-input v-model="tempMasterData.userPassword"/>
        </el-form-item>
        <el-form-item :label="$t('table.goodField')" prop="goodField">
          <el-input v-model="tempMasterData.goodField"/>
        </el-form-item>
        <el-form-item :label="$t('table.userTitle')" prop="userTitle">
          <el-input v-model="tempMasterData.userTitle"/>
        </el-form-item>
        <el-form-item :label="$t('table.expertIsCert')" prop="expertIsCert">
          <el-switch
            v-model="tempMasterData.expertIsCertStatus"
            active-color="#13ce66"
            active-text="已认证"
            inactive-text="未认证"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item :label="$t('table.isDelete')" prop="isDelete">
          <el-switch
            v-model="tempMasterData.statusType"
            active-color="#13ce66"
            active-text="启用"
            inactive-text="禁用"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false;temp={}">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="userTypeMap[curTab]+textMap['checkDetail']" :visible.sync="checkDetailVisible">
      <el-form v-if="curTab === 2" :model="tempDetailData" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('table.headImg')">
          <span>
            <img width="40" height="40" :src="tempDetailData.headImg" />
          </span>
        </el-form-item>
        <el-form-item :label="$t('table.userId')"  align="center">
            <span>{{ tempDetailData.userId }}</span>
        </el-form-item>
        <el-form-item :label="$t('table.userName')" align="center">
            <span>{{ tempDetailData.userName }}</span>
        </el-form-item>
        <el-form-item label="登录账户名" align="center">
            <span>{{ tempDetailData.account }}</span>
        </el-form-item>
        <el-form-item :label="$t('table.userTitle')" align="center">
            <span>{{ tempDetailData.userTitle }}</span>
        </el-form-item>
        <el-form-item :label="$t('table.createTime')" align="center">
            <span>{{ tempDetailData.createTime ? moment.unix(tempDetailData.createTime).format("YYYY-MM-DD hh:mm:ss") : '暂无' }}</span>
        </el-form-item>
        
        <el-form-item :label="$t('table.loginTime')" align="center">
            <span>{{ tempDetailData.lastLoginTime ? moment.unix(tempDetailData.lastLoginTime).format("YYYY-MM-DD hh:mm:ss") : '暂无'}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.isDelete')" align="center">
            <span v-if="tempDetailData.status === 1">
              启用
            </span>
            <span v-if="tempDetailData.status === 2">
              禁用
            </span>
        </el-form-item>
      </el-form>
      <el-form v-if="curTab === 1" :model="tempDetailData" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('table.companyName')">
          <span>{{ tempDetailData.companyName }}</span>
        </el-form-item>
        <el-form-item :label="$t('table.headName')">
          <span>{{ tempDetailData.headName }}</span>
        </el-form-item>
        <el-form-item :label="$t('table.phone')">
          <span>{{ tempDetailData.phone }}</span>
        </el-form-item>
        <el-form-item label="企业信用代码">
          <span>{{ tempDetailData.cardNo }}</span>
        </el-form-item>
        <el-form-item label="营业执照">
          <span><img width="200" height="300" :src="tempDetailData.cardPic" alt=""></span>
        </el-form-item>
        <el-form-item :label="$t('table.createTime')">
          <span>{{ tempDetailData.createTime ? moment.unix(tempDetailData.createTime).format("YYYY-MM-DD hh:mm:ss") : "暂无"}}</span>
        </el-form-item>
      </el-form>
      <el-form v-if="curTab === 3" :model="tempDetailData" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('table.headImg')">
          <span>
            <img width="40" height="40" :src="tempDetailData.headImg" />
          </span>
        </el-form-item>
        <el-form-item :label="$t('table.userId')">
          <span>{{ tempDetailData.userId }}</span>
        </el-form-item>
        <el-form-item :label="$t('table.userName')">
          <span>{{ tempDetailData.userName }}</span>
        </el-form-item>
        <el-form-item label="登录账户名">
            <span>{{ tempDetailData.account }}</span>
        </el-form-item>
        <el-form-item :label="$t('table.userTitle')">
          <span>{{ tempDetailData.userTitle }}</span>
        </el-form-item>
        <el-form-item :label="$t('table.goodField')">
          <span>{{ tempDetailData.goodField }}</span>
        </el-form-item>
        <el-form-item :label="$t('table.createTime')">
          <span>{{ tempDetailData.createTime ? moment.unix(tempDetailData.createTime).format("YYYY-MM-DD hh:mm:ss"): '暂无'}}</span>
        </el-form-item>
        <el-form-item :label="$t('table.expertIsCert')">
          <span v-if="tempDetailData.expertIsCert === 1">
            已认证
          </span>
          <span v-if="tempDetailData.expertIsCert === 0">
            未认证
          </span>
        </el-form-item>
        <el-form-item :label="$t('table.isDelete')">
          <span v-if="tempDetailData.status === 1">
            启用
          </span>
          <span v-if="tempDetailData.status === 2">
            禁用
          </span>
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
import moment from 'moment'
import md5 from 'md5'
import { Message, MessageBox } from 'element-ui'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'publicTable',
  components: { Pagination },
  data() {
    return {
      tabs: [
      { tabName: '企业列表', type: 1, active: true },
      { tabName: '用户列表', type: 2, active: false },
      { tabName: '专家列表', type: 3, active: false }
    ],
      curTab: 1,
      type: 1,
      tempDetailData: {},
      search: '',
      imageUrl: '',
      tableKey: 0,
      moment: moment,
      list: [],
      total: 0,
      searchContent: '',
      dialogSearchVisible: false,
      listLoading: true,
      searchObject: {
        // 用户列表的筛选
        companyNameLike: '',
        userNameLike: ''
      },
      listQuery: {
        page: 1,
        pageSize: 10
      },
      tempCompanyData: {
        // 添加公司信息
        "companyName": "",
        "cardNo": "",
        "cardPic": "",
        "headName": "",
        "phone": ""
      },
      tempUserData: {
        // 添加用户信息
        "companyId": "",
        "userName": "",
        "userPhone": "",
        "userPassword": "",
        "headImg": "",
        "userTitle": "",
        "statusType": true,
        "status": 1  // 1-启用，2-禁用
      },
      tempMasterData: {
        "userName": "",
        "userPhone": "",
        "headImg": "",
        "userTitle": "",
        "goodField": "",
        expertIsCertStatus: true,
        "expertIsCert": 1, // 1是 2否 认证通过
        "userPassword": "",
        "statusType": true,
        "status": 1 // 1-启用，2-禁用
      },
      temp: {
      },
      dialogFormVisible: false,
      checkDetailVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增',
        allImport: '批量导入',
        checkDetail: '详情',
        highSearch: '高级检索'
      },
      rules: {
        goodField: [{ required: true, message: '必填项', trigger: 'blur' }],
        companyId: [{ required: true, message: '必填项', trigger: 'blur' }],
        userName: [{ required: true, message: '必填项', trigger: 'blur' }],
        userPhone: [{ required: true, message: '必填项', trigger: 'blur' }],
        userPassword: [{ required: true, message: '必填项', trigger: 'blur' }],
        // headImg: [{ required: true, message: '必填项', trigger: 'blur' }],
        userTitle: [{ required: true, message: '必填项', trigger: 'blur' }],
        status: [{ required: true, message: '必填项', trigger: 'blur' }],
        companyName: [{ required: true, message: '必填项', trigger: 'blur' }],
        cardNo: [{ required: true, message: '必填项', trigger: 'blur' }],
        cardPic: [{ required: true, message: '必填项', trigger: 'blur' }],
        headName: [{ required: true, message: '必填项', trigger: 'blur' }],
        phone: [{ required: true, message: '必填项', trigger: 'blur' }]
      },
      downloadLoading: false,
      dialogPictureVisible: false,
      // dialogImageUrl: 'http://source.zouzhengming.com/MSg6YdvsFb8FDCZRStziw.jpg',
      userTypeMap: {
        1: "企业",
        2: "用户",
        3: "专家"
      }
    }
  },
   computed: {
    ...mapGetters([
      "token",
      'items',
      'listQuerys',
      'totals',
      "companyData",
      "detailData"
    ])
  },
  created() {
    this.getList()
  },
  beforeDestroy() {
    Object.assign(this.$data, this.$options.data())
  },
  methods: {
    handleCompanySuccess(res, file) {
      this.imageUrl = res.data
      this.tempCompanyData.cardPic = res.data
    },
    beforeCompanyUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      // return isJPG && isLt2M;
      return isLt2M;
    },
    handleAvatarSuccess(res, file) {
      if (this.curTab === 2) {
        this.tempUserData.headImg = res.data
      }
      if (this.curTab === 3) {
        this.tempMasterData.headImg = res.data
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      // return isJPG && isLt2M;
      return isLt2M;
      
    },

    uploadUrl(){
      var url = '/sys/upload/file'// 生产环境和开发环境的判断
      return url
    },
    changeTab(item) {
      let tempTabs = this.tabs
      this.curTab = item.type
      let temp = []
      this.tabs = tempTabs.map(tab => {tab.active = false;return tab;})
      item.active = true
      this.getList()
    },
    getList() {
      this.listLoading = true
      let tempUrl = ''
      this.listQuery = Object.assign({}, {
        // 列表初始化条件
        page: 1,
        pageSize: 10
      })
      if (this.curTab === 1) {
        tempUrl = '/sys/company/list'
        this.listQuery.content = this.searchContent
      }
      if (this.curTab === 2) {
        tempUrl = '/sys/companyUser/list'
        this.listQuery = Object.assign({...this.listQuery}, {...this.searchObject} )
      }
      if (this.curTab === 3) {
        tempUrl = '/sys/expert/list'
        this.listQuery.content = this.searchContent
      }
      let params = {
        listQuery: {...this.listQuery},
        fetchUrl: tempUrl
      }
      this.$store.dispatch("GetList", params).then( res => {
        this.list = this.items
        if (this.curTab === 1) {
          this.$store.dispatch('StoreCurCompanyData', this.items).then( res => {
            console.log('存入store成功', res)
          })
        }
        this.listLoading = false
        this.listQuery = {
          // 搜索完成初始化条件
          page: 1,
          pageSize: 10
        }
      })
    },
    handlerSearchFilter() {
      this.getList()
      this.dialogSearchVisible = false
      this.searchObject = {
        companyNameLike: '',
        userNameLike: ''
      }
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
      
    },
    handleCheckDetail(row) {
      let params = {
        data: {},
        fetchUrl: ''
      }
      if (this.curTab === 1) {
        params.fetchUrl = `/sys/company/detail?companyId=${row.companyId}`
      }
      if (this.curTab === 2) {
        params.fetchUrl = `/sys/companyUser/detail?userId=${row.userId}`
      }
      if (this.curTab === 3) {
        params.fetchUrl = `/sys/expert/detail?userId=${row.userId}`
      }
      this.$store.dispatch('GetDetail', params).then(res=>{
        this.tempDetailData = this.detailData
        this.checkDetailVisible = true
      })

    },
    checkDetailSubmit () {
      this.checkDetailVisible = false
    },
    handleCreate() {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.tempCompanyData.cardPic = this.imageUrl
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let params = {
            data: null,
            fetchUrl: ''
          }
          if (this.curTab === 1) {
            params.data = this.tempCompanyData
            params.fetchUrl = '/sys/company/add'
          }
          if (this.curTab === 2) {
            this.tempUserData.userPassword = md5(this.tempUserData.userPassword)
            this.tempUserData.status = this.tempUserData.statusType ? 1 : 2
            params.data = this.tempUserData
            params.fetchUrl = '/sys/companyUser/add'
          }
          if (this.curTab === 3) {
            this.tempMasterData.status = this.tempMasterData.statusType ? 1 : 2
            this.tempMasterData.userPassword = md5(this.tempMasterData.userPassword)
            this.tempMasterData.expertIsCert = this.tempMasterData.expertIsCertStatus ? 1 : 0
            params.data = this.tempMasterData
            params.fetchUrl = '/sys/expert/add'
          }
          this.$store.dispatch("AddMembers", params).then( res => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: `创建${this.userTypeMap[this.curTab]}成功`,
              type: 'success',
              duration: 2000
            })
            this.getList()
            this.tempCompanyData = {}
            this.tempMasterData = {}
            this.tempUserData = {}
            this.imageUrl = ''
          })
        }
      })
    },
    handleUpdate(row) {
      let curTab = this.curTab
      if(curTab === 1) {
        this.tempCompanyData = Object.assign({}, row)
      }
      if(curTab === 2) {
        this.tempUserData = Object.assign({}, row)
      }
      if(curTab === 3) {
        this.tempMasterData = Object.assign({}, row)
      }
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let params = {
            data: null,
            fetchUrl: ''
          }
          if (this.curTab === 1) {
            params.data = this.tempCompanyData
            params.fetchUrl = '/sys/company/edit'
          }
          if (this.curTab === 2) {
            this.tempUserData.status = this.tempUserData.statusType ? 1 : 2
            this.tempUserData.userPassword = md5(this.tempUserData.userPassword)
            params.data = this.tempUserData
            params.fetchUrl = '/sys/companyUser/edit'
          }
          if (this.curTab === 3) {
            this.tempMasterData.status = this.tempMasterData.statusType ? 1 : 2
            this.tempMasterData.userPassword = md5(this.tempMasterData.userPassword)
            this.tempMasterData.expertIsCert = this.tempMasterData.expertIsCertStatus ? 1 : 0
            params.data = this.tempMasterData
            params.fetchUrl = '/sys/expert/edit'
          }
          this.$store.dispatch("EditMembers", params).then( res => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: `修改${this.userTypeMap[this.curTab]}成功`,
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
        }
      })
    },
    handleModifyStatus(row) {
      MessageBox.confirm(
          `确定要删除该${this.userTypeMap[this.curTab]}信息吗？`,
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          let params = {
            data: {},
            fetchUrl: ''
          }
          if (this.curTab === 1) {
            params.fetchUrl = `/sys/company/delete?companyId=${row.companyId}`
          }
          if (this.curTab === 2) {
            params.fetchUrl = `/sys/companyUser/delete?userId=${row.userId}`
          }
          if (this.curTab === 3) {
            params.fetchUrl = `/sys/expert/delete?userId=${row.userId}`
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
    handlePicSuccess(file, fileList) {
      // 图片上传删除
      // this.dialogImageUrl = 'http://source.zouzhengming.com/MSg6YdvsFb8FDCZRStziw.jpg'
      console.log(file, fileList);
    },
    beforePicUpload() {
      // 图片上传 预览
      console.log('file', file)
      // this.dialogImageUrl = file.url;
      // this.dialogImageUrl = 'http://source.zouzhengming.com/MSg6YdvsFb8FDCZRStziw.jpg'
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

