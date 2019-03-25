<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <!-- <breadcrumb class="breadcrumb-container"/> -->
    <div class="navbar-title">罐头食品标准数据库管理后台</div>
    <div class="right-menu">
      <span class="role_name">
        {{ todayDate }}
      </span>
      <span class="role_name">
        {{ roles === '1' ? "超级管理员" : "管理员" }}
      </span>
      <span @click="logout">{{ $t('navbar.logOut') }}</span>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import {getAdminRole} from '@/utils/auth'
import { Message, MessageBox } from 'element-ui'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import moment from 'moment'
const dateMap = {
  0: '日',
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六'
}
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      todayDate: moment().format('YYYY年MM月DD日') + '星期' + dateMap[moment().day()],
      roles: getAdminRole()
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
    ])
  },
  created(){
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          this.$store.dispatch('FedLogOut').then(() => {
            location.href="#/login"
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
// .navbar {
//   height: 50px;
//   line-height: 50px;
//   box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
//   .hamburger-container {
//     line-height: 58px;
//     height: 50px;
//     float: left;
//     padding: 0 10px;
//   }
//   .screenfull {
//     position: absolute;
//     right: 90px;
//     top: 16px;
//     color: red;
//   }
//   .avatar-container {
//     height: 50px;
//     display: inline-block;
//     position: absolute;
//     right: 35px;
//     .avatar-wrapper {
//       cursor: pointer;
//       margin-top: 5px;
//       position: relative;
//       line-height: initial;
//       .roles_type{
//         line-height: 40px;
//       }
//       .user-avatar {
//         width: 40px;
//         height: 40px;
//         border-radius: 10px;
//       }
//       .el-icon-caret-bottom {
//         position: absolute;
//         right: -20px;
//         top: 12px;
//         font-size: 12px;
//       }
//     }
//   }
// }
.navbar {
  height: 50px;
  overflow: hidden;
  background: #f44336;
  color: #9e9e9e;
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }
  .navbar-title{
    float: left;
    line-height: 46px;
    height: 100%;
    color: #f4f4f4;
    font-size: 18px;
    font-weight: 600;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    color: #f4f4f4;
    margin-right: 20px;
    .role_name {
      margin-right: 20px;
    }
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }
  }
}
</style>

