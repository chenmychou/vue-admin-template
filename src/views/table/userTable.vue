<template>
  <div class="app-container">
    <el-row style="margin: 0px 0 20px 10px;">
      <el-button size="large" v-for="tab in tabs" :class="tab.active? 'tab_active' : ''" :key="tab.type" @click="changeTab(tab)">{{ tab.tabName }}</el-button>
    </el-row>
    <div class="filter-container">
      <el-button v-if="curTab === 1" class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-edit" @click="handleCreate">{{ $t('table.addCompany') }}</el-button>
      <el-button v-if="curTab === 2" class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-edit" @click="handleCreate">{{ $t('table.addUser') }}</el-button>
      <el-button v-if="curTab === 3" class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-edit" @click="handleCreate">{{ $t('table.addMaster') }}</el-button>
      <el-input v-model="listQuery.title" :placeholder="$t('table.title')" style="width: 300px;float:right">
        <el-button slot="append" icon="el-icon-search" type="success" @keyup.enter.native="handleFilter" />
      </el-input>
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
      style="width: 100%;margin-top: 8px"
      @sort-change="sortChange">
      <el-table-column :label="$t('table.id')" align="center" width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
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
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.isDelete')" align="center">
        <template slot-scope="scope">
          <span>
            <el-switch
              v-model="scope.row.isDelete === 1"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
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
      style="width: 100%;margin-top: 8px"
      @sort-change="sortChange">
      <el-table-column :label="$t('table.id')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.headImg')"  align="center">
        <template slot-scope="scope">
          <span>
            <img :src="scope.row.headImg" />
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
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      
      <el-table-column :label="$t('table.loginTime')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.loginTime }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.isDelete')" align="center">
        <template slot-scope="scope">
          <span>
            <el-switch
              v-model="scope.row.isDelete === 1"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
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
      style="width: 100%;margin-top: 8px"
      @sort-change="sortChange">
      <el-table-column :label="$t('table.id')" align="center" width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
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
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.expertIsCert')" align="center">
        <template slot-scope="scope">
          <span>
            <el-switch
              v-model="scope.row.expertIsCert === 1"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.isDelete')" align="center">
        <template slot-scope="scope">
          <span>
            <el-switch
              v-model="scope.row.isDelete === 1"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
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
    <el-dialog v-if="curTab === 1" :title="`${textMap[dialogStatus]}企业`" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="tempCompanyData" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('table.companyName')" prop="companyName">
          <el-input v-model="tempCompanyData.companyName"/>
        </el-form-item>
        <el-form-item :label="$t('table.cardNo')" prop="cardNo">
          <el-input v-model="tempCompanyData.cardNo"/>
        </el-form-item>
        <el-form-item :label="$t('table.cardPic')" prop="cardPic">
          <!-- <el-button v-if="!tempCompanyData.cardPic" type="primary" icon="el-icon-upload">上传营业执照副本照片</el-button> -->
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handlePicSuccess"
            :before-upload="beforePicUpload">
            <img :src="dialogImageUrl" class="avatar">
            <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
          </el-upload>
        </el-form-item>
        <el-form-item :label="$t('table.headName')" prop="headName">
          <el-input v-model="tempCompanyData.headName"/>
        </el-form-item>
        <el-form-item :label="$t('table.phone')" prop="phone">
          <el-input v-model="tempCompanyData.phone"/>
        </el-form-item>
        <el-form-item :label="$t('table.isDelete')" prop="isDelete">
          <el-switch
            v-model="tempCompanyData.isDelete"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false;temp={}">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog v-if="curTab === 2" :title="`${textMap[dialogStatus]}用户`" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="tempUserData" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('table.companyId')" prop="companyId">
          <el-input v-model="tempUserData.companyId"/>
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
          <el-input v-model="tempUserData.headImg"/>
        </el-form-item>
        <el-form-item :label="$t('table.userTitle')" prop="userTitle">
          <el-input v-model="tempUserData.userTitle"/>
        </el-form-item>
        <el-form-item :label="$t('table.isDelete')" prop="isDelete">
          <el-switch
            v-model="tempUserData.status"
            active-color="#13ce66"
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
          <el-input v-model="tempMasterData.headImg"/>
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
            v-model="tempMasterData.expertIsCert"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item :label="$t('table.isDelete')" prop="isDelete">
          <el-switch
            v-model="tempMasterData.status"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false;temp={}">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
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
// import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
// import { parseTime } from '@/utils'
import moment from 'moment'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
let listCompany = {
        total: 20,
        items: [
          {
            id: 1,
            "companyId": 1001,
            "companyName": "郝工好公司",
            "cardNo": "企业代码001",
            "headName": "老张",
            "phone": "13974999769",
            "isDelete": 1,
            createTime: moment().format('YYYY-MM-DD hh:mm:ss')
          },
          {
            "companyId": 1001,
            id: 2,
            "companyName": "郝工好公司",
            "cardNo": "企业代码001",
            "headName": "老张",
            "phone": "13974999769",
            "isDelete": 1,
            createTime: moment().format('YYYY-MM-DD hh:mm:ss')
          },
          {
            "companyId": 1001,
            id: 3,
            "companyName": "郝工好公司",
            "cardNo": "企业代码001",
            "headName": "老张",
            "phone": "13974999769",
            "isDelete": 1,
            createTime: moment().format('YYYY-MM-DD hh:mm:ss')
          },
          {
            "companyId": 1001,
            id: 4,
            "companyName": "郝工好公司",
            "cardNo": "企业代码001",
            "headName": "老张",
            "phone": "13974999769",
            "isDelete": 1,
            createTime: moment().format('YYYY-MM-DD hh:mm:ss')
          },
          {
            "companyId": 1001,
            id: 5,
            "companyName": "郝工好公司",
            "cardNo": "企业代码001",
            "headName": "老张",
            "phone": "13974999769",
            "isDelete": 1,
            createTime: moment().format('YYYY-MM-DD hh:mm:ss')
          },
          {
            "companyId": 1001,
            id: 6,
            "companyName": "郝工好公司",
            "cardNo": "企业代码001",
            "headName": "老张",
            "phone": "13974999769",
            "isDelete": 1,
            createTime: moment().format('YYYY-MM-DD hh:mm:ss')
          }]
      }
let listUsers = {
        total: 20,
        items: [
          {
            id: 1,
            "userId": 1001,
            "account": "account",
            "userName": "张三丰",
            "userPhone": "18216425936",
            "headImg": "http://aaa.baidu.com/aaa.jpg",
            "userTitle": "知名开发人员",
            loginTime: moment().format('YYYY-MM-DD hh:mm:ss'),
            "isDelete": 1,
            createTime: moment().format('YYYY-MM-DD hh:mm:ss')
          },
          {
            id: 2,
            "userId": 1001,
            "account": "account",
            "userName": "张三丰",
            "userPhone": "18216425936",
            "headImg": "http://aaa.baidu.com/aaa.jpg",
            "userTitle": "知名开发人员",
            loginTime: moment().format('YYYY-MM-DD hh:mm:ss'),
            "isDelete": 1,
            createTime: moment().format('YYYY-MM-DD hh:mm:ss')
          },{
            id: 3,
            "userId": 1001,
            "account": "account",
            "userName": "张三丰",
            "userPhone": "18216425936",
            "headImg": "http://aaa.baidu.com/aaa.jpg",
            "userTitle": "知名开发人员",
            loginTime: moment().format('YYYY-MM-DD hh:mm:ss'),
            "isDelete": 1,
            createTime: moment().format('YYYY-MM-DD hh:mm:ss')
          },{
            id: 4,
            "userId": 1001,
            "account": "account",
            "userName": "张三丰",
            "userPhone": "18216425936",
            "headImg": "http://aaa.baidu.com/aaa.jpg",
            "userTitle": "知名开发人员",
            loginTime: moment().format('YYYY-MM-DD hh:mm:ss'),
            "isDelete": 1,
            createTime: moment().format('YYYY-MM-DD hh:mm:ss')
          },{
            id: 5,
            "userId": 1001,
            "account": "account",
            "userName": "张三丰",
            "userPhone": "18216425936",
            "headImg": "http://aaa.baidu.com/aaa.jpg",
            "userTitle": "知名开发人员",
            loginTime: moment().format('YYYY-MM-DD hh:mm:ss'),
            "isDelete": 1,
            createTime: moment().format('YYYY-MM-DD hh:mm:ss')
          },{
            id: 6,
            "userId": 1001,
            "account": "account",
            "userName": "张三丰",
            "userPhone": "18216425936",
            "headImg": "http://aaa.baidu.com/aaa.jpg",
            "userTitle": "知名开发人员",
            loginTime: moment().format('YYYY-MM-DD hh:mm:ss'),
            "isDelete": 1,
            createTime: moment().format('YYYY-MM-DD hh:mm:ss')
          }
          ]
      }
let listMaster = {
        total: 20,
        items: [
          {
            id: 1,
            "userId": 1001,
            "account": "account",
            "userName": "张三丰",
            "userPhone": "18216425936",
            "headImg": "http://aaa.baidu.com/aaa.jpg",
            "userTitle": "知名开发人员",
            loginTime: moment().format('YYYY-MM-DD hh:mm:ss'),
            expertIsCert: 1,
            goodField: "JS JAVA PYTHON",
            "isDelete": 1,
            createTime: moment().format('YYYY-MM-DD hh:mm:ss')
          },
          {
            id: 2,
            "userId": 1001,
            "account": "account",
            "userName": "张三丰",
            "userPhone": "18216425936",
            "headImg": "http://aaa.baidu.com/aaa.jpg",
            "userTitle": "知名开发人员",
            loginTime: moment().format('YYYY-MM-DD hh:mm:ss'),
            expertIsCert: 1,
            goodField: "JS JAVA PYTHON",
            "isDelete": 1,
            createTime: moment().format('YYYY-MM-DD hh:mm:ss')
          },{
            id: 3,
            "userId": 1001,
            "account": "account",
            "userName": "张三丰",
            "userPhone": "18216425936",
            "headImg": "http://aaa.baidu.com/aaa.jpg",
            "userTitle": "知名开发人员",
            loginTime: moment().format('YYYY-MM-DD hh:mm:ss'),
            expertIsCert: 1,
            goodField: "JS JAVA PYTHON",
            "isDelete": 1,
            createTime: moment().format('YYYY-MM-DD hh:mm:ss')
          },{
            id: 4,
            "userId": 1001,
            "account": "account",
            "userName": "张三丰",
            "userPhone": "18216425936",
            "headImg": "http://aaa.baidu.com/aaa.jpg",
            "userTitle": "知名开发人员",
            loginTime: moment().format('YYYY-MM-DD hh:mm:ss'),
            expertIsCert: 1,
            goodField: "JS JAVA PYTHON",
            "isDelete": 1,
            createTime: moment().format('YYYY-MM-DD hh:mm:ss')
          },{
            id: 5,
            "userId": 1001,
            "account": "account",
            "userName": "张三丰",
            "userPhone": "18216425936",
            "headImg": "http://aaa.baidu.com/aaa.jpg",
            "userTitle": "知名开发人员",
            loginTime: moment().format('YYYY-MM-DD hh:mm:ss'),
            expertIsCert: 1,
            goodField: "JS JAVA PYTHON",
            "isDelete": 1,
            createTime: moment().format('YYYY-MM-DD hh:mm:ss')
          },{
            id: 6,
            "userId": 1001,
            "account": "account",
            "userName": "张三丰",
            "userPhone": "18216425936",
            "headImg": "http://aaa.baidu.com/aaa.jpg",
            "userTitle": "知名开发人员",
            loginTime: moment().format('YYYY-MM-DD hh:mm:ss'),
            expertIsCert: 1,
            goodField: "JS JAVA PYTHON",
            "isDelete": 1,
            createTime: moment().format('YYYY-MM-DD hh:mm:ss')
          }
          ]
      }
const userTabs = [ // 欧盟
    { tabName: '企业列表', type: 1, active: true },
    { tabName: '用户列表', type: 2, active: false },
    { tabName: '专家列表', type: 3, active: false }
  ]

export default {
  name: 'publicTable',
  components: { Pagination },
  data() {
    return {
      tabs: userTabs,
      curTab: 1,
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
      tempCompanyData: {
        // 添加公司信息
        "companyName": "郝工好公司",
        "cardNo": "企业代码001",
        "headName": "老张",
        "phone": "13974999769",
        "isDelete": 1
      },
      tempUserData: {
        // 添加用户信息
        "companyId": 1001,
        "userName": "张三丰",
        "userPhone": "18216425936",
        "userPassword": "45546546",
        "headImg": "http://aaa.baidu.com/aaa.jpg",
        "userTitle": "知名开发人员",
        "status": 1
      },
      tempMasterData: {
        "userName": "张三丰",
        "userPhone": "18216425936",
        "headImg": "http://aaa.baidu.com/aaa.jpg",
        "userTitle": "知名开发人员",
        "goodField": "医疗",
        "expertIsCert": 1,
        "userPassword": "123456",
        "status": 1
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
      downloadLoading: false,
      dialogPictureVisible: false,
      dialogImageUrl: 'http://source.zouzhengming.com/MSg6YdvsFb8FDCZRStziw.jpg'
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
    getList() {
      this.listLoading = true
      setTimeout(() => {
        if (this.curTab === 1) {
          this.list = listCompany.items
        }
        if (this.curTab === 2) {
          this.list = listUsers.items
        }
        if (this.curTab === 3) {
          this.list = listMaster.items
        }
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

